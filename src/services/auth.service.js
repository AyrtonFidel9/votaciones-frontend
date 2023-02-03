import { urlService } from "./config";

const baseUrl = `${urlService}/api/v1/iniciar-sesion`;

const authentication = (cuenta) => {
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