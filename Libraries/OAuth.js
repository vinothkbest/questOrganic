const passport = require('passport')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const Customer = require('../Models/Customer')
const mongoose = require('mongoose')

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4201/oauth2/google/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
     let fetchData = {
          _id:new mongoose.Types.ObjectId(),
          name:profile.displayName,
          profile:profile.picture,
          email:profile.email,
          gender:profile.gender,
          is_logged:profile.email_verified
     };
     let customer = await Customer.findOneAndUpdate({email:profile.email});
     if(customer){
          customer.is_logged=profile.email_verified;
          customer.save()
     }else{
          customer =  await Customer.create(fetchData);
     }
     return done(null, customer);
  }
));

passport.serializeUser((user, done) =>{
     done(null,user);
});

passport.deserializeUser((user, done) =>{
     done(null,user);
});

