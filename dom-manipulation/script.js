//  1. Update the `addTask` function to:

function addTask() {
  var input = document.getElementById("taskInput");
  var list = document.getElementById("taskList");
  var newItem = document.createElement("li");
  // const button = document.createElement("button");
  // completeBtn = document.getElementsByClassName("complete-btn");

  //  a. Check if the input is empty before adding a task
  if (input.value !== "") {
    newItem.appendChild(document.createTextNode(input.value)); // b. Create a text node instead of using innerHTML
    list.appendChild(newItem);
    // newItem.innerHTML = `${input.value} <button>Completed</button> <button>Delete</button>`; // c. Add a delete button next to each new tas
    // newItem.appendChild(button).classList.add("complete-btn");
    // completeBtn.innerHTML = `<button>Complete</button>`;
    input.value = "";
  }
}

var deleteBtn = document.createElement(`button`);
deleteBtn.classList.add("delete-btn");

// 2. Implement the `completeTask` function:

function completeTask(task) {
  task.classList.add("completed");
}

completeTask();
