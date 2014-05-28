#!/bin/bash
contentFswebcam=`pstree | grep fswebcam`

if [ -n "${contentFswebcam}" ]; then
  echo 'false'
else
  lastFileName=`ls /mnt/usb/ | sort -nr | head -n 1`
  let currentFileName=lastFileName+1
  mkdir /mnt/usb/${currentFileName}
  ./fswebcam -r 1920x1080 -S 15 --jpeg 99 -p MJPEG --shadow --title "Images" --subtitle "By Charmyin" --info "Author: Charmyin" -q --save /mnt/usb/${currentFileName}/
  #echo "./fswebcam -r 1920x1080 -S 15 --jpeg 99 -p MJPEG --shadow --title "Images" --subtitle "By Charmyin" --info "Author: Charmyin" -q --save /mnt/usb/${currentFileName}/"
fi

