const fs = require('fs');

const imageUploads = (req,res,next)=>{
    const file = req.file;
    if(!file){
        res.render('error',{
            classes : 'hide',
            warning : 'Please make sure you choose a file to upload',
            code : '400'
        });
    }
    else{
        res.redirect('/gallery');
    };
};

const uploadMultiples = (req,res,next) =>{
    const files = req.myFiles;
    res.redirect('/gallery');
}

const gallery = (req,res) =>{
    let dirName = './public/uploads'
    try{
        fs.readdir(dirName,(err,data)=>{
            if(!err){
                res.render('gallery',{
                    title : 'Photo Gallery',
                    images : data,
                    heading : 'GALLERY'
                });
            }
            else{
                res.render('error',{
                    classes : 'hide',
                    warning : 'Internal server error',
                    code : '500'
                });
            };
        });
    }
    catch(e){
        res.render('error',{
            classes : 'hide',
            warning : 'Internal server error',
            code : '500'
        });
    };
};

const noPage = (req,res) =>{
    res.render('error',{
        classes : 'show',
        warning : "We can't find that page",
        code : '404'
    });
};

module.exports={
    gallery,
    imageUploads,
    noPage,
    uploadMultiples
}