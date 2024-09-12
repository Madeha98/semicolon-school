function addTask() {
  var input = document.getElementById("taskInput");
  var list = document.getElementById("taskList");
  var newItem = document.createElement("li");
  newItem.innerHTML = input.value;
  list.appendChild(newItem);
  input.value = "";
}

// This function is not used yet
function completeTask(task) {
  task.classList.add("completed");
}
