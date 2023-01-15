const baseUrl = 'http://localhost:8080/api/v1/inscripciones';


const getAllInscripciones = (token) => {
    return fetch(`${baseUrl}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });
}

const getInscripcionById = (id, token) => {
    return fetch(`${baseUrl}/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });
}

const ingresarInscripcion = (body, token) => {
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

const actualizarInscripcion = (id, body, token) => {
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
    getAllInscripciones,
    getInscripcionById,
    ingresarInscripcion,
    actualizarInscripcion,
};