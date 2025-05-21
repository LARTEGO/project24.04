// Скрипт для страницы сверхурочной работы

// Объявляем переменные openModal, closeModal, showNotification
// В реальном приложении они должны быть определены в другом месте (например, импортированы из модуля)
// Здесь мы просто определяем их как пустые функции, чтобы избежать ошибок
const openModal = (modalId) => {
    console.log(`Открытие модального окна: ${modalId}`);
    // В реальном приложении здесь должен быть код для открытия модального окна
};

const closeModal = (modalElement) => {
    console.log(`Закрытие модального окна`);
    // В реальном приложении здесь должен быть код для закрытия модального окна
};

const showNotification = (message, type) => {
    console.log(`Уведомление: ${message} (${type})`);
    // В реальном приложении здесь должен быть код для отображения уведомления
};

document.addEventListener('DOMContentLoaded', function() {
    // Загрузка данных сверхурочной работы
    loadOvertimeData();
    
    // Обработчик для кнопки добавления в список
    const addToListBtn = document.getElementById('add-to-list');
    if (addToListBtn) {
        addToListBtn.addEventListener('click', function() {
            // Открываем модальное окно для ввода обоснования
            openModal('reason-modal');
        });
    }
    
    // Обработчик для сохранения обоснования
    const saveReasonBtn = document.getElementById('save-reason');
    if (saveReasonBtn) {
        saveReasonBtn.addEventListener('click', function() {
            addEmployeeToOvertimeList();
            closeModal(document.getElementById('reason-modal'));
        });
    }
    
    // Обработчик для сохранения списка сверхурочной работы
    const saveOvertimeBtn = document.getElementById('save-overtime');
    if (saveOvertimeBtn) {
        saveOvertimeBtn.addEventListener('click', function() {
            saveOvertimeList();
            showNotification('Список сверхурочной работы сохранен', 'success');
        });
    }
    
    // Обработчик для кнопки удаления записи сверхурочной работы
    const confirmDeleteOvertimeBtn = document.getElementById('confirm-delete-overtime-btn');
    if (confirmDeleteOvertimeBtn) {
        confirmDeleteOvertimeBtn.addEventListener('click', function() {
            const employeeId = this.getAttribute('data-id');
            deleteOvertimeRecord(employeeId);
            closeModal(document.getElementById('confirm-delete-overtime'));
            showNotification('Запись успешно удалена', 'success');
            loadOvertimeEditData(); // Перезагружаем данные
        });
    }
    
    // Обработчик для печати списка
    const printOvertimeBtn = document.getElementById('print-overtime');
    if (printOvertimeBtn) {
        printOvertimeBtn.addEventListener('click', function() {
            printOvertimeList();
        });
    }
});

// Функция загрузки данных сверхурочной работы (имитация)
function loadOvertimeData() {
    // Загружаем данные для просмотра списка
    loadOvertimeViewData();
    
    // Загружаем данные для редактирования списка
    loadOvertimeEditData();
}

