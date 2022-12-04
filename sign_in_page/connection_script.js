function authenticateUser(e) {
    e.preventDefault();

    const url = 'http://localhost:5000/users/auth';
    const data = {
        email: document.login.email.value,
        password: document.login.password.value
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('userID', data.id);
            window.location.replace("./../home_page/home_page.html");
        })
        .catch(err => console.error(err));

    return false;
}