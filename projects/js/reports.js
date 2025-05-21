// Скрипт для страницы отчетов

document.addEventListener('DOMContentLoaded', function() {
    // Загрузка данных отчетов
    loadReportsData();
    
    // Обработчик для кнопки применения фильтра
    const applyFilterBtn = document.getElementById('apply-filter');
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', function() {
            loadReportsData();
            showNotification('Фильтры применены', 'success');
        });
    }
    
    // Обработчик для экспорта отчета по сотрудникам
    const exportEmployeeReportBtn = document.getElementById('export-employee-report');
    if (exportEmployeeReportBtn) {
        exportEmployeeReportBtn.addEventListener('click', function() {
            exportTableToCSV('employee-report-table-body', 'employee_report.csv');
            showNotification('Отчет экспортирован', 'success');
        });
    }
    
    // Обработчик для экспорта отчета по подразделениям
    const exportDepartmentReportBtn = document.getElementById('export-department-report');
    if (exportDepartmentReportBtn) {
        exportDepartmentReportBtn.addEventListener('click', function() {
            exportTableToCSV('department-report-table-body', 'department_report.csv');
            showNotification('Отчет экспортирован', 'success');
        });
    }
    
    // Обработчик для экспорта списка заявлений
    const exportRequestsBtn = document.getElementById('export-requests');
    if (exportRequestsBtn) {
        exportRequestsBtn.addEventListener('click', function() {
            exportTableToCSV('requests-table-body', 'requests_list.csv');
            showNotification('Список экспортирован', 'success');
        });
    }
    
    // Обработчик для поиска
    const searchInput = document.getElementById('report-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterReportData(this.value);
        });
    }
});

// Функция загрузки данных отчетов (имитация)
function loadReportsData() {
    // Загружаем данные для отчета по сотрудникам
    loadEmployeeReportData();
    
    // Загружаем данные для отчета по подразделениям
    loadDepartmentReportData();
    
    // Загружаем данные для списка заявлений
    loadRequestsData();
}

// Функция загрузки данных для отчета по сотрудникам (имитация)
function loadEmployeeReportData() {
    // В реальном приложении здесь был бы запрос к API или базе данных
    const reportData = [
        { id: 1, name: 'Иванов Иван Иванович', tabNumber: '001', fir: 168, overtime: 4, vacation: 0, sickLeave: 0, vacationHours: 0, totalHours: 172, reason: '' },
        { id: 2, name: 'Петров Петр Петрович', tabNumber: '002', fir: 168, overtime: 6, vacation: 0, sickLeave: 0, vacationHours: 0, totalHours: 174, reason: '' },
        { id: 3, name: 'Сидорова Анна Владимировна', tabNumber: '003', fir: 112, overtime: 0, vacation: 56, sickLeave: 0, vacationHours: 56, totalHours: 168, reason: 'Ежегодный отпуск' },
        { id: 4, name: 'Козлов Алексей Сергеевич', tabNumber: '004', fir: 168, overtime: 8, vacation: 0, sickLeave: 0, vacationHours: 0, totalHours: 176, reason: '' },
        { id: 5, name: 'Новикова Елена Дмитриевна', tabNumber: '005', fir: 168, overtime: 0, vacation: 0, sickLeave: 0, vacationHours: 0, totalHours: 168, reason: '' }
    ];
    
    const tableBody = document.getElementById('employee-report-table-body');
    if (tableBody) {
        tableBody.innerHTML = '';
        
        reportData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.tabNumber}</td>
                <td>${item.fir}</td>
                <td>${item.overtime}</td>
                <td>${item.vacation}</td>
                <td>${item.sickLeave}</td>
                <td>${item.vacationHours}</td>
                <td>${item.totalHours}</td>
                <td>${item.reason}</td>
            `;
            
            tableBody.appendChild(row);
        });
    }
}

// Функция загрузки данных для отчета по подразделениям (имитация)
function loadDepartmentReportData() {
    // В реальном приложении здесь был бы запрос к API или базе данных
    const reportData = [
        { id: 1, department: 'ИТ отдел', tabCount: 1, fir: 168, overtime: 4, vacation: 0, sickLeave: 0, vacationHours: 0, totalHours: 172 },
        { id: 2, department: 'Отдел продаж', tabCount: 1, fir: 168, overtime: 6, vacation: 0, sickLeave: 0, vacationHours: 0, totalHours: 174 },
        { id: 3, department: 'Бухгалтерия', tabCount: 1, fir: 112, overtime: 0, vacation: 56, sickLeave: 0, vacationHours: 56, totalHours: 168 },
        { id: 4, department: 'Транспортный отдел', tabCount: 1, fir: 168, overtime: 8, vacation: 0, sickLeave: 0, vacationHours: 0, totalHours: 176 },
        { id: 5, department: 'Отдел кадров', tabCount: 1, fir: 168, overtime: 0, vacation: 0, sickLeave: 0, vacationHours: 0, totalHours: 168 }
    ];
    
    const tableBody = document.getElementById('department-report-table-body');
    if (tableBody) {
        tableBody.innerHTML = '';
        
        reportData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.department}</td>
                <td>${item.tabCount}</td>
                <td>${item.fir}</td>
                <td>${item.overtime}</td>
                <td>${item.vacation}</td>
                <td>${item.sickLeave}</td>
                <td>${item.vacationHours}</td>
                <td>${item.totalHours}</td>
            `;
            
            tableBody.appendChild(row);
        });
    }
}