// Функция загрузки данных для просмотра списка (имитация)
function loadOvertimeViewData() {
    // В реальном приложении здесь был бы запрос к API или базе данных
    const overtimeData = [
        { id: 1, name: 'Иванов Иван Иванович', position: 'Инженер', department: 'ИТ отдел', reason: 'Срочное обновление системы', dayHours: 2, nightHours: 0 },
        { id: 2, name: 'Петров Петр Петрович', position: 'Менеджер', department: 'Отдел продаж', reason: 'Подготовка отчетности', dayHours: 3, nightHours: 0 },
        { id: 3, name: 'Козлов Алексей Сергеевич', position: 'Водитель', department: 'Транспортный отдел', reason: 'Доставка срочного груза', dayHours: 2, nightHours: 2 }
    ];
    
    const tableBody = document.getElementById('overtime-view-table-body');
    if (tableBody) {
        tableBody.innerHTML = '';
        
        overtimeData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.position}</td>
                <td>${item.department}</td>
                <td>${item.reason}</td>
                <td>${item.dayHours}</td>
                <td>${item.nightHours}</td>
            `;
            
            tableBody.appendChild(row);
        });
    }
}

// Функция загрузки данных для редактирования списка (имитация)
function loadOvertimeEditData() {
    // В реальном приложении здесь был бы запрос к API или базе данных
    const overtimeData = [
        { id: 1, name: 'Иванов Иван Иванович', position: 'Инженер', department: 'ИТ отдел', reason: 'Срочное обновление системы', dayHours: 2, nightHours: 0 },
        { id: 2, name: 'Петров Петр Петрович', position: 'Менеджер', department: 'Отдел продаж', reason: 'Подготовка отчетности', dayHours: 3, nightHours: 0 },
        { id: 3, name: 'Козлов Алексей Сергеевич', position: 'Водитель', department: 'Транспортный отдел', reason: 'Доставка срочного груза', dayHours: 2, nightHours: 2 }
    ];
    
    const tableBody = document.getElementById('overtime-edit-table-body');
    if (tableBody) {
        tableBody.innerHTML = '';
        
        overtimeData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.position}</td>
                <td>${item.department}</td>
                <td>${item.reason}</td>
                <td>${item.dayHours}</td>
                <td>${item.nightHours}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit" data-id="${item.id}" title="Редактировать">
                            <i class="icon">✏️</i>
                        </button>
                        <button class="action-btn delete" data-id="${item.id}" title="Удалить">
                            <i class="icon">🗑️</i>
                        </button>
                    </div>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
        
        // Добавляем обработчики для кнопок редактирования и удаления
        addOvertimeActionButtonHandlers();
    }
    
    // Загружаем данные для таблицы подачи списка
    const submitTableBody = document.getElementById('overtime-table-body');
    if (submitTableBody) {
        submitTableBody.innerHTML = ''; // Очищаем таблицу
    }
}

// Функция для добавления обработчиков кнопок действий
function addOvertimeActionButtonHandlers() {
    // Обработчики для кнопок редактирования
    const editButtons = document.querySelectorAll('#overtime-edit-table-body .action-btn.edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const employeeId = this.getAttribute('data-id');
            editOvertimeRecord(employeeId);
        });
    });
    
    // Обработчики для кнопок удаления
    const deleteButtons = document.querySelectorAll('#overtime-edit-table-body .action-btn.delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const employeeId = this.getAttribute('data-id');
            document.getElementById('confirm-delete-overtime-btn').setAttribute('data-id', employeeId);
            openModal('confirm-delete-overtime');
        });
    });
}

// Функция для добавления сотрудника в список сверхурочной работы
function addEmployeeToOvertimeList() {
    // Получаем данные из формы
    const employeeName = document.getElementById('overtime-employee-name').value || 'Иванов Иван Иванович'; // Для демонстрации
    const reason = document.getElementById('overtime-reason').value;
    const dayHours = document.getElementById('day-hours').value;
    const nightHours = document.getElementById('night-hours').value;
    
    // В реальном приложении здесь был бы запрос к API для получения дополнительных данных о сотруднике
    const position = 'Инженер'; // Для демонстрации
    const department = 'ИТ отдел'; // Для демонстрации
    
    // Добавляем строку в таблицу
    const tableBody = document.getElementById('overtime-table-body');
    if (tableBody) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employeeName}</td>
            <td>${position}</td>
            <td>${department}</td>
            <td>${reason}</td>
            <td>${dayHours}</td>
            <td>${nightHours}</td>
        `;
        
        tableBody.appendChild(row);
    }
    
    // Очищаем поля формы
    document.getElementById('overtime-employee-number').value = '';
    document.getElementById('overtime-employee-name').value = '';
    document.getElementById('overtime-reason').value = '';
    document.getElementById('day-hours').value = '0';
    document.getElementById('night-hours').value = '0';
    
    showNotification('Сотрудник добавлен в список', 'success');
}

// Функция для редактирования записи сверхурочной работы
function editOvertimeRecord(id) {
    // В реальном приложении здесь был бы запрос к API для получения данных записи
    // Имитация получения данных
    const record = {
        id: id,
        name: 'Иванов Иван Иванович',
        reason: 'Срочное обновление системы',
        dayHours: 2,
        nightHours: 0
    };
    
    // Заполняем форму данными
    document.getElementById('edit-overtime-employee-name').value = record.name;
    document.getElementById('overtime-reason').value = record.reason;
    document.getElementById('day-hours').value = record.dayHours;
    document.getElementById('night-hours').value = record.nightHours;
    
    // Открываем модальное окно
    openModal('reason-modal');
}

// Функция для удаления записи сверхурочной работы
function deleteOvertimeRecord(id) {
    // В реальном приложении здесь был бы запрос к API для удаления записи
    console.log('Удаление записи сверхурочной работы с ID:', id);
    // В реальном приложении здесь был бы код для отправки запроса на удаление
}

// Функция для сохранения списка сверхурочной работы
function saveOvertimeList() {
    // В реальном приложении здесь был бы запрос к API для сохранения списка
    console.log('Сохранение списка сверхурочной работы');
    // В реальном приложении здесь был бы код для отправки данных на сервер
}

// Функция для печати списка сверхурочной работы
function printOvertimeList() {
    // Создаем новое окно для печати
    const printWindow = window.open('', '_blank');
    
    // Формируем содержимое для печати
    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Список сверхурочной работы</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                }
                h1 {
                    text-align: center;
                    font-size: 18px;
                    margin-bottom: 20px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <h1>Список сотрудников на сверхурочную работу</h1>
            <table>
                <thead>
                    <tr>
                        <th>ФИО</th>
                        <th>Должность</th>
                        <th>Подразделение</th>
                        <th>Обоснование</th>
                        <th>Часы (день)</th>
                        <th>Часы (ночь)</th>
                    </tr>
                </thead>
                <tbody>
                    ${document.getElementById('overtime-view-table-body').innerHTML}
                </tbody>
            </table>
        </body>
        </html>
    `;
    
    // Записываем содержимое в новое окно
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Ждем загрузки содержимого и вызываем печать
    printWindow.onload = function() {
        printWindow.print();
    };
}