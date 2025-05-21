const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('/db.sqlite');
    
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS employee (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                tabNumber TEXT NOT NULL,
                position TEXT NOT NULL,
                department TEXT NOT NULL,
                deptCode TEXT NOT NULL,
                schedule TEXT NOT NULL
            )
            `);

        db.run(`
            CREATE TABLE IF EXISTS timesheetData (
                id INTEGER,
                name TEXT NOT NULL,
                tabNumber TEXT NOT NULL,
                startDate TEXT NOT NULL,
                endDate TEXT NOT NULL,
                days INTEGER NOT NULL,
                additionalDays INTEGER NOT NULL,
                docNumber TEXT NOT NULL,
                comment TEXT
            )
            `)
    });