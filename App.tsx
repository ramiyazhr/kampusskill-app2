
import React, { useState, useCallback, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ServicesProvider } from './contexts/ServicesContext';
import Header from './components/Header';
import ServiceList from './components/ServiceList';
import ProfilePage from './components/ProfilePage';
import AdminPanel from './components/AdminPanel';
import ToastContainer from './components/ToastContainer';
import { ToastProvider } from './contexts/ToastContext';
import { Service } from './types';
import ServiceDetail from './components/ServiceDetail';

type Page = 'home' | 'profile' | 'admin';

const AppContent: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            setCurrentPage('home');
        } else if (user.role === 'admin' && currentPage === 'home') {
            // Keep admin on home unless they navigate elsewhere
        } else if (user.role !== 'admin' && currentPage === 'admin') {
            setCurrentPage('home');
        }
    }, [user, currentPage]);

    const renderPage = () => {
        switch (currentPage) {
            case 'profile':
                return <ProfilePage onViewDetail={setSelectedService} />;
            case 'admin':
                return user?.role === 'admin' ? <AdminPanel /> : <ServiceList onViewDetail={setSelectedService} />;
            case 'home':
            default:
                return <ServiceList onViewDetail={setSelectedService} />;
        }
    };

    return (
        <div className="min-h-screen bg-dark">
            <Header setCurrentPage={setCurrentPage} currentPage={currentPage} />
            <main className="container mx-auto px-4 py-8">
                {renderPage()}
            </main>
            <ToastContainer />

            {selectedService && (
                <ServiceDetail 
                    service={selectedService} 
                    onClose={() => setSelectedService(null)} 
                />
            )}
        </div>
    );
};

const App: React.FC = () => {
    return (
        <ToastProvider>
            <AuthProvider>
                <ServicesProvider>
                    <AppContent />
                </ServicesProvider>
            </AuthProvider>
        </ToastProvider>
    );
};

export default App;
