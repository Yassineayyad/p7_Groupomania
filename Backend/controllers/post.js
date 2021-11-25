// import
// importation du model de la bdd user.js
const fs = require("fs");
const jwt = require("jsonwebtoken")
const { post } = require("../app");
const models = require("../models");
const multer = require("multer")
const { sequelize } = require("../models/index")
// Destructuring
const { QueryTypes } = require("sequelize");
// les fonction


// recuperation des postes

/* exports.getAllPost = (req, res, next) => {
  models.Post.findAll({
    where: {parentId : null},
    include: [{
      model:models.User,
      where: {}
    }],
    order: [['id', 'DESC']]
    
  })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json({ error }));
}; */




exports.getAllPost =  async (req, res, next) => {
 const posts = await sequelize.query(
   `select
p.id as post_id,
p.content as post_content,
p.imageUrl as post_img,
p.UserId as post_userId,
p.createdAt as post_created,
p.updatedAt as post_updated,
u.firstname as post_owner_firstname,
u.lastname as post_owner_lastname,
u.imageurl as post_owner_image,
c.id as comment_id,
c.content as comment_content,
c.imageUrl as comment_img,
c.UserId as comment_userId,
c.createdAt as comment_created,
c.updatedAt as comment_updated,

u2.firstname as comment_owner_firstname,
u2.lastname as comment_owner_lastname,
u2.imageurl as comment_owner_image

from posts p
left join posts c
on p.id = c.parentId
join users u
on u.id = p.UserId

left join users u2
on u2.id = c.UserId

where p.parentId is null
order by p.id DESC;`,
   {
     type: QueryTypes.SELECT,
   }
 );

 return res.status(200).json(postParser(posts))

};


// cération des posts

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
  let updatedAt = Date.now;
  const headerAuth = req.headers["authorization"];
  const token = headerAuth.split(" ")[1];
  /* console.log("token - post");
  console.log(token); */
  const decoded = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
  userId = decoded.userId;
  models.Post.findOne({
    attributes: ["id", "content", "userId", "imageUrl",],
    where: { id: req.params.id },
  })
    .then((post) => {
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
        let imageUrl = "";
        /*  let imageUrl = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`; */
        console.log("req.file");
        console.log(req.file);
        post.update({
          content: content ? content : post.content,
          imageUrl: imageUrl ? imageUrl : post.imageUrl,
          updatedAt,
        });
        res.status(200).json(post);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ err: "erreur 400" });
    });
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
   
   exports.getOnePost = (req, res, next) => {
     models.Post.findOne({
       where: { 
         id: req.params.id ,
         
        },
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

   function postParser(postList) {
     const transformedPostList = [];

     postList.forEach((p) => {
       const transformedPost = {
         post_id: p.post_id,
         post_content: p.post_content,
         post_img: p.post_img,
         post_userId: p.post_userId,
         post_owner_firstname: p.post_owner_firstname,
         post_owner_lastname: p.post_owner_lastname,
         post_owner_image: p.post_owner_image,
         post_created: p.post_created,
         post_updated: p.post_updated,
       };

       const existingPost = transformedPostList.find(
         (ep) => ep.post_id == p.post_id
       );

       if (existingPost == undefined) {
         const relatedCommentsList = [];

         relatedCommentsList.push({
           comment_id: p.comment_id,
           comment_content: p.comment_content,
           comment_img: p.comment_img,
           comment_userId: p.comment_userId,
           comment_owner_firstname: p.comment_owner_firstname,
           comment_owner_lastname: p.comment_owner_lastname,
           comment_owner_image: p.comment_owner_image,
           comment_created: p.comment_created,
           comment_updated: p.comment_updated,
         });
         transformedPost["post_comments_array"] = relatedCommentsList;

         transformedPostList.push(transformedPost);
       } else {
         
         existingPost.post_comments_array.push({
           comment_id: p.comment_id,
           comment_content: p.comment_content,
           comment_img: p.comment_img,
           comment_userId: p.comment_userId,
           comment_owner_firstname: p.comment_owner_firstname,
           comment_owner_lastname: p.comment_owner_lastname,
           comment_owner_image: p.comment_owner_image,
           comment_created: p.comment_created,
           comment_updated: p.comment_updated,
         });
       }
     });

     return transformedPostList;
   }

  