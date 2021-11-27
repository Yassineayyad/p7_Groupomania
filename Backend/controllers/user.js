// import
// importation du model de la bdd user.js
const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
require("dotenv").config({ path: "./config/.env" });

// Regex 
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*\d).{4,8}$/;

// Creation de compte
exports.signup = (req, res, next) => {
  // params
  //chiffrer l'email avant de l'envoyer a la base de données
  let email = req.body.email;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let password = req.body.password;
  if (
    email == null ||
    password == null ||
    lastname == null ||
    lastname == null
  ) {
    return res.status(400).json({ message: "merci de reseigner tous les champs " });
  }
  // verification

  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({ err: " email n'est pas valide" });
  }
  if (!passwordRegex.test(req.body.password)) {
    return res.status(400).json({
      err: " le mot de passe doit contenir au min 4 et max 8 caractere et doit contenir au minimaum un chiffre",
    });
  }

  bcrypt
    .hash(password, 10) // le 10 signifie le nombre de fois que l'algorithme sera executé
    .then((hash) => {
      const newUser = models.User.create({
        email: email,
        password: hash,
        firstname: firstname,
        lastname: lastname,
        isAdmin: 0,
        imageurl: "http://image.noelshack.com/fichiers/2021/44/3/1635930291-765-default-avatar.png",
      })
        .then((newUser) => {
          const newToken = jwt.sign(
            { userId: newUser.id, isAdmin: newUser.isAdmin },
            `${process.env.TOKEN_SECRET}`,
            { expiresIn: "24h" }
          );

          res.status(201).json({
            userId: newUser.id,
            token: newToken,
          });
        })
        .catch((err) => res.status(500).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
};

// System de connexion 

exports.login = (req, res, next) => {
  // params
  let email = req.body.email;
  let password = req.body.password;
  if (email == null || password == null) {
    return res.status(400).json({ err: "merci de reseigner tous les champs " });
  }
  models.User.findOne({ where: { email: email } })
    .then( (user) => {
      if (!user) {
        return res
          .status(401)
          .json({ err: "l'Utilisateur n'est pas enregistrer !" });
      }
      bcrypt
        .compare(password, user.password)
        .then((val) => {
          if (!val) {
            return res.status(401).json({ err: "mot de passe incorrect !" });
          }
          const newToken = jwt.sign(
            { userId: user.id, isAdmin: user.isAdmin },
            `${process.env.TOKEN_SECRET}`,
            { expiresIn: "24h" }
          );
          res.setHeader("Authorization", "Bearer " + newToken);
          res.status(200).json({
            userId: user.id,
            isAdmin: user.isAdmin,
            token: newToken,
          });
        })
        .catch((err) => res.status(500).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
};

// recuperation du profile de l'utilistateur

exports.getUserProfil = (req, res, next) => {
  models.User.findOne({ 
    attributes: ['id', 'firstname','lastname', 'email', 'imageurl', 'isAdmin'],
    where: {id: req.params.id} })
    .then((user) =>
    { if (user == null){
      res.status(404).json({ err: "l'utilisateur n'existe pas"})
    }   
       res.status(200).json(user)})
      .catch((error) => res.status(400).json({ error }));
};
// Modification du profil
exports.updateProfil = async (req, res, next) => {
  const user = models.User.findOne({
    attributes: ["id", "firstname", "lastname", "imageurl"],
    where: { id: req.params.id },
  });
  if (user) {
    user.firstname= req.body.firstname;
    user.lastname = req.body.lastname;
    if (req.file) {
      user.imageurl = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    }
    const updated = await models.User.update(
      {
        firstname: user.firstname,
        lastname: user.lastname,
        imageurl: user.imageurl,
      },
      { where: { id: req.params.id } }
    );
    res.status(200).json({
      user
    });
  }
}
// Suppression du profil
exports.deleteProfil = (req, res, next) => {

// recuperation de l'user id depuis le token
   const headerAuth = req.headers["authorization"];
   const token = headerAuth.split(" ")[1];

   const decoded = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
   userId = decoded.userId;
   isAdmin =decoded.isAdmin;


    models.User.findOne({
      attributes: ["id", "firstname", "lastname"],
      where: { id: req.params.id },
    })
    .then((user)=>{
      if (user.id == userId || isAdmin === true) {
        user
          .destroy()
          .then(() =>
            res.status(200).json({ message: "Utilisateur supprimé !" })
          )
          .catch((error) => res.status(400).json({ error }));
      }else{
        res.status(404).json({ error: "L'utilisateur ne peut pas être supprimé" });
      }
    })
  
}