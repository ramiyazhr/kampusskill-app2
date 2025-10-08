
import React, { useState, useMemo } from 'react';
import { useServices } from '../contexts/ServicesContext';
import ServiceCard from './ServiceCard';
import { Service, ServiceCategory } from '../types';
import { CATEGORIES, SORT_OPTIONS } from '../constants';
import Spinner from './Spinner';

interface ServiceListProps {
    onViewDetail: (service: Service) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({ onViewDetail }) => {
    const { services, loading } = useServices();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
    const [sortOption, setSortOption] = useState<keyof typeof SORT_OPTIONS>('newest');

    const filteredAndSortedServices = useMemo(() => {
        let result = services.filter(s => s.status === 'active' && s.photo);

        if (searchTerm) {
            result = result.filter(service =>
                service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory !== 'all') {
            result = result.filter(service => service.category === selectedCategory);
        }

        switch (sortOption) {
            case 'rating':
                result.sort((a, b) => {
                    const avgA = a.ratings.length ? a.ratings.reduce((sum, r) => sum + r.rating, 0) / a.ratings.length : 0;
                    const avgB = b.ratings.length ? b.ratings.reduce((sum, r) => sum + r.rating, 0) / b.ratings.length : 0;
                    return avgB - avgA;
                });
                break;
            case 'price_asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'newest':
            default:
                result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
        }

        return result;
    }, [services, searchTerm, selectedCategory, sortOption]);

    return (
        <div>
            <div className="bg-slate-800 p-4 rounded-lg mb-8 shadow-lg sticky top-20 z-40">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Cari jasa (mis. 'desain logo')"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-700 text-white placeholder-slate-400 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value as ServiceCategory | 'all')}
                        className="w-full bg-slate-700 text-white border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="all">Semua Kategori</option>
                        {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value as keyof typeof SORT_OPTIONS)}
                        className="w-full bg-slate-700 text-white border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        {Object.entries(SORT_OPTIONS).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Spinner />
                </div>
            ) : filteredAndSortedServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAndSortedServices.map(service => (
                        <ServiceCard key={service.id} service={service} onViewDetail={() => onViewDetail(service)} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <h2 className="text-2xl font-semibold text-slate-400">Oops! Jasa tidak ditemukan.</h2>
                    <p className="text-slate-500 mt-2">Coba ubah kata kunci pencarian atau filter Anda.</p>
                </div>
            )}
        </div>
    );
};

export default ServiceList;
