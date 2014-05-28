#!/bin/bash
dirCounts=`ls /mnt/usb/ | wc -l`
let dirCounts1=dirCounts+1
mkdir /mnt/usb/${dirCounts1}
./fswebcam -r 1920x1080 -S 15 --jpeg 99 -p MJPEG --shadow --title "Images" --subtitle "By Charmyin" --info "Author: Charmyin" -q --save /mnt/usb/${dirCounts1}/
