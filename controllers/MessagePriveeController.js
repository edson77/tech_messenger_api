const Message = require("../models/message");
const Conversation = require("../models/conversation");
const Media = require("../models/media");
var _ = require("lodash");
const { notification } = require('../helper')
//const upload = require("../middlewares/multer");

//upload.array('image')

/**
 *
 * creer un message
 * complete
 *
 */

exports.create_private_message = async (req, res) => {
  try {
    //const { msg } = req.body;
    const files = req.files;
    //  console.log(files.length);

    const conversation = Conversation.find({
      $or: [
        { userId1: req.params.userId, userId2: req.body.authId, isUser: true },
        { userId1: req.body.authId, userId2: req.params.userId, isUser: true },
      ],
    });
    if (conversation.length == 0) {
      const newConversation = new Conversation({
        userId1: req.params.userId,
        userId2: req.body.authId,
      });
      newConversation.save();
    } else {
      conversation.updateOne({
        updatedAt: Date.now,
      });
    }
    const message = new Message({
      receiverId: req.params.userId,
      senderId: req.body.authId,
      msg_txt: req.body.msg,
    });
    if (_.isEmpty(files)) {
      //console.log("je suis la");
    } else {
      files.forEach((file) => {
        const media = new Media({
          reference_id: message._id,
          media_type: file.mimetype,
          isUser: true,
          media_url: `${req.protocol}://${req.get("host")}/images/${
            file.filename
          }`,
          media_size: file.size,
        });
        media.save();
      });
    }
    let data = "vous avez recu un nouveau message"
    notification("message", message._id, data, false, receiverId)
    await message
      .save()
      .then((message) =>{
        res.status(201).json({message})
      })
      .catch((error) => res.status(500).json({ error }));
  } catch (err) {
    res.status(500).json(err);
  }
};

/**
 *
 * afficher la liste des messages d'une conversation
 * fonction complete
 *a
 */

exports.findPrivateMessages = async (req, res) => {
  const messages = await Message.find({
    $or: [
      { receiverId: req.params.userId, senderId: req.body.authId },
      { receiverId: req.body.authId, senderId: req.params.userId },
    ],
  });
  
  const v = Promise.all(
    _.map(messages, async function (item, key) {
      const medias = await Media.find({
        reference_id: item._id,
        isUser: true,
      });
      //const avatar = await User.find({'id':item.senderId})
      console.log(medias);
      return {
        id: item._id,
        is_read: item.is_read,
        message: item.msg_txt,
        senderId: item.senderId,
        receiverId: item.receiverId,
        created_at: item.createdAt,
        media: _.map(medias, function (data) {
          return {
            media_id: data._id,
            media_type: data.media_type,
            media_url: data.media_url,
            media_size: data.media_size,
          };
        }),
      };
    })
  );
  
  const data = await v;
  // console.log(v)
  // .populate("senderId", "userName avatar")
  // .populate("receiverId", "userName avatar");
  try {
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
