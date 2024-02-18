import path from 'path';
import express from 'express';
import multer from 'multer';
import exp from 'constants';
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
        },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if(extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
    
});

router.post('/', upload.single('image'), (req, res) => {   
    const imagePath = `/${req.file.path}`.replace(/\\/g, '/');
    res.send({
        image: imagePath,
        message:"Image Uploaded Successfully!"
    });
});




export default router;