import { Chart } from "@/components/ui/chart"
// Данные отчетов (для демонстрации)
const reportData = {
  summary: {
    projects: {
      total: 12,
      active: 8,
      completed: 3,
      onHold: 1,
    },
    tasks: {
      total: 87,
      todo: 24,
      inProgress: 35,
      done: 28,
    },
    users: {
      total: 15,
      active: 12,
    },
    timeTracking: {
      totalHours: 1245,
      billableHours: 980,
      nonBillableHours: 265,
    },
  },
  projectsData: [
    { name: "Веб-сайт", tasks: 24, completed: 16, hours: 120 },
    { name: "Мобильное приложение", tasks: 18, completed: 5, hours: 85 },
    { name: "CRM", tasks: 12, completed: 12, hours: 60 },
    { name: "Дизайн", tasks: 8, completed: 4, hours: 40 },
    { name: "Маркетинг", tasks: 15, completed: 10, hours: 75 },
  ],
  tasksData: [
    { status: "К выполнению", count: 24 },
    { status: "В процессе", count: 35 },
    { status: "Выполнено", count: 28 },
  ],
  usersData: [
    { name: "Иванов А.И.", tasks: 15, completed: 12, hours: 120 },
    { name: "Петров В.С.", tasks: 12, completed: 8, hours: 95 },
    { name: "Сидоров М.К.", tasks: 10, completed: 7, hours: 85 },
    { name: "Козлова О.Л.", tasks: 8, completed: 6, hours: 65 },
    { name: "Морозов И.П.", tasks: 6, completed: 4, hours: 50 },
  ],
}

// Функция для форматирования даты
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0") // Месяцы в JavaScript начинаются с 0
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}

// Инициализация страницы
document.addEventListener("DOMContentLoaded", () => {
  renderSummaryReport()
  setupReportEventListeners()
})

// Настройка обработчиков событий для отчетов
function setupReportEventListeners() {
  // Переключение вкладок отчетов
  const reportTabs = document.querySelectorAll(".report-tab")
  reportTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      reportTabs.forEach((t) => t.classList.remove("active"))
      this.classList.add("active")

      const tabName = this.dataset.tab
      switch (tabName) {
        case "summary":
          renderSummaryReport()
          break
        case "projects":
          renderProjectsReport()
          break
        case "tasks":
          renderTasksReport()
          break
        case "users":
          renderUsersReport()
          break
      }
    })
  })

  // Переключение периода отчета
  const reportPeriod = document.getElementById("reportPeriod")
  if (reportPeriod) {
    reportPeriod.addEventListener("change", function () {
      const customDateRange = document.getElementById("customDateRange")
      if (this.value === "custom") {
        customDateRange.style.display = "block"
      } else {
        customDateRange.style.display = "none"
      }
    })
  }

  // Применение фильтров
  const applyFiltersBtn = document.getElementById("applyFiltersBtn")
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener("click", () => {
      const activeTab = document.querySelector(".report-tab.active")
      if (activeTab) {
        const tabName = activeTab.dataset.tab
        switch (tabName) {
          case "summary":
            renderSummaryReport()
            break
          case "projects":
            renderProjectsReport()
            break
          case "tasks":
            renderTasksReport()
            break
          case "users":
            renderUsersReport()
            break
        }
      }
    })
  }

  // Сброс фильтров
  const resetFiltersBtn = document.getElementById("resetFiltersBtn")
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", () => {
      document.getElementById("reportType").value = "all"
      document.getElementById("reportPeriod").value = "week"
      document.getElementById("customDateRange").style.display = "none"

      const activeTab = document.querySelector(".report-tab.active")
      if (activeTab) {
        const tabName = activeTab.dataset.tab
        switch (tabName) {
          case "summary":
            renderSummaryReport()
            break
          case "projects":
            renderProjectsReport()
            break
          case "tasks":
            renderTasksReport()
            break
          case "users":
            renderUsersReport()
            break
        }
      }
    })
  }

  // Переключение вида отчета (сетка/список)
  const viewOptions = document.querySelectorAll(".view-option")
  viewOptions.forEach((option) => {
    option.addEventListener("click", function () {
      viewOptions.forEach((o) => o.classList.remove("active"))
      this.classList.add("active")

      // В реальном приложении здесь был бы код для изменения вида отчета
    })
  })
}

