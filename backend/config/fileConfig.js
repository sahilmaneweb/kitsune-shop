const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,path.join(__dirname,'../public/productImage'),function(error,success){
            if(error){
                console.log(error);
            }
        });
    },
    filename : (req,file,cb)=>{
        const name = Date.now()+'-'+file.originalname;
        cb(null,name,function(error,success){
            if(error){
                console.log(error);
            }
        });
    }
});

const upload = multer({storage:storage});

module.exports = upload;