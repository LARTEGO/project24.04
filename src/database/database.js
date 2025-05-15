const sqlite3 = require('sqlite3').verbose();
   const db = new sqlite3.Database('./db.sqlite');

   db.serialize(() => {
       db.run(`
        CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            * username TEXT NOT NULL,
            * email TEXT  UNIQUE,
            login TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
        CREATE TABLE IF NOT EXISTS work (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            w_type TEXT NOT NULL,
            owner TEXT
       )
        CREATE TABLE IF NOT EXISTS task (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task_name TEXT,
            work_id INTEGER,
            task_category INTEGER,
            task_reason TEXT,
            dse_code INTEGER,
            dse_name TEXT,
            task_status TEXT,
            product TEXT,
            result TEXT,
            termition TEXT,
            owner TEXT
       )
       `);
       });

   module.exports = db;