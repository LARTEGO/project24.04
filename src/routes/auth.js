const sqlite3 = require('sqlite3').verbose();
const db = sqlite3.Database('/db.sqlite'); // подключение к базе данных

app.post('/login', (req, res) => {
    const {login, password} = req.body; // нужные данные для входа
    db.run('SELECT * FROM user WHERE login = ? AND password = ?', [login, password], (err, row) => {
        // запрос логина и пароля из таблицы user файла db.sqlite
        if (err) return res.json({success:false});

        if (row) {
            res.json({success:true});

        } else {
            res.json({success:false});
        }
    });
});
// тестовый вариант регистрации