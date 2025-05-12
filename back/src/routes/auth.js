const sqlite3 = require('sqlite3').verbose();
const db = sqlite3.Database('/db.sqlite');

app.post('/login', (req, res) => {
    const {login, password} = req.body;
    db.run('SELECT * FROM user WHERE login = ? AND password = ?', [login, password], (err, row) => {

        if (err) return res.json({success:false});

        if (row) {
            res.json({success:true});

        } else {
            res.json({success:false});
        }
    });
});
