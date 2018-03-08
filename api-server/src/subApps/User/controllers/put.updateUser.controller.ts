import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { ObjectID } from "mongodb";
import { responseSuccess, responseFail } from "./../../../utils";
import { dbInstance } from "./../../../configure";
import { Promise } from "bluebird";

import * as Joi from "joi";
import { putUserSchema } from "../joiSchema";

export const updateUserProfile = (req: Request, res: Response) => {

    Joi.validate(req.body, putUserSchema, function (err, value) {
        if (err) {
            res.send(responseFail(500, err.message));
        } else {

            dbInstance.users.update({ "_id": new ObjectID(req.params.userid) }, { $set: req.body }, (error: any, result: any) => {
                if (error) {
                    res.send(error)
                } else {
                    res.send(responseSuccess(200, "profile updated successfully", result));
                }

            });
        }
    });

};
