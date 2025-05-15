const login = document.getElementById('login-cheek').value;
const password = document.getElementById('password-cheek').value;
// получаем введённые данные

document.getElementById('aut').onclick = async () => {

    const res = await fetch('/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({password, login})
    });
    // описание метода
    // используется метод POST для отправки введённых данных на сравнение с имеющимися в таблице user

    const data = await res.json();

    if (data.success) {
        window.location = '/main.html';
        // при совпадении данных перенаправление на главную страницу 
    }

    else {
        console.log('данные не совпали');
    }
}