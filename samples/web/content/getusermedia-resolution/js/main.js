/*
 *  Copyright (c) 2014 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
var vgaButton = document.querySelector("button#vga");
var qvgaButton = document.querySelector("button#qvga");
var hdButton = document.querySelector("button#hd");
var dimensions = document.querySelector("p#dimensions");
var video = document.querySelector("video");
var stream;

navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

function successCallback(stream) {
    window.stream = stream; // stream available to console
    video = attachMediaStream(video, stream); // issue in IE (not in our code): refCount increment twice. Do not override "video" to fix the issue.
    attachEventListener(video, 'play', function () {
        setTimeout(function () {
            displayVideoDimensions();
        }, 500);
    });
}

function errorCallback(error){
  console.log("navigator.getUserMedia error: ", error);
}

function displayVideoDimensions() {
  dimensions.innerHTML = "Actual video dimensions: " + video.videoWidth +
    "x" + video.videoHeight + 'px.';
}

var qvgaConstraints  = {
  video: {
    mandatory: {
      maxWidth: 320,
      maxHeight: 180
    }
  }
};

var vgaConstraints  = {
  video: {
    mandatory: {
      maxWidth: 640,
      maxHeight: 360
    }
  }
};

var hdConstraints  = {
  video: {
    mandatory: {
      minWidth: 1280,
      minHeight: 720
    }
  }
};

qvgaButton.onclick = function(){getMedia(qvgaConstraints)};
vgaButton.onclick = function(){getMedia(vgaConstraints)};
hdButton.onclick = function(){getMedia(hdConstraints)};

function getMedia(constraints){
  if (!!stream) {
    attachMediaStream(video, null);
    stream.stop();
  }
  navigator.getUserMedia(constraints, successCallback, errorCallback);
}

