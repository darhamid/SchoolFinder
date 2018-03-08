import * as dotenv from "dotenv";
import { MongoClient, Db, Collection } from "mongodb";
const url = <string>process.env.MONGODB_URI;

class DbCollections {
  users: Collection;
  edubaseSchool: Collection;
  statistics: Collection;
}

export const dbInstance = new DbCollections();
export const initDb = MongoClient.connect(url).then((db: any) => {
  const dbV1 = db.db("edubase");
  dbInstance.users = dbV1.collection("users");
  dbInstance.edubaseSchool = dbV1.collection("edubaseSchool");
  dbInstance.statistics = dbV1.collection("statistics");
}).catch(error => {
  console.log("Mongo Error : " + error)
});

