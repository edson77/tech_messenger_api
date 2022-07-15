const Group = require("../models/group");
const UserGroup = require("../models/userGroup");
const Conversation = require("../models/conversation");
const Role = require("../models/role");
const UserRoleGroup = require("../models/userRoleGroup");
var _ = require("lodash");

/**
 *
 * creatio d'un groupe
 * fonction complete
 *
 */
exports.createGroup = async (req, res) => {
  const groupObject = req.file
    ? {
        nameGroup: req.body.name_group,
        descriptionGroup: req.body.description_group,
        imageGroupPath: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
        nameGroup: req.body.name_group,
        descriptionGroup: req.body.description_group,
      };

  const group = new Group(groupObject);

  const userRole = new UserGroup({
    userId: req.body.authId,
    groupId: group,
    role: "super_admin",
  });

  const newConversation = new Conversation({
    userId1: req.body.authId,
    userId2: group._id,
    isUser: false,
  });
  try {
    userRole.save();
    newConversation.save()
    const saveGroup = await group.save();
    res.status(200).json({ message: "le groupe a été creer avec success" });
  } catch (e) {
    res.status(500).json(e);
  }
};

/**
 *
 * afficher tous les groupes de l'application
 * fonction complete
 */

exports.findAllGroup = async (req, res) => {
  const allGroup = await Group.find({});
  try {
    res.status(200).json(allGroup);
  } catch (e) {
    res.status(500).json(e);
  }
};

/**
 *
 * Ajouter un utilisateur dans un groupe
 * fonction complete
 */

exports.addUserInGroup = async (req, res) => {
  try {
    //on doit verifier si l'utilisateur n'est pas encore dans ce groupe
    const user_exist = await UserGroup.findOne({
      groupId: req.params.groupId,
      userId: req.params.userId,
    });
    if (!user_exist) {
      const user = new UserGroup({
        userId: req.params.userId,
        groupId: req.params.groupId,
        role: "user",
      });

      const newConversation = new Conversation({
        userId1: req.params.userId,
        userId2: req.params.groupId,
        isUser: false,
      });

      try {
        newConversation.save();
        const add = await user.save();
        res.status(200).json({
          message: "l'utilisateur a été ajouter avec success dans le groupe",
        });
      } catch (e) {
        res.status(500).json(e);
      }
    } else {
      res
        .status(500)
        .json({ message: "l'utilisateur existe deja dans le groupe" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

/**
 *
 * Aficher tous les utilisateurs d'un groupe
 * fonction complete
 *
 */

exports.findUsersGroup = async (req, res) => {
  const users = await UserGroup.find({ groupId: req.params.groupId }).populate(
    "userId",
    "username phone about image"
  );
  try {
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json(e);
  }
};

exports.makeAsAdmin = async (req, res) => {
  const user = await UserGroup.findOne({ groupId: req.params.groupId, userId: req.params.userId })
  try{
    user.updateOne({role: "admin"})
    .then(users => {
      res.status(200).json({message: "opération reussit avec success", user: users})
    })
    .catch(err => res.status(500).json(err));
    
  }catch(err){
    res.status(500).json(err)
  }
  
}

exports.removeAsAdmin = async (req, res) => {
  const user = await UserGroup.findOne({ groupId: req.params.groupId, userId: req.params.userId })
  try{
    user.updateOne({role: "user"})
    .then(users => {
      res.status(200).json({message: "opération reussit avec success", user: users})
    })
    .catch(err => res.status(500).json(err));
    
  }catch(err){
    res.status(500).json(err)
  }
  
}

exports.removeAsGroup = async (req, res) => {
  const user = await UserGroup.findOne({ groupId: req.params.groupId, userId: req.params.userId })
  try{
    user.deleteOne()
    res.status(200).json({message: "utilisateur supprimé du groupe"})
  }catch(err){
    res.status(500).json(err)
  }
  
}
