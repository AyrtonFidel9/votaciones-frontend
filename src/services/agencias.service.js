const baseUrl = 'http://localhost:8080/api/v1/agencia';


const getAllAgencias = (token) => {
    return fetch(`${baseUrl}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });
}

const ingresarAgencia = (body, token) => {
    return fetch(`${baseUrl}/registrar`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(body)
    });
}

const eliminarAgencia = (idAgencia, token) => {
    return fetch(`${baseUrl}/delete/${idAgencia}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });
}


export { 
    getAllAgencias,
    ingresarAgencia,
    eliminarAgencia,
};