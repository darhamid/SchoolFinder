import { dbInstance } from "./../../../configure";
import { Request, Response } from "express";
import { fetch, fetchByQuery } from "../../../dbConnectors";
import { responseSuccess, responseFail } from "./../../../utils";


export const getSchoolStatisticsController = (req: Request, res: Response) => {
    const term = {
        query: { "URN": parseInt(req.params.urn) },
        projection: { "BELIG": 1, "GELIG": 1, "PTRWM_EXP": 1, "PTRWM_HIGH": 1, "MATPROG": 1, "WRITPROG": 1, "READPROG": 1 }
    };

    fetchByQuery(dbInstance.statistics, term)
        .then((statistics: any) => {
            res.send(responseSuccess(200, "Statistics fetched successful", statistics));
        })
        .catch((error: any) => {
            res.send(responseFail(500, JSON.stringify(error)));
        });
};
