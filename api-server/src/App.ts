import * as dotenv from "dotenv";
dotenv.config({ path: ".env.App" });

import * as bodyParser from "body-parser";
import * as jwt from "express-jwt";
import * as cors from "cors";
import * as express from "express";
import { dbInstance } from "./configure";
// subApps import
import { User, Search, School } from "./subApps";

// configure import
import { initDb } from "./configure";
// TODO: find way to import utils by absolute path
import { responseSuccess } from "./utils";

const appPort = Number(process.env.APP_PORT);
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// TODO: add Jwt session with mongo, check valid JWT, whitelist few api
// app.use(
//   jwt({
//     secret: process.env.JWT_SECRET_KEY as string,
//     credentialsRequired: false
//   })
// );
// .unless({ path: ["/user/login"] }))

// temporary routes
app.get("/", (req, res) => {
  res.send(responseSuccess(220, "hello successful", { data: "hello World" }));
});

app.use("/user", User);
app.use("/searchSchools", Search);
app.use("/school", School);

initDb
  .then(() => {
    app.listen(appPort, () => {
      // console.group("Server Details");
      console.log(`App is running at http://localhost:${appPort}`);
      console.info("Press CTRL-C to stop \n");
      // console.groupEnd();
      process.on("unhandledRejection", error => {
        // Will print "unhandledRejection err is not defined"
        console.log("unhandledRejection", error.message);
      });
    });
  })
  .catch((error: any) => {
    console.error("Error on App bootstrap:", error);
  });
