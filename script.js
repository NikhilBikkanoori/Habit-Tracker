// add tasks to task list
const inputForm = document.querySelector(".inputForm")
const tasks = document.querySelector(".tasks")

let showTasks = () => {
  const taskArray = []
  Object.entries(taskObj).forEach(([key, value]) => {
    taskArray.push(key)
  });

  let container = ""
  taskArray.forEach((value) => {
    container += `<div class="listItems">${value}</div>\n`
  })
  tasks.innerHTML = container
}

const taskObj = JSON.parse(localStorage.getItem("taskObj")) || {}
showTasks()


let newTask = ""
inputForm.addEventListener("submit", (e) => {
  e.preventDefault()

  newTask += e.target[0].value
  taskObj[`${newTask}`] = [];

  newTask = ""
  e.target[0].value = ""

  //obj
  localStorage.setItem("taskObj", JSON.stringify(taskObj))
  showTasks();
})
