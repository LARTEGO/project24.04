const db = require('../../api-part/database/db.sqlite');

class employee {
    static create(callback, name, tabNumber, position, department, deptCode, schedule) {
        const add = `INSERT INTO employee (name, tabNumber, position, department, deptCode, schedule) VALUES (?, ?, ?, ?, ?, ?)`;
        db.run(add, [name, tabNumber, position, department, deptCode, schedule], function(err) {
            callback(err, {id: this.lastId});
        });
    }

    static get(callback, name, tabNumber, position, department, deptCode, schedule) {
        const take = `SELECT * FROM employee`;
        db.run(take, [name, tabNumber, position, department, deptCode, schedule], function(err) {
            callback(err, {id: this.lastId});
        })
    }

    // здесь будет изменение
}