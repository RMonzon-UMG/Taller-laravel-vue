import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';
const user = ref(null);
const token = ref(localStorage.getItem('token'));
export const useAuth = () => {
    const router = useRouter();
    const isAuthenticated = computed(() => !!token.value && !!user.value);
    const initAuth = () => {
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        if (savedToken && savedUser) {
            token.value = savedToken;
            try {
                user.value = JSON.parse(savedUser);
            }
            catch {
                logout();
            }
        }
    };
    const login = async (email, password) => {
        try {
            const { data } = await api.post('/login', {
                email,
                password
            });
            token.value = data.token;
            user.value = data.user;
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        catch (error) {
            throw new Error(error?.response?.data?.message ||
                error?.response?.data?.errors?.email?.[0] ||
                'Error al iniciar sesión');
        }
    };
    const logout = async () => {
        try {
            if (token.value) {
                await api.post('/logout');
            }
        }
        catch (error) {
            console.error('Error during logout:', error);
        }
        finally {
            token.value = null;
            user.value = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/login');
        }
    };
    const getUser = async () => {
        try {
            const { data } = await api.get('/user');
            user.value = data;
            localStorage.setItem('user', JSON.stringify(data));
            return data;
        }
        catch (error) {
            if (error?.response?.status === 401) {
                logout();
            }
            throw error;
        }
    };
    const requireAuth = () => {
        if (!isAuthenticated.value) {
            router.push('/login');
            return false;
        }
        return true;
    };
    return {
        user: computed(() => user.value),
        token: computed(() => token.value),
        isAuthenticated,
        initAuth,
        login,
        logout,
        getUser,
        requireAuth
    };
};
