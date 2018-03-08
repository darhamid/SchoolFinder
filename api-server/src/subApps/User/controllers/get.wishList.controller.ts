import { Request, Response } from "express";
import { fetchByQuery } from "../../../dbConnectors";
import { responseSuccess, responseFail } from "./../../../utils";
import { dbInstance } from "./../../../configure";
import { ObjectID } from "bson";


export const getUserWishListController = (req: Request, res: Response) => {
    if (req.params.id ) {
        const term = {
            query : {
                _id : new ObjectID( req.params.id )
            },
            projection : {
                id : 1,
                wishlist : 1
            }
        };
        fetchByQuery( dbInstance.users, term )
            .then((result: any) => {
                res.send(responseSuccess(200, "School wishList fetched successfully", result))
            })
            .catch((error: any) => {
                res.send(error);
            });
    } else {
        res.send(responseFail(500, "Invalid Parameters"));
    }

};