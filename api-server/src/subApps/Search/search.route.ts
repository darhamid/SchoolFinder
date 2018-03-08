import * as express from "express";
import { Router } from "express";
import { searchController } from "./controllers";

export const Search: Router = express.Router();

Search
  .get("/", searchController);
