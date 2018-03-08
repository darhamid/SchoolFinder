import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { insert, fetch } from "../../../dbConnectors";
import { responseSuccess, responseFail } from "./../../../utils"
import { dbInstance } from "./../../../configure";
const userCollection = "users";

export const signupController = (req: any, res: any) => {
  checkIfAlreadyExist(req.body.email)
    .then((isExist: boolean) => {
      if (isExist) {
        res.send(responseFail(500, "User Already Exist."));
      } else {
        const userObj = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          dob: req.body.dob,
          email: req.body.email,
          phone1: req.body.phone1,
          addressLine1: req.body.addressLine1,
          addressLine2: req.body.addressLine2,
          addressLine3: req.body.addressLine3,
          addressLine4: req.body.addressLine4,
          addressLine5: req.body.addressLine5,
          password: bcrypt.hashSync(req.body.password, 10)
        }
        return registerNewUser(userObj)
      }
    }).then((insertedUser) => {

      const expiresIn: number = 86400;
      const token = jwt.sign({ email: insertedUser.email }, <string>process.env.JWT_SECRET_KEY, {
        expiresIn: expiresIn // expires in 24 hours
      });
      // TODO
      delete insertedUser.password;
      res.send(responseSuccess(200, "Authentication successful", {
        expiresIn: expiresIn,
        token: token,
        user: insertedUser
      }))
    }).catch((err: any) => {
      res.send(responseFail(500, JSON.stringify(err)))
    });
};

const registerNewUser = (userObj: any): Promise<any> => {
  return insert(dbInstance.users, userObj)
}

const checkIfAlreadyExist = (email: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fetch(dbInstance.users, { email: email })
      .then((user: any) => {
        user ? resolve(true) : resolve(false);
      }).catch(error => {
        reject(error);
      })
  });
}
