
import React from 'react';
import { useServices } from '../contexts/ServicesContext';
import { useAuth } from '../contexts/AuthContext';
import { Service } from '../types';

const AdminPanel: React.FC = () => {
    const { services, approveService, deleteService } = useServices();
    const { users } = useAuth();
    
    const reportedServices = services.filter(s => s.status === 'flagged');

    const handleDataExport = () => {
        const data = {
            users,
            services,
        };
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(data, null, 2)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "kampusskill_data.json";
        link.click();
    };

    return (
        <div className="bg-slate-900/50 p-6 rounded-lg shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Panel Admin</h1>
                <button
                    onClick={handleDataExport}
                    className="bg-secondary text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-violet-700 transition-colors"
                >
                    Export Data (JSON)
                </button>
            </div>

            <h2 className="text-xl font-semibold text-sky-400 mt-8 mb-4">Jasa yang Dilaporkan</h2>

            {reportedServices.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-slate-800 rounded-lg">
                        <thead className="bg-slate-700">
                            <tr>
                                <th className="text-left py-3 px-4 text-slate-300 font-semibold text-sm">Judul Jasa</th>
                                <th className="text-left py-3 px-4 text-slate-300 font-semibold text-sm">Penyedia</th>
                                <th className="text-left py-3 px-4 text-slate-300 font-semibold text-sm">Laporan</th>
                                <th className="text-left py-3 px-4 text-slate-300 font-semibold text-sm">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportedServices.map(service => (
                                <tr key={service.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                                    <td className="py-3 px-4 text-white">{service.title}</td>
                                    <td className="py-3 px-4 text-slate-300">{service.providerName}</td>
                                    <td className="py-3 px-4 text-slate-300">{service.reports.length}</td>
                                    <td className="py-3 px-4 flex space-x-2">
                                        <button
                                            onClick={() => approveService(service.id)}
                                            className="bg-green-600 text-white px-3 py-1 rounded-md text-xs font-semibold hover:bg-green-500"
                                        >
                                            Setujui
                                        </button>
                                        <button
                                            onClick={() => deleteService(service.id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded-md text-xs font-semibold hover:bg-red-500"
                                        >
                                            Hapus
                                        </button>
                                         <button disabled className="bg-yellow-600 text-white px-3 py-1 rounded-md text-xs font-semibold opacity-50 cursor-not-allowed">
                                            Peringatan
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-slate-400">Tidak ada jasa yang dilaporkan saat ini.</p>
            )}
        </div>
    );
};

export default AdminPanel;
