function addTask() {
  var input = document.getElementById("taskInput");
  var list = document.getElementById("taskList");
  var newItem = document.createElement("li");

  // Check if the input is empty before adding a task:
  if (input.value !== "") {
    newItem.appendChild(document.createTextNode(input.value)); // Create a text node instead of using innerHTML
    list.appendChild(newItem);
    newItem.addEventListener("click", function () {
      completeTask(newItem);
    });
    var deleteBtn = document.createElement("button"); // Add a delete button next to each new task
    deleteBtn.textContent = `Delete`;
    deleteBtn.classList.add("delete-btn");
    newItem.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", deleteTask); // Make it listen to the delete button for each task
    input.value = "";
  }
}

// Implement the `completeTask` function:
var tasks = document.querySelectorAll("li");
var button = document.createElement("button");
function completeTask(task) {
  task.classList.toggle(`completed`); // It should toggle the ‘completed’ class on and off
}
tasks.forEach((task) => {
  // Make it listen to a click event on each task
  task.addEventListener("click", function () {
    completeTask(task);
  });
});

console.log(document.querySelectorAll("li"));

// Create a `deleteTask` function:
var deleteBtn = document.getElementsByClassName("delete-btn");
function deleteTask(task) {
  task.target.parentElement.remove(); // It should remove the task from the list
}
