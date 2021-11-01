const { validationResult } = require("express-validator");

const Post = require("../models/post");

exports.createPost = async (req, res) => {
  const myValidationResult = validationResult.withDefaults({
    formatter: (error) => error.msg,
  });

  // check for errors
  const errors = myValidationResult(req);
  // show errors
  if (!errors.isEmpty()) {
    return res.status(400).send({ success: false, error: errors.mapped() });
  }

  const post = new Post(req.body);
  await post.save();
  res.send({ success: true, data: post });

  // console.log("CREATING POST: ", req.body);

  // post.save((error, result) => {
  //   if (error) {
  //     return res.status(400).json({
  //       error,
  //     });
  //   }
  //   res.json({
  //     message: "Create post success",
  //     data: result,
  //   });
  // });
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find().select("-__v");
  res.send({ success: true, data: posts });
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).select("-__v");
    res.send({ success: true, data: post });
  } catch {
    res.status(404).send({
      success: false,
      error: "Post not found!",
    });
  }
};

exports.updatePost = async (req, res) => {
  const myValidationResult = validationResult.withDefaults({
    formatter: (error) => {
      return error.msg;
    },
  });

  // check for errors
  const errors = myValidationResult(req);
  // show errors
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: errors.mapped(),
    });
  }

  try {
    const post = await Post.findById(req.params.id).select("-__v");
    Object.assign(post, req.body);
    post.save();
    res.send({ success: true, data: post });
  } catch {
    res.status(404).send({
      success: false,
      error: "Post not found!",
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.remove();
    res.send({ success: true, data: "Post with id = ".concat(req.params.id).concat(" has been deleted")});
  } catch {
    res.status(404).send({
      success: false,
      error: "Post not found!",
    });
  }
};
