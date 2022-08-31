const router = require('express').Router()
const passport = require('passport');

router.get('/google', passport.authenticate('google', {scope:['profile', 'email']}));

router.get('/google/callback',
    passport.authenticate( 'google', {
        successRedirect: 'http://localhost:4200/contact-us',
        failureRedirect: 'http://localhost:4200/login'
}));


module.exports = router;