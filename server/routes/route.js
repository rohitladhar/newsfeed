const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/userController");
const { categories,search,filter,allnews } = require("../controllers/newsController");

router.post("/register", register);
router.post("/login", login);
router.post("/categories", categories);
router.post("/search", search);
router.post("/filter", filter);
router.post("/allnews", allnews);

module.exports = router;