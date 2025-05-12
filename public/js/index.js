const login = document.getElementById('login-cheek').value;
const password = document.getElementById('password-cheek').value;

document.getElementById('aut').onclick = async () => {

    const res = await fetch('/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({password, login})
    });

    const data = await res.json();

    if (data.success) {
        window.location = '/main.html';
    }

    else {
        console.log('данные не совпали');
    }
}