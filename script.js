
const inputForm = document.querySelector(".inputForm")
const tasks = document.querySelector(".tasks")
const checkBox = document.querySelector(".checkBox")

const getKeyArray = () => {
  let taskArray = []
  Object.entries(taskObj).forEach(([key, value]) => {
    taskArray.push(key)
  });

  return taskArray
}

const showTasks = () => {
  let taskArray = getKeyArray()

  let container = ""
  taskArray.forEach((value) => {
    container += `<div class="listItems">${value}</div>\n`
  })
  tasks.innerHTML = container
}

const showCheckBox = () => {
  let containerBox = ""
  let taskArray = getKeyArray()

  for (let i = 0; i < 31; i++){
    containerBox += `<div class="${i} days">\n`
    taskArray.forEach((value, idx) => {
      containerBox += `<div class="${idx} box">
                        <input type="checkbox" class="idx-${i}${idx}" name="">
                      </div>\n`
    })
    containerBox += `</div>`
    checkBox.innerHTML = containerBox
  }

  for (let x = 0; x < 31; x++){
    taskArray.forEach((value, y) => {
      if (taskObj[taskArray[y]][x] == 1) {
        let box = document.querySelector(`.idx-${x}${y}`)
        box.checked = true
      }
    })
  }
}

const taskObj = JSON.parse(localStorage.getItem("taskObj")) || {}
showTasks()
showCheckBox()

//for adding new tasks
let newTask = ""
inputForm.addEventListener("submit", (e) => {
  e.preventDefault()

  newTask += e.target[0].value
  taskObj[`${newTask}`] = [];

  //initialization of object array values
  for (let i = 0; i < 31; i++){
    taskObj[`${newTask}`].push(0);
  }

  newTask = ""
  e.target[0].value = ""

  //obj
  localStorage.setItem("taskObj", JSON.stringify(taskObj))
  showTasks();
  showCheckBox()
})

//eventListeners for checkboxs
checkBox.addEventListener("change", (e) => {
  if (e.target.type === "checkbox") {
    // console.log(e.target.parentElement)
    let x = e.target.parentElement.parentElement.classList[0]
    let y = e.target.parentElement.classList[0]
    // console.log(x, y)

    let keyArray = getKeyArray()
    if (taskObj[keyArray[y]][x] == 0) {
      taskObj[keyArray[y]][x] = 1
    } else {
      taskObj[keyArray[y]][x] = 0
    }

    localStorage.setItem("taskObj", JSON.stringify(taskObj))
  }
})

//scrollSync
const div1 = document.querySelector('.taskList');
const div2 = document.querySelector('.checkBox');

function syncScroll(source, target) {
  target.scrollTop = source.scrollTop;
  target.scrollLeft = source.scrollLeft;
}

div1.addEventListener('scroll', () => syncScroll(div1, div2));
div2.addEventListener('scroll', () => syncScroll(div2, div1));
