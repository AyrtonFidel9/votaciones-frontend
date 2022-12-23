const baseUrl = 'http://localhost:8080/api/v1/iniciar-sesion';

const authentication = (cuenta) => {
    console.log(cuenta);
    return fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cuenta)
    });
}

export { authentication };