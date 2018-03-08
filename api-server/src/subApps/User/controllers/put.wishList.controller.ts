import { Request, Response } from "express";
import { ObjectID } from "mongodb";
import { responseSuccess, responseFail } from "./../../../utils";
import { dbInstance } from "./../../../configure";


export const addToWishlistController = (req: Request, res: Response) => {
    if (req.params.userid && req.body.urn)

        addToWishList(req.params.userid, req.body.urn)
            .then((result: any) => {
                res.send(responseSuccess(200, "School Added To WishList", result))
            })
            .catch((error: any) => {
                res.send(responseFail(500, error));
            });
    else
        res.send(responseFail(500, "Invalid Parameters"));

};

const addToWishList = (userId: string, urn: string) => {
    const coll = dbInstance.users
    return new Promise((resolve, reject) => {
        coll.findOne({ _id: new ObjectID(userId), wishlist: { $in: [+urn] } }, (error: any, result: any) => {
            if (result) {
                reject("Already Present In Wishlist")
            }
            else {
                coll.update({ "_id": new ObjectID(userId) }, { $push: { wishlist: +urn } }, (error: any, result: any) => {
                    if (error) reject(error)
                    resolve(result)
                })
            }
        })
    });
};