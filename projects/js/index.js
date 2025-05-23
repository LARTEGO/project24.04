// Скрипт для главной страницы (кадровый учет)

document.addEventListener('DOMContentLoaded', function() {
    // Загрузка данных сотрудников
    loadEmployeeData();
    
    // Обработчик для кнопки добавления сотрудника
    const addEmployeeBtn = document.getElementById('add-employee');
    if (addEmployeeBtn) {
        addEmployeeBtn.addEventListener('click', function() {
            // Очищаем форму
            document.getElementById('employee-form').reset();
            document.getElementById('modal-title').textContent = 'Добавить сотрудника';
            
            // Открываем модальное окно
            openModal('employee-modal');
        });
    }
    
    // Обработчик для сохранения сотрудника
    const saveEmployeeBtn = document.getElementById('save-employee');
    if (saveEmployeeBtn) {
        saveEmployeeBtn.addEventListener('click', function() {
            if (validateForm('employee-form')) {
                saveEmployee();
                closeModal(document.getElementById('employee-modal'));
                showNotification('Сотрудник успешно сохранен', 'success');
                loadEmployeeData(); // Перезагружаем данные
            } else {
                showNotification('Пожалуйста, заполните все обязательные поля', 'error');
            }
        });
    }
    
    // Обработчик для кнопки удаления
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', function() {
            const employeeId = this.getAttribute('data-id');
            deleteEmployee(employeeId);
            closeModal(document.getElementById('confirm-modal'));
            showNotification('Запись успешно удалена', 'success');
            loadEmployeeData(); // Перезагружаем данные
        });
    }
    
    // Обработчики для вкладки "Отпуск"
    const vacationStartInput = document.getElementById('vacation-start');
    const vacationDaysInput = document.getElementById('vacation-days');
    const returnDateInput = document.getElementById('return-date');
    const vacationDaysCountInput = document.getElementById('vacation-days-count');
    
    if (vacationStartInput && vacationDaysInput) {
        // Расчет даты выхода при изменении даты начала или количества дней
        function updateReturnDate() {
            const startDate = new Date(vacationStartInput.value);
            const days = parseInt(vacationDaysInput.value) || 0;
            
            if (startDate && !isNaN(startDate) && days > 0) {
                const returnDate = new Date(startDate);
                returnDate.setDate(returnDate.getDate() + days);
                
                // Форматируем дату для input[type="date"]
                const year = returnDate.getFullYear();
                const month = String(returnDate.getMonth() + 1).padStart(2, '0');
                const day = String(returnDate.getDate()).padStart(2, '0');
                
                returnDateInput.value = `${year}-${month}-${day}`;
                vacationDaysCountInput.value = days;
            }
        }
        
        vacationStartInput.addEventListener('change', updateReturnDate);
        vacationDaysInput.addEventListener('change', updateReturnDate);
        
        // Расчет количества дней при изменении даты выхода
        if (returnDateInput) {
            returnDateInput.addEventListener('change', function() {
                const startDate = new Date(vacationStartInput.value);
                const returnDate = new Date(returnDateInput.value);
                
                if (startDate && returnDate && !isNaN(startDate) && !isNaN(returnDate)) {
                    const days = calculateDaysBetween(startDate, returnDate);
                    vacationDaysInput.value = days;
                    vacationDaysCountInput.value = days;
                }
            });
        }
    }
    
    // Обработчики для вкладки "Больничный лист"
    const sickStartInput = document.getElementById('sick-start');
    const sickEndInput = document.getElementById('sick-end');
    const sickDaysCountInput = document.getElementById('sick-days-count');
    
    if (sickStartInput && sickEndInput) {
        // Расчет количества дней больничного
        function updateSickDays() {
            const startDate = new Date(sickStartInput.value);
            const endDate = new Date(sickEndInput.value);
            
            if (startDate && endDate && !isNaN(startDate) && !isNaN(endDate)) {
                const days = calculateDaysBetween(startDate, endDate);
                sickDaysCountInput.value = days;
            }
        }
        
        sickStartInput.addEventListener('change', updateSickDays);
        sickEndInput.addEventListener('change', updateSickDays);
    }
    
    // Загрузка статистики
    loadStatistics();
    
    // Обработчик для поиска
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterEmployees(this.value);
        });
    }
});

