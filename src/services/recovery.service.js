import { urlService } from "./config";

const baseUrl = `${urlService}/api/v1/recuperacion`;

const enviarCodigo = (number) => {
    return fetch(`${baseUrl}/ingresar/${number}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
}

const actualizarEstadoCodigo = (codigo) => {
    return fetch(`${baseUrl}/actualizarEstado/${codigo}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
}

export { enviarCodigo, actualizarEstadoCodigo };