// Отображение сводного отчета
function renderSummaryReport() {
  const reportContent = document.getElementById("reportContent")

  reportContent.innerHTML = `
        <div class="report-card">
            <div class="report-header">
                <h3 class="report-title">Сводка по проектам и задачам</h3>
            </div>
            <div class="report-body">
                <div class="report-summary">
                    <div class="summary-item">
                        <div class="summary-value">${reportData.summary.projects.total}</div>
                        <div class="summary-label">Всего проектов</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-value">${reportData.summary.projects.active}</div>
                        <div class="summary-label">Активных проектов</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-value">${reportData.summary.tasks.total}</div>
                        <div class="summary-label">Всего задач</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-value">${reportData.summary.tasks.done}</div>
                        <div class="summary-label">Выполненных задач</div>
                    </div>
                </div>
                
                <div class="chart-container">
                    <canvas id="projectsChart"></canvas>
                </div>
                
                <div class="chart-container">
                    <canvas id="tasksChart"></canvas>
                </div>
            </div>
            <div class="report-footer">
                <div class="report-actions">
                    <button class="btn btn-secondary">
                        <i class="fas fa-download mr-1"></i> Экспорт
                    </button>
                    <button class="btn btn-secondary">
                        <i class="fas fa-print mr-1"></i> Печать
                    </button>
                </div>
                <div class="report-timestamp">
                    Обновлено: ${formatDate(new Date())}
                </div>
            </div>
        </div>
    `

  // Инициализация графиков
  initProjectsChart()
  initTasksChart()
}

// Отображение отчета по проектам
function renderProjectsReport() {
  const reportContent = document.getElementById("reportContent")

  reportContent.innerHTML = `
        <div class="report-card">
            <div class="report-header">
                <h3 class="report-title">Отчет по проектам</h3>
            </div>
            <div class="report-body">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Проект</th>
                                <th>Всего задач</th>
                                <th>Выполнено</th>
                                <th>Прогресс</th>
                                <th>Затрачено часов</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${reportData.projectsData
                              .map(
                                (project) => `
                                <tr>
                                    <td>${project.name}</td>
                                    <td>${project.tasks}</td>
                                    <td>${project.completed}</td>
                                    <td>
                                        <div class="progress-bar">
                                            <div class="progress-value" style="width: ${Math.round((project.completed / project.tasks) * 100)}%"></div>
                                        </div>
                                    </td>
                                    <td>${project.hours}</td>
                                </tr>
                            `,
                              )
                              .join("")}
                        </tbody>
                    </table>
                </div>
                
                <div class="chart-container">
                    <canvas id="projectsProgressChart"></canvas>
                </div>
            </div>
            <div class="report-footer">
                <div class="report-actions">
                    <button class="btn btn-secondary">
                        <i class="fas fa-download mr-1"></i> Экспорт
                    </button>
                    <button class="btn btn-secondary">
                        <i class="fas fa-print mr-1"></i> Печать
                    </button>
                </div>
                <div class="report-timestamp">
                    Обновлено: ${formatDate(new Date())}
                </div>
            </div>
        </div>
    `

  // Инициализация графика прогресса проектов
  initProjectsProgressChart()
}

// Отображение отчета по задачам
function renderTasksReport() {
  const reportContent = document.getElementById("reportContent")

  reportContent.innerHTML = `
        <div class="report-card">
            <div class="report-header">
                <h3 class="report-title">Отчет по задачам</h3>
            </div>
            <div class="report-body">
                <div class="report-summary">
                    <div class="summary-item">
                        <div class="summary-value">${reportData.summary.tasks.total}</div>
                        <div class="summary-label">Всего задач</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-value">${reportData.summary.tasks.todo}</div>
                        <div class="summary-label">К выполнению</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-value">${reportData.summary.tasks.inProgress}</div>
                        <div class="summary-label">В процессе</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-value">${reportData.summary.tasks.done}</div>
                        <div class="summary-label">Выполнено</div>
                    </div>
                </div>
                
                <div class="chart-container">
                    <canvas id="tasksStatusChart"></canvas>
                </div>
            </div>
            <div class="report-footer">
                <div class="report-actions">
                    <button class="btn btn-secondary">
                        <i class="fas fa-download mr-1"></i> Экспорт
                    </button>
                    <button class="btn btn-secondary">
                        <i class="fas fa-print mr-1"></i> Печать
                    </button>
                </div>
                <div class="report-timestamp">
                    Обновлено: ${formatDate(new Date())}
                </div>
            </div>
        </div>
    `

  // Инициализация графика статусов задач
  initTasksStatusChart()
}