// Функция загрузки данных сотрудников (имитация)
function loadEmployeeData() {
    // В реальном приложении здесь был бы запрос к API или базе данных
    const tableBody = document.getElementById('employees-table-body');
    if (tableBody) {
        tableBody.innerHTML = '';
        
        employees.forEach(employee => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${employee.name}</td>
                <td>${employee.tabNumber}</td>
                <td>${employee.position}</td>
                <td>${employee.department}</td>
                <td>${employee.deptCode}</td>
                <td>${employee.schedule}</td>
                <td>${employee.status}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit" data-id="${employee.id}" title="Редактировать">
                            <i class="icon">✏️</i>
                        </button>
                        <button class="action-btn delete" data-id="${employee.id}" title="Удалить">
                            <i class="icon">🗑️</i>
                        </button>
                    </div>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
        
        // Добавляем обработчики для кнопок редактирования и удаления
        addActionButtonHandlers();
    }
    
    // Загружаем данные для табельного учета
    loadTimesheetData();
}

// Функция загрузки данных табельного учета (имитация)
function loadTimesheetData() {
    // В реальном приложении здесь был бы запрос к API или базе данных
    const timesheetData = [
        { id: 1, name: 'Иванов Иван Иванович', tabNumber: '001', startDate: '2025-01-15', endDate: '2025-01-29', days: 14, additionalDays: 0, docNumber: 'ОТП-001', comment: 'Ежегодный отпуск' },
        { id: 2, name: 'Сидорова Анна Владимировна', tabNumber: '003', startDate: '2025-02-10', endDate: '2025-02-24', days: 14, additionalDays: 0, docNumber: 'ОТП-002', comment: 'Ежегодный отпуск' }
    ];
    
    const tableBody = document.getElementById('timesheet-table-body');
    if (tableBody) {
        tableBody.innerHTML = '';
        
        timesheetData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.tabNumber}</td>
                <td>${formatDate(item.startDate)}</td>
                <td>${formatDate(item.endDate)}</td>
                <td>${item.days}</td>
                <td>${item.additionalDays}</td>
                <td>${item.docNumber}</td>
                <td>${item.comment}</td>
            `;
            
            tableBody.appendChild(row);
        });
    }
}

// Функция загрузки статистики (имитация)
function loadStatistics() {
    // В реальном приложении здесь был бы запрос к API или базе данных
    document.getElementById('total-employees').textContent = '5';
    document.getElementById('on-vacation').textContent = '1';
    document.getElementById('on-sick-leave').textContent = '0';
    document.getElementById('overtime-hours').textContent = '24';
    
    // Здесь можно добавить код для отрисовки графиков
    // Например, с использованием Chart.js или другой библиотеки
}

// Функция для добавления обработчиков кнопок действий
function addActionButtonHandlers() {
    // Обработчики для кнопок редактирования
    const editButtons = document.querySelectorAll('.action-btn.edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const employeeId = this.getAttribute('data-id');
            editEmployee(employeeId);
        });
    });
    
    // Обработчики для кнопок удаления
    const deleteButtons = document.querySelectorAll('.action-btn.delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const employeeId = this.getAttribute('data-id');
            document.getElementById('confirm-delete').setAttribute('data-id', employeeId);
            openModal('confirm-modal');
        });
    });
}

// Функция для редактирования сотрудника
function editEmployee(id) {
    
    // Заполняем форму данными
    const emp_name = document.getElementById('emp-name').value;
    const emp_number = document.getElementById('emp-number').value;
    const emp_position = document.getElementById('emp-position').value;
    const emp_department = document.getElementById('emp-department').value;
    const emp_dept_code = document.getElementById('emp-dept-code').value;
    const emp_schedule = document.getElementById('emp-schedule').value;

    //1* - дописать
    // Запрос
    const edit_emp = 1* fetch('/api/api-part/employee', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emp_name, emp_number, emp_position, emp_department, emp_dept_code, emp_schedule })
    });
    
    // Меняем заголовок модального окна
    document.getElementById('modal-title').textContent = 'Редактировать сотрудника';
    
    // Открываем модальное окно
    openModal('employee-modal');
}

// Функция для сохранения сотрудника
function saveEmployee() {
    // Получаем данные из формы
    const emp_name = document.getElementById('emp-name').value;
    const emp_number = document.getElementById('emp-number').value;
    const emp_position = document.getElementById('emp-position').value;
    const emp_department = document.getElementById('emp-department').value;
    const emp_dept_code = document.getElementById('emp-dept-code').value;
    const emp_schedule = document.getElementById('emp-schedule').value;

    // Запрос
    const response = fetch('/api/api-part/employee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emp_name, emp_number, emp_position, emp_department, emp_dept_code, emp_schedule }),
    });
    
    console.log('Сохранение сотрудника:', employee);
    // В реальном приложении здесь был бы код для отправки данных на сервер
}

// Функция для удаления сотрудника
function deleteEmployee(id) {
    // В реальном приложении здесь был бы запрос к API или базе данных для удаления
    console.log('Удаление сотрудника с ID:', id);
    // В реальном приложении здесь был бы код для отправки запроса на удаление
}

// Функция для фильтрации сотрудников
function filterEmployees(query) {
    const rows = document.querySelectorAll('#employees-table-body tr');
    
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