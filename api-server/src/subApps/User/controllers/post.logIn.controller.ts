import * as bcrypt from "bcrypt";
import { dbInstance } from "./../../../configure";
import { fetch } from "../../../dbConnectors";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { responseSuccess, responseFail } from "./../../../utils"

export const loginController = (req: Request, res: Response) => {

  fetch(dbInstance.users, { email: req.body.email })
    .then((user: any) => {

      if (!user || !user.email) {
        res.send(responseFail(204, "Authentication failed. User Not Found."))
      } else if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.send(responseFail(204, "Authentication failed. Wrong password."))
      } else {
        // if user is found and password is right, create a token

        const expiresIn: number = 86400;
        const token = jwt.sign({ email: user.email }, <string>process.env.JWT_SECRET_KEY, {
          expiresIn: expiresIn // expires in 24 hours
        });
        // TODO
        delete user.password;

        res.send(responseSuccess(200, "Authentication successful", {
          expiresIn: expiresIn,
          token: token,
          user: user
        }))
      }
    })
    .catch((error: any) => {
      res.send(responseFail(500, JSON.stringify(error)))
    });
};
