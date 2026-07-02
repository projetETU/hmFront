import { defineStore } from 'pinia';
import api from '@/api/api';
import router from '@/router';

export const useCommandeStore = defineStore('commande', {
    state: () => ({
        commandes: [] as any[],
        CommandeDetails: [] as any[],
        loading: false,
    }),
    actions: {
        setCommandes(commandes: any[]) {
            this.commandes = commandes;
        },
        getCommandes() {
            return this.commandes;
        },
        getCommandeById(id: number) {
            const data = this.commandes.find((commande: any) => commande.id === id);
            if (!data) {
                router.push({
                    name: '404 Error',
                    query: { message: 'Commande non trouvée' }
                });
            }
            return data;
        },
        async fetchCommandes() {
            try {
                this.loading = true;
                const response = await api.get('api/commande/first5');
                const data = Array.isArray(response.data) ? response.data : [];
                if (data.length === 0) {
                    router.push({
                        name: '404 Error',
                        query: { message: 'Aucune commande trouvée' }
                    });
                    return;
                }
                this.commandes = data;
            } catch (error) {
                console.error('Error fetching commandes:', error);
                router.push({
                    name: '404 Error',
                    query: { message: 'Erreur lors du chargement des commandes' }
                });
            } finally {
                this.loading = false;
            }
        },
        async fetchCommandesRecherche(numeroFacture?: string, date?: string) {
            try {
                this.loading = true;
                const params: Record<string, any> = {};
                if (numeroFacture) params.numeroFacture = numeroFacture;
                if (date) params.date = date;


                const response = await api.get('api/commande/recherche', { params });

                const data = Array.isArray(response.data) ? response.data : [];

                this.commandes = data;

            } catch (error) {
                console.error('❌ Erreur:', error);
            } finally {
                this.loading = false;
            }
        },
        async fetchCommandeDetails(id: number) {
            try {
                this.loading = true;
                const response = await api.get(`api/commande/details/${id}`);
                if (!response.data || response.data.length === 0) {
                    router.push({
                        name: '404 Error',
                        query: { message: `Aucun détail trouvé pour la commande #${id}` }
                    });
                    return;
                }
                this.CommandeDetails = response.data;
            } catch (error) {
                console.error('Error fetching commande details:', error);
                router.push({
                    name: '404 Error',
                    query: { message: 'Erreur lors du chargement des détails' }
                });
            } finally {
                this.loading = false;
            }
        }
    }
});