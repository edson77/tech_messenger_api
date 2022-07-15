const multer = require('multer');

// Specify the storage engine
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './upload/');
  },
  filename: function (req, file, callback) {
    callback(null, `${(new Date()).toISOString()}-${file.originalname}`);
  }
});

// File validation
const fileFilter = (req, file, callback) => {
  if (['image/jpeg', 'image/png', 'image/jpg'].includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback({message: 'Unsupported file format'}, false);
  }
}

const upload = multer({
  storage,
  limit: { fileSize: 1024 * 1024 },
  fileFilter
});

module.exports = upload;