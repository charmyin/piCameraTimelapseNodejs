var express = require('express');
var router = express.Router();

/* GET image from file system */
var fs = require('fs');

router.get('/showImage', function(req, res) {
    var dirName=req.param('dirName');
    var fileName=req.param('fileName');
    var imgPath = '/mnt/usb/'+ dirName+'/'+fileName;
    var img = fs.readFileSync(imgPath);
    res.writeHead(200, {'Content-Type': 'image/jpeg' });
    res.end(img, 'binary');
});

router.get('/showImageIndex', function(req, res) {
    var dirName=req.param('dirName');
    res.render("imgView", {title:'图片展示', 'dirName':dirName});
});


router.get('/imageListJson', function(req, res){
    var exec = require('child_process').exec,
        child;
    var dirName=req.param('dirName');
    var execCommand = 'ls --full-time /mnt/usb/'+dirName +' -t | sort -nr -k9 | awk \'{print $6 " " $7 " " $9}\' | head -n 4';
    child = exec(execCommand,
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            var stdoutArray = stdout.split("\n");
            var responseImageArray=[];
            for(var i=0; i<stdoutArray.length-2; i++){
                var tempStdoutArray = stdoutArray[i].split(" ");
                var imageTemp = {};
                imageTemp.createTime=tempStdoutArray[0]+" "+tempStdoutArray[1].split(".")[0];
                imageTemp.name=tempStdoutArray[2];
                responseImageArray.push(imageTemp);
                console.log(stdoutArray[i]);
            }
            res.json(responseImageArray);
        });
});

module.exports = router;
