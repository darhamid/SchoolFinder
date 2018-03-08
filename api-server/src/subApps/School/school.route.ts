import * as express from "express";
import { Router } from "express";
import { getSchoolDetailsController, getSchoolStatisticsController } from "./controllers";

export const School: Router = express.Router();

School.get("/:urn", getSchoolDetailsController);
School.get("/:urn/statistics", getSchoolStatisticsController);
