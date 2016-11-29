const express = require('express');
const passport = require('passport');
const Account = require('../../../models/account');

const router = express.Router();

router.get('/register', function(req, res) {
    res.render('register', {});
});




router.post('/register', function(req, res) {

  const username = req.body.username;
  const password = req.body.password;

  Account.register( new Account({ username }), password, (err, account) => {
      if (err) return res.render('register', { account : account });
      passport.authenticate('local')(req, res, () =>  res.redirect('/') );
  });

});




router.get('/login', function(req, res) {
    res.render('login', { message : req.flash("error") });
});




// router.post('/login', passport.authenticate('local'), function(req, res) {
//     res.redirect('/');
// });


router.post('/login',
    passport.authenticate('local', { successRedirect: '/',
                                     failureRedirect: '/local/login',
                                     failureFlash: "Usuari o password són incorrectes" })
);


router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


module.exports = router