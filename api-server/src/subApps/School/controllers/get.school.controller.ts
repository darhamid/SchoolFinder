import { dbInstance } from "./../../../configure";
import { Request, Response } from "express";
import { fetch, fetchByQuery } from "../../../dbConnectors";
import { responseSuccess, responseFail } from "./../../../utils";

export const getSchoolDetailsController = (req: Request, res: Response) => {
  const term = {
    query: { "uniqueReferenceNumber": parseInt(req.params.urn) }
  };

  fetchByQuery(dbInstance.edubaseSchool, term)
    .then((school: any) => {
      res.send(responseSuccess(200, "School fetched successful", school));
    })
    .catch((error: any) => {
      res.send(responseFail(500, JSON.stringify(error)));
    });
};


