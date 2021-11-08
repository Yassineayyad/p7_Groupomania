/* const models = require("../models");
const fs = require('fs');
const {promisify} = require('util');
const pipeline = promisify(require('stream').pipeline);

exports.uploadProfil = async (req, res, next)=>{
    try{
        if (req.file.detectedMimeType !== "image/jpg" && req.file.detectedMimeType !== "image/png" && req.file.detectedMimeType !== "image/jpeg") 
            throw Error('invalid file');

        if(req.file.size > 500000) throw Error('max size');

    }catch(err){
        return res.status(201).json(err);
    }
// les photos seront unique et en jpg
    const fileName = req.body.firstname + ".jpg";
    // pipeline permet via le Fs de crée le fichier 
    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/profil/${fileName}`
        )
    );
    try{
        await models.User.findOne({
          attributes: ["id", "firstname", "lastname", "imageurl"],
          where: { id: req.params.id },
        })
        models.User.update({
          imageurl: (imageurl ? imageurl:"./uploads/profil/" + fileName),
        });
        (err, user)=>{
            if (!err) return res.send(user);
            else return res.status(500).send({message : err})
        }
            
        
         /*  .then((user) => {
            if (user == null) {
              res.status(404).json({ err: "l'utilisateur n'existe pas" });
            } else {
            }
            res.status(200).json(user);
          })
          .catch((error) => res.status(400).json({ error })); */
/*     }catch(err){
        res.status(500).json({err})
    }
}; */

function upload (req, res , next) {
    if (req.file.filename) {
        res.status(201).json({
            message: "image upload succesfuly",
            url: req.file.fileName
        })
    }else{
        res.status(500).json({
            message: "il y'a un probleme avec l'upload de l'image"
        });
    }
}

module.exports= {
    upload: upload
}