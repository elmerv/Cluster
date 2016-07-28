/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('Received Device Ready Event');
        console.log('calling setup push');
        app.setupPush();
    },
    setupPush: function() {
        console.log('calling push init');
        var push = PushNotification.init({
            "android": {
                "senderID": "XXXXXXXX"
            },
            "ios": {
                "sound": true,
                "vibration": true,
                "badge": true
            },
            "windows": {}
        });
        console.log('after init');

        push.on('registration', function(data) {
            console.log('registration event: ' + data.registrationId);

            var oldRegId = localStorage.getItem('registrationId');
            if (oldRegId !== data.registrationId) {
                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
                // Post registrationId to your app server as the value has changed
            }

            var parentElement = document.getElementById('registration');
            var listeningElement = parentElement.querySelector('.waiting');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
        });

        push.on('error', function(e) {
            console.log("push error = " + e.message);
        });

        push.on('notification', function(data) {
            console.log('notification event');
            navigator.notification.alert(
                data.message,         // message
                null,                 // callback
                data.title,           // title
                'Ok'                  // buttonName
            );
       });
    }
};

// function openNav() {
//     document.getElementById("mySidenav").style.width = "250px";
// }

// function closeNav() {
//     document.getElementById("mySidenav").style.width = "0";
// }
// // Only needed if you want to fire a callback
// document
// .querySelector('#mySlider')
// .addEventListener('slide', myFunction)
  
// // Get the modal
// var modal = document.getElementById('myModal');

// // Get the button that opens the modal
// var ul= document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal
// ul.onclick = function() {
//     modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

// function initPushwoosh()
// {
//     var pushNotification = cordova.require("pushwoosh-cordova-plugin.PushNotification");
 
//     //set push notifications handler
//     document.addEventListener('push-notification', function(event) {
//         var title = event.notification.title;
//         var userData = event.notification.userdata;
                                 
//         if(typeof(userData) != "undefined") {
//             console.warn('user data: ' + JSON.stringify(userData));
//         }
                                     
//         alert(title);
//     });
 
//     //initialize Pushwoosh with projectid: "GOOGLE_PROJECT_ID", pw_appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
//     pushNotification.onDeviceReady({ projectid: "GOOGLE_PROJECT_ID", pw_appid : "PUSHWOOSH_APP_ID" });
 
//     //register for pushes
//     pushNotification.registerDevice(
//         function(status) {
//             var pushToken = status;
//             console.warn('push token: ' + pushToken);
//         },
//         function(status) {
//             console.warn(JSON.stringify(['failed to register ', status]));
//         }
//     );
// }