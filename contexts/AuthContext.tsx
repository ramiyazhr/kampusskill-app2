
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { User } from '../types';
import { getInitialData, saveData } from '../services/dataService';

interface AuthContextType {
    user: User | null;
    users: User[];
    login: (emailOrNim: string, password: string) => { success: boolean; message: string; user?: User };
    logout: () => void;
    register: (details: Omit<User, 'id' | 'isVerified' | 'passwordHash' | 'role'> & { password: string }) => { success: boolean, message: string };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const { users: initialUsers } = getInitialData();
        setUsers(initialUsers);

        const loggedInUser = sessionStorage.getItem('loggedInUser');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    const login = useCallback((emailOrNim: string, password: string) => {
        const userToLogin = users.find(u => u.email === emailOrNim || u.nim === emailOrNim);
        if (userToLogin && userToLogin.passwordHash === password) { // Plain text check for prototype
            setUser(userToLogin);
            sessionStorage.setItem('loggedInUser', JSON.stringify(userToLogin));
            return { success: true, message: "Login berhasil!", user: userToLogin };
        }
        return { success: false, message: "Email/NIM atau password salah." };
    }, [users]);

    const logout = useCallback(() => {
        setUser(null);
        sessionStorage.removeItem('loggedInUser');
    }, []);

    const register = useCallback((details: Omit<User, 'id' | 'isVerified' | 'passwordHash' | 'role'> & { password: string }) => {
        if (users.some(u => u.email === details.email)) {
            return { success: false, message: "Email sudah terdaftar." };
        }
        if (users.some(u => u.nim === details.nim)) {
            return { success: false, message: "NIM sudah terdaftar." };
        }

        const newUser: User = {
            id: `user_${Date.now()}`,
            name: details.name,
            email: details.email,
            nim: details.nim,
            passwordHash: details.password, // Plain text for prototype
            isVerified: true, // Auto-verified for prototype
            role: 'student'
        };

        const newUsers = [...users, newUser];
        setUsers(newUsers);
        saveData('users', newUsers);
        return { success: true, message: "Pendaftaran berhasil!" };
    }, [users]);

    return (
        <AuthContext.Provider value={{ user, users, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
