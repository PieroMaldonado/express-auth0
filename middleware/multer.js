const multer = require('multer');
const fecha = Date.now();

const rutaAlmacen = multer.diskStorage({
    destination:function (request, file, callback){
        callback(null,'./public/images/')
    },
    filename:function (request, file, callback){
        callback(null,fecha+"_"+file.originalname)
    }
})

const cargar = multer({ storage:rutaAlmacen,
    fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }} 
})

module.exports = cargar