
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Modal from './Modal';
import PostServiceForm from './PostServiceForm';

interface HeaderProps {
    setCurrentPage: (page: 'home' | 'profile' | 'admin') => void;
    currentPage: string;
}

const NavLink: React.FC<{
    onClick: () => void;
    isActive: boolean;
    children: React.ReactNode;
}> = ({ onClick, isActive, children }) => (
    <button
        onClick={onClick}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            isActive
                ? 'bg-sky-500/20 text-sky-400'
                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
        }`}
    >
        {children}
    </button>
);

const Header: React.FC<HeaderProps> = ({ setCurrentPage, currentPage }) => {
    const { user, logout } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showPostServiceModal, setShowPostServiceModal] = useState(false);

    const handlePostServiceClick = () => {
        if (user) {
            setShowPostServiceModal(true);
        } else {
            setShowLoginModal(true);
        }
    };

    return (
        <>
            <header className="bg-slate-800/50 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-black/20">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div
                                className="flex-shrink-0 text-white text-xl font-bold cursor-pointer"
                                onClick={() => setCurrentPage('home')}
                            >
                                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    KampusSkill
                                </span>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <NavLink onClick={() => setCurrentPage('home')} isActive={currentPage === 'home'}>
                                        Home
                                    </NavLink>
                                    {user && (
                                        <NavLink onClick={() => setCurrentPage('profile')} isActive={currentPage === 'profile'}>
                                            Profil Saya
                                        </NavLink>
                                    )}
                                    {user?.role === 'admin' && (
                                        <NavLink onClick={() => setCurrentPage('admin')} isActive={currentPage === 'admin'}>
                                            Panel Admin
                                        </NavLink>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                             <button
                                onClick={handlePostServiceClick}
                                className="mr-4 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-cyan-400 rounded-lg shadow-md hover:scale-105 transform transition-transform duration-200"
                            >
                                + Posting Jasa
                            </button>
                            {user ? (
                                <div className="flex items-center">
                                    <span className="text-slate-300 mr-4 hidden sm:block">Hai, {user.name}</span>
                                    <button
                                        onClick={logout}
                                        className="px-3 py-2 text-sm font-medium text-slate-300 bg-slate-700 rounded-md hover:bg-slate-600"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="space-x-2">
                                    <button
                                        onClick={() => setShowLoginModal(true)}
                                        className="px-3 py-2 text-sm font-medium text-slate-300 bg-slate-700 rounded-md hover:bg-slate-600"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => setShowRegisterModal(true)}
                                        className="px-3 py-2 text-sm font-medium text-white bg-secondary rounded-md hover:bg-violet-700"
                                    >
                                        Daftar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            </header>

            {/* Modals */}
            <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} title="Login Akun">
                <LoginForm
                    onSuccess={() => setShowLoginModal(false)}
                    onSwitchToRegister={() => {
                        setShowLoginModal(false);
                        setShowRegisterModal(true);
                    }}
                />
            </Modal>

            <Modal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)} title="Daftar Akun Baru">
                <RegisterForm
                    onSuccess={() => setShowRegisterModal(false)}
                    onSwitchToLogin={() => {
                        setShowRegisterModal(false);
                        setShowLoginModal(true);
                    }}
                />
            </Modal>

            {user && (
                 <Modal isOpen={showPostServiceModal} onClose={() => setShowPostServiceModal(false)} title="Posting Jasa Baru">
                     <PostServiceForm onSuccess={() => setShowPostServiceModal(false)} />
                 </Modal>
            )}
        </>
    );
};

export default Header;
