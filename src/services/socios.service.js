const baseUrl = 'http://localhost:8080/api/v1/socios/existbyPhone';

const existSocioByPhone = (number) => {
    return fetch(`${baseUrl}/${number}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
}

export { existSocioByPhone };