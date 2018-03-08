
import { Request, Response } from "express";
import { responseSuccess, responseFail } from "./../../../utils";
import { SearchOptions } from "../../../interfaces/searchOptions";
import { dbInstance } from "./../../../configure";
import { insert, fetch } from "../../../dbConnectors";



export let searchController = (req: Request, res: Response) => {
    const searchOptions: SearchOptions = req.query;
    fullSearch(searchOptions)
        .then((searchResult: any[]) => {
            res.send(responseSuccess(200, "School search successful", searchResult));
        }).catch((error) => {
            res.send(responseFail(500, JSON.stringify(error)));
        })
};

const fullSearch = (searchOptions: SearchOptions): Promise<any> => {
    if (searchOptions.searchTerm) {
        return searchOptions.searchBy === "postcode"
            ? searchByPostCode(searchOptions.searchTerm, projectionFieldForSchoolSearch)
            : searchBySchoolName(searchOptions.searchTerm, projectionFieldForSchoolSearch);
    } else {
        return advSearch(searchOptions)
    }
}

const searchBySchoolName = (searchTerm: string, projectionField: any) => {
    const regex = new RegExp(searchTerm, "i");
    const col = dbInstance.edubaseSchool;
    const query = {
        $or: [
            { "label": regex },
            { "establishmentName": regex }
        ]
    }

    return new Promise((res, rej) => {
        col.find(query, projectionField)
            .limit(10)
            .toArray((error: any, documents: any) => {
                if (error) rej(error);
                res(documents);
            });
    })
};

const searchByPostCode = (searchTerm: string, projectionField: any) => {
    const Col = dbInstance.edubaseSchool;
    const regex = new RegExp(searchTerm, "i");
    return new Promise((res, rej) => {
        Col.find({ "postcode": regex }, projectionField)
            .limit(10)
            .toArray((error: any, documents: any) => {
                if (error) rej(error);
                res(documents);
            });
    })
};

const advSearch = (searchOptions: SearchOptions): Promise<any> => {
    const Col = dbInstance.edubaseSchool
    return new Promise((resolve, reject) => {
        fetchSchool(searchOptions)
            // TODO: Need to refactor code
            .then((schoolData) => {
                const query: any = [];

                if (schoolData && searchOptions.distance) {
                    const coordinates: number[] = schoolData.location.coordinates;
                    query.push({ "location": { $geoWithin: { $center: [coordinates, +searchOptions.distance * 0.0009817477042468395] } } })
                } else if (searchOptions.lng && searchOptions.lat && searchOptions.distance) {
                    const coordinates: number[] = [+searchOptions.lng, +searchOptions.lat]
                    query.push({ "location": { $geoWithin: { $center: [coordinates, +searchOptions.distance * 0.0009817477042468395] } } })
                }
                if (searchOptions.rating) {
                    query.push({ rating: searchOptions.rating })
                }
                if (searchOptions.ageRange) {
                    query.push({ statutoryHighAge: { $gte: +searchOptions.ageRange } })
                } if (searchOptions.gender) {
                    query.push({ "gender.label": searchOptions.gender })
                } if (searchOptions.religiousCharacter) {
                    query.push({ "religiousCharacter.label": searchOptions.religiousCharacter })
                }

                if (query.length) {
                    Col.find({
                        $and: query
                    }, { projection: projectionFieldForSchoolSearch.projection }).toArray(function (error: any, documents: any) {
                        if (error) reject(error)
                        resolve(documents)
                    })
                } else {
                    resolve(schoolData);
                }
            }).catch((error) => {
                reject(error)
            });
    });
}

const fetchSchool = (options: SearchOptions): Promise<any> => {
    if (options.urn && options.distance) {
        return fetch(dbInstance.edubaseSchool, { uniqueReferenceNumber: +options.urn })
    } else {
        return Promise.resolve(undefined)
    }

}

const projectionFieldForSchoolSearch = {
    projection: {
        prefEmail : "",
        TelephoneNum : 1,
        HeadTitle : "",
        HeadFirstName : "",
        HeadLastName : "",
        establishmentName: 1,
        uniqueReferenceNumber: 1,
        location: 1,
        statutoryHighAge: 1,
        "gender.label": 1,
        religiousCharacter: 1,
        rating: 1,
        postcode: 1,
        images: "",
        ofstedLastInsp: "",
        "typeOfEstablishment.label" : "",
        "LSOA.label": "",
        statutoryLowAge: 1
    }
}

