import { Strategy as LocalStrategy } from "passport-local"
import mongoose from "mongoose"
import bcrypt from "bcrypt"

// Load User Models
import { Customer , Vendor, Shipper } from "../models/User.js"

export const initializePassport = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: "username"}, async (username, password, done) => { 
            try {
                // Finding an user by username among all three user collections
                const results = await Promise.all([
                    Customer.findOne({ username }).exec(),
                    Vendor.findOne({ username }).exec(),
                    Shipper.findOne({ username }).exec(),
                ]);
                const user = results.find(result => result !== null);
            
                // Returning an error if a username is not found
                if (!user) {
                    return done(null, false, { message: 'That username is not registered' });
                }
                
                // After an username is found, compare the password with the password in the database (compare function automatically decrypts the hashed password to compare)
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                    throw err;
                    }
            
                    if (isMatch) {
                    return done(null, user);
                    } else {
                    return done(null, false, { message: 'Username or password is incorrect' });
                    }
                });
                } catch (err) {
                console.log(err);
                }
        })
    )

    // Saves the user id in session 
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    // Retrieves the user object from database and stores the full user object in req.user
    passport.deserializeUser(function(id, done) {
        Promise.all([
            Customer.findById(id).exec(),
            Vendor.findById(id).exec(),
            Shipper.findById(id).exec(),
          ])
            .then((results) => {
              const user = results.find((result) => result !== null);
              done(null, user);
            })
            .catch((err) => done(err));
    });
} 