// Функция загрузки данных для списка заявлений (имитация)
function loadRequestsData() {
    // В реальном приложении здесь был бы запрос к API или базе данных
    const requestsData = [
        { id: 1, name: 'Иванов Иван Иванович', tabNumber: '001', date: '2025-01-10', type: 'Сверхурочная работа', compensationType: 'Двойная оплата', requestedTime: '4 часа', reason: 'Срочное обновление системы' },
        { id: 2, name: 'Петров Петр Петрович', tabNumber: '002', date: '2025-01-12', type: 'Сверхурочная работа', compensationType: 'Двойная оплата', requestedTime: '3 часа', reason: 'Подготовка отчетности' },
        { id: 3, name: 'Сидорова Анна Владимировна', tabNumber: '003', date: '2025-01-05', type: 'Отпуск', compensationType: '-', requestedTime: '14 дней', reason: 'Ежегодный отпуск' },
        { id: 4, name: 'Козлов Алексей Сергеевич', tabNumber: '004', date: '2025-01-15', type: 'Сверхурочная работа', compensationType: 'Двойная оплата', requestedTime: '4 часа', reason: 'Доставка срочного груза' }
    ];
    
    const tableBody = document.getElementById('requests-table-body');
    if (tableBody) {
        tableBody.innerHTML = '';
        
        requestsData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.tabNumber}</td>
                <td>${formatDate(item.date)}</td>
                <td>${item.type}</td>
                <td>${item.compensationType}</td>
                <td>${item.requestedTime}</td>
                <td>${item.reason}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn approve" data-id="${item.id}" title="Согласовать">
                            <i class="icon">✓</i>
                        </button>
                        <button class="action-btn reject" data-id="${item.id}" title="Отклонить">
                            <i class="icon">✗</i>
                        </button>
                    </div>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
        
        // Добавляем обработчики для кнопок согласования и отклонения
        addRequestActionButtonHandlers();
    }
}

// Функция для добавления обработчиков кнопок действий для заявлений
function addRequestActionButtonHandlers() {
    // Обработчики для кнопок согласования
    const approveButtons = document.querySelectorAll('.action-btn.approve');
    approveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const requestId = this.getAttribute('data-id');
            approveRequest(requestId);
        });
    });
    
    // Обработчики для кнопок отклонения
    const rejectButtons = document.querySelectorAll('.action-btn.reject');
    rejectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const requestId = this.getAttribute('data-id');
            rejectRequest(requestId);
        });
    });
}

// Функция для согласования заявления
function approveRequest(id) {
    // В реальном приложении здесь был бы запрос к API для согласования заявления
    console.log('Согласование заявления с ID:', id);
    showNotification('Заявление согласовано', 'success');
    // В реальном приложении здесь был бы код для отправки запроса на сервер
    
    // Перезагружаем данные
    loadRequestsData();
}

// Функция для отклонения заявления
function rejectRequest(id) {
    // В реальном приложении здесь был бы запрос к API для отклонения заявления
    console.log('Отклонение заявления с ID:', id);
    showNotification('Заявление отклонено', 'warning');
    // В реальном приложении здесь был бы код для отправки запроса на сервер
    
    // Перезагружаем данные
    loadRequestsData();
}

// Функция для фильтрации данных отчета
function filterReportData(query) {
    // Фильтрация данных в отчете по сотрудникам
    filterTableRows('employee-report-table-body', query);
    
    // Фильтрация данных в отчете по подразделениям
    filterTableRows('department-report-table-body', query);
    
    // Фильтрация данных в списке заявлений
    filterTableRows('requests-table-body', query);
}

// Функция для фильтрации строк таблицы
function filterTableRows(tableBodyId, query) {
    const rows = document.querySelectorAll(`#${tableBodyId} tr`);
    
    query = query.toLowerCase();
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(query)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}