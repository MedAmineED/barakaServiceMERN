import axios from "axios";
import DemandeService from "src/entities/DemandeServiceEntity";

interface getType {
    totalCount: number,
    demandeServiceList: DemandeService[]
}

class DemandeServiceServices {
    
    async GetListDemandeService(endpoint: string): Promise<getType> {
        try {
            const response = await axios.get<getType>(endpoint, {
                headers: {
                    Authorization: `Bearer token`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }

    async GetDemandeServiceById(endpoint: string, id: number): Promise<DemandeService> {
        try {
            const response = await axios.get<DemandeService>(`${endpoint}/${id}`, {
                headers: {
                    Authorization: `Bearer token`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }

    async AddDemandeService(endpoint: string, demandeService: DemandeService): Promise<DemandeService> {
        try {
            const response = await axios.post<DemandeService>(endpoint, demandeService, {
                headers: {
                    Authorization: `Bearer token`,
                    'Content-Type': 'application/json'
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error adding DemandeService:", error);
            throw error;
        }
    }

    async UpdateDemandeService(endpoint: string, id: number, demandeService: DemandeService): Promise<DemandeService> {
        try {
            const response = await axios.put<DemandeService>(`${endpoint}/${id}`, demandeService, {
                headers: {
                    Authorization: `Bearer token`,
                    'Content-Type': 'application/json'
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error updating DemandeService:", error);
            throw error;
        }
    }

    async DeleteDemandeService(endpoint: string, id: number): Promise<DemandeService> {
        try {
            const response = await axios.delete<DemandeService>(`${endpoint}/${id}`, {
                headers: {
                    Authorization: `Bearer token`,
                    'Content-Type': 'application/json'
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error deleting DemandeService:", error);
            throw error;
        }
    }
}

export default new DemandeServiceServices();
