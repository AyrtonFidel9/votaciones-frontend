const baseUrl = 'http://localhost:8080/api/v1/cuentas';


const updateCuentaSocio = (idSocio, password) => {
    return fetch(`${baseUrl}/reboot/${idSocio}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newPassword: password })
    });
}

export { updateCuentaSocio };