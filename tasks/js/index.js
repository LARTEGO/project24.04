// Данные проектов (для демонстрации)

// Helper functions (moved to top for declaration order)
function getFromLocalStorage(key) {
  try {
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : null
  } catch (error) {
    console.error("Error getting data from localStorage:", error)
    return null
  }
}

function getStatusColor(status) {
  switch (status) {
    case "active":
      return "status-active"
    case "on-hold":
      return "status-on-hold"
    case "completed":
      return "status-completed"
    default:
      return ""
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
    case "active":
      return "Активный"
    case "on-hold":
      return "В ожидании"
    case "completed":
      return "Завершен"
    default:
      return "Неизвестно"
  }
}

function getPriorityText(priority) {
  switch (priority) {
    case "high":
      return "Высокий"
    case "medium":
      return "Средний"
    case "low":
      return "Низкий"
    default:
      return "Неизвестно"
  }
}

function formatDate(dateString) {
  if (!dateString) return null
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}

function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error("Error saving data to localStorage:", error)
  }
}

function generateId() {
  return "p" + Math.random().toString(36).substring(2, 9)
}

let projects = getFromLocalStorage("projects") || [
  {
    id: "p1",
    name: "Разработка веб-сайта",
    description: "Создание корпоративного веб-сайта с адаптивным дизайном",
    status: "active",
    priority: "high",
    deadline: "2023-12-31",
    progress: 65,
    tasks: {
      total: 24,
      completed: 16,
    },
    members: ["АИ", "МС", "ДК"],
  },
  {
    id: "p2",
    name: "Мобильное приложение",
    description: "Разработка мобильного приложения для iOS и Android",
    status: "on-hold",
    priority: "medium",
    deadline: "2024-03-15",
    progress: 30,
    tasks: {
      total: 18,
      completed: 5,
    },
    members: ["ПВ", "АС"],
  },
  {
    id: "p3",
    name: "Обновление CRM",
    description: "Обновление системы управления взаимоотношениями с клиентами",
    status: "completed",
    priority: "low",
    deadline: "2023-10-15",
    progress: 100,
    tasks: {
      total: 12,
      completed: 12,
    },
    members: ["ИК", "ОЛ", "МВ", "АП"],
  },
]

// Инициализация страницы
document.addEventListener("DOMContentLoaded", () => {
  renderProjects()
  setupEventListeners()
})

// Отображение проектов
function renderProjects(filter = "all") {
  const projectList = document.getElementById("projectList")
  const emptyState = document.getElementById("emptyState")
  const searchInput = document.getElementById("searchInput")
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : ""

  // Фильтрация проектов
  let filteredProjects = projects

  if (filter !== "all") {
    filteredProjects = projects.filter((project) => project.status === filter)
  }

  // Поиск по названию и описанию
  if (searchTerm) {
    filteredProjects = filteredProjects.filter(
      (project) =>
        project.name.toLowerCase().includes(searchTerm) ||
        (project.description && project.description.toLowerCase().includes(searchTerm)),
    )
  }

  // Очистка списка проектов
  projectList.innerHTML = ""

  // Проверка наличия проектов
  if (filteredProjects.length === 0) {
    projectList.style.display = "none"
    emptyState.style.display = "block"
    return
  }

  projectList.style.display = "grid"
  emptyState.style.display = "none"

  // Отображение проектов
  filteredProjects.forEach((project) => {
    const projectCard = createProjectCard(project)
    projectList.appendChild(projectCard)
  })
}

// Создание карточки проекта
function createProjectCard(project) {
  const card = document.createElement("div")
  card.className = "project-card"
  card.dataset.id = project.id

  const statusClass = getStatusColor(project.status)
  const priorityClass = getPriorityColor(project.priority)

  card.innerHTML = `
        <div class="project-card-header">
            <h3 class="project-card-title">${project.name}</h3>
        </div>
        <div class="project-card-body">
            <p class="project-card-description">${project.description || "Нет описания"}</p>
            
            <div class="project-status ${statusClass}">
                ${getStatusText(project.status)}
            </div>
            
            <div class="project-priority">
                <span class="priority-indicator ${priorityClass}"></span>
                <span class="priority-text">${getPriorityText(project.priority)}</span>
            </div>
            
            <div class="project-deadline ${isDeadlineApproaching(project.deadline) ? "deadline-approaching" : ""}">
                <i class="far fa-calendar-alt mr-1"></i> Срок: ${formatDate(project.deadline) || "Не указан"}
            </div>
            
            <div class="project-members">
                ${project.members
                  .slice(0, 3)
                  .map(
                    (member) => `
                    <div class="member-avatar">${member}</div>
                `,
                  )
                  .join("")}
                ${
                  project.members.length > 3
                    ? `
                    <div class="member-count">+${project.members.length - 3}</div>
                `
                    : ""
                }
            </div>
            
            <div class="progress-container">
                <div class="progress-label">
                    <span>Прогресс</span>
                    <span>${project.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-value" style="width: ${project.progress}%"></div>
                </div>
            </div>
        </div>
        <div class="project-card-footer">
            <div class="project-card-stats">
                <div class="project-card-stat">
                    <i class="fas fa-tasks"></i> ${project.tasks.completed}/${project.tasks.total}
                </div>
            </div>
            <div class="dropdown">
                <button class="btn btn-secondary btn-sm">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
                <div class="dropdown-menu">
                    <a href="#" class="dropdown-item view-project" data-id="${project.id}">Просмотр</a>
                    <a href="#" class="dropdown-item edit-project" data-id="${project.id}">Редактировать</a>
                    <a href="#" class="dropdown-item delete-project" data-id="${project.id}">Удалить</a>
                </div>
            </div>
        </div>
    `

  return card
}

