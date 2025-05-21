// Общие функции для всех страниц

// Инициализация выпадающего меню пользователя
function initUserDropdown() {
  const userDropdown = document.getElementById("userDropdown")
  const userMenu = document.getElementById("userMenu")

  if (userDropdown && userMenu) {
    userDropdown.addEventListener("click", (e) => {
      e.preventDefault()
      userMenu.classList.toggle("show")
    })

    // Закрытие меню при клике вне его
    document.addEventListener("click", (e) => {
      if (!userDropdown.contains(e.target) && !userMenu.contains(e.target)) {
        userMenu.classList.remove("show")
      }
    })
  }
}

// Инициализация всех выпадающих меню
function initDropdowns() {
  const dropdowns = document.querySelectorAll(".dropdown")

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector('[id$="Dropdown"]')
    const menu = dropdown.querySelector('[id$="Menu"]')

    if (trigger && menu) {
      trigger.addEventListener("click", (e) => {
        e.preventDefault()
        menu.classList.toggle("show")
      })

      // Закрытие меню при клике вне его
      document.addEventListener("click", (e) => {
        if (!trigger.contains(e.target) && !menu.contains(e.target)) {
          menu.classList.remove("show")
        }
      })
    }
  })
}

// Инициализация модальных окон
function initModals() {
  const modals = document.querySelectorAll(".modal")

  modals.forEach((modal) => {
    const modalId = modal.id
    const openBtns = document.querySelectorAll(`[data-target="#${modalId}"], [data-modal="${modalId}"]`)
    const closeBtns = modal.querySelectorAll('.modal-close, [data-dismiss="modal"]')
    const cancelBtns = modal.querySelectorAll('[id$="cancelBtn"]')

    // Открытие модального окна
    openBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        modal.classList.add("show")
      })
    })

    // Закрытие модального окна
    function closeModal() {
      modal.classList.remove("show")
    }

    closeBtns.forEach((btn) => {
      btn.addEventListener("click", closeModal)
    })

    cancelBtns.forEach((btn) => {
      btn.addEventListener("click", closeModal)
    })

    // Закрытие при клике вне модального окна
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal()
      }
    })
  })
}

// Форматирование даты
function formatDate(dateString) {
  if (!dateString) return ""

  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}

// Получение относительной даты (сегодня, вчера и т.д.)
function getRelativeDate(dateString) {
  if (!dateString) return ""

  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return "Сегодня"
  } else if (diffDays === 1) {
    return "Вчера"
  } else if (diffDays < 7) {
    return `${diffDays} дн. назад`
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)
    return `${weeks} нед. назад`
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30)
    return `${months} мес. назад`
  } else {
    const years = Math.floor(diffDays / 365)
    return `${years} г. назад`
  }
}

// Получение цвета статуса
function getStatusColor(status) {
  switch (status) {
    case "active":
    case "todo":
      return "status-active"
    case "completed":
    case "done":
      return "status-completed"
    case "on-hold":
    case "in-progress":
      return "status-on-hold"
    case "cancelled":
      return "status-cancelled"
    default:
      return ""
  }
}

// Получение текста статуса
function getStatusText(status) {
  switch (status) {
    case "active":
      return "Активный"
    case "completed":
      return "Завершен"
    case "on-hold":
      return "На паузе"
    case "cancelled":
      return "Отменен"
    case "todo":
      return "К выполнению"
    case "in-progress":
      return "В процессе"
    case "done":
      return "Выполнено"
    default:
      return "Неизвестно"
  }
}

// Получение цвета приоритета
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

// Получение текста приоритета
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

// Сохранение данных в localStorage
function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

// Получение данных из localStorage
function getFromLocalStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}

// Генерация уникального ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
}

// Инициализация всех общих компонентов
document.addEventListener("DOMContentLoaded", () => {
  initUserDropdown()
  initDropdowns()
  initModals()
})
