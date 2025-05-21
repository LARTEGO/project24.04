// Helper functions for local storage
function getFromLocalStorage(key) {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error("Error getting data from localStorage:", error)
    return null
  }
}

function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error("Error saving data to localStorage:", error)
  }
}

// Helper functions for task status and priority
function getStatusColor(status) {
  switch (status) {
    case "todo":
      return "badge-secondary"
    case "in-progress":
      return "badge-primary"
    case "done":
      return "badge-success"
    case "blocked":
      return "badge-danger"
    default:
      return "badge-secondary"
  }
}

function getPriorityColor(priority) {
  switch (priority) {
    case "high":
      return "priority-high"
    case "medium":
      return "priority-medium"
    case "low":
      return "priority-low"
    default:
      return ""
  }
}

function getStatusText(status) {
  switch (status) {
    case "todo":
      return "To Do"
    case "in-progress":
      return "In Progress"
    case "done":
      return "Done"
    case "blocked":
      return "Blocked"
    default:
      return "Unknown"
  }
}

function getPriorityText(priority) {
  switch (priority) {
    case "high":
      return "High"
    case "medium":
      return "Medium"
    case "low":
      return "Low"
    default:
      return "Normal"
  }
}

function generateId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function formatDate(dateString) {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0") // Month is 0-indexed
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

// Данные задач (для демонстрации)
let tasks = getFromLocalStorage("tasks") || [
  {
    id: "t1",
    name: "Разработка главной страницы",
    description: "Создание адаптивной главной страницы сайта",
    projectId: "p1",
    projectName: "Разработка веб-сайта",
    status: "in-progress",
    priority: "high",
    deadline: "2023-11-15",
    assignee: "Иванов А.И.",
    createdAt: "2023-10-01",
  },
  {
    id: "t2",
    name: "Дизайн логотипа",
    description: "Разработка логотипа компании",
    projectId: "p1",
    projectName: "Разработка веб-сайта",
    status: "done",
    priority: "medium",
    deadline: "2023-10-20",
    assignee: "Петров В.С.",
    createdAt: "2023-10-05",
  },
  {
    id: "t3",
    name: "Настройка базы данных",
    description: "Создание и настройка базы данных для приложения",
    projectId: "p2",
    projectName: "Мобильное приложение",
    status: "todo",
    priority: "high",
    deadline: "2023-12-10",
    assignee: "Сидоров М.К.",
    createdAt: "2023-10-10",
  },
]

// Данные проектов (для демонстрации)
const projects = getFromLocalStorage("projects") || [
  { id: "p1", name: "Разработка веб-сайта" },
  { id: "p2", name: "Мобильное приложение" },
  { id: "p3", name: "Обновление CRM" },
]

// Данные пользователей (для демонстрации)
const users = [
  { id: "u1", name: "Иванов А.И." },
  { id: "u2", name: "Петров В.С." },
  { id: "u3", name: "Сидоров М.К." },
  { id: "u4", name: "Козлова О.Л." },
]

// Инициализация страницы
document.addEventListener("DOMContentLoaded", () => {
  renderTasks()
  setupTaskEventListeners()
  populateProjectsDropdown()
  populateUsersDropdown()
})

// Отображение задач
function renderTasks(filter = "all") {
  const taskList = document.getElementById("taskList")
  const emptyTaskState = document.getElementById("emptyTaskState")
  const searchTaskInput = document.getElementById("searchTaskInput")
  const searchTerm = searchTaskInput ? searchTaskInput.value.toLowerCase() : ""

  // Фильтрация задач
  let filteredTasks = tasks

  if (filter !== "all") {
    filteredTasks = tasks.filter((task) => task.status === filter)
  }

  // Поиск по названию и описанию
  if (searchTerm) {
    filteredTasks = filteredTasks.filter(
      (task) =>
        task.name.toLowerCase().includes(searchTerm) ||
        (task.description && task.description.toLowerCase().includes(searchTerm)),
    )
  }

  // Очистка списка задач
  taskList.innerHTML = ""

  // Проверка наличия задач
  if (filteredTasks.length === 0) {
    document.getElementById("taskTable").style.display = "none"
    emptyTaskState.style.display = "block"
    return
  }

  document.getElementById("taskTable").style.display = "table"
  emptyTaskState.style.display = "none"

  // Отображение задач
  filteredTasks.forEach((task) => {
    const taskRow = createTaskRow(task)
    taskList.appendChild(taskRow)
  })
}

// Создание строки задачи
function createTaskRow(task) {
  const row = document.createElement("tr")

  const statusClass = getStatusColor(task.status)
  const priorityClass = getPriorityColor(task.priority)

  row.innerHTML = `
        <td>
            <a href="#" class="task-link" data-id="${task.id}">${task.name}</a>
        </td>
        <td>${task.projectName}</td>
        <td>
            <span class="badge ${statusClass}">${getStatusText(task.status)}</span>
        </td>
        <td>
            <div class="task-priority">
                <span class="priority-dot ${priorityClass}"></span>
                ${getPriorityText(task.priority)}
            </div>
        </td>
        <td>${formatDate(task.deadline)}</td>
        <td>${task.assignee}</td>
        <td>
            <div class="dropdown">
                <button class="btn btn-secondary btn-sm">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
                <div class="dropdown-menu">
                    <a href="#" class="dropdown-item view-task" data-id="${task.id}">Просмотр</a>
                    <a href="#" class="dropdown-item edit-task" data-id="${task.id}">Редактировать</a>
                    <a href="#" class="dropdown-item delete-task" data-id="${task.id}">Удалить</a>
                </div>
            </div>
        </td>
    `

  return row
}

// Настройка обработчиков событий для задач
function setupTaskEventListeners() {
  // Фильтры задач
  const filterItems = document.querySelectorAll(".filter-item")
  filterItems.forEach((item) => {
    item.addEventListener("click", function () {
      filterItems.forEach((i) => i.classList.remove("active"))
      this.classList.add("active")
      renderTasks(this.dataset.filter)
    })
  })

  // Поиск задач
  const searchTaskInput = document.getElementById("searchTaskInput")
  if (searchTaskInput) {
    searchTaskInput.addEventListener("input", () => {
      renderTasks(document.querySelector(".filter-item.active").dataset.filter)
    })
  }

  // Сортировка задач
  const sortItems = document.querySelectorAll("[data-sort]")
  sortItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()
      const sortBy = this.dataset.sort
      sortTasks(sortBy)
    })
  })

  // Кнопка создания задачи
  const createTaskBtn = document.getElementById("createTaskBtn")
  const emptyStateTaskBtn = document.getElementById("emptyStateTaskBtn")
  const createTaskModal = document.getElementById("createTaskModal")

  if (createTaskBtn) {
    createTaskBtn.addEventListener("click", () => {
      createTaskModal.classList.add("show")
    })
  }

  if (emptyStateTaskBtn) {
    emptyStateTaskBtn.addEventListener("click", () => {
      createTaskModal.classList.add("show")
    })
  }

  // Закрытие модального окна
  const closeTaskModalBtn = document.getElementById("closeTaskModalBtn")
  const cancelTaskBtn = document.getElementById("cancelTaskBtn")

  if (closeTaskModalBtn) {
    closeTaskModalBtn.addEventListener("click", () => {
      createTaskModal.classList.remove("show")
    })
  }

  if (cancelTaskBtn) {
    cancelTaskBtn.addEventListener("click", () => {
      createTaskModal.classList.remove("show")
    })
  }

  // Сохранение задачи
  const saveTaskBtn = document.getElementById("saveTaskBtn")
  if (saveTaskBtn) {
    saveTaskBtn.addEventListener("click", () => {
      saveTask()
    })
  }

  // Делегирование событий для действий с задачами
  const taskTable = document.getElementById("taskTable")
  if (taskTable) {
    taskTable.addEventListener("click", (e) => {
      const target = e.target.closest(".view-task, .edit-task, .delete-task, .task-link")
      if (!target) return

      e.preventDefault()
      const taskId = target.dataset.id

      if (target.classList.contains("view-task") || target.classList.contains("task-link")) {
        viewTask(taskId)
      } else if (target.classList.contains("edit-task")) {
        editTask(taskId)
      } else if (target.classList.contains("delete-task")) {
        deleteTask(taskId)
      }
    })
  }
}

