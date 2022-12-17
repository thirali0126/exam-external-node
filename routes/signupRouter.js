const express = require ('express');
const bcrypt = require ('bcrypt');
const signupModel = require ('../models/signupModel');
let router = express.Router ();
var jwt = require ('jsonwebtoken');

router.post ('/signup', async (req, res) => {
  const user = req.body;
  console.log (user);
  // if(user.length != null && user.length != 0){
  //   return res.status(400).json({ data: "All the filed is required" });
  // }
  const isemailExists = await signupModel.findOne ({email: user.email});
  if (isemailExists) {
    return res.status (400).json ({data: 'Data already exists..'});
  }

  const ismobileExists = await signupModel.findOne ({mobile: user.mobile});
  if (ismobileExists) {
    return res.status (400).json ({data: 'Data already exists..'});
  }

  bcrypt.hash (user.password, 10, function (err, hash) {
    // Store hash in your password DB.
    const userOne = new signupModel ({
      name: user.name,
      password: hash,
      email: user.email,
      mobile: user.mobile,
      age: user.age,
      gender: user.gender,
      address: user.address
    });
    userOne
      .save ()
      .then (data => {
        console.log ('DATA SAVED : ', data);
        return res.status (200).json ({data: 'data stored..'});
      })
      .catch (e => {
        return res.status (201).json ({data: 'Error : ', e});
      });
  });
});

router.post ('/signin', async (req, res) => {
  const user = req.body;
  if (!user.email && !user.password) {
    return res.status (201).json ({data: 'Kindly fill the details first'});
  }
  const isemailExists = await signupModel.findOne ({email: user.email});
  if (isemailExists) {
    bcrypt
      .compare (user.password, isemailExists.password)
      .then (function (result) {
        if (result == true) {
          var token = jwt.sign ({_id: isemailExists._id}, 'my-token');
          return res.status (200).json ({data: 'Login sucessfully..', token});
        } else {
          return res
            .status (400)
            .json ({data: 'user email/Password incorrect..'});
        }
      });
  } else {
    return res.status (400).json ({data: 'Please Sign up'});
  }
});

module.exports = router;
