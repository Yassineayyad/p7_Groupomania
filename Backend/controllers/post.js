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
  let content = req.body;
  let imageUrl =null;
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
      imageUrl: imageUrl   // on resout chaque segment de l'url
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
  models.Post.findOne({
    attributes: ["id", "content", "userId", "imageUrl"],
    where: {id: req.params.id},
    
  })
  .then((post)=>{
    console.log("post----->");
    console.log(post);
    if (post == null) {
      res.status(404).json({ err: "le poste n'existe pas" });
    } else {
      if (req.file) {
        post.imageUrl = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
      }
      let imageUrl = ''
       /*  let imageUrl = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`; */
        console.log("req.file");
        console.log(req.file);
        post.update({
          content: content ? content : post.content,
          imageUrl: imageUrl ? imageUrl : post.imageUrl,
        });
      res.status(200).json(post);
    }
    })
      .catch((err) => {

        console.log(err);
        res.status(400).json({ err : "erreur 400" });
      })
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
      console.log(post.dataValues);
      const imageUrl = post.dataValues.imageUrl;  
      if (post.dataValues.userId == userPostId || isAdmin == true) {
        if (imageUrl !== null) {
          const filename = post.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            Posts.destroy({ where: { id: req.params.id } })
              .then(() =>
                res.status(200).json({ message: "Poste et image supprimés !" })
              )
              .catch((error) => res.status(400).json({ error }));
          });
        } else {
          post
            .destroy()
            .then(() => res.status(200).json({ message: "poste supprimé !" }))
            .catch((err) => res.status(400).json({ err }));
        }
      } else {
        return res.status(404).json({ error: "Vous n'avez pas les droits" });
        /* console.log(post.UserId);
        console.log(userId); */
      }
    })
    .catch((err) =>{ 
      console.log(err);
      res.status(500).json({err :' poste introuvable'})
    });
  }
   exports.likePost = (req, res, next) => {
     const headerAuth = req.headers["authorization"];
     const token = headerAuth.split(" ")[1];
     const decoded = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
     userId = decoded.userId;

     const postId = parseInt(req.query.postId);
     if (postId <= 0) {
       return res.status(400).json({ err: "parametre invalide" });
     }
     models.Post.findOne({
       where: { id: postId },
     })
       .then((res) => {
         res.status(200).json({ res });
       })
       .catch((err) => res.status(500).json);
   };
   exports.creatComment = async (req, res, next) => {
     let content = req.body;
     const headerAuth = req.headers["authorization"];
     const token = headerAuth.split(" ")[1];
     const decoded = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
     userId = decoded.userId;
     if (req.file) {
       content = req.body;
       imageUrl = `${req.protocol}://${req.get("host")}/images/${
         req.file.filename
       }`;
       parentId = id;
     }
     try {
       const newComment = await models.Post.create({
         ...content,
         UserId: userId,
         likes: likes,
         parentId: id,
         imageUrl: `${req.protocol}://${req.get("host")}/images/${
           req.file.filename
         }`, // on resout chaque segment de l'url
       });
       res.status(201).json({ newComment });
       console.log("---> newComment");
       console.log(newComment);
     } catch (error) {
       console.log(error);
       res.status(400).json({ error });
     }
   };
   exports.getOnePost = (req, res, next) => {
     models.Post.findOne({
      
       where: { id: req.params.id },
       include: [
         {
           model: models.User,
           where: {},
         },
       ],
     }).then((post) => {
       if (post == null) {
         res
           .status(404)
           .json({ message: "le poste n'existe pas ou à été supprimé" });
       }
       res.status(200).json(post);
     });
   }