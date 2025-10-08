import { User, Service, ServiceCategory } from '../types';

const DUMMY_USERS: User[] = [
    {
        id: 'admin_1',
        name: 'Admin KampusSkill',
        email: 'admin@example.com',
        nim: '00000000',
        passwordHash: 'Admin123',
        isVerified: true,
        role: 'admin'
    },
    {
        id: 'user_1',
        name: 'Budi Sanjaya',
        email: 'budi@kampus.ac.id',
        nim: '1234567890',
        passwordHash: 'password123',
        isVerified: true,
        role: 'student'
    },
    {
        id: 'user_2',
        name: 'Citra Lestari',
        email: 'citra@kampus.ac.id',
        nim: '0987654321',
        passwordHash: 'password123',
        isVerified: true,
        role: 'student'
    },
     {
        id: 'user_3',
        name: 'Doni Susanto',
        email: 'doni@kampus.ac.id',
        nim: '1122334455',
        passwordHash: 'password123',
        isVerified: true,
        role: 'student'
    }
];

const DUMMY_SERVICES: Service[] = [
    {
        id: 'service_1',
        providerId: 'user_2',
        providerName: 'Citra Lestari',
        title: 'Jasa Desain Grafis & Branding UKM',
        category: ServiceCategory.DESIGN,
        description: 'Menerima jasa desain logo, poster, banner, dan media sosial untuk keperluan acara kampus atau UKM. Pengerjaan cepat 1-3 hari. Menggunakan Figma, Photoshop, dan Illustrator untuk hasil profesional. Gratis 3x revisi minor.',
        price: 250000,
        contact: 'WA: 081222333444',
        photo: 'https://images.unsplash.com/photo-1633469415951-f725a6003933?q=80&w=800&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1572044162444-24c9562b74b0?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=600&auto=format&fit=crop',
        ],
        ratings: [
            { userId: 'user_1', rating: 5, comment: 'Desainnya modern dan komunikatif!', date: new Date(Date.now() - 86400000 * 2).toISOString() },
            { userId: 'user_3', rating: 5, comment: 'Pengerjaan cepat dan hasilnya memuaskan.', date: new Date(Date.now() - 86400000 * 1).toISOString() },
        ],
        reports: [],
        createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
        status: 'active'
    },
    {
        id: 'service_2',
        providerId: 'user_1',
        providerName: 'Budi Sanjaya',
        title: 'Les Privat Kalkulus & Fisika Dasar',
        category: ServiceCategory.TUTORING,
        description: 'Bimbingan belajar privat untuk mata kuliah Kalkulus I, II, dan Fisika Dasar. Bisa online via Zoom atau offline di perpustakaan pusat. Metode belajar fokus pada pemahaman konsep dan latihan soal intensif. Durasi 90 menit/sesi.',
        price: 85000,
        contact: 'WA: 081122334455',
        photo: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1588724345769-42b7a484a56d?q=80&w=600&auto=format&fit=crop',
        ],
        ratings: [
             { userId: 'user_2', rating: 5, comment: 'Penjelasannya runut dan mudah dimengerti. Nilai auto A!', date: new Date().toISOString() },
        ],
        reports: [],
        createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
        status: 'active'
    },
    {
        id: 'service_3',
        providerId: 'user_3',
        providerName: 'Doni Susanto',
        title: 'Jasa Foto & Video Event/Wisuda',
        category: ServiceCategory.PHOTOGRAPHY,
        description: 'Abadikan momen spesialmu (wisuda, seminar, acara UKM) dengan hasil foto dan video sinematik berkualitas. Paket sudah termasuk editing. Gear: Sony A7III. Bisa outdoor dan indoor.',
        price: 750000,
        contact: 'WA: 085566778899',
        photo: 'https://images.unsplash.com/photo-1520340356584-f179b52f43c0?q=80&w=800&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1604542245265-7d3726a6e298?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-153315832-63805174b787?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1616160176885-a12f267bcb9f?q=80&w=600&auto=format&fit=crop'
        ],
        ratings: [
            { userId: 'user_1', rating: 5, comment: 'Kameramennya handal, hasilnya keren banget!', date: new Date(Date.now() - 86400000 * 1).toISOString() }
        ],
        reports: [],
        createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
        status: 'active'
    },
    {
        id: 'service_4',
        providerId: 'user_1',
        providerName: 'Budi Sanjaya',
        title: 'Print, Jilid & Scan Cepat',
        category: ServiceCategory.PRINT,
        description: 'Cetak tugas, makalah, skripsi. Bisa jilid softcover/hardcover dan scan dokumen. Lokasi strategis dekat gerbang belakang. Harga per lembar HVS A4 80gr. Buka sampai malam.',
        price: 500,
        contact: 'WA: 081122334455',
        photo: 'https://images.unsplash.com/photo-1604356675563-762c681b49f2?q=80&w=800&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1544991185-5db73c641c20?q=80&w=600&auto=format&fit=crop'
        ],
        gmapsUrl: 'https://maps.app.goo.gl/uKq4bPzB5a9x8f7g9',
        ratings: [
            { userId: 'user_2', rating: 4, comment: 'Cepat dan murah, mantap.', date: new Date().toISOString() }
        ],
        reports: [],
        createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
        status: 'active'
    },
    {
        id: 'service_5',
        providerId: 'user_3',
        providerName: 'Doni Susanto',
        title: 'Reparasi & Instal Ulang Laptop',
        category: ServiceCategory.IT,
        description: 'Laptop lemot, kena virus, atau butuh instal ulang Windows/MacOS? Terima servis laptop berbagai merk dan instalasi software aplikasi standar. Bisa konsultasi dulu.',
        price: 150000,
        contact: 'WA: 085566778899',
        photo: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=800&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=600&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop'
        ],
        ratings: [
            { userId: 'user_1', rating: 5, comment: 'Laptop jadi ngebut lagi, recommended!', date: new Date(Date.now() - 86400000 * 3).toISOString() }
        ],
        reports: [],
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        status: 'active'
    },
     {
        id: 'service_6',
        providerId: 'user_2',
        providerName: 'Citra Lestari',
        title: 'Jasa Angkut Pindahan Kost',
        category: ServiceCategory.OTHER,
        description: 'Punya banyak barang saat pindahan kost? Saya bantu angkut pakai motor. Area sekitar kampus saja ya. Maksimal 3-4 kardus ukuran sedang per angkut.',
        price: 40000,
        contact: 'WA: 081222333444',
        photo: 'https://images.unsplash.com/photo-1566576721346-d4a3b4d30954?q=80&w=800&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1628149153920-56d115b73e51?q=80&w=600&auto=format&fit=crop'
        ],
        ratings: [],
        reports: [],
        createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
        status: 'active'
    },
    {
        id: 'service_7',
        providerId: 'user_1',
        providerName: 'Budi Sanjaya',
        title: 'Joki Coding (Python, Web, Java)',
        category: ServiceCategory.IT,
        description: 'Stuck dengan tugas coding? Saya bantu kerjakan tugas Pemrograman Dasar (Python), Web (HTML, CSS, JS), atau Java. Hubungi untuk diskusi. Harga tergantung tingkat kesulitan.',
        price: 350000,
        contact: 'WA: 081122334455',
        photo: 'https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=800&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?q=80&w=600&auto=format&fit=crop'
        ],
        ratings: [
             { userId: 'user_3', rating: 5, comment: 'Sangat terbantu, source code rapi dan ada penjelasannya!', date: new Date(Date.now() - 86400000 * 2).toISOString() }
        ],
        reports: [],
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        status: 'active'
    },
    {
        id: 'service_8',
        providerId: 'user_3',
        providerName: 'Doni Susanto',
        title: 'Jasa Edit Video Reels & TikTok',
        category: ServiceCategory.VIDEO_EDITING,
        description: 'Editing video pendek untuk Instagram Reels atau TikTok. Cocok untuk promosi produk atau konten pribadi. Bisa tambah teks, musik trending, dan transisi kekinian.',
        price: 100000,
        contact: 'WA: 085566778899',
        photo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop',
        ratings: [
             { userId: 'user_2', rating: 5, comment: 'Videonya jadi FYP, mantap!', date: new Date().toISOString() }
        ],
        reports: [],
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        status: 'active'
    },
    {
        id: 'service_9',
        providerId: 'user_2',
        providerName: 'Citra Lestari',
        title: 'Jasa Laundry Kiloan Antar-Jemput',
        category: ServiceCategory.OTHER,
        description: 'Laundry kiloan bersih wangi, paket sudah termasuk setrika. Gratis antar-jemput untuk area asrama dan sekitarnya. Pengerjaan 2-3 hari. Tersedia paket kilat 1 hari.',
        price: 8000,
        contact: 'WA: 081222333444',
        photo: 'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?q=80&w=800&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1582735689369-4fe89db79572?q=80&w=600&auto=format&fit=crop'
        ],
        gmapsUrl: 'https://maps.app.goo.gl/uKq4bPzB5a9x8f7g9',
        ratings: [
            { userId: 'user_1', rating: 5, comment: 'Praktis banget ada antar-jemput.', date: new Date(Date.now() - 86400000 * 1).toISOString() }
        ],
        reports: [],
        createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
        status: 'active'
    },
    {
        id: 'service_10',
        providerId: 'user_3',
        providerName: 'Doni Susanto',
        title: 'Jasa Bermasalah (Untuk Demo)',
        category: ServiceCategory.IT,
        description: 'Jasa ini sengaja dibuat untuk demo fitur report. Sudah dilaporkan oleh 3 user berbeda dan akan muncul di Panel Admin untuk ditinjau.',
        price: 10000,
        contact: 'WA: 085511223300',
        photo: 'https://images.unsplash.com/photo-1555952494-0357e82ac7e2?q=80&w=800&auto=format&fit=crop',
        ratings: [
            { userId: 'user_1', rating: 1, comment: 'Tidak direkomendasikan sama sekali.', date: new Date().toISOString() }
        ],
        reports: ['user_1', 'user_2', 'admin_1'],
        createdAt: new Date().toISOString(),
        status: 'flagged'
    }
];

