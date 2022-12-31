const baseUrl = 'http://localhost:8080/api/v1/representantes';


const ingresarRepresentante = (body, token) => {
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

const getAllRepresentantes = (token) => {
   return fetch(`${baseUrl}/`, {
      method: 'GET',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + token
      },
   });
}

const deleteRepresentante = (idRepresentante, token) => {
   return fetch(`${baseUrl}/delete/${idRepresentante}`, {
      method: 'DELETE',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + token
      },
   });
}

const updateRepresentante = (idRepresentante, body, token) => {
   return fetch(`${baseUrl}/update/${idRepresentante}`, {
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
   ingresarRepresentante,
   getAllRepresentantes,
   deleteRepresentante,
   updateRepresentante,
};


