import { urlService } from "./config";

const baseUrl = `${urlService}/api/v1/socios`;

const enviarVoto = (body, token) => {
    return fetch(`${baseUrl}/enviar-voto`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(body)
    });
}

const retornarBalance = (wallet, token) => {
    return fetch(`${baseUrl}/obtener-balance/${wallet}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    });
}

const enviarToken = (body, token) => {
    return fetch(`${baseUrl}/enviar-token`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(body)
    });
}

const enviarEther = (body, token) => {
    return fetch(`${baseUrl}/enviar-ether`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(body)
    });
}

const validarSufragio = (body, token) => {
    return fetch(`${baseUrl}/validar-sufragio`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(body)
    });
}

export { 
    enviarVoto,
    retornarBalance,
    enviarToken,
    enviarEther,
    validarSufragio,
};