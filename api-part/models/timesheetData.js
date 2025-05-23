const db = require('../../api-part/database/db.sqlite');

class timesheetData {
    static create(callback, startDate, endDate, days, additionalDays, docNumber, comment) {
        const take = `SELECT name, tabNumber FROM employee INNER JOIN timesheetData ON employee.tabNumber = timesheetData.tabNumber`;
        db.run(take, [name, tabNumber, startDate, endDate, days, additionalDays, docNumber, comment], function(err) {
            callback(err, {id: this.lastId})
        });
    }
}