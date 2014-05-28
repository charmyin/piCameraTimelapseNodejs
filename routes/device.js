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
                clearTimeout(commandTimeout);
                res.json({success:false, error:stderr});
            }else{
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
    // var execCommand = './bash/fswebcam -r 1920x1080 -S 15 --jpeg 99 -p MJPEG --shadow --title "Images" --subtitle "By Charmyin" --info "Author: Charmyin" -q --save /mnt/usb/test';
    var execCommand="killall -9 fswebcam ";
    child = exec(execCommand,
        function (error, stdout, stderr) {
            if (error !== null) {
                res.json({success:false, error:stderr});
            }else{
                res.json({success:true, info:stdout});
            }
        });
});

module.exports = router;
