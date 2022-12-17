const mongoose = require("mongoose");

let mySchema = mongoose.Schema;

let signupSchema = new mySchema({
    name: { type: String, required: [true, "Name is required.."] },
    email: { type: String ,required:true},
    password: { type: String, required : true },
    mobile: { type: Number, max: 10 ,   required  : true },
    address: { type: String , required : true},
    age: { type: Number, required: true },
    gender: { type: String, required: true}
});

const tableName = "signup";

let data = mongoose.model(tableName, signupSchema);

module.exports = data;
