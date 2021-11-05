// import
// importation du model de la bdd user.js
const fs = require("fs");
const jwt = require("jsonwebtoken")
const { post } = require("../app");
const models = require("../models");

// les fonction

exports.getAllPost = (req, res, next) => {
  // parmas
  /* let content = req.body.content;
  if (content == null) {
    return res.status(400).json({ err: "texte vide" });
  }
  if (content <= 4) {
    return res.status(400).json({ err: "texte non valide" });
  } */
  models.Post.findAll()
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json({ error }));
};

exports.createPost = async (req, res, next) => {
  let content = req.body
  const headerAuth = req.headers['authorization']
  const token = headerAuth.split(" ")[1]
  /* console.log("token - post");
  console.log(token); */
  const decoded = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
  userId= decoded.userId
  let likes = 0
  /* console.log("userId - post");
  console.log(userId); */
  /*  console.log('--> content');
  console.log(content); */
  if (req.file) {
    
    content = JSON.parse(req.body);
    content.imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }
  try {
    const newPost = await models.Post.create({
      ...content,
      UserId: userId,
      likes: likes
      /* imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,  */ // on resout chaque segment de l'url
    });
    /* newPost = await models.Post.findOne({
      where: { id: post.id },
      include: models.User,
    }); */
    res.status(201).json({ newPost });
    console.log("---> newPost");
    console.log(newPost);
  }catch (error){
    console.log(error);
    res.status(400).json({ error });
  };
};
