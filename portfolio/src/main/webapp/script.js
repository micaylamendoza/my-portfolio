// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Controls navigation open and close.
 */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}


function getMessage() {
  fetch('/data').then(response => response.text()).then((message) => {
    document.getElementById('message-container').innerText = message;
  });
}


function getMessageJSON() {
  fetch('/data').then(response => response.json()).then((message) => {
    const messageListElement.innerHTML = '';
    messageListElement.appendChild(
    createListElement('Message 1: ' + message[0]));
    messageListElement.appendChild(
    createListElement('Message 2: ' + message[1]));
    messageListElement.appendChild(
    createListElement('Message 3: ' + message[2]));
  });
}

function createListElement(text) {
    const liElement = document.createElement('li');
    liElement.innerText = text;
    return liElement;
}