// imports 

const express = require("express");

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const path = require("path");

// créé l'application express
const app = express();

// gerer les acces a notre api
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// transformer le body en json (objet javascript) utilisable grace a body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route d'autentification
app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes)
app.use("/images", express.static(path.join(__dirname, "images")));


// exportation de app.js pour l'utiliser sur tous nos fichier
module.exports = app;
