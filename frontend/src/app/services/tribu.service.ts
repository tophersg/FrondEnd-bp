import { Injectable } from '@angular/core';
import axios from 'axios'; // Importa Axios
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TribuService {

    private apiUrl = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';

    constructor() { }

    async getDatos(test: any): Promise<any> {
        try {
            // Genera un authorid único

            //const authorId = this.generateAuthorId();
            const authorId = test;
            console.log("🚀 ~ TribuService ~ getDatos ~ authorId:", authorId)

            // Define los encabezados que deseas incluir en la solicitud, incluyendo el authorid
            const headers = {
                'authorid': authorId.toString()
            };

            // Realiza la solicitud HTTP con Axios
            const response = await axios.get(this.apiUrl, { headers });

            return response.data;
        } catch (error) {
            console.error("Error en la solicitud HTTP:", error);
            throw error;
        }
    }

    async deleteDatos(id: string): Promise<any> {
        try {
            //const authorId = this.generateAuthorId();
            const authorId = 2;
            // Define los encabezados que deseas incluir en la solicitud, incluyendo el authorid
            const headers = {
                'authorid': authorId.toString()
            };
            const url = `${this.apiUrl}?id=${id}`;            // Realiza la solicitud HTTP con Axios
            const response = await axios.delete(url, { headers });

            return response.data;
        } catch (error) {
            console.error("Error en la solicitud HTTP:", error);
            throw error;
        }
    }

    private generateAuthorId(): number {
        // Genera un número entero aleatorio entre 1 y 500
        return Math.floor(Math.random() * 500) + 1;
    }
}