// Заполнение выпадающего списка проектов
function populateProjectsDropdown() {
  const taskProject = document.getElementById("taskProject")
  if (!taskProject) return

  taskProject.innerHTML = ""

  projects.forEach((project) => {
    const option = document.createElement("option")
    option.value = project.id
    option.textContent = project.name
    taskProject.appendChild(option)
  })
}

// Заполнение выпадающего списка пользователей
function populateUsersDropdown() {
  const taskAssignee = document.getElementById("taskAssignee")
  if (!taskAssignee) return

  taskAssignee.innerHTML = ""

  users.forEach((user) => {
    const option = document.createElement("option")
    option.value = user.id
    option.textContent = user.name
    taskAssignee.appendChild(option)
  })
}

// Сортировка задач
function sortTasks(sortBy) {
  const [field, direction] = sortBy.split("-")

  tasks.sort((a, b) => {
    let comparison = 0

    switch (field) {
      case "date":
        comparison = new Date(a.createdAt) - new Date(b.createdAt)
        break
      case "priority":
        const priorityValues = { high: 3, medium: 2, low: 1 }
        comparison = priorityValues[a.priority] - priorityValues[b.priority]
        break
      case "name":
        comparison = a.name.localeCompare(b.name)
        break
    }

    return direction === "asc" ? comparison : -comparison
  })

  renderTasks(document.querySelector(".filter-item.active").dataset.filter)
}

