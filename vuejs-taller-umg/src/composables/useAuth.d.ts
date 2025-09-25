interface User {
    id: number;
    nombre: string;
    email: string;
    rol: 'admin' | 'usuario';
}
export declare const useAuth: () => {
    user: import("vue").ComputedRef<{
        id: number;
        nombre: string;
        email: string;
        rol: "admin" | "usuario";
    } | null>;
    token: import("vue").ComputedRef<string | null>;
    isAuthenticated: import("vue").ComputedRef<boolean>;
    initAuth: () => void;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    getUser: () => Promise<User>;
    requireAuth: () => boolean;
};
export {};
