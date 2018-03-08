import * as express from "express";
import { Router } from "express";
import {
  loginController,
  logoutController,
  signupController,
  addToWishlistController,
  getUserDetailsController,
  getUserWishListController,
  removeFromWishlistController,
  updateUserProfile
} from "./controllers";


export const User: Router = express.Router();

User
  .post("/login", loginController)
  .get("/logout", logoutController)
  .post("/signup", signupController)
  .put("/:userid/wishlist", addToWishlistController)
  .get("/:id", getUserDetailsController)
  .get("/:id/wishList", getUserWishListController)
  .delete("/:userid/wishlist", removeFromWishlistController)
  .put("/:userid/updateProfile", updateUserProfile);
