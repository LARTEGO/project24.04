const db = require('../../api-part/database/db.sqlite');

class employee {
    static create(callback, name, number, position, department, dept_code, schedule) {
        const add = `INSERT INTO employee (name, number, position, department, dept_code, schedule) VALUES (?, ?, ?, ?, ?, ?)`;
        db.run(add, [name, tabNumber, position, department, deptCode, schedule], function(err) {
            callback(err, {id: this.lastId});
        });
    }

    static get(callback, name, number, position, department, dept_code, schedule) {
        const take = `SELECT * FROM employee`;
        db.run(take, [name, number, position, department, dept_code, schedule], function(err) {
            callback(err, {id: this.lastId});
        })
    }

    // здесь будет изменение
}