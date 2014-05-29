var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a device manager');
});
/* GET users listing. */
router.get('/isOnWorking', function(req, res) {
    var exec = require('child_process').exec,
        child;

    child = exec("pstree",
        function (error, stdout, stderr) {
            if (error !== null) {
                res.json({success:false, error:stderr, error2:error});
            }else{
                if(stdout.indexOf("fswebcam")>=0){
                    res.json({success:true, isworking:true});
                }else{
                    res.json({success:true, isworking:false});
                }
            }
        }
    );

});


/* Start timelapse capture image. */
router.get('/start', function(req, res) {
    var exec = require('child_process').exec,
        child;
   /// / var execCommand = './bash/fswebcam -r 1920x1080 -S 15 --jpeg 99 -p MJPEG --shadow --title "Images" --subtitle "By Charmyin" --info "Author: Charmyin" -q --save /mnt/usb/test';

    var execCommand="./start.sh";
    var commandTimeout;
    child = exec(execCommand,
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log("oh no ---------------------------------");
                //clearTimeout(commandTimeout);
                return;
                //res.json({success:false, error:stderr});
            }else{
                console.log("oh no ++++++++++++++++++++++++++++++++++++++");
                clearTimeout(commandTimeout);
                res.json({success:true, info:stdout});
            }
        }
    );
    commandTimeout=setTimeout(function() {
        res.json({success:true});
    }, 3000);

});

/* Stop capturing images. */
router.get('/stop', function(req, res) {
    var exec = require('child_process').exec,
        child;
    var commandTimeout;
    // var execCommand = './bash/fswebcam -r 1920x1080 -S 15 --jpeg 99 -p MJPEG --shadow --title "Images" --subtitle "By Charmyin" --info "Author: Charmyin" -q --save /mnt/usb/test';
    var execCommand="sudo killall -9 fswebcam";
    child = exec(execCommand,
        function (error, stdout, stderr) {
            if (error !== null) {
                //clearTimeout(commandTimeout);
                console.log("wrong------------------------------");
                res.json({success:false, error:stderr});
            }else{
                //clearTimeout(commandTimeout);
                console.log("OK------------------------------");
                res.json({success:true, info:stdout});
            }
        });
    console.log("End naturally------------------------------");
    /*commandTimeout=setTimeout(function() {
        res.json({success:true});
    }, 3000);*/
});

router.get("/dirIndex", function(req, res){
    res.render('dirList', { title: '文件列表' });
});

router.get("/dirList", function(req, res){

    var exec = require('child_process').exec,
        child;

    child = exec('ls --full-time /mnt/usb -t | sort -nr -k9 | awk \'{print $6 " " $7 " " $9}\'',
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            var stdoutArray = stdout.split("\n");
            var responseDirectoryArray=[];
            for(var i=0; i<stdoutArray.length-2; i++){
                var tempStdoutArray = stdoutArray[i].split(" ");
                var directoryTemp ={};
                directoryTemp.createTime=tempStdoutArray[0]+" "+tempStdoutArray[1].split(".")[0];
                directoryTemp.name=tempStdoutArray[2];
                responseDirectoryArray.push(directoryTemp);
                //console.log(stdoutArray[i]);
            }

            res.json(responseDirectoryArray);
        });
});

module.exports = router;
