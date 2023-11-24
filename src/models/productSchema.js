// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Hoang Thai Phuc, Nguyen Hoang Minh, Tran Nguyen Anh Minh, Tran Luu Quang Tung, Dao Bao Duy
// ID: s3978081, s3977773, s3979367, s3978481, s3978826
// Acknowledgement: W3School, TailwindCss, ChatGPT, Passport documentation, RemixIcons, Freepik, Web Dev Simplified

import mongoose, { Mongoose } from "mongoose";

export const categories = ["Men's", "Women's", "Gear & Equipment", "Supplement"]
// tags
const sizeTags = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const priceTags = ['cheap', 'budget-friendly', 'expensive', 'your kidney']
export const tags = [].concat(...[sizeTags, priceTags]) 

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    coverImage: {
        type: Buffer
        // contentType: String
    },
    coverImageType: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    stock: {
        type: Number,
        required: true,
        min: 1
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    rating: {
        type: Number,
        default: () => parseFloat(((Math.random() * 3) + 2).toFixed(2)) // A random rating from 2* to 5*
    },
    reviewNumber: {
        type: Number,
        default: () => Math.floor((Math.random() * (800 + 1)) + 200)
    },
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Vendor",
        default: "no publisher"
    },
    brand: {
        type: String,
        default: "no Brand"
    },
    category: {
        type: String,
        required: true,
        enum: categories
    },
    tags: {
        type: [String],
        enum: tags,
        default: []
    }
})

productSchema.virtual('imageCoverData').get(function() {
    if (this.coverImage != null && this.coverImageType != null) {
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
    return "https://www.wowpatterns.com/assets/files/resource_images/diagonal-lines-vector-pattern.jpg"
})

// create models for each user type
const Product = mongoose.model('Product', productSchema)

export { Product }
