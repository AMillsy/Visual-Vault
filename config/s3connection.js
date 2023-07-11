const aws = require(`aws-sdk`);
const multer = require('multer');
const multerS3 = require(`multer-s3`);

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: `visualvault`,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

module.exports = upload;
