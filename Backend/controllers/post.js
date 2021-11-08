// import
// importation du model de la bdd user.js
const fs = require("fs");
const jwt = require("jsonwebtoken")
const { post } = require("../app");
const models = require("../models");
const multer = require("multer")

// les fonction


// recuperation des postes

exports.getAllPost = (req, res, next) => {
  models.Post.findAll({
    where: {},
    include: [{
      model:models.User,
      where: {}
    }],
    order: [['id', 'DESC']]
    
  })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json({ error }));
};

// cration des posts

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
    
    content = req.body;
    imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }
  try {
    const newPost = await models.Post.create({
      ...content,
      UserId: userId,
      likes: likes,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,   // on resout chaque segment de l'url
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

// modification des posts

exports.modifyPost = (req, res, next) => {
  // params
  let content = req.body.content;
  const headerAuth = req.headers["authorization"];
  const token = headerAuth.split(" ")[1];
  /* console.log("token - post");
  console.log(token); */
  const decoded = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
  userId = decoded.userId;
  let imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  models.Post.findOne({
    attributes: ["id", "content", "userId", "imageUrl"],
    where: {id: req.params.id},
    where: {},
    include: [{
      model:models.User,
      where: {}
    }],
  })
  .then((post)=>{
    if (post == null) {
      res.status(404).json({err: "le poste n'existe pas"})
    }else{
      post.update({
        content: (content ? content : post.content),
        imageUrl: (imageUrl ? imageUrl: user.imageUrl)
      })
    }
    res.status(200).json(post)})
    .catch((err) => res.status(400).json({ err : "erreur 400" }));
  };

  // supprimer le post 

  exports.deletePost = (req, res, next)=>{

    //recuperation du token 
    const headerAuth = req.headers["authorization"];
    const token = headerAuth.split(" ")[1];
    /* console.log("token - post");
  console.log(token); */
    const decoded = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
    userPostId = decoded.userId;
    isAdmin = decoded.isAdmin;
    Posts= models.Post;

    models.Post.findOne({
      attributes: ["id", "content", "userId", "imageUrl"],
      where: { id: req.params.id },
    })
    .then((post)=>{
      console.log('post--->');
      console.log(post);
      if (post.userId == userPostId || isAdmin === true) {
        if (imageUrl !== null) {
          const filename = post.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
                    Posts.destroy({ where: {id: req.params.id} })
                    .then(() => res.status(200).json({ message: 'Poste et image supprimés !' }))
                    .catch(error => res.status(400).json({ error }))
                  });
        }else{
          Posts.destroy({ where: {id: req.params.id}})
          .then(()=> res.status(200).json({message : 'poste supprimé !'}))
          .catch(err => res.status(400).json({err}))
        }
      }else{
        res.status(404).json({ 'error': 'Vous n\'avez pas les droits' });
        console.log(post.UserId);
        console.log(userId);
      }
    })
    .catch(err => res.status(500).json({err :' poste introuvable'}));
  }