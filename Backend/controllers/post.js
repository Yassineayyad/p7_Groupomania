// import
// importation du model de la bdd user.js
const { post } = require("../app");
const models = require("../models");

// les fonction

exports.getAllPost = (req, res, next) => {
  // parmas
  let content = req.body.content;
  if (content == null) {
    return res.status(400).json({ err: "texte vide" });
  }
  if (content <= 4) {
    return res.status(400).json({ err: "texte non valide" });
  }
  models.Post.find()
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json({ error }));
};

exports.createPost = (req, res, next) => {
  let content = JSON.parse(req.body.post);

  const newPost = models.Post.create({
    ...content,
    imageURL: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`, // on resout chaque segment de l'url
    likes: 0,
    dislikes: 0,

    usersLiked: [],
    usersDisliked: [],
  })
    .then((newPost) =>
      res.status(201).json({
        message: "Post crée avec succes!",
        postId: newPost.id,
      })
    )
    .catch((error) => res.status(400).json({ error: 'fail' }));
};