export const getInitialData = () => {
    try {
        // --- User Data Handling ---
        const usersData = localStorage.getItem('users');
        let initialUsers = DUMMY_USERS;
        if (!usersData) {
            localStorage.setItem('users', JSON.stringify(DUMMY_USERS));
        } else {
            initialUsers = JSON.parse(usersData);
        }

        // --- Service Data Handling ---
        const servicesData = localStorage.getItem('services');
        let initialServices = DUMMY_SERVICES;

        if (!servicesData) {
            // First time load, just use dummy data
            localStorage.setItem('services', JSON.stringify(DUMMY_SERVICES));
        } else {
            // User has existing data. Let's update the dummy data without losing user-created data.
            const storedServices: Service[] = JSON.parse(servicesData);
            
            // Filter out old dummy services from storage
            const userCreatedServices = storedServices.filter(service => !service.id.startsWith('service_'));
            
            // Combine fresh dummy data with user-created data
            const combinedServices = [...DUMMY_SERVICES, ...userCreatedServices];

            // Remove duplicates just in case (e.g., if a user service somehow got a dummy-like ID)
            const uniqueServices = Array.from(new Map(combinedServices.map(item => [item.id, item])).values());
            
            localStorage.setItem('services', JSON.stringify(uniqueServices));
            initialServices = uniqueServices;
        }
        
        return { users: initialUsers, services: initialServices };

    } catch (error) {
        console.error("Gagal memproses data localStorage, mereset ke default.", error);
        localStorage.setItem('users', JSON.stringify(DUMMY_USERS));
        localStorage.setItem('services', JSON.stringify(DUMMY_SERVICES));
        return { users: DUMMY_USERS, services: DUMMY_SERVICES };
    }
};


export const saveData = (key: 'users' | 'services', data: any) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Failed to save data for key: ${key}`, error);
    }
};
