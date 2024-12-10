const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res, next) => {
    const { id } = req.params;
    let listing = await Listing.findById(id).populate("reviews"); // Reviews ko populate kar diya

    if (!listing) {
        throw new ExpressError(404, "Listing not found!");
    }

    const newReview = new Review(req.body.review); 
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("New review saved...");
    req.flash("success", "New Review Created...");
    res.redirect(`/listings/${listing.id}`); // Fixed string interpolation
};

module.exports.destroyReview = async (req, res) => {
    const { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted...");
    res.redirect(`/listings/${id}`); // Fixed string interpolation
};