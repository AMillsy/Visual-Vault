const aws = require(`aws-sdk`);
const multer = require('multer');
const multerS3 = require(`multer-s3`);
require('dotenv').config();
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});

const uploadUsers = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `users/${Date.now().toString()}`);
    },
  }),
  limits: { fileSize: 10000000 }, //In bytes: Limited to 1mb
});

const uploadProjects = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `projects/${Date.now().toString()}`);
    },
  }),
  limits: { fileSize: 50000000 }, //In bytes: Limited to 5mb
});

module.exports = { uploadProjects, uploadUsers, s3 };
