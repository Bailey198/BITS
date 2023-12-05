// RMIT University Vietnam
// Course: COSC2430 Web Programming
// Semester: 2023A
// Assessment: Assignment 2
// Author: Hoang Thai Phuc, Nguyen Hoang Minh, Tran Nguyen Anh Minh, Tran Luu Quang Tung, Dao Bao Duy
// ID: s3978081, s3977773, s3979367, s3978481, s3978826
// Acknowledgement: W3School, TailwindCss, ChatGPT, Passport documentation, RemixIcons, Freepik, Web Dev Simplified

import mongoose from "mongoose"

// define schema for customer user
const customerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: Buffer,
  },
  profilePictureType: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
  // other fields specific to customer users
});

// define schema for vendor user
const vendorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: Buffer,
  },
  profilePictureType: {
    type: String,
  },
  businessName: {
    type: String,
    required: true,
  },
  businessAddress: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
  // other fields specific to vendor users
});

// define schema for shipper user
const shipperSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: Buffer,
  },
  profilePictureType: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  distributionHub: {
    type: String,
    required: true,
    enum: ["District 1 Hub", "District 7 Hub", "District 2 Hub"]
  },
  date: {
    type: Date,
    default: Date.now
  }
  // other fields specific to shipper users
});

// Virtuals 
customerSchema.virtual('userPicture').get(function() {
  if (this.profilePicture != null && this.profilePictureType != null) {
    return `data:${this.profilePictureType};charset=utf-8;base64,${this.profilePicture.toString('base64')}`
  }
  return undefined
})
vendorSchema.virtual('userPicture').get(function() {
  if (this.profilePicture != null && this.profilePictureType != null) {
    return `data:${this.profilePictureType};charset=utf-8;base64,${this.profilePicture.toString('base64')}`
  }
  return undefined
})
shipperSchema.virtual('userPicture').get(function() {
  if (this.profilePicture != null && this.profilePictureType != null) {
    return `data:${this.profilePictureType};charset=utf-8;base64,${this.profilePicture.toString('base64')}`
  }
  return undefined
})



// create models for each user type
const Customer = mongoose.model('Customer', customerSchema);
const Vendor = mongoose.model('Vendor', vendorSchema);
const Shipper = mongoose.model('Shipper', shipperSchema);



export { Customer, Vendor, Shipper }