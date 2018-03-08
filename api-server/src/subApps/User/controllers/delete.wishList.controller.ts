import { Request, Response } from "express";
import { responseSuccess, responseFail } from "./../../../utils";
import { dbInstance } from "./../../../configure";
import { ObjectID } from "mongodb";

export const removeFromWishlistController = (req: Request, res: Response) => {
   if (req.params.userid && req.query.urn) {
       removeFromWishList(req.params.userid, req.query.urn)
           .then((result: any) => {
               res.send(responseSuccess(200, "School Removed From WishList", result))
           })
           .catch((error: any) => {
               res.send(error);
           });
   } else {
       res.send(responseFail(500, "Invalid Parameters"));
   }
};

const removeFromWishList = (userId: any, urn: any) => {
   const coll = dbInstance.users;
   return coll.update({
       $and: [{ "_id": new ObjectID(userId) }, { "wishlist": { "$in": [parseInt(urn)] } }]
   }, {
       $pull: { "wishlist": { "$in": [parseInt(urn)] } }
   });
}