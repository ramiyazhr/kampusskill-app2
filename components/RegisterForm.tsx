
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

interface RegisterFormProps {
    onSuccess: () => void;
    onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onSwitchToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nim, setNim] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const { addToast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        if (nim.length < 8 || !/^\d+$/.test(nim)) {
            setError("NIM harus berupa angka dan minimal 8 digit.");
            return;
        }

        const result = register({ name, email, nim, password });
        if (result.success) {
            addToast('Pendaftaran berhasil! Silakan login.', 'success');
            onSuccess();
            onSwitchToLogin();
        } else {
            setError(result.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <div>
                <label className="block text-sm font-medium text-slate-300">Nama Lengkap</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-primary" />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-primary" />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300">NIM (Nomor Induk Mahasiswa)</label>
                <input type="text" value={nim} onChange={(e) => setNim(e.target.value)} required className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-primary" />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-primary" />
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-secondary">
                Daftar
            </button>
            <p className="text-sm text-center text-slate-400">
                Sudah punya akun?{' '}
                <button type="button" onClick={onSwitchToLogin} className="font-medium text-primary hover:text-sky-400">
                    Login di sini
                </button>
            </p>
        </form>
    );
};

export default RegisterForm;
