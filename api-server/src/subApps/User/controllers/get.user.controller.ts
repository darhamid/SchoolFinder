import { fetch } from "../../../dbConnectors";
import { Request, Response } from "express";
import { responseSuccess, responseFail } from "./../../../utils";
import { dbInstance } from "./../../../configure";
import { ObjectID } from "mongodb"

export const getUserDetailsController = (req: Request, res: Response) => {
    if (req.params.id) {
        fetch(dbInstance.users, { _id: new ObjectID(req.params.id) })
            .then((result: any) => {
                if (result && result.password) {
                    delete result.password;
                }
                res.send(responseSuccess(200, "User details fetched !.", result))
            })
            .catch((error: any) => {
                res.send(error);
            });
    } else {
        res.send(responseFail(500, "Invalid Parameters"));
    }
};
