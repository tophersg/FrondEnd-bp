import { Injectable } from '@angular/core';
import axios from 'axios'; // Importa Axios
import { Observable } from 'rxjs';
import { informacion } from '../interface/informacion.interface';

@Injectable({
    providedIn: 'root'
})
export class TribuService {
    private authorId: number; // Variable privada para almacenar el authorId

    apiUrl = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';
    apiUrlVerif = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products/verification';
    updateData: any = {};
    constructor() {
        // Verifica si localStorage está disponible antes de usarlo
        if (typeof localStorage !== 'undefined') {
            this.authorId = this.getStoredAuthorId() ?? this.generateAuthorId();
            this.storeAuthorId(this.authorId);
        } else {
            // Si localStorage no está disponible, genera un authorId aleatorio
            this.authorId = this.generateAuthorId();
        }

    }

    async getDatos(): Promise<any> {
        try {
            //const authorId = this.generateAuthorId();
            const headers = {
                'authorid': this.authorId.toString()
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
            const headers = {
                'authorid': this.authorId.toString()
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
            const headers = {
                'authorid': this.authorId.toString()
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
        try {
            const authorId = 2;
            const headers = {
                'authorid': this.authorId.toString()
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

    generateAuthorId(): number {
        // Genera un número entero aleatorio entre 1 y 500
        return Math.floor(Math.random() * 500) + 1;
    }

    private storeAuthorId(authorId: number): void {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('authorId', authorId.toString());
        }
    }

    private getStoredAuthorId(): number | null {
        if (typeof localStorage !== 'undefined') {
            const storedAuthorId = localStorage.getItem('authorId');
            return storedAuthorId ? parseInt(storedAuthorId, 10) : null;
        }
        return null;
    }
}