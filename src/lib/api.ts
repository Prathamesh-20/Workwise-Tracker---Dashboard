const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface DailyReport {
    date: string;
    total_hours: number;
    total_active_seconds: number;
    total_idle_seconds: number;
    user_id: string;
    apps: AppUsage[];
}

export interface AppUsage {
    name: string;
    duration: string;
    duration_seconds: number;
    active_seconds: number;
    is_browser: boolean;
    sub_activities: SubActivity[];
}

export interface SubActivity {
    name: string;
    duration: string;
    duration_seconds: number;
}

export interface WeeklySummary {
    user_id: string;
    period: string;
    start_date: string;
    end_date: string;
    daily_data: DailyData[];
}

export interface DailyData {
    date: string;
    total_hours: number;
    active_hours: number;
    total_logs: number;
}

export interface TopApps {
    user_id: string;
    period_days: number;
    apps: {
        app_name: string;
        duration: string;
        duration_seconds: number;
        is_browser: boolean;
    }[];
}

export interface FraudAlert {
    user_id: string;
    user_email: string;
    date: string;
    fraud_count: number;
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
    message: string;
    fraud_types: string[];
}

export interface FraudAlertResponse {
    alerts: FraudAlert[];
    summary: {
        total_alerts: number;
        users_affected: number;
        period_days: number;
    };
}

export interface FraudStats {
    user_id: string;
    date: string;
    total_logs: number;
    total_time_seconds: number;
    fraud_flagged: {
        count: number;
        seconds: number;
        breakdown: Record<string, number>;
    };
    productive_time_seconds: number;
    fraud_percentage: number;
}

export interface UserInfo {
    id: string;
    email: string;
    name: string;
    role: string;
    is_active: boolean;
    is_approved: boolean;
    created_at: string;
}

class ApiClient {
    private token: string | null = null;

    setToken(token: string) {
        this.token = token;
        if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', token);
        }
    }

    getToken(): string | null {
        if (this.token) return this.token;
        if (typeof window !== 'undefined') {
            this.token = localStorage.getItem('auth_token');
        }
        return this.token;
    }

    clearToken() {
        this.token = null;
        if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token');
        }
    }

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const token = this.getToken();

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (token) {
            (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            if (response.status === 401) {
                this.clearToken();
            }
            const error = await response.json().catch(() => ({ detail: 'Request failed' }));
            throw new Error(error.detail || 'Request failed');
        }

        return response.json();
    }

    // Auth endpoints
    async login(email: string, password: string): Promise<{ access_token: string }> {
        const data = await this.request<{ access_token: string }>('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        this.setToken(data.access_token);
        return data;
    }

    async register(email: string, password: string, name: string): Promise<{ success: boolean; message: string }> {
        // Registration now requires admin approval - no token returned
        return this.request('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, password, name }),
        });
    }

    async getMe(): Promise<{ id: string; email: string; name: string; role: string }> {
        return this.request('/api/auth/me');
    }

    // Analytics endpoints
    async getDailyReport(date?: string, userId?: string): Promise<DailyReport> {
        const params = new URLSearchParams();
        if (date) params.append('date', date);
        if (userId) params.append('user_id', userId);

        const query = params.toString();
        return this.request(`/api/analytics/desktop/daily-report${query ? `?${query}` : ''}`);
    }

    async getWeeklySummary(userId?: string): Promise<WeeklySummary> {
        const params = new URLSearchParams();
        if (userId) params.append('user_id', userId);

        const query = params.toString();
        return this.request(`/api/analytics/desktop/weekly-summary${query ? `?${query}` : ''}`);
    }

    async getTopApps(days?: number, limit?: number, userId?: string): Promise<TopApps> {
        const params = new URLSearchParams();
        if (days) params.append('days', String(days));
        if (limit) params.append('limit', String(limit));
        if (userId) params.append('user_id', userId);

        const query = params.toString();
        return this.request(`/api/analytics/desktop/top-apps${query ? `?${query}` : ''}`);
    }

    // Sync status
    async getSyncStatus(): Promise<{ total_logs: number; today_logs: number; last_sync: string | null }> {
        return this.request('/api/sync-status');
    }

    // Get all users (admin only)
    async getUsers(): Promise<UserInfo[]> {
        return this.request('/api/auth/users');
    }

    // Fraud detection
    async getFraudAlerts(days: number = 7): Promise<FraudAlertResponse> {
        return this.request(`/api/fraud-alerts?days=${days}`);
    }

    async getFraudStats(userId?: string): Promise<FraudStats> {
        const params = new URLSearchParams();
        if (userId) params.append('user_id', userId);
        const query = params.toString();
        return this.request(`/api/fraud-stats${query ? `?${query}` : ''}`);
    }

    // Admin endpoints
    async getPendingUsers(): Promise<UserInfo[]> {
        return this.request('/api/admin/pending-users');
    }

    async getEmployees(): Promise<UserInfo[]> {
        return this.request('/api/admin/employees');
    }

    async approveUser(userId: string): Promise<{ success: boolean; message: string }> {
        return this.request(`/api/admin/approve-user/${userId}`, {
            method: 'POST',
        });
    }

    async rejectUser(userId: string): Promise<{ success: boolean; message: string }> {
        return this.request(`/api/admin/reject-user/${userId}`, {
            method: 'POST',
        });
    }

    async deleteUser(userId: string): Promise<{ success: boolean; message: string }> {
        return this.request(`/api/admin/delete-user/${userId}`, {
            method: 'DELETE',
        });
    }
}

export const api = new ApiClient();
