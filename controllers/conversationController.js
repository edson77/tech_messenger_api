const Conversation = require('../models/conversation')
/**
 * 
 * creation de conversation entre deux utilisateurs ou plus
 * 
 */
//exports.createUserConversation = async (req, res) =>{

//     const conversation = await Conversation.find({
//         members: {$all: [req.body.senderId, req.body.receiverId]}
//     })
//     if(conversation.length > 0){
//         res.status(200).json({message:"la conversation existe deja ",taille:conversation.length, conversation})
//     }else{

//         const newConversation = new Conversation({
//             members:[req.body.senderId, req.body.receiverId],
//             is_user: true,
//         })
    
//         try {
//             const saveConversation =await newConversation.save()
//             try{
//                 res.status(200).json({message:"conversation crée avec success", conversation: saveConversation})

//             }catch(e){
//                 res.status(500).json(e)
//             }
            
            
//         } catch (e) {
//             res.status(500).json(e)
//         }

//     }
// }

// //creation de conversations de groupe
// exports.createGroupConversation = async (req, res) =>{
//     const newConversation = new Conversation({
//         members:[req.body.senderId, req.body.receiverId],
//         is_user: false,
//     })

//     try {
//         const saveConversation = await newConversation.save()
//         .then(
//             res.status(200).json(newConversation)
//         )
        
//     } catch (error) {
//         res.status(500).json(error)
//     }
// }

/**
 * 
 * afficher la liste des conversations d'un utilisateur
 * 
 */

exports.findUserConversation= async (req, res) =>{
    const {authId} = req.body
    let conversation = await Conversation.find({
        $or: [
            { userId1: authId},
            { userId2: authId},
          ],
    })
    .then(conversation =>{
        res.status(200).json(conversation)
    })
    .catch(err => {
        res.status(500).json(err)
    })
    
}


