/*
 *  Copyright (c) 2014 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
// variables in global scope so available to console
snapshotButton = document.querySelector("button#snapshot");
filterButton = document.querySelector("button#filter");
video = document.querySelector("video");
canvas = document.querySelector("canvas");

canvas.width = 480;
canvas.height = 360;

var filters = ['blur', 'grayscale', 'invert', 'sepia'];

snapshotButton.onclick = function snap(){
    drawImage(canvas.getContext("2d"), video, 0, 0, canvas.width, canvas.height);
}

filterButton.onclick = function(){
  var newIndex = (filters.indexOf(canvas.className) + 1) % filters.length;
  canvas.className = filters[newIndex];
}


navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var constraints = {audio: false, video: true};
var video = document.querySelector("video");

function successCallback(stream) {
    window.stream = stream; // stream available to console
    attachMediaStream(video, stream);
}

function errorCallback(error){
  console.log("navigator.getUserMedia error: ", error);
}

navigator.getUserMedia(constraints, successCallback, errorCallback);

