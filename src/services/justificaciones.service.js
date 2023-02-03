import { urlService } from "./config";

const baseUrl = `${urlService}/api/v1/justificacion`;


const getAllJustificaciones= (token) => {
    return fetch(`${baseUrl}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });
}

const getJustificacionById = (id, token) => {
    return fetch(`${baseUrl}/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });
}

const ingresarJustificacion = (body, token) => {
    const formData = new FormData();

    for(const name in body) {
        formData.append(name, body[name]);
    }
    console.log(body);
    console.log(formData);
    
    return fetch(`${baseUrl}/registrar`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        body: formData
    });
}

const actualizarJustificacion = (id, body, token) => {
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
    getAllJustificaciones,
    getJustificacionById,
    ingresarJustificacion,
    actualizarJustificacion,
};