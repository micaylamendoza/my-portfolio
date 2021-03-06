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

/*
function getCommentJSON() {
  fetch('/data')  // sends a request to /data
  .then(response => response.json()) // parses the response as JSON
  .then((tasks) => { // now we can reference the fields in myObject!

    // Build list of comments
    const commentsEl = document.getElementById('comment-container');
    comments.Comments.forEach((line) => {
      commentsEl.appendChild(createListElement(line));
    });
  });
}

function createListElements(text) {
    const liElement = document.createElement('li');
    liElement.innerText = text;
    return liElement;
}
*/



function loadComments() {
  fetch('/data').then(response => response.json()).then((tasks) => {
    const taskListElement = document.getElementById('comment-results');
    tasks.forEach((task) => {
      taskListElement.appendChild(createTaskElement(task));
    })
  });
}


function createTaskElement(task) {
  const taskElement = document.createElement('li');
  taskElement.Comment = 'comment-container';

  const commentElement = document.createElement('span');
  commentElement.innerText = task.comment;

  taskElement.appendChild(commentElement);
  return taskElement;
}