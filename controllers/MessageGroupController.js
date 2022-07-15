const MessageGroup = require("../models/messageGroup");
const Conversation = require("../models/conversation");
const Media = require("../models/media");
var _ = require("lodash");

/**
 *
 * creer un message de groupe
 * complete
 *
 */
exports.createGroupMessage = async (req, res) => {
  try {
    const files = req.files;

   let conversation = Conversation.find({
      $or: [
        {
          userId1: req.params.groupId,
          userId2: req.body.authId,
          isUser: false,
        },
        {
          userId1: req.body.authId,
          userId2: req.params.groupId,
          isUser: false,
        },
      ],
    })
    if (conversation.length == 0) {
      const newConversation = new Conversation({
        userId1: req.params.groupId,
        userId2: req.body.authId,
        isUser: false,
      });
      newConversation.save();
      
    } else {
      conversation.updateOne({
        updatedAt: Date.now,
      })
    }
      //.catch((error) => res.status(500).json({ error }));

    const message = new MessageGroup({
      senderId: req.body.authId,
      groupId: req.params.groupId,
      msg_txt: req.body.msg,
    });

    if (_.isEmpty(files)) {
      //console.log("je suis la");
    } else {
      files.forEach((file) => {
        const media = new Media({
          reference_id: message._id,
          isUser: false,
          media_type: file.mimetype,
          media_url: `${req.protocol}://${req.get("host")}/images/${
            file.filename
          }`,
          media_size: file.size,
        });
        media.save();
      });
    }

    await message
      .save()
      .then(() =>
          res.status(201).json({
            message: "Message envoyé avec success"
          })
        )
        .catch((error) => res.status(500).json({ error }));
  } catch (err) {
    res.status(500).json(err);
  }
};

/**
 *
 * afficher la liste des messages d'une conversation
 * fonction complete
 *
 */

exports.findPrivateGroupMessages = async (req, res) => {
  const messages = await MessageGroup.find({
    groupId: req.params.groupId,
  }).populate("senderId", "username phone image");

  const v = Promise.all(
    _.map(messages, async function (item, key) {
      const medias = await Media.find({
        reference_id: item._id,
        isUser: false,
      });
      //const avatar = await User.find({'id':item.senderId})
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
