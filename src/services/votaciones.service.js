import { urlService } from "./config";

const baseUrl = `${urlService}/api/v1/votaciones`;

const enviarVoto = (body, token) => {
  return fetch(`${baseUrl}/enviar-voto`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(body),
  });
};

const retornarCantVotos = (idRep, idElec, token) => {
  return fetch(`${baseUrl}/obtener-votos/${idRep}&${idElec}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

const validarSufragio = (body, token) => {
  return fetch(`${baseUrl}/validar-sufragio`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(body),
  });
};

export { enviarVoto, retornarCantVotos, validarSufragio };
