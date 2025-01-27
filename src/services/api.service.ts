export class ApiService {

    static async validationApi() {
        try {
            const response = await fetch("https://api.restful-api.dev/objects");
            return await response.json();
        } catch (error) {
            console.error("Error on call API: ", error)
            throw new Error('Erro ao validar com o backend.');
        }
    }
}