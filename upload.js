const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload');
    },
    filename: (req, file, cb) => {
        const date = req.body.date;
        cb(null, `${date}_${file.originalname}`);
    }
})

var upload = multer({ 
    storage: storage,
    fileFilter: function(req, file, callback) {
        if(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
            callback(null, true)
        }else {
            console.log('이미지만 올릴 수 있습니다.')
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5
    } 
})

module.exports = upload
