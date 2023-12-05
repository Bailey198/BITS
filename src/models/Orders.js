import mongoose from "mongoose"

const distributionHubs = ["Tan Binh District Hub", "Binh Tan District Hub", "District 7 Hub"]

const orderSchema = new mongoose.Schema({
    distributionHub: {
        type: String,
        required: true,
        enum: distributionHubs,
        default: () => {
            // Randomizing the distribution hub for orders
            const randomIndex = Math.floor(Math.random() * distributionHubs.length)
            return distributionHubs[randomIndex]
        }
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product",
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    user: {
        type: String,
        required: true,
    },
    userFullName: {
        type: String,
        required: true,
    },
    userAddress: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["Active", "Delivered", "Canceled"]
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Order = mongoose.model('Order', orderSchema)

export { Order }