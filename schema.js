const Joi = require("joi");

const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().min(0).required(),
    country: Joi.string().required(),
    location: Joi.string().required(),
    image: Joi.string().optional().allow("", null),
    //   filename: Joi.string().optional(),
    //   url: Joi.string().allow("", null),
    // }).optional(),
  }).required(),
});

// const reviewSchema = Joi.object({
//   review: Joi.object({
//     rating: Joi.number().required().min(1).max(5),
//     comment: Joi.string().required(),
//   }).required(),
// });

const reviewSchema = Joi.object({
    rating: Joi.number().required().min(1).max(5), // Ensure rating is a number between 1 and 5
    comment: Joi.string().required(), // Ensure comment is a non-empty string
});


module.exports = { listingSchema, reviewSchema };


// const Joi = require("joi");

// const listingSchema = Joi.object({
//     listing: Joi.object({
//         title: Joi.string().required(),
//         price: Joi.number().required().min(0),
//         country: Joi.string().required(),
//         description: Joi.string().required(),
//         location: Joi.string().required(),
//         image: Joi.string().allow("").optional() // Make `image` optional
//     }).required()
// });

// const reviewSchema = Joi.object({
//   review: Joi.object({
//       rating: Joi.number().required().min(1).max(5),
//       body: Joi.string().required()
//   }).required()
// });

// module.exports = { reviewSchema, listingSchema };


// const Joi = require("joi");

// const listingSchema = Joi.object({
//     listing: Joi.object({
//         title: Joi.string().required(),
//         price: Joi.number().required().min(0),
//         country: Joi.string().required(),
//         description: Joi.string().required(),
//         location: Joi.string().required(),
//         image: Joi.string().allow("").optional() // Make image optional
//     }).required()
// });

// const reviewSchema = Joi.object({
//     review: Joi.object({
//         rating: Joi.number().required().min(1).max(5),
//         comment: Joi.string().required()  // Changed 'body' to 'text' for consistency
//     }).required()
// });

// module.exports = { reviewSchema, listingSchema };
