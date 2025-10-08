export enum ServiceCategory {
    PRINT = "Print",
    DESIGN = "Desain",
    VIDEO_EDITING = "Edit Video",
    TUTORING = "Les Privat",
    PHOTOGRAPHY = "Fotografi",
    IT = "IT",
    OTHER = "Lainnya"
}

export interface User {
    id: string;
    name: string;
    email: string;
    nim: string;
    passwordHash: string; // In a real app, this would be a hash
    isVerified: boolean;
    role: 'student' | 'admin';
}

export interface Rating {
    userId: string;
    rating: number; // 1-5
    comment: string;
    date: string;
}

export interface Service {
    id: string;
    providerId: string;
    providerName: string;
    title: string;
    category: ServiceCategory;
    description: string;
    price: number;
    contact: string;
    photo?: string; // base64 data URL
    gallery?: string[]; // array of base64 data URLs
    gmapsUrl?: string; // Google Maps share URL
    ratings: Rating[];
    reports: string[]; // array of user IDs who reported
    createdAt: string;
    status: 'active' | 'flagged' | 'deleted';
}

export type NewServiceData = Omit<Service, 'id' | 'providerName' | 'ratings' | 'reports' | 'createdAt' | 'status'>;

export interface ToastMessage {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
}