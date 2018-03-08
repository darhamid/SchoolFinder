import { Request, Response } from "express";
import { responseSuccess, responseFail } from "./../../../utils"

export const logoutController = (req: Request, res: Response) => {
  res.send(responseSuccess(200, "Logout successful", undefined));
};
