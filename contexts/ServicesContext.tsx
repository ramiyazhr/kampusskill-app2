import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { Service, NewServiceData, Rating } from '../types';
import { getInitialData, saveData } from '../services/dataService';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';
import { MAX_REPORTS_BEFORE_FLAG } from '../constants';

interface ServicesContextType {
    services: Service[];
    loading: boolean;
    addService: (serviceData: NewServiceData) => void;
    updateService: (serviceId: string, updatedData: Service) => void;
    deleteService: (serviceId: string) => void;
    addRating: (serviceId: string, rating: Rating) => void;
    reportService: (serviceId: string, userId: string) => void;
    approveService: (serviceId: string) => void;
    getTodaysPostsCount: (userId: string) => number;
    toggleFavorite: (serviceId: string) => void;
    isFavorite: (serviceId: string) => boolean;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export const ServicesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState<string[]>([]);
    const { addToast } = useToast();
    const { user } = useAuth();

    useEffect(() => {
        setLoading(true);
        // Simulate async fetch
        setTimeout(() => {
            const { services: initialServices } = getInitialData();
            setServices(initialServices);
            const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            setFavorites(storedFavorites);
            setLoading(false);
        }, 500);
    }, []);

    const updateAndSaveServices = useCallback((newServices: Service[]) => {
        setServices(newServices);
        saveData('services', newServices);
    }, []);

    const addService = useCallback((serviceData: NewServiceData) => {
        if (!user) return;
        const newService: Service = {
            id: `service_${Date.now()}`,
            ...serviceData,
            providerName: user.name,
            ratings: [],
            reports: [],
            createdAt: new Date().toISOString(),
            status: 'active'
        };
        updateAndSaveServices([...services, newService]);
    }, [services, user, updateAndSaveServices]);

    const updateService = useCallback((serviceId: string, updatedData: Service) => {
        const newServices = services.map(s => s.id === serviceId ? updatedData : s);
        updateAndSaveServices(newServices);
    }, [services, updateAndSaveServices]);

    const deleteService = useCallback((serviceId: string) => {
        // FIX: Explicitly cast `status` to its specific literal type to prevent type widening to `string`.
        const newServices = services.map(s => s.id === serviceId ? { ...s, status: 'deleted' as Service['status'] } : s);
        updateAndSaveServices(newServices);
        addToast("Jasa berhasil dihapus.", 'info');
    }, [services, addToast, updateAndSaveServices]);

    const addRating = useCallback((serviceId: string, rating: Rating) => {
        const newServices = services.map(s => {
            if (s.id === serviceId) {
                // Prevent user from rating their own service
                if (s.providerId === rating.userId) {
                    addToast("Anda tidak dapat memberi rating pada jasa sendiri.", "error");
                    return s;
                }
                // Prevent user from rating multiple times
                if (s.ratings.some(r => r.userId === rating.userId)) {
                    addToast("Anda sudah pernah memberi rating pada jasa ini.", "error");
                    return s;
                }
                return { ...s, ratings: [...s.ratings, rating] };
            }
            return s;
        });
        updateAndSaveServices(newServices);
    }, [services, addToast, updateAndSaveServices]);
    
    const reportService = useCallback((serviceId: string, userId: string) => {
        const newServices = services.map(s => {
            if (s.id === serviceId) {
                 if (s.providerId === userId) {
                    addToast("Anda tidak dapat melaporkan jasa sendiri.", "error");
                    return s;
                }
                if (s.reports.includes(userId)) {
                    addToast("Anda sudah pernah melaporkan jasa ini.", "error");
                    return s;
                }
                const newReports = [...s.reports, userId];
                const newStatus = newReports.length >= MAX_REPORTS_BEFORE_FLAG ? 'flagged' : s.status;
                if(newStatus === 'flagged') {
                    addToast(`Jasa "${s.title}" telah ditandai untuk ditinjau admin.`, "info");
                }
                return { ...s, reports: newReports, status: newStatus };
            }
            return s;
        });
        updateAndSaveServices(newServices);
    }, [services, addToast, updateAndSaveServices]);
    
    const approveService = useCallback((serviceId: string) => {
        const newServices = services.map(s => {
            if (s.id === serviceId) {
                // FIX: Explicitly cast `status` to its specific literal type to prevent type widening to `string`.
                return { ...s, status: 'active' as Service['status'], reports: [] };
            }
            return s;
        });
        updateAndSaveServices(newServices);
        addToast("Jasa berhasil disetujui kembali.", "success");
    }, [services, addToast, updateAndSaveServices]);

    const getTodaysPostsCount = useCallback((userId: string) => {
        const today = new Date().toISOString().split('T')[0];
        return services.filter(s => s.providerId === userId && s.createdAt.startsWith(today)).length;
    }, [services]);
    
    const toggleFavorite = useCallback((serviceId: string) => {
        const newFavorites = favorites.includes(serviceId)
            ? favorites.filter(id => id !== serviceId)
            : [...favorites, serviceId];
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }, [favorites]);

    const isFavorite = useCallback((serviceId: string) => {
        return favorites.includes(serviceId);
    }, [favorites]);


    return (
        <ServicesContext.Provider value={{ services, loading, addService, updateService, deleteService, addRating, reportService, approveService, getTodaysPostsCount, toggleFavorite, isFavorite }}>
            {children}
        </ServicesContext.Provider>
    );
};

export const useServices = () => {
    const context = useContext(ServicesContext);
    if (context === undefined) {
        throw new Error('useServices must be used within a ServicesProvider');
    }
    return context;
};
