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

// Data Export types
export interface EmployeeSummaryRecord {
    user_id: string;
    user_email: string;
    user_name: string;
    date: string;
    active_hours: number;
    idle_hours: number;
    total_hours: number;
    total_mouse_events: number;
    total_key_events: number;
    unique_apps: number;
    top_app: string;
    activity_score: number;
}

// Team types
export interface TeamInfo {
    id: string;
    name: string;
    member_count: number;
    rule_count: number;
    created_at: string | null;
}

export interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: string;
    is_active: boolean;
}

export interface AppRule {
    id: number;
    app_pattern: string;
    category: string;
    match_type: string;
}

export interface TeamDetail {
    id: string;
    name: string;
    created_at: string | null;
    members: TeamMember[];
    rules: AppRule[];
}

export interface MemberProductivity {
    user_id: string;
    name: string;
    email: string;
    productive_seconds: number;
    neutral_seconds: number;
    non_productive_seconds: number;
    productivity_score: number;
    total_logs: number;
    top_apps: {
        name: string;
        productive_seconds: number;
        neutral_seconds: number;
        non_productive_seconds: number;
        total_seconds: number;
    }[];
}

export interface TeamProductivityReport {
    team_id: string;
    team_name: string;
    date: string;
    members: MemberProductivity[];
    summary: {
        total_productive_seconds: number;
        total_neutral_seconds: number;
        total_non_productive_seconds: number;
        team_productivity_score: number;
        member_count: number;
    };
}

export interface TeamComparison {
    date: string;
    teams: {
        team_id: string;
        team_name: string;
        productivity_score: number;
        productive_seconds: number;
        neutral_seconds: number;
        non_productive_seconds: number;
        member_count: number;
        active_members: number;
    }[];
}

export interface TeamTrend {
    team_id: string;
    team_name: string;
    days: number;
    trends: {
        date: string;
        day: string;
        productivity_score: number;
        productive_seconds: number;
        neutral_seconds: number;
        non_productive_seconds: number;
        active_members: number;
    }[];
}

export interface RuleSuggestion {
    team_id: string;
    team_name: string;
    suggestions: {
        app_pattern: string;
        suggested_category: string;
        confidence: string;
        total_seconds: number;
        usage_display: string;
    }[];
}

export interface MemberActivity {
    team_id: string;
    team_name: string;
    user_id: string;
    name: string;
    email: string;
    date: string;
    productive_seconds: number;
    neutral_seconds: number;
    non_productive_seconds: number;
    productivity_score: number;
    total_seconds: number;
    apps: {
        app_name: string;
        productive_seconds: number;
        neutral_seconds: number;
        non_productive_seconds: number;
        total_seconds: number;
        primary_category: string;
        windows: string[];
    }[];
    timeline: {
        time: string;
        app: string;
        category: string;
    }[];
}

export interface DetectedApps {
    team_id: string;
    apps: {
        app_name: string;
        is_browser: boolean;
        total_seconds: number;
        tabs: {
            window_title: string;
            display_name: string;
            total_seconds: number;
            user_count: number;
            current_category: string | null;
            matched_rule: string | null;
            matched_rule_id: number | null;
        }[];
    }[];
    summary: {
        total_apps: number;
        total_unique_tabs: number;
        classified_tabs: number;
        unclassified_tabs: number;
    };
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

    // Teams endpoints
    async getTeams(): Promise<TeamInfo[]> {
        return this.request('/api/teams');
    }

    async getTeamDetail(teamId: string): Promise<TeamDetail> {
        return this.request(`/api/teams/${teamId}`);
    }

    async createTeam(name: string): Promise<{ id: string; name: string; success: boolean }> {
        return this.request('/api/teams', {
            method: 'POST',
            body: JSON.stringify({ name }),
        });
    }

    async deleteTeam(teamId: string): Promise<{ success: boolean; message: string }> {
        return this.request(`/api/teams/${teamId}`, {
            method: 'DELETE',
        });
    }

    async assignUserToTeam(userId: string, teamId: string): Promise<{ success: boolean; message: string }> {
        return this.request('/api/teams/assign', {
            method: 'POST',
            body: JSON.stringify({ user_id: userId, team_id: teamId }),
        });
    }

    async getTeamRules(teamId: string): Promise<AppRule[]> {
        return this.request(`/api/teams/${teamId}/rules`);
    }

    async addTeamRule(teamId: string, appPattern: string, category: string, matchType: string = 'contains'): Promise<{ id: number; app_pattern: string; category: string; success: boolean }> {
        return this.request(`/api/teams/${teamId}/rules`, {
            method: 'POST',
            body: JSON.stringify({ app_pattern: appPattern, category, match_type: matchType }),
        });
    }

    async bulkUpdateRules(teamId: string, rules: { productive: string[]; neutral: string[]; non_productive: string[] }): Promise<{ success: boolean; total_rules: number }> {
        return this.request(`/api/teams/${teamId}/rules/bulk`, {
            method: 'PUT',
            body: JSON.stringify(rules),
        });
    }

    async deleteTeamRule(teamId: string, ruleId: number): Promise<{ success: boolean; message: string }> {
        return this.request(`/api/teams/${teamId}/rules/${ruleId}`, {
            method: 'DELETE',
        });
    }

    async getTeamProductivity(teamId: string, date?: string): Promise<TeamProductivityReport> {
        const params = new URLSearchParams();
        if (date) params.append('date', date);
        const query = params.toString();
        return this.request(`/api/teams/${teamId}/productivity${query ? `?${query}` : ''}`);
    }

    async getTeamComparison(date?: string): Promise<TeamComparison> {
        const params = new URLSearchParams();
        if (date) params.append('date', date);
        const query = params.toString();
        return this.request(`/api/teams/compare${query ? `?${query}` : ''}`);
    }

    async getTeamTrends(teamId: string, days: number = 7): Promise<TeamTrend> {
        return this.request(`/api/teams/${teamId}/trends?days=${days}`);
    }

    async getTeamSuggestRules(teamId: string): Promise<RuleSuggestion> {
        return this.request(`/api/teams/${teamId}/suggest-rules`);
    }

    async exportTeamReport(teamId: string, date?: string): Promise<void> {
        const token = this.getToken();
        const params = new URLSearchParams();
        if (date) params.append('date', date);
        const query = params.toString();
        const url = `${API_BASE_URL}/api/teams/${teamId}/export${query ? `?${query}` : ''}`;
        const res = await fetch(url, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error('Failed to export');
        const blob = await res.blob();
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        const disposition = res.headers.get('Content-Disposition');
        a.download = disposition?.match(/filename="(.+)"/)?.[1] || 'team_report.csv';
        a.click();
        URL.revokeObjectURL(a.href);
    }

    async getMemberActivity(teamId: string, userId: string, date?: string): Promise<MemberActivity> {
        const params = new URLSearchParams();
        if (date) params.append('date', date);
        const query = params.toString();
        return this.request(`/api/teams/${teamId}/members/${userId}/activity${query ? `?${query}` : ''}`);
    }

    async getDetectedApps(teamId: string, days: number = 7): Promise<DetectedApps> {
        return this.request(`/api/teams/${teamId}/detected-apps?days=${days}`);
    }

}

export const api = new ApiClient();

