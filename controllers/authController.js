"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Otp = require("../models/otp");
const config = require("../config/config");
const multer = require("multer");
const fs = require("fs");

//utilisation de bcrypt pour crypter le mot de passe

function encryptPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

//temps d'expiration
function expiredTimeAfterTwoMinute() {
  var now = new Date();
  now.setMinutes(now.getMinutes() + 3); // timestamp
  const expired = new Date(now); // Date object
  return expired;
}

//utilisation de JSONWEBTOKEM pour la gestion des sessions
function generateToken(params) {
  return jwt.sign(params, tokenSecret, {
    expiresIn: 86400,
  });
}

// Twilio Credentials
// To set up environmental variables, see http://twil.io/secure
const accountSid = "AC9b3f6c1baffb3ed4cdfbd62ed1b25622";
const authToken = "11e034046e8553c5786c255769086782";

// require the Twilio module and create a REST client
const client = require("twilio")(accountSid, authToken);

//creer un mot de passe aléatoire
function getRandomIntPassword(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.signUp_by_phone_number = async (req, res) => {
  try {
    const { phone } = req.body;

    let user_exist = await User.findOne({ phone: phone });
    if (user_exist) {
      //si l'utilisateur existe deja on doit se d'abord desactiver so
      user_exist.updateOne({ isRegister: false });
      //generate random password
      let code = getRandomIntPassword(1000, 9999);

      Otp.findOne({ user: user_exist })
        .populate({ path: "user" })
        .then((otp) => otp.deleteOne({ _id: otp._id }));
      //encrypt password
      //user.password = encryptPassword(code.toString())
      const otp = new Otp({
        password: encryptPassword(code.toString()),
        expired_at: expiredTimeAfterTwoMinute(),
        user: user_exist,
      });
      await otp.save();

      //send password to sms with firebase and with valid period
      client.messages
        .create({
          to: phone,
          from: "+18508208496",
          body: `le code de confirmation est ${code}`,
        })
        .then((message) => console.log(message.sid));

      return res.status(201).json({
        message:
          "ce numéro de téléphone existe deja dans la base de données. mais un nouveau mot de passe a été creer",
        data: user_exist,
      });
    } else {
      const user = new User({
        phone: phone,
        isRegister: false,
      });

      //generate random password
      let code = getRandomIntPassword(1000, 9999);

      //encrypt password
      //user.password = encryptPassword(code.toString())
      const otp = new Otp({
        password: encryptPassword(code.toString()),
        expired_at: expiredTimeAfterTwoMinute(),
        user: user,
      });

      await otp.save();

      //send password to sms with firebase and with valid period
      client.messages
        .create({
          to: phone,
          from: "+18508208496",
          body: `le code de confirmation est ${code}`,
        })
        .then((message) => console.log(message.sid));

      //save usernumber
      await user
        .save()
        .then(() =>
          res.status(201).json({
            message: "Utilisateur créé!",
            data: user,
            otp: otp,
            phone: otp.user.phone,
          })
        )
        .catch((error) => res.status(500).json({ error }));
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//cette fonction est complete
exports.signUp_verify_phone_number = async (req, res, next) => {
  const { code } = req.body;
  let user = await User.findOne({ phone: req.params.phone });

  if (!user) {
    return res.status(400).send("ce numero de téléphone n'existe pas.");
  }

  Otp.findOne({ user: user })
    .populate({ path: "user" })

    .then((otp) =>
      bcrypt
        .compare(code, otp.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({
                message:
                  "Le code qui a été entrer est different de celui disponible dans le système",
              });
          }
          //verification date d'expiration
          var date_expiry = new Date(otp.expired_at);
          var expiry = date_expiry.getTime();
          var date_now = Date.now();
          if (expiry < date_now) {
            res.status(201).json({
              message: "le delai d'activation a été dépassé",
            });
          }
          user
            .updateOne({ isRegister: true })
            .then(
              Otp.deleteOne({ _id: otp._id })
                .then(() =>
                  res.status(200).json({
                    message: "Objet supprimé !",
                    token: jwt.sign({ userId: user._id }, config.jwtSecret, {
                      expiresIn: "9185h",
                    }),
                  })
                )
                .catch((error) => res.status(400).json({ error }))
            )
            .catch((error) =>
              res
                .status(401)
                .json({ message: "l'utilisateur n'a pas été modifié" })
            );
        })
        .catch((error) => res.status(500).json({ error }))
    )
    .catch((error) => res.status(500).json({ error }));
};

exports.signUp_edit_username_and_avatar = async (req, res) => {
  let user = await User.findOne({ phone: req.params.phone });

  const userObject = req.file
    ? {
        username: req.body.username,
        image: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
        userName: username,
      };

  if (!user) {
    return res.status(400).send("ce numero de téléphone n'existe pas.");
  }
  user
    .updateOne(userObject)
    .then(() => res.status(200).json({ message: "modification reussie !" }))
    .catch((error) => res.status(400).json({ error }));
};
