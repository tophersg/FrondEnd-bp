import { Injectable } from '@angular/core';
import axios from 'axios'; // Importa Axios
import { Observable } from 'rxjs';
import { informacion } from '../interface/informacion.interface';

@Injectable({
    providedIn: 'root'
})
export class TribuService {

    private apiUrl = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';
    private apiUrlVerif = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products/verification';
    updateData: any = {};
    constructor() { }

    async getDatos(test: any): Promise<any> {
        try {
            //const authorId = this.generateAuthorId();
            const authorId = test;
            const headers = {
                'authorid': authorId.toString()
            };
            const response = await axios.get(this.apiUrl, { headers });
            return response.data;
        } catch (error) {
            console.error("Error en la solicitud HTTP:", error);
            throw error;
        }
    }
    async verificationId(id: string): Promise<any> {
        try {
            const url = `${this.apiUrlVerif}?id=${id}`
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error("Error en la solicitud HTTP:", error);
            throw error;
        }
    }
    async postDatos(data: informacion): Promise<any> {
        try {
            const authorId = 2;
            const headers = {
                'authorid': authorId.toString()
            };
            const resVerification = await this.verificationId(data.id)
            if (resVerification) {
                return false;
            } else {
                // Realiza la solicitud HTTP con Axios
                const response = await axios.post(this.apiUrl, data, { headers });
                return response.data;
            }

        } catch (error) {
            console.error("Error en la solicitud HTTP:", error);
            throw error;
        }
    }
    async deleteDatos(id: string): Promise<any> {
        try {
            //const authorId = this.generateAuthorId();
            const authorId = 2;
            const headers = {
                'authorid': authorId.toString()
            };
            const url = `${this.apiUrl}?id=${id}`
            const response = await axios.delete(url, { headers });

            return response.data;
        } catch (error) {
            console.error("Error en la solicitud HTTP:", error);
            throw error;
        }
    }

    async updateDatos(data: informacion) {
        console.log("🚀 ~ TribuService ~ updateDatos ~ data:", data)
        try {
            const authorId = 2;
            const headers = {
                'authorid': authorId.toString()
            };
            const url = `${this.apiUrl}?id=${data.id}`
            console.log("🚀 ~ TribuService ~ updateDatos ~ url:", url)

            const response = await axios.put(url, data, { headers });
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
