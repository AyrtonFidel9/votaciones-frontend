const baseUrl = 'http://localhost:8080/api/v1/cuentas';


const updateCuentaUsuario = (idUsuario, password) => {
    return fetch(`${baseUrl}/reboot/${idUsuario}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newPassword: password })
    });
}

const updateAllDataCuenta = (idSocio, body, token) => {
    return fetch(`${baseUrl}/${idSocio}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(body)
    });
}

const getCuenta = (id, token) => {
    return fetch(`${baseUrl}/findById/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    });
}

const getCuentaBySocio = (idSocio, token) => {
    return fetch(`${baseUrl}/${idSocio}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    });
}

export { 
    updateCuentaUsuario, 
    getCuenta, 
    getCuentaBySocio,
    updateAllDataCuenta,
};