const express = require("express");
const postModel = require("../models/postModel");
const middleware = require("../middleware/middleware");
const { post } = require("..");
let router = express.Router();

router.post("/add",middleware,async(req, res) => {
  const user = req.body;
  console.log (user);

    const userOne = new postModel({
      title: user.title,
      description: user.description,
      author: user.author,
      datetime: user.datetime,
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

router.get ('/', (req, res) => {
  postModel
    .find ()
    .then (data => {
      if (data.length > 0) return res.send (data);
      else return res.send ({message: 'Data Not Found'});
    })
    .catch (err => {
      return res.send ({message: err});
    });
});


  module.exports = router;