// Сохранение задачи
function saveTask() {
  const taskNameInput = document.getElementById("taskName")
  const taskDescriptionInput = document.getElementById("taskDescription")
  const taskProjectInput = document.getElementById("taskProject")
  const taskStatusInput = document.getElementById("taskStatus")
  const taskPriorityInput = document.getElementById("taskPriority")
  const taskDeadlineInput = document.getElementById("taskDeadline")
  const taskAssigneeInput = document.getElementById("taskAssignee")

  if (!taskNameInput.value.trim()) {
    alert("Пожалуйста, введите название задачи")
    return
  }

  const selectedProject = projects.find((project) => project.id === taskProjectInput.value)
  const selectedUser = users.find((user) => user.id === taskAssigneeInput.value)

  const newTask = {
    id: generateId(),
    name: taskNameInput.value.trim(),
    description: taskDescriptionInput.value.trim(),
    projectId: taskProjectInput.value,
    projectName: selectedProject ? selectedProject.name : "",
    status: taskStatusInput.value,
    priority: taskPriorityInput.value,
    deadline: taskDeadlineInput.value,
    assignee: selectedUser ? selectedUser.name : "",
    createdAt: new Date().toISOString().split("T")[0],
  }

  tasks.push(newTask)
  saveToLocalStorage("tasks", tasks)

  // Сброс формы и закрытие модального окна
  document.getElementById("createTaskForm").reset()
  document.getElementById("createTaskModal").classList.remove("show")

  // Обновление списка задач
  renderTasks()
}

// Просмотр задачи
function viewTask(taskId) {
  // В реальном приложении здесь был бы переход на страницу задачи
  alert(`Просмотр задачи с ID: ${taskId}`)
}

// Редактирование задачи
function editTask(taskId) {
  // В реальном приложении здесь было бы открытие формы редактирования
  alert(`Редактирование задачи с ID: ${taskId}`)
}

// Удаление задачи
function deleteTask(taskId) {
  if (confirm("Вы уверены, что хотите удалить эту задачу?")) {
    tasks = tasks.filter((task) => task.id !== taskId)
    saveToLocalStorage("tasks", tasks)
    renderTasks()
  }
}
