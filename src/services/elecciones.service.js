import { urlService } from "./config";

const baseUrl = `${urlService}/api/v1/elecciones`;

const ingresarElecccion = (body, token) => {
   return fetch(`${baseUrl}/registrar`, {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(body),
   });
}

const getAllEleccciones = (token) => {
   return fetch(`${baseUrl}/`, {
      method: 'GET',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + token
      },
   });
}

const deleteEleccion = (idEleccion, token) => {
   return fetch(`${baseUrl}/delete/${idEleccion}`, {
      method: 'DELETE',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + token
      },
   });
}

const updateEleccion = (idEleccion, body, token) => {
   return fetch(`${baseUrl}/update/${idEleccion}`, {
      method: 'PUT',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(body),
   });
}

export {
   ingresarElecccion,
   getAllEleccciones,
   deleteEleccion,
   updateEleccion,
};

