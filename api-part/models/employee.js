const db = require('../database/database.sqlite');

class Employee {
    static create(callback, name, tabNumber, position, department, deptCode, schedule) {
        const add = `INSERT INTO employee (name, tabNumber, position, department, deptCode, schedule) VALUES (?, ?, ?, ?, ?, ?)`;
        db.run(add, [name, tabNumber, position, department, deptCode, schedule], function(err) {
            callback(err, {id: this.lastID});
        });
    }

    static get(callback, name, tabNumber, position, department, deptCode, schedule) {
        const take = `SELECT * FROM employee`;
        db.run(take, [name, tabNumber, position, department, deptCode, schedule], function(err) {
            callback(err, {id: this.lastID});
        })
    }

    // здесь будет изменение
}
