const baseUrl = 'http://localhost:8080/api/v1/socios';

const existUsuarioByPhone = (number) => {
    return fetch(`${baseUrl}/existbyPhone/${number}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
}

const getAllUsuarios = (token) => {
    return fetch(`${baseUrl}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });
}

const deleteUsuario = (idUsuario, token) => {
    return fetch(`${baseUrl}/delete/${idUsuario}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });
}

const getUsuarioById = (id, token) => {
    return fetch(`${baseUrl}/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });
}

const ingresarUsuario = (body, token) => {
    const formData = new FormData();

    for(const name in body) {
        formData.append(name, body[name]);
    }
    
    return fetch(`${baseUrl}/registrar`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: formData
    });
}

const actualizarUsuario = (id, body, token) => {
    const formData = new FormData();

    for(const name in body) {
        formData.append(name, body[name]);
    }
    
    return fetch(`${baseUrl}/update/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: formData
    });
}

export { 
    existUsuarioByPhone, 
    getAllUsuarios, 
    deleteUsuario, 
    getUsuarioById,
    ingresarUsuario,
    actualizarUsuario,
};