const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./api-part/database/db.sqlite');

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
        CREATE TABLE IF NOT EXISTS timesheetData (
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
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS table_chk (
            c_id INTEGER PRIMARY KEY AUTOINCREMENT,
            cName TEXT NOT NULL,
            cNum INTEGER,
            cStatus TEXT NOT NULL, 
            cDate INTEGER,
            ovt_work INTEGER,
            ovt_if_work INTEGER,
            tf_hours INTEGER,
            fond_hours INTEGER,
            cReason TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS statement (
            s_id INTEGER PRIMARY KEY AUTOINCREMENT,
            sName TEXT NOT NULL,
            sNum INTEGER,
            sDate INTEGER,
            sRes_type TEXT NOT NULL,
            sComp_type TEXT NOT NULL,
            time INTEGER,
            sReason TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS vacation (
            v_id INTEGER PRIMARY KEY AUTOINCREMENT,
            vName TEXT NOT NULL,
            vNum INTEGER,
            vStart_t INTEGER,
            vEnd_t INTEGER,
            vDays INTEGER,
            add_days INTEGER,
            vCom TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS ill_list (
            i_id INTEGER PRIMARY KEY AUTOINCREMENT,
            iName TEXT NOT NULL,
            iNum INTEGER,
            iStart_t INTEGER,
            iEnd_t INTEGER,
            iDays INTEGER,
            document TEXT NOT NULL,
            iCom TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS task (
            t_id INTEGER PRIMARY KEY AUTOINCREMENT,
            work_type TEXT NOT NULL,
            work_name TEXT NOT NULL,
            tCategory TEXT NOT NULL,
            tReason TEXT,
            dse_code INTEGER,
            dse_name TEXT NOT NULL,
            tStatus TEXT NOT NULL,
            product TEXT NOT NULL,
            result TEXT NOT NULL,
            term TEXT,
            owner TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS t_changes (
            w_id INTEGER PRIMARY KEY AUTOINCREMENT,
            hReas_type TEXT,
            hComp_type TEXT,
            hReason TEXT,
            hData INTEGER,
            hHOURS INTEGER
        )
    `);
});