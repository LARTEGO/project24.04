const employee = require('../models/employee.js')

router.post('/api/employee', (res, req) => {
    const {name, tabNumber, position, department, deptCode, schedule} = req.body;
    employee.create(name, tabNumber, position, department, deptCode, schedule, (err, employee) => {
        if (err) {
            return res.status(400).json({ ошибка: err.message});
        }
        res.status(201).json({ID: employee.id})
    });
});