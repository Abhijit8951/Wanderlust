const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema}=require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const { createReview } = require("../controllers/review.js");
//const { isReviewAuthor } = require("../middleware.js");


const reviewController = require("../controllers/review.js");


router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// Delete rating route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;