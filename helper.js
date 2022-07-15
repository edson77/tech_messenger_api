const Notification = require('./models/notification')
// exports.multer = require('multer');
// const uploadImage = (item) =>{
//     const MIME_TYPES = {
//         'image/jpg': 'jpg',
//         'image/jpeg': 'jpg',
//         'image/png': 'png'
//       };
      
//       //multer.diskStorage permet d'enregistrer les informations dans le disque local
//       const storage = multer.diskStorage({
//         destination: (req, file, callback) => {
//           callback(null,`${item}`);
//         },
//         filename: (req, file, callback) => {
//           const name = `${Date.now()}-any-name-${file.originalname}`;
//           const extension = MIME_TYPES[file.mimetype];
//           callback(null, name + Date.now() + '.' + extension);
//         }
//       });

// }

exports.notification = (reference_type, reference_id, data, is_read, user_id) => {
  const notification = new Notification({
    reference_type: reference_type,
    reference_id: reference_id,
    notification_data: data,
    is_read: is_read,
    user_id: user_id
  });
  notification.save();
}