// Проверка приближения дедлайна
function isDeadlineApproaching(deadline) {
  if (!deadline) return false

  const deadlineDate = new Date(deadline)
  const now = new Date()
  const diffTime = deadlineDate - now
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays > 0 && diffDays <= 7
}

// Настройка обработчиков событий
function setupEventListeners() {
  // Фильтры проектов
  const filterItems = document.querySelectorAll(".filter-item")
  filterItems.forEach((item) => {
    item.addEventListener("click", function () {
      filterItems.forEach((i) => i.classList.remove("active"))
      this.classList.add("active")
      renderProjects(this.dataset.filter)
    })
  })

  // Поиск проектов
  const searchInput = document.getElementById("searchInput")
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderProjects(document.querySelector(".filter-item.active").dataset.filter)
    })
  }

  // Кнопка создания проекта
  const createProjectBtn = document.getElementById("createProjectBtn")
  const emptyStateBtn = document.getElementById("emptyStateBtn")
  const createProjectModal = document.getElementById("createProjectModal")

  if (createProjectBtn) {
    createProjectBtn.addEventListener("click", () => {
      createProjectModal.classList.add("show")
    })
  }

  if (emptyStateBtn) {
    emptyStateBtn.addEventListener("click", () => {
      createProjectModal.classList.add("show")
    })
  }

  // Закрытие модального окна
  const closeModalBtn = document.getElementById("closeModalBtn")
  const cancelProjectBtn = document.getElementById("cancelProjectBtn")

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      createProjectModal.classList.remove("show")
    })
  }

  if (cancelProjectBtn) {
    cancelProjectBtn.addEventListener("click", () => {
      createProjectModal.classList.remove("show")
    })
  }

  // Сохранение проекта
  const saveProjectBtn = document.getElementById("saveProjectBtn")
  if (saveProjectBtn) {
    saveProjectBtn.addEventListener("click", () => {
      saveProject()
    })
  }

  // Делегирование событий для действий с проектами
  const projectList = document.getElementById("projectList")
  if (projectList) {
    projectList.addEventListener("click", (e) => {
      const target = e.target.closest(".view-project, .edit-project, .delete-project")
      if (!target) return

      e.preventDefault()
      const projectId = target.dataset.id

      if (target.classList.contains("view-project")) {
        viewProject(projectId)
      } else if (target.classList.contains("edit-project")) {
        editProject(projectId)
      } else if (target.classList.contains("delete-project")) {
        deleteProject(projectId)
      }
    })
  }
}

// Сохранение проекта
function saveProject() {
  const projectNameInput = document.getElementById("projectName")
  const projectDescriptionInput = document.getElementById("projectDescription")
  const projectStatusInput = document.getElementById("projectStatus")
  const projectPriorityInput = document.getElementById("projectPriority")
  const projectDeadlineInput = document.getElementById("projectDeadline")

  if (!projectNameInput.value.trim()) {
    alert("Пожалуйста, введите название проекта")
    return
  }

  const newProject = {
    id: generateId(),
    name: projectNameInput.value.trim(),
    description: projectDescriptionInput.value.trim(),
    status: projectStatusInput.value,
    priority: projectPriorityInput.value,
    deadline: projectDeadlineInput.value,
    progress: 0,
    tasks: {
      total: 0,
      completed: 0,
    },
    members: ["АИ"], // Для демонстрации
  }

  projects.push(newProject)
  saveToLocalStorage("projects", projects)

  // Сброс формы и закрытие модального окна
  document.getElementById("createProjectForm").reset()
  document.getElementById("createProjectModal").classList.remove("show")

  // Обновление списка проектов
  renderProjects()
}

// Просмотр проекта
function viewProject(projectId) {
  // В реальном приложении здесь был бы переход на страницу проекта
  alert(`Просмотр проекта с ID: ${projectId}`)
}

// Редактирование проекта
function editProject(projectId) {
  // В реальном приложении здесь было бы открытие формы редактирования
  alert(`Редактирование проекта с ID: ${projectId}`)
}

// Удаление проекта
function deleteProject(projectId) {
  if (confirm("Вы уверены, что хотите удалить этот проект?")) {
    projects = projects.filter((project) => project.id !== projectId)
    saveToLocalStorage("projects", projects)
    renderProjects()
  }
}
