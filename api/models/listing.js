import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountedPrice:{
        type: Number,
        required: true,
    },
 
    bedrooms: {
        type: Number,
        required: true,
    },
    batrooms: {
        type: Number,
        required: true,
    },
    furnished: {
        type: Boolean,
        required: true,
    },
    parking: {
        type: Boolean,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    offer: {
        type: Boolean,
        required: true,
    },
    picture: {
        type: Array,
        required: true,
    },
    userRed: {
        type: String,
        required: true,
    },
}, {timestamps: true}
)

const Listing = mongoose.model("Listing", listingSchema)
export default Listing