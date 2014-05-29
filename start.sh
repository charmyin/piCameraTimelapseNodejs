#!/bin/bash

sudo mount /dev/sda1 /mnt/usb
sudo mount /dev/sdb1 /mnt/usb
contentFswebcam=`pstree | grep fswebcam`

if [ -n "${contentFswebcam}" ]; then
  echo 'false'
else
  lastFileName=`ls /mnt/usb/ | sort -nr | head -n 1`
  let currentFileName=lastFileName+1
  sudo mkdir /mnt/usb/${currentFileName}
  sudo nohup ./fswebcam -r 1920x1080 -S 15 --jpeg 99 -p MJPEG --shadow --title "Images" --subtitle "By Charmyin" --info "Author: Charmyin" -q --save /mnt/usb/${currentFileName}/
 # echo "/etc/fswebcam -r 1920x1080 -S 15 --jpeg 99 -p MJPEG --shadow --title "Images" --subtitle "By Charmyin" --info "Author: Charmyin" -q --save /mnt/usb/${currentFileName}/"
fi