// Отображение отчета по пользователям
function renderUsersReport() {
  const reportContent = document.getElementById("reportContent")

  reportContent.innerHTML = `
        <div class="report-card">
            <div class="report-header">
                <h3 class="report-title">Отчет по пользователям</h3>
            </div>
            <div class="report-body">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Пользователь</th>
                                <th>Всего задач</th>
                                <th>Выполнено</th>
                                <th>Эффективность</th>
                                <th>Затрачено часов</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${reportData.usersData
                              .map(
                                (user) => `
                                <tr>
                                    <td>${user.name}</td>
                                    <td>${user.tasks}</td>
                                    <td>${user.completed}</td>
                                    <td>
                                        <div class="progress-bar">
                                            <div class="progress-value" style="width: ${Math.round((user.completed / user.tasks) * 100)}%"></div>
                                        </div>
                                    </td>
                                    <td>${user.hours}</td>
                                </tr>
                            `,
                              )
                              .join("")}
                        </tbody>
                    </table>
                </div>
                
                <div class="chart-container">
                    <canvas id="usersProductivityChart"></canvas>
                </div>
            </div>
            <div class="report-footer">
                <div class="report-actions">
                    <button class="btn btn-secondary">
                        <i class="fas fa-download mr-1"></i> Экспорт
                    </button>
                    <button class="btn btn-secondary">
                        <i class="fas fa-print mr-1"></i> Печать
                    </button>
                </div>
                <div class="report-timestamp">
                    Обновлено: ${formatDate(new Date())}
                </div>
            </div>
        </div>
    `

  // Инициализация графика продуктивности пользователей
  initUsersProductivityChart()
}

// Инициализация графика проектов
function initProjectsChart() {
  const ctx = document.getElementById("projectsChart").getContext("2d")
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Активные", "Завершенные", "На паузе"],
      datasets: [
        {
          data: [
            reportData.summary.projects.active,
            reportData.summary.projects.completed,
            reportData.summary.projects.onHold,
          ],
          backgroundColor: ["#4bb34b", "#4a76a8", "#ffa000"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right",
        },
        title: {
          display: true,
          text: "Статус проектов",
        },
      },
    },
  })
}

// Инициализация графика задач
function initTasksChart() {
  const ctx = document.getElementById("tasksChart").getContext("2d")
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["К выполнению", "В процессе", "Выполнено"],
      datasets: [
        {
          label: "Количество задач",
          data: [reportData.summary.tasks.todo, reportData.summary.tasks.inProgress, reportData.summary.tasks.done],
          backgroundColor: ["#4a76a8", "#ffa000", "#4bb34b"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Статус задач",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })
}

// Инициализация графика прогресса проектов
function initProjectsProgressChart() {
  const ctx = document.getElementById("projectsProgressChart").getContext("2d")
  new Chart(ctx, {
    type: "horizontalBar",
    data: {
      labels: reportData.projectsData.map((project) => project.name),
      datasets: [
        {
          label: "Прогресс (%)",
          data: reportData.projectsData.map((project) => Math.round((project.completed / project.tasks) * 100)),
          backgroundColor: "#4a76a8",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Прогресс проектов",
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
        },
      },
    },
  })
}

// Инициализация графика статусов задач
function initTasksStatusChart() {
  const ctx = document.getElementById("tasksStatusChart").getContext("2d")
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: reportData.tasksData.map((task) => task.status),
      datasets: [
        {
          data: reportData.tasksData.map((task) => task.count),
          backgroundColor: ["#4a76a8", "#ffa000", "#4bb34b"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right",
        },
        title: {
          display: true,
          text: "Распределение задач по статусам",
        },
      },
    },
  })
}

// Инициализация графика продуктивности пользователей
function initUsersProductivityChart() {
  const ctx = document.getElementById("usersProductivityChart").getContext("2d")
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: reportData.usersData.map((user) => user.name),
      datasets: [
        {
          label: "Всего задач",
          data: reportData.usersData.map((user) => user.tasks),
          backgroundColor: "#4a76a8",
          borderWidth: 1,
        },
        {
          label: "Выполнено",
          data: reportData.usersData.map((user) => user.completed),
          backgroundColor: "#4bb34b",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Продуктивность пользователей",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })
}
