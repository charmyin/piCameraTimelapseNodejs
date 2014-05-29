piCameraTimelapseNodejs
=======================

A  pi camera manager written in nodejs, for timelapse


fswebcam app is from another project "cmfswebcamPi"

Run this by: node app.js
You can change the pixel rate in : start.sh
Run steps:
1. add follwing lines to "crontab -e"
   @reboot sudo mount /dev/sda1 /mnt/usb
   @reboot cd /home/pi/apps/nodejs/piTimeLapse && sudo nohup node app.js >> /home/pi/logs/nodejs.log
2. The program will auto run on reboot;
3. Put the url to explorer:
   http://192.168.109.119:3000

