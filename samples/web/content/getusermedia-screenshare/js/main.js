/*
 *  Copyright (c) 2014 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
var videoElement = document.querySelector("video");
var windowSelect = document.querySelector("select#windowSource");
var previewImg = document.querySelector("img#previewImg");
var startButton = document.querySelector("button#start");
var windowsLoaded = false;

navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

window.onload = function() {
    loadWindows();
}

function loadWindows() {
    if (!windowsLoaded) {
        if (getPlugin()) {
            if (typeof getPlugin().getWindowList !== 'undefined') {
                var windowsStr = getPlugin().getWindowList();
                var windowList = windowsStr.split(/xxz;;;xxz/);
                for (var i = 0; i < windowList.length; ++i) {
                    var windowValues = windowList[i].split(/xxy;;;xxy/);
                    var option = document.createElement("option");
                    option.value = windowValues[0];
                    option.text = windowValues[1];
                    option.previewImg64 = windowValues[2]; // Preview encoded as bas64
                    windowSelect.appendChild(option);
                }
            }
            else {
                alert('Plugin with support for getWindowList not installed');
            }
            windowsLoaded = true;
        }
    }
}


function successCallback(stream) {
  window.stream = stream; // make stream available to console
  attachMediaStream(videoElement, stream);
}

function errorCallback(error){
  console.log("navigator.getUserMedia error: ", error);
}

function start() {
    loadWindows();
  if (!!window.stream) {
    attachMediaStream(videoElement, null);
    window.stream.stop();
  }
  var windowId = windowSelect.value;
  //var imgBase64 = windowSelect.options[windowSelect.selectedIndex].previewImg64;
  var constraints = {
    video: {
    optional: [{sourceId: "X978DoubangoTelecomScreenCapturer785", windowId: windowId}]
    }
  };
  navigator.getUserMedia(constraints, successCallback, errorCallback);
  //previewImg.src = "data:image/x-icon;base64," + imgBase64;
  //imgBase64 = null;
}

windowSelect.onchange = start;

loadWindows();
start();
