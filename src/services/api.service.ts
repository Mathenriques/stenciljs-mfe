export class ApiService {

    static async validationApi() {
        return fetch("https://api.restful-api.dev/objects")
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao validar com o backend.');
            }
            return response.json();
        })
        .catch(error => {
            console.error("Error on call API: ", error);
            throw error; // Re-throw the error if needed
        });
    }
}