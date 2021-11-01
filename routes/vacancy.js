const express = require("express");
const vacancyController = require("../controllers/vacancy");
// const validator = require("../validator/post")

const router = express.Router();

// router.post("/", validator.createPostValidator, postController.createPost);
router.get("/", vacancyController.getVacancys);
// router.get("/:id", postController.getPost);
// router.patch("/:id", validator.updatePostValidator, postController.updatePost);
// router.delete("/:id", postController.deletePost);

module.exports = router;
