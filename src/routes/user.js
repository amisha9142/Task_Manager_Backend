// const express = require("express")
// const { signup } = require("../controllers/user")
// const route = express.Router()
// const upload = require("../utilis/aws")
// const profileImage = 'profileImage';

// route.post("/createuser",upload.fields([{name:profileImage}]),signup)

// module.exports = route

const express = require("express");
const { isAuthenticate } = require("../../middleware/auth");
const { signup, login, GetUserProfile, updateUserProfile, deleteUserProfile } = require("../controllers/user");
const route = express.Router();
// const upload = require("../utilis/aws");
// const profileImage = 'profileImage';

// Ensure that the file upload middleware is added before the route handler
// route.post("/createuser", upload.fields([{ name: profileImage }]), signup);
route.post("/createuser", signup);
route.post("/loginuser",isAuthenticate,login);
route.get("/getuserprofile",GetUserProfile);
route.put("/updateuserprofile/:id",updateUserProfile);
route.put("/deleteuserprofile/:id",deleteUserProfile);
module.exports = route;


