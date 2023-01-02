function sendEmail(e) {
    e.preventDefault();

    const email = document.contact.email.value;
    const messageType = document.contact.type.value;
    const message = document.contact.message.value;

    fetch(`${url}/email/send-to-company`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            username: sessionStorage.getItem('firstName'),
            emailType: messageType,
            message: message
        }),
    })
        .then((res) => res.json())
        .then((res) => {
            popup.setAttribute('status', 'success');
            popup.setAttribute('text', `Email successfully sent.`);
        })
        .catch((err) => {
            popup.setAttribute('status', 'error');
            popup.setAttribute('text', `Email could not be sent.`);
        });

    return false;
}