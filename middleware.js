// const Listing = require("./models/listing.js");
// const ExpressError = require("./utils/ExpressError.js");
// const { listingSchema, reviewSchema } = require("./schema.js");

// module.exports.isLoggedIn = (req, res, next) => {
//     if(!req.isAuthenticated()){
//         req.session.redirectUrl = req.originalUrl;
//         req.flash("error", "You must log int");
//         res.redirect("/login");
//     }
//     next();
// }

// module.exports.saveRedirectUrl = (req, res, next) => {
//     if(req.session.redirectUrl) {
//         res.locals.redirecturl = req.session.redirectUrl;
//     }
//     next();
// };

// module.exports.isOwner = async (req, res, next) => {
//     let {id} = req.params;
//     let listing = await Listing.findById(id);
//     if(!listing.owner.equals(res.locals.currUser._id)){
//         req.flash("error", "You are not the owner of this property");
//         return res.redirect(`/listings/${id}`);
//     }
//     next();
// }

// module.exports.validateListing = (req, res, next) => {
//     let { error } = listingSchema.validate(req.body);
//     if (error) {
//       let errMsg = error.details.map((el) => el.message).join(",");
//       throw new ExpressError(400, errMsg);
//     } else {
//       next();
//     }
// };

// module.exports.validateReview = (req, res, next) => {
//     let { error } = reviewSchema.validate(req.body.review);
//     if (error) {
//         let errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400, errMsg);
//     } else {
//         next();
//     }
// };


const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must log in");
        res.redirect("/login");
    } else {
        next();  // Make sure to call next() if the user is authenticated
    }
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirecturl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing || !listing.owner.equals(res.locals.currUser.id)) {                                        //if (!listing.owner.equals(res.locals.currUser.id)) {
        req.flash("error", "You are not the owner of this property");
        return res.redirect(`/listings/${id}`);  // Fixed the redirect URL by wrapping the ID correctly
    }
    next();
};

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    //console.log(req.body);
    // Ensure req.body.review exists before validating
    if (!req.body.review) {
        throw new ExpressError(400, "Review is required");
    }

    // Validate the review using the schema
    let { error } = reviewSchema.validate(req.body.review);
    if (error) {
        //console.error("Validation Error: ", error);
        let errMsg = error.details.map((el) => el.message).join(", ");
        //console.log(errMsg);
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser.id)) {                                        //if (!listing.owner.equals(res.locals.currUser.id)) {
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);  // Fixed the redirect URL by wrapping the ID correctly
    }
    next();
};