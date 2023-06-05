const passwordModel = require("./dbPasswordSchema.js");

// some variables to test
const id = "646bc7d4d2d891a680ebe305";
const doc = {
  "app": "testApp",
  "category": "testCategory",
  "userName": "testUser",
  "encryptedPassword": "123"
};

// read all function
async function readAll() {
    try {
        let passwords = [];
        passwords = await passwordModel.find({});
    
        console.log(passwords);
    } catch (err) {
        console.log(err);
    }
};

// create one document function
async function createOne() {
    try {
        const newDoc = passwordModel(doc);
        const result = await newDoc.save();
    
        console.log(result);
    } catch (err) {
        console.log(err);
    }
};

// update one document function
async function updateOne() {
    try {
        const result = await passwordModel.findByIdAndUpdate(id, doc);
    
        console.log(result);
    } catch (err) {
        console.log(err);
    }
};

// delete one document function
async function deleteOne() {
    try {
        const result = await passwordModel.findByIdAndDelete(id);
    
        console.log(result);
    } catch (err) {
        console.log(err);
    }
};

// createOne();
// updateOne();
// deleteOne();
readAll();
