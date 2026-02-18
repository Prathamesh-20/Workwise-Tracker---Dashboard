import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type {
    UserInfo, TeamInfo, TeamDetail, TeamProductivityReport,
    TeamComparison, TeamTrend, RuleSuggestion, MemberActivity,
    DetectedApps
} from '../lib/api';
import {
    AreaChart, Area, BarChart, Bar, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

// Icons used in this component (inline SVG to avoid dependency on App.tsx Icons)
const TIcon = {
    Plus: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
    X: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
    Close: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
    Users: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    Shield: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    TrendingUp: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
    Calendar: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    Trash: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>,
    Download: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
    Lightbulb: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6" /><path d="M10 22h4" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" /></svg>,
    Eye: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
};

function formatDuration(seconds: number): string {
    if (seconds <= 0) return '0m';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export default function TeamsTab({ employees, dm }: { employees: UserInfo[]; dm?: boolean }) {
    const [teams, setTeams] = useState<TeamInfo[]>([]);
    const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
    const [teamDetail, setTeamDetail] = useState<TeamDetail | null>(null);
    const [productivity, setProductivity] = useState<TeamProductivityReport | null>(null);
    const [loading, setLoading] = useState(true);
    const [prodLoading, setProdLoading] = useState(false);
    const [prodDate, setProdDate] = useState<string>(() => {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    });
    const [newRulePattern, setNewRulePattern] = useState('');
    const [newRuleCategory, setNewRuleCategory] = useState('productive');
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [newTeamName, setNewTeamName] = useState('');
    const [showNewTeam, setShowNewTeam] = useState(false);

    // Enhancement states
    const [comparison, setComparison] = useState<TeamComparison | null>(null);
    const [trends, setTrends] = useState<TeamTrend | null>(null);
    const [trendDays, setTrendDays] = useState(7);
    const [suggestions, setSuggestions] = useState<RuleSuggestion | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [memberActivity, setMemberActivity] = useState<MemberActivity | null>(null);
    const [showDrillDown, setShowDrillDown] = useState(false);
    const [activeSubTab, setActiveSubTab] = useState<'overview' | 'comparison'>('overview');

    // Detected apps states
    const [detectedApps, setDetectedApps] = useState<DetectedApps | null>(null);
    const [detectedLoading, setDetectedLoading] = useState(false);
    const [detectedFilter, setDetectedFilter] = useState<'unclassified' | 'all' | 'productive' | 'non_productive' | 'neutral'>('unclassified');
    const [expandedApps, setExpandedApps] = useState<Set<string>>(new Set());
    const [detectedDays, setDetectedDays] = useState(7);

    // Loaders
    const loadTeams = async () => {
        try {
            const t = await api.getTeams();
            setTeams(t);
            if (!selectedTeamId && t.length > 0) setSelectedTeamId(t[0].id);
        } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    const loadTeamDetail = async (id: string) => {
        try { setTeamDetail(await api.getTeamDetail(id)); } catch (e) { console.error(e); }
    };
    const loadProductivity = async (id: string, date: string) => {
        setProdLoading(true);
        try { setProductivity(await api.getTeamProductivity(id, date)); } catch (e) { console.error(e); } finally { setProdLoading(false); }
    };
    const loadComparison = async (date?: string) => {
        try { setComparison(await api.getTeamComparison(date)); } catch (e) { console.error(e); }
    };
    const loadTrends = async (id: string, days: number) => {
        try { setTrends(await api.getTeamTrends(id, days)); } catch (e) { console.error(e); }
    };
    const loadSuggestions = async (id: string) => {
        try { setSuggestions(await api.getTeamSuggestRules(id)); setShowSuggestions(true); } catch (e) { console.error(e); }
    };
    const loadDetectedApps = async (id: string, days: number = 7) => {
        setDetectedLoading(true);
        try { setDetectedApps(await api.getDetectedApps(id, days)); } catch (e) { console.error(e); } finally { setDetectedLoading(false); }
    };

    // Handlers
    const handleDrillDown = async (userId: string) => {
        if (!selectedTeamId) return;
        try { setMemberActivity(await api.getMemberActivity(selectedTeamId, userId, prodDate)); setShowDrillDown(true); } catch (e) { console.error(e); }
    };
    const handleExport = async () => {
        if (!selectedTeamId) return;
        try { await api.exportTeamReport(selectedTeamId, prodDate); } catch (e: any) { alert(e.message); }
    };
    const handleAcceptSuggestion = async (pattern: string, category: string) => {
        if (!selectedTeamId) return;
        try { await api.addTeamRule(selectedTeamId, pattern, category); loadTeamDetail(selectedTeamId); loadSuggestions(selectedTeamId); } catch (e: any) { alert(e.message); }
    };
    const handleAddRule = async () => {
        if (!selectedTeamId || !newRulePattern.trim()) return;
        try { await api.addTeamRule(selectedTeamId, newRulePattern.trim(), newRuleCategory); setNewRulePattern(''); loadTeamDetail(selectedTeamId); } catch (e: any) { alert(e.message); }
    };
    const handleDeleteRule = async (ruleId: number) => {
        if (!selectedTeamId) return;
        try { await api.deleteTeamRule(selectedTeamId, ruleId); loadTeamDetail(selectedTeamId); } catch (e: any) { alert(e.message); }
    };
    const handleAssign = async (userId: string) => {
        if (!selectedTeamId) return;
        try { await api.assignUserToTeam(userId, selectedTeamId); loadTeamDetail(selectedTeamId); loadTeams(); setShowAssignModal(false); } catch (e: any) { alert(e.message); }
    };
    const handleCreateTeam = async () => {
        if (!newTeamName.trim()) return;
        try { const t = await api.createTeam(newTeamName.trim()); setNewTeamName(''); setShowNewTeam(false); await loadTeams(); setSelectedTeamId(t.id); } catch (e: any) { alert(e.message); }
    };
    const handleDeleteTeam = async (id: string) => {
        if (!confirm('Delete this team? Members will become unassigned.')) return;
        try { await api.deleteTeam(id); if (selectedTeamId === id) { setSelectedTeamId(null); setTeamDetail(null); setProductivity(null); } await loadTeams(); } catch (e: any) { alert(e.message); }
    };

    useEffect(() => { loadTeams(); loadComparison(); }, []);
    useEffect(() => {
        if (selectedTeamId) {
            loadTeamDetail(selectedTeamId);
            loadProductivity(selectedTeamId, prodDate);
            loadTrends(selectedTeamId, trendDays);
            loadDetectedApps(selectedTeamId, detectedDays);
        }
    }, [selectedTeamId, prodDate, trendDays, detectedDays]);

    const bg = dm ? 'bg-gray-800/50' : 'bg-white';
    const border = dm ? 'border-gray-700' : 'border-gray-200';
    const text = dm ? 'text-gray-100' : 'text-gray-900';
    const textSub = dm ? 'text-gray-400' : 'text-gray-500';
    const input = dm ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-200 text-gray-900';
    const hoverRow = dm ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50';

    if (loading) return <div className="flex items-center justify-center p-16"><div className="custom-spinner" /></div>;

    return (
        <div className="p-8 pt-6 animate-fade-in space-y-6">
            {/* Sub-tab switcher */}
            <div className={`flex items-center gap-1 p-1 rounded-xl w-fit ${dm ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                {(['overview', 'comparison'] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveSubTab(tab)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeSubTab === tab ? 'bg-blue-600 text-white shadow-md' : `${text} hover:bg-white/50`}`}>
                        {tab === 'overview' ? 'Team Overview' : 'Compare Teams'}
                    </button>
                ))}
            </div>

            {/* ========= COMPARISON VIEW ========= */}
            {activeSubTab === 'comparison' && (
                <div className={`border rounded-xl shadow-sm overflow-hidden ${bg} ${border}`}>
                    <div className={`flex items-center justify-between px-5 py-4 border-b ${border}`}>
                        <h3 className={`text-sm font-bold flex items-center gap-2 ${text}`}><TIcon.TrendingUp /> Team Productivity Comparison</h3>
                    </div>
                    <div className="p-5">
                        {!comparison || comparison.teams.length === 0 ? (
                            <div className={`py-8 text-center text-sm ${textSub}`}>No comparison data available.</div>
                        ) : (
                            <>
                                <div style={{ width: '100%', height: Math.max(200, comparison.teams.length * 60) }}>
                                    <ResponsiveContainer>
                                        <BarChart data={comparison.teams} layout="vertical" margin={{ left: 100, right: 30 }}>
                                            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                                            <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                                            <YAxis type="category" dataKey="team_name" tick={{ fontSize: 13, fontWeight: 600 }} width={90} />
                                            <Tooltip formatter={(v) => `${v}%`} />
                                            <Bar dataKey="productivity_score" name="Productivity" radius={[0, 6, 6, 0]} barSize={28}>
                                                {comparison.teams.map((t) => (
                                                    <Cell key={t.team_id} fill={t.productivity_score >= 70 ? '#16a34a' : t.productivity_score >= 40 ? '#ca8a04' : '#dc2626'} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="overflow-x-auto mt-4">
                                    <table className="w-full">
                                        <thead className={`border-b ${dm ? 'bg-gray-700 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                                            <tr>
                                                {['Team', 'Score', 'Productive', 'Non-Prod', 'Members', 'Active'].map(h => (
                                                    <th key={h} className={`px-4 py-3 text-left text-xs font-bold uppercase tracking-wider ${textSub}`}>{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className={`divide-y ${dm ? 'divide-gray-700' : 'divide-gray-100'}`}>
                                            {comparison.teams.map(t => (
                                                <tr key={t.team_id} className={`${hoverRow} transition-colors`}>
                                                    <td className={`px-4 py-3 text-sm font-semibold ${text}`}>{t.team_name}</td>
                                                    <td className="px-4 py-3"><span className="text-sm font-bold" style={{ color: t.productivity_score >= 70 ? '#16a34a' : t.productivity_score >= 40 ? '#ca8a04' : '#dc2626' }}>{t.productivity_score}%</span></td>
                                                    <td className="px-4 py-3 text-sm text-green-600 font-semibold">{formatDuration(t.productive_seconds)}</td>
                                                    <td className="px-4 py-3 text-sm text-red-600 font-semibold">{formatDuration(t.non_productive_seconds)}</td>
                                                    <td className={`px-4 py-3 text-sm ${text}`}>{t.member_count}</td>
                                                    <td className={`px-4 py-3 text-sm ${text}`}>{t.active_members}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* ========= OVERVIEW VIEW ========= */}
            {activeSubTab === 'overview' && (
                <>
                    {/* Team selector */}
                    <div className="flex items-center gap-3 flex-wrap">
                        {teams.map(t => (
                            <button key={t.id} onClick={() => setSelectedTeamId(t.id)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${selectedTeamId === t.id ? 'bg-blue-600 text-white border-blue-600 shadow-md' : `${bg} ${border} ${text} hover:border-blue-400`}`}>
                                {t.name} <span className={`ml-1.5 text-xs ${selectedTeamId === t.id ? 'text-blue-200' : textSub}`}>({t.member_count})</span>
                            </button>
                        ))}
                        {!showNewTeam ? (
                            <button onClick={() => setShowNewTeam(true)} className={`px-3 py-2 rounded-lg text-sm font-semibold border border-dashed ${border} ${textSub} hover:border-blue-400 hover:text-blue-500 transition-all flex items-center gap-1.5`}><TIcon.Plus /> New Team</button>
                        ) : (
                            <div className="flex items-center gap-2">
                                <input value={newTeamName} onChange={e => setNewTeamName(e.target.value)} placeholder="Team name"
                                    className={`px-3 py-2 rounded-lg text-sm border ${input} focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                    onKeyDown={e => e.key === 'Enter' && handleCreateTeam()} />
                                <button onClick={handleCreateTeam} className="px-3 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all">Create</button>
                                <button onClick={() => { setShowNewTeam(false); setNewTeamName(''); }} className={`px-2 py-2 rounded-lg text-sm ${textSub} hover:text-red-500 transition-all`}><TIcon.X /></button>
                            </div>
                        )}
                    </div>

                    {selectedTeamId && teamDetail && (
                        <>
                            {/* Members + Rules Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Members */}
                                <div className={`border rounded-xl shadow-sm overflow-hidden ${bg} ${border}`}>
                                    <div className={`flex items-center justify-between px-5 py-4 border-b ${border}`}>
                                        <h3 className={`text-sm font-bold flex items-center gap-2 ${text}`}><TIcon.Users /> Members ({teamDetail.members.length})</h3>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => setShowAssignModal(true)} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all flex items-center gap-1"><TIcon.Plus /> Assign</button>
                                            <button onClick={() => handleDeleteTeam(selectedTeamId)} className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-500 border border-red-200 hover:bg-red-50 transition-all"><TIcon.Trash /></button>
                                        </div>
                                    </div>
                                    <div className={`divide-y ${dm ? 'divide-gray-700' : 'divide-gray-100'}`} style={{ maxHeight: 320, overflowY: 'auto' }}>
                                        {teamDetail.members.length === 0 ? (
                                            <div className={`px-5 py-8 text-center text-sm ${textSub}`}>No members yet.</div>
                                        ) : teamDetail.members.map(m => (
                                            <div key={m.id} className={`flex items-center gap-3 px-5 py-3 ${hoverRow} transition-colors`}>
                                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#E3EAFC', color: '#2962FF' }}>{m.name.split(' ').map(n => n[0]).join('').substring(0, 2)}</div>
                                                <div className="flex-1 min-w-0">
                                                    <div className={`text-sm font-semibold truncate ${text}`}>{m.name}</div>
                                                    <div className={`text-xs truncate ${textSub}`}>{m.email}</div>
                                                </div>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${m.is_active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{m.is_active ? 'Active' : 'Inactive'}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Rules */}
                                <div className={`border rounded-xl shadow-sm overflow-hidden ${bg} ${border}`}>
                                    <div className={`flex items-center justify-between px-5 py-4 border-b ${border}`}>
                                        <h3 className={`text-sm font-bold flex items-center gap-2 ${text}`}><TIcon.Shield /> App Rules ({teamDetail.rules.length})</h3>
                                        <button onClick={() => loadSuggestions(selectedTeamId)} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-all flex items-center gap-1"><TIcon.Lightbulb /> Suggest Rules</button>
                                    </div>
                                    <div className="px-5 py-3 space-y-3">
                                        <div className="flex items-center gap-2">
                                            <input value={newRulePattern} onChange={e => setNewRulePattern(e.target.value)} placeholder="App or keyword..."
                                                className={`flex-1 px-3 py-2 rounded-lg text-sm border ${input} focus:outline-none focus:ring-1 focus:ring-blue-500`}
                                                onKeyDown={e => e.key === 'Enter' && handleAddRule()} />
                                            <select value={newRuleCategory} onChange={e => setNewRuleCategory(e.target.value)} className={`px-3 py-2 rounded-lg text-sm border ${input} focus:outline-none`}>
                                                <option value="productive">Productive</option>
                                                <option value="non_productive">Non-Productive</option>
                                                <option value="neutral">Neutral</option>
                                            </select>
                                            <button onClick={handleAddRule} disabled={!newRulePattern.trim()} className="px-3 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 transition-all">Add</button>
                                        </div>
                                        <div className="space-y-1.5" style={{ maxHeight: 240, overflowY: 'auto' }}>
                                            {teamDetail.rules.length === 0 ? (
                                                <div className={`py-6 text-center text-sm ${textSub}`}>No rules defined.</div>
                                            ) : teamDetail.rules.map(rule => (
                                                <div key={rule.id} className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${border} ${hoverRow} transition-colors`}>
                                                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${rule.category === 'productive' ? 'bg-green-500' : rule.category === 'non_productive' ? 'bg-red-500' : 'bg-gray-400'}`} />
                                                    <span className={`text-sm font-medium flex-1 ${text}`}>{rule.app_pattern}</span>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${rule.category === 'productive' ? 'bg-green-50 text-green-700' : rule.category === 'non_productive' ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                                                        {rule.category === 'non_productive' ? 'Non-Prod' : rule.category === 'productive' ? 'Productive' : 'Neutral'}
                                                    </span>
                                                    <button onClick={() => handleDeleteRule(rule.id)} className="text-gray-400 hover:text-red-500 transition-colors p-0.5"><TIcon.X /></button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Productivity Report */}
                            <div className={`border rounded-xl shadow-sm overflow-hidden ${bg} ${border}`}>
                                <div className={`flex items-center justify-between px-5 py-4 border-b ${border}`}>
                                    <h3 className={`text-sm font-bold flex items-center gap-2 ${text}`}><TIcon.TrendingUp /> Team Productivity</h3>
                                    <div className="flex items-center gap-2">
                                        <button onClick={handleExport} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-all flex items-center gap-1"><TIcon.Download /> Export CSV</button>
                                        <div className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg shadow-sm ${dm ? 'border-gray-600 bg-gray-700 text-gray-300' : 'border-gray-200 bg-white'}`}>
                                            <TIcon.Calendar />
                                            <input type="date" value={prodDate} onChange={e => setProdDate(e.target.value)} className={`bg-transparent border-none text-sm font-medium focus:outline-none ${dm ? 'text-gray-300' : 'text-gray-700'}`} />
                                        </div>
                                    </div>
                                </div>

                                {prodLoading ? (
                                    <div className="flex items-center justify-center py-12"><div className="custom-spinner" /></div>
                                ) : productivity ? (
                                    <div className="p-5 space-y-5">
                                        {/* Summary cards */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className={`rounded-xl p-4 border ${border} ${dm ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                                                <div className={`text-xs font-semibold uppercase tracking-wider ${textSub}`}>Score</div>
                                                <div className={`text-2xl font-extrabold mt-1 ${productivity.summary.team_productivity_score >= 70 ? 'text-green-600' : productivity.summary.team_productivity_score >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>{productivity.summary.team_productivity_score}%</div>
                                            </div>
                                            <div className={`rounded-xl p-4 border ${border} ${dm ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                                                <div className={`text-xs font-semibold uppercase tracking-wider ${textSub}`}>Productive</div>
                                                <div className="text-2xl font-extrabold mt-1 text-green-600">{formatDuration(productivity.summary.total_productive_seconds)}</div>
                                            </div>
                                            <div className={`rounded-xl p-4 border ${border} ${dm ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                                                <div className={`text-xs font-semibold uppercase tracking-wider ${textSub}`}>Non-Productive</div>
                                                <div className="text-2xl font-extrabold mt-1 text-red-600">{formatDuration(productivity.summary.total_non_productive_seconds)}</div>
                                            </div>
                                            <div className={`rounded-xl p-4 border ${border} ${dm ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                                                <div className={`text-xs font-semibold uppercase tracking-wider ${textSub}`}>Members</div>
                                                <div className={`text-2xl font-extrabold mt-1 ${text}`}>{productivity.summary.member_count}</div>
                                            </div>
                                        </div>

                                        {/* Historical Trends Chart */}
                                        {trends && trends.trends.length > 0 && (
                                            <div className={`border rounded-xl p-4 ${border} ${dm ? 'bg-gray-700/30' : 'bg-gray-50/50'}`}>
                                                <div className="flex items-center justify-between mb-3">
                                                    <h4 className={`text-xs font-bold uppercase tracking-wider ${textSub}`}>Productivity Trend</h4>
                                                    <div className="flex items-center gap-1">
                                                        {[7, 14, 30].map(d => (
                                                            <button key={d} onClick={() => setTrendDays(d)}
                                                                className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${trendDays === d ? 'bg-blue-600 text-white' : `${dm ? 'bg-gray-600 text-gray-300' : 'bg-white text-gray-600'} border ${border}`}`}>
                                                                {d}D
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div style={{ width: '100%', height: 200 }}>
                                                    <ResponsiveContainer>
                                                        <AreaChart data={trends.trends}>
                                                            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                                                            <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                                                            <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} />
                                                            <Tooltip formatter={(v) => `${v}%`} />
                                                            <Area type="monotone" dataKey="productivity_score" stroke="#0F62FE" fill="#0F62FE" fillOpacity={0.15} strokeWidth={2} name="Score" />
                                                        </AreaChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        )}

                                        {/* Member breakdown table */}
                                        {productivity.members.length > 0 && (
                                            <div className="overflow-x-auto">
                                                <table className="w-full">
                                                    <thead className={`border-b ${dm ? 'bg-gray-700 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                                                        <tr>
                                                            {['Employee', 'Score', 'Productive', 'Non-Prod', 'Neutral', 'Top Apps', ''].map(h => (
                                                                <th key={h} className={`px-4 py-3 text-left text-xs font-bold uppercase tracking-wider ${textSub}`}>{h}</th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody className={`divide-y ${dm ? 'divide-gray-700' : 'divide-gray-100'}`}>
                                                        {[...productivity.members].sort((a, b) => b.productivity_score - a.productivity_score).map(m => (
                                                            <tr key={m.user_id} className={`${hoverRow} transition-colors cursor-pointer`} onClick={() => handleDrillDown(m.user_id)}>
                                                                <td className="px-4 py-3">
                                                                    <div className={`text-sm font-semibold ${text}`}>{m.name}</div>
                                                                    <div className={`text-xs ${textSub}`}>{m.email}</div>
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    <div className="flex items-center gap-2">
                                                                        <div className={`w-12 h-1.5 rounded-full overflow-hidden ${dm ? 'bg-gray-600' : 'bg-gray-200'}`}>
                                                                            <div className="h-full rounded-full transition-all" style={{ width: `${m.productivity_score}%`, background: m.productivity_score >= 70 ? '#16a34a' : m.productivity_score >= 40 ? '#ca8a04' : '#dc2626' }} />
                                                                        </div>
                                                                        <span className="text-xs font-bold" style={{ color: m.productivity_score >= 70 ? '#16a34a' : m.productivity_score >= 40 ? '#ca8a04' : '#dc2626' }}>{m.productivity_score}%</span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 py-3 text-sm font-semibold text-green-600">{formatDuration(m.productive_seconds)}</td>
                                                                <td className="px-4 py-3 text-sm font-semibold text-red-600">{formatDuration(m.non_productive_seconds)}</td>
                                                                <td className={`px-4 py-3 text-sm ${textSub}`}>{formatDuration(m.neutral_seconds)}</td>
                                                                <td className="px-4 py-3">
                                                                    <div className="flex flex-wrap gap-1">
                                                                        {m.top_apps.slice(0, 3).map((app, i) => (
                                                                            <span key={i} className={`text-xs px-1.5 py-0.5 rounded-md ${dm ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>{app.name}</span>
                                                                        ))}
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 py-3"><TIcon.Eye /></td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className={`py-12 text-center text-sm ${textSub}`}>No productivity data available for this date.</div>
                                )}
                            </div>
                        </>
                    )}

                    {/* ========= DETECTED APPS & TABS ========= */}
                    {selectedTeamId && detectedApps && (() => {
                        const toggleApp = (name: string) => {
                            setExpandedApps(prev => {
                                const next = new Set(prev);
                                next.has(name) ? next.delete(name) : next.add(name);
                                return next;
                            });
                        };

                        const extractPattern = (displayName: string): string => {
                            const parts = displayName.split(' - ');
                            if (parts[0].trim().length < 3 && parts.length > 1) {
                                return parts.slice(0, 2).join(' - ').trim();
                            }
                            return parts[0].trim();
                        };

                        const handleQuickAction = async (displayName: string, category: string) => {
                            if (!selectedTeamId) return;
                            const pattern = extractPattern(displayName);
                            try {
                                await api.addTeamRule(selectedTeamId, pattern, category);
                                loadDetectedApps(selectedTeamId, detectedDays);
                                loadTeamDetail(selectedTeamId);
                            } catch (e: any) { alert(e.message); }
                        };

                        // Filter apps/tabs
                        const filteredApps = detectedApps.apps.map(app => {
                            const filteredTabs = app.tabs.filter(t => {
                                if (detectedFilter === 'all') return true;
                                if (detectedFilter === 'unclassified') return t.current_category === null;
                                return t.current_category === detectedFilter;
                            });
                            return { ...app, tabs: filteredTabs };
                        }).filter(app => app.tabs.length > 0);

                        // Count per filter
                        const allTabs = detectedApps.apps.flatMap(a => a.tabs);
                        const counts = {
                            all: allTabs.length,
                            unclassified: allTabs.filter(t => t.current_category === null).length,
                            productive: allTabs.filter(t => t.current_category === 'productive').length,
                            non_productive: allTabs.filter(t => t.current_category === 'non_productive').length,
                            neutral: allTabs.filter(t => t.current_category === 'neutral').length,
                        };

                        const fmtSec = (s: number): string => {
                            if (s <= 0) return '0m';
                            const h = Math.floor(s / 3600);
                            const m = Math.floor((s % 3600) / 60);
                            return h > 0 ? `${h}h ${m}m` : `${m}m`;
                        };

                        const GlobeIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>;
                        const MonitorIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>;
                        const ChevronRight = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>;
                        const ChevronDown = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>;

                        return (
                            <div className={`border rounded-xl shadow-sm overflow-hidden ${bg} ${border}`}>
                                <div className={`flex items-center justify-between px-5 py-4 border-b ${border}`}>
                                    <div className="flex items-center gap-2">
                                        <h3 className={`text-sm font-bold flex items-center gap-2 ${text}`}>
                                            <TIcon.Eye /> Detected Apps & Tabs
                                        </h3>
                                        {counts.unclassified > 0 && (
                                            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                                                {counts.unclassified} unclassified
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {[7, 14, 30].map(d => (
                                            <button key={d} onClick={() => setDetectedDays(d)}
                                                className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${detectedDays === d ? 'bg-blue-600 text-white' : `${dm ? 'bg-gray-600 text-gray-300' : 'bg-white text-gray-600'} border ${border}`}`}>
                                                {d}D
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Filter bar */}
                                <div className={`flex items-center gap-2 px-5 py-3 border-b ${border} overflow-x-auto`}>
                                    {([['unclassified', 'Unclassified'], ['all', 'All'], ['productive', 'Productive'], ['non_productive', 'Non-Prod'], ['neutral', 'Neutral']] as const).map(([key, label]) => (
                                        <button key={key} onClick={() => setDetectedFilter(key)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${detectedFilter === key
                                                    ? key === 'unclassified' ? 'bg-amber-500 text-white'
                                                        : key === 'productive' ? 'bg-green-600 text-white'
                                                            : key === 'non_productive' ? 'bg-red-600 text-white'
                                                                : key === 'neutral' ? 'bg-gray-500 text-white'
                                                                    : 'bg-blue-600 text-white'
                                                    : `${dm ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} hover:opacity-80`
                                                }`}>
                                            {label} <span className="ml-1 opacity-75">({counts[key]})</span>
                                        </button>
                                    ))}
                                </div>

                                {detectedLoading ? (
                                    <div className="flex items-center justify-center py-12"><div className="custom-spinner" /></div>
                                ) : filteredApps.length === 0 ? (
                                    <div className={`px-5 py-10 text-center text-sm ${textSub}`}>No apps found for this filter.</div>
                                ) : (
                                    <div className={`divide-y ${dm ? 'divide-gray-700' : 'divide-gray-100'}`} style={{ maxHeight: 520, overflowY: 'auto' }}>
                                        {filteredApps.map(app => {
                                            const isExpanded = expandedApps.has(app.app_name);
                                            return (
                                                <div key={app.app_name}>
                                                    {/* App header row */}
                                                    <button
                                                        onClick={() => toggleApp(app.app_name)}
                                                        className={`w-full flex items-center gap-3 px-5 py-3 text-left ${hoverRow} transition-colors`}
                                                    >
                                                        <span className={`transition-transform ${isExpanded ? '' : ''}`}>
                                                            {isExpanded ? <ChevronDown /> : <ChevronRight />}
                                                        </span>
                                                        <span className={`flex-shrink-0 ${dm ? 'text-blue-400' : 'text-blue-600'}`}>
                                                            {app.is_browser ? <GlobeIcon /> : <MonitorIcon />}
                                                        </span>
                                                        <span className={`text-sm font-semibold flex-1 truncate ${text}`}>{app.app_name}</span>
                                                        <span className={`text-xs font-semibold ${textSub}`}>{fmtSec(app.total_seconds)}</span>
                                                        <span className={`text-xs px-2 py-0.5 rounded-full ${dm ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                                                            {app.tabs.length} tab{app.tabs.length !== 1 ? 's' : ''}
                                                        </span>
                                                    </button>

                                                    {/* Expanded tabs */}
                                                    {isExpanded && (
                                                        <div className={`${dm ? 'bg-gray-800/30' : 'bg-gray-50/50'}`}>
                                                            {app.tabs.map((tab, ti) => {
                                                                const isUnclassified = tab.current_category === null;
                                                                return (
                                                                    <div key={ti}
                                                                        className={`flex items-center gap-3 px-5 pl-14 py-2.5 transition-colors ${isUnclassified
                                                                                ? dm ? 'bg-amber-900/10 hover:bg-amber-900/20' : 'bg-amber-50/60 hover:bg-amber-50'
                                                                                : `${hoverRow} opacity-70 hover:opacity-100`
                                                                            }`}
                                                                    >
                                                                        <div className="flex-1 min-w-0">
                                                                            <div className={`text-sm truncate ${isUnclassified ? `font-semibold ${text}` : text}`} title={tab.window_title}>
                                                                                {tab.display_name}
                                                                            </div>
                                                                            <div className={`text-xs ${textSub} flex items-center gap-3 mt-0.5`}>
                                                                                <span>{fmtSec(tab.total_seconds)}</span>
                                                                                <span>{tab.user_count} user{tab.user_count !== 1 ? 's' : ''}</span>
                                                                            </div>
                                                                        </div>

                                                                        {/* Category indicator or quick-action buttons */}
                                                                        {isUnclassified ? (
                                                                            <div className="flex items-center gap-1.5 flex-shrink-0">
                                                                                <button onClick={(e) => { e.stopPropagation(); handleQuickAction(tab.display_name, 'productive'); }}
                                                                                    className="px-2 py-1 rounded text-[11px] font-bold bg-green-100 text-green-700 hover:bg-green-200 transition-all">
                                                                                    ✓ Productive
                                                                                </button>
                                                                                <button onClick={(e) => { e.stopPropagation(); handleQuickAction(tab.display_name, 'neutral'); }}
                                                                                    className="px-2 py-1 rounded text-[11px] font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all">
                                                                                    ● Neutral
                                                                                </button>
                                                                                <button onClick={(e) => { e.stopPropagation(); handleQuickAction(tab.display_name, 'non_productive'); }}
                                                                                    className="px-2 py-1 rounded text-[11px] font-bold bg-red-100 text-red-700 hover:bg-red-200 transition-all">
                                                                                    ✗ Non-Prod
                                                                                </button>
                                                                            </div>
                                                                        ) : (
                                                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                                                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${tab.current_category === 'productive' ? 'bg-green-500'
                                                                                        : tab.current_category === 'non_productive' ? 'bg-red-500'
                                                                                            : 'bg-gray-400'
                                                                                    }`} />
                                                                                <span className={`text-xs font-medium ${textSub}`}>
                                                                                    {tab.matched_rule || tab.current_category}
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })()}
                </>
            )}

            {/* ========= ASSIGN MEMBER MODAL ========= */}
            {showAssignModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] animate-fade-in" onClick={() => setShowAssignModal(false)}>
                    <div className={`rounded-2xl shadow-2xl w-full max-w-md border ${bg} ${border}`} onClick={e => e.stopPropagation()}>
                        <div className={`flex items-center justify-between px-6 py-4 border-b ${border}`}>
                            <h3 className={`text-base font-bold ${text}`}>Assign Employee to {teamDetail?.name}</h3>
                            <button onClick={() => setShowAssignModal(false)} className={`${textSub} hover:text-red-500 transition-colors`}><TIcon.Close /></button>
                        </div>
                        <div className="px-6 py-4 space-y-1.5" style={{ maxHeight: 400, overflowY: 'auto' }}>
                            {employees.filter(e => !teamDetail?.members.some(m => m.id === e.id)).length === 0 ? (
                                <div className={`py-6 text-center text-sm ${textSub}`}>All employees are already assigned.</div>
                            ) : employees.filter(e => !teamDetail?.members.some(m => m.id === e.id)).map(emp => (
                                <div key={emp.id} className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer ${dm ? 'hover:bg-gray-700/50' : 'hover:bg-blue-50'} transition-colors border ${border}`} onClick={() => handleAssign(emp.id)}>
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#E3EAFC', color: '#2962FF' }}>{emp.name.split(' ').map(n => n[0]).join('').substring(0, 2)}</div>
                                    <div className="flex-1 min-w-0">
                                        <div className={`text-sm font-semibold ${text}`}>{emp.name}</div>
                                        <div className={`text-xs ${textSub}`}>{emp.email}</div>
                                    </div>
                                    <span className="text-xs font-semibold text-blue-600">Assign</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ========= SUGGESTIONS MODAL ========= */}
            {showSuggestions && suggestions && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] animate-fade-in" onClick={() => setShowSuggestions(false)}>
                    <div className={`rounded-2xl shadow-2xl w-full max-w-lg border ${bg} ${border}`} onClick={e => e.stopPropagation()}>
                        <div className={`flex items-center justify-between px-6 py-4 border-b ${border}`}>
                            <h3 className={`text-base font-bold ${text}`}>Rule Suggestions</h3>
                            <button onClick={() => setShowSuggestions(false)} className={`${textSub} hover:text-red-500 transition-colors`}><TIcon.Close /></button>
                        </div>
                        <div className="px-6 py-4 space-y-2" style={{ maxHeight: 500, overflowY: 'auto' }}>
                            {suggestions.suggestions.length === 0 ? (
                                <div className={`py-6 text-center text-sm ${textSub}`}>No suggestions available. All frequently used apps already have rules.</div>
                            ) : suggestions.suggestions.map((s, i) => (
                                <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${border} ${hoverRow} transition-colors`}>
                                    <div className="flex-1 min-w-0">
                                        <div className={`text-sm font-semibold ${text}`}>{s.app_pattern}</div>
                                        <div className={`text-xs ${textSub}`}>{s.usage_display} usage · {s.confidence} confidence</div>
                                    </div>
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${s.suggested_category === 'productive' ? 'bg-green-50 text-green-700' : s.suggested_category === 'non_productive' ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {s.suggested_category === 'non_productive' ? 'Non-Prod' : s.suggested_category === 'productive' ? 'Productive' : 'Neutral'}
                                    </span>
                                    <button onClick={() => handleAcceptSuggestion(s.app_pattern, s.suggested_category)} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all">Accept</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ========= MEMBER DRILL-DOWN MODAL ========= */}
            {showDrillDown && memberActivity && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] animate-fade-in" onClick={() => setShowDrillDown(false)}>
                    <div className={`rounded-2xl shadow-2xl w-full max-w-2xl border ${bg} ${border}`} onClick={e => e.stopPropagation()}>
                        <div className={`flex items-center justify-between px-6 py-4 border-b ${border}`}>
                            <div>
                                <h3 className={`text-base font-bold ${text}`}>{memberActivity.name}</h3>
                                <div className={`text-xs ${textSub}`}>{memberActivity.email} · {memberActivity.date}</div>
                            </div>
                            <button onClick={() => setShowDrillDown(false)} className={`${textSub} hover:text-red-500 transition-colors`}><TIcon.Close /></button>
                        </div>
                        <div className="px-6 py-4 space-y-4" style={{ maxHeight: 600, overflowY: 'auto' }}>
                            {/* Score summary */}
                            <div className="grid grid-cols-4 gap-3">
                                <div className={`rounded-lg p-3 border ${border} text-center`}>
                                    <div className={`text-xs font-semibold ${textSub}`}>Score</div>
                                    <div className="text-lg font-extrabold" style={{ color: memberActivity.productivity_score >= 70 ? '#16a34a' : memberActivity.productivity_score >= 40 ? '#ca8a04' : '#dc2626' }}>{memberActivity.productivity_score}%</div>
                                </div>
                                <div className={`rounded-lg p-3 border ${border} text-center`}>
                                    <div className={`text-xs font-semibold ${textSub}`}>Productive</div>
                                    <div className="text-lg font-extrabold text-green-600">{formatDuration(memberActivity.productive_seconds)}</div>
                                </div>
                                <div className={`rounded-lg p-3 border ${border} text-center`}>
                                    <div className={`text-xs font-semibold ${textSub}`}>Non-Prod</div>
                                    <div className="text-lg font-extrabold text-red-600">{formatDuration(memberActivity.non_productive_seconds)}</div>
                                </div>
                                <div className={`rounded-lg p-3 border ${border} text-center`}>
                                    <div className={`text-xs font-semibold ${textSub}`}>Total</div>
                                    <div className={`text-lg font-extrabold ${text}`}>{formatDuration(memberActivity.total_seconds)}</div>
                                </div>
                            </div>

                            {/* App breakdown */}
                            <div>
                                <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${textSub}`}>App Usage Breakdown</h4>
                                <div className="space-y-2">
                                    {memberActivity.apps.map((app, i) => {
                                        const total = app.total_seconds || 1;
                                        const prodPct = (app.productive_seconds / total) * 100;
                                        const nonPct = (app.non_productive_seconds / total) * 100;
                                        return (
                                            <div key={i} className={`px-3 py-2.5 rounded-lg border ${border} ${hoverRow} transition-colors`}>
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className={`text-sm font-semibold ${text}`}>{app.app_name}</span>
                                                    <span className={`text-xs font-semibold ${textSub}`}>{formatDuration(app.total_seconds)}</span>
                                                </div>
                                                <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden flex">
                                                    <div className="h-full bg-green-500" style={{ width: `${prodPct}%` }} />
                                                    <div className="h-full bg-gray-400" style={{ width: `${100 - prodPct - nonPct}%` }} />
                                                    <div className="h-full bg-red-500" style={{ width: `${nonPct}%` }} />
                                                </div>
                                                {app.windows.length > 0 && (
                                                    <div className="mt-1.5 flex flex-wrap gap-1">
                                                        {app.windows.map((w, j) => (
                                                            <span key={j} className={`text-[10px] px-1.5 py-0.5 rounded truncate max-w-[200px] ${dm ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-500'}`}>{w}</span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


// import { useState, useEffect } from 'react';
// import { api } from '../lib/api';
// import type {
//     UserInfo, TeamInfo, TeamDetail, TeamProductivityReport,
//     TeamComparison, TeamTrend, RuleSuggestion, MemberActivity
// } from '../lib/api';
// import {
//     AreaChart, Area, BarChart, Bar, Cell,
//     XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
// } from 'recharts';

// // Icons used in this component (inline SVG to avoid dependency on App.tsx Icons)
// const TIcon = {
//     Plus: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
//     X: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
//     Close: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
//     Users: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
//     Shield: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
//     TrendingUp: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
//     Calendar: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
//     Trash: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>,
//     Download: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
//     Lightbulb: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6" /><path d="M10 22h4" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" /></svg>,
//     Eye: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
// };

// function formatDuration(seconds: number): string {
//     if (seconds <= 0) return '0m';
//     const h = Math.floor(seconds / 3600);
//     const m = Math.floor((seconds % 3600) / 60);
//     return h > 0 ? `${h}h ${m}m` : `${m}m`;
// }

// export default function TeamsTab({ employees, dm }: { employees: UserInfo[]; dm?: boolean }) {
//     const [teams, setTeams] = useState<TeamInfo[]>([]);
//     const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
//     const [teamDetail, setTeamDetail] = useState<TeamDetail | null>(null);
//     const [productivity, setProductivity] = useState<TeamProductivityReport | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [prodLoading, setProdLoading] = useState(false);
//     const [prodDate, setProdDate] = useState<string>(() => {
//         const d = new Date();
//         return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
//     });
//     const [newRulePattern, setNewRulePattern] = useState('');
//     const [newRuleCategory, setNewRuleCategory] = useState('productive');
//     const [showAssignModal, setShowAssignModal] = useState(false);
//     const [newTeamName, setNewTeamName] = useState('');
//     const [showNewTeam, setShowNewTeam] = useState(false);

//     // Enhancement states
//     const [comparison, setComparison] = useState<TeamComparison | null>(null);
//     const [trends, setTrends] = useState<TeamTrend | null>(null);
//     const [trendDays, setTrendDays] = useState(7);
//     const [suggestions, setSuggestions] = useState<RuleSuggestion | null>(null);
//     const [showSuggestions, setShowSuggestions] = useState(false);
//     const [memberActivity, setMemberActivity] = useState<MemberActivity | null>(null);
//     const [showDrillDown, setShowDrillDown] = useState(false);
//     const [activeSubTab, setActiveSubTab] = useState<'overview' | 'comparison'>('overview');

//     // Loaders
//     const loadTeams = async () => {
//         try {
//             const t = await api.getTeams();
//             setTeams(t);
//             if (!selectedTeamId && t.length > 0) setSelectedTeamId(t[0].id);
//         } catch (e) { console.error(e); } finally { setLoading(false); }
//     };
//     const loadTeamDetail = async (id: string) => {
//         try { setTeamDetail(await api.getTeamDetail(id)); } catch (e) { console.error(e); }
//     };
//     const loadProductivity = async (id: string, date: string) => {
//         setProdLoading(true);
//         try { setProductivity(await api.getTeamProductivity(id, date)); } catch (e) { console.error(e); } finally { setProdLoading(false); }
//     };
//     const loadComparison = async (date?: string) => {
//         try { setComparison(await api.getTeamComparison(date)); } catch (e) { console.error(e); }
//     };
//     const loadTrends = async (id: string, days: number) => {
//         try { setTrends(await api.getTeamTrends(id, days)); } catch (e) { console.error(e); }
//     };
//     const loadSuggestions = async (id: string) => {
//         try { setSuggestions(await api.getTeamSuggestRules(id)); setShowSuggestions(true); } catch (e) { console.error(e); }
//     };

//     // Handlers
//     const handleDrillDown = async (userId: string) => {
//         if (!selectedTeamId) return;
//         try { setMemberActivity(await api.getMemberActivity(selectedTeamId, userId, prodDate)); setShowDrillDown(true); } catch (e) { console.error(e); }
//     };
//     const handleExport = async () => {
//         if (!selectedTeamId) return;
//         try { await api.exportTeamReport(selectedTeamId, prodDate); } catch (e: any) { alert(e.message); }
//     };
//     const handleAcceptSuggestion = async (pattern: string, category: string) => {
//         if (!selectedTeamId) return;
//         try { await api.addTeamRule(selectedTeamId, pattern, category); loadTeamDetail(selectedTeamId); loadSuggestions(selectedTeamId); } catch (e: any) { alert(e.message); }
//     };
//     const handleAddRule = async () => {
//         if (!selectedTeamId || !newRulePattern.trim()) return;
//         try { await api.addTeamRule(selectedTeamId, newRulePattern.trim(), newRuleCategory); setNewRulePattern(''); loadTeamDetail(selectedTeamId); } catch (e: any) { alert(e.message); }
//     };
//     const handleDeleteRule = async (ruleId: number) => {
//         if (!selectedTeamId) return;
//         try { await api.deleteTeamRule(selectedTeamId, ruleId); loadTeamDetail(selectedTeamId); } catch (e: any) { alert(e.message); }
//     };
//     const handleAssign = async (userId: string) => {
//         if (!selectedTeamId) return;
//         try { await api.assignUserToTeam(userId, selectedTeamId); loadTeamDetail(selectedTeamId); loadTeams(); setShowAssignModal(false); } catch (e: any) { alert(e.message); }
//     };
//     const handleCreateTeam = async () => {
//         if (!newTeamName.trim()) return;
//         try { const t = await api.createTeam(newTeamName.trim()); setNewTeamName(''); setShowNewTeam(false); await loadTeams(); setSelectedTeamId(t.id); } catch (e: any) { alert(e.message); }
//     };
//     const handleDeleteTeam = async (id: string) => {
//         if (!confirm('Delete this team? Members will become unassigned.')) return;
//         try { await api.deleteTeam(id); if (selectedTeamId === id) { setSelectedTeamId(null); setTeamDetail(null); setProductivity(null); } await loadTeams(); } catch (e: any) { alert(e.message); }
//     };

//     useEffect(() => { loadTeams(); loadComparison(); }, []);
//     useEffect(() => {
//         if (selectedTeamId) {
//             loadTeamDetail(selectedTeamId);
//             loadProductivity(selectedTeamId, prodDate);
//             loadTrends(selectedTeamId, trendDays);
//         }
//     }, [selectedTeamId, prodDate, trendDays]);

//     const bg = dm ? 'bg-gray-800/50' : 'bg-white';
//     const border = dm ? 'border-gray-700' : 'border-gray-200';
//     const text = dm ? 'text-gray-100' : 'text-gray-900';
//     const textSub = dm ? 'text-gray-400' : 'text-gray-500';
//     const input = dm ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-200 text-gray-900';

//     if (loading) return <div className="flex items-center justify-center p-16"><div className="custom-spinner" /></div>;

//     return (
//         <div className="p-8 pt-6 animate-fade-in space-y-6">
//             {/* Sub-tab switcher */}
//             <div className={`flex items-center gap-1 p-1 rounded-xl ${dm ? 'bg-gray-700/50' : 'bg-gray-100'} w-fit`}>
//                 {(['overview', 'comparison'] as const).map(tab => (
//                     <button key={tab} onClick={() => setActiveSubTab(tab)}
//                         className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeSubTab === tab ? 'bg-blue-600 text-white shadow-md' : `${text} hover:bg-white/50`}`}>
//                         {tab === 'overview' ? 'Team Overview' : 'Compare Teams'}
//                     </button>
//                 ))}
//             </div>

//             {/* ========= COMPARISON VIEW ========= */}
//             {activeSubTab === 'comparison' && (
//                 <div className={`border rounded-xl shadow-sm overflow-hidden ${bg} ${border}`}>
//                     <div className={`flex items-center justify-between px-5 py-4 border-b ${border}`}>
//                         <h3 className={`text-sm font-bold flex items-center gap-2 ${text}`}><TIcon.TrendingUp /> Team Productivity Comparison</h3>
//                     </div>
//                     <div className="p-5">
//                         {!comparison || comparison.teams.length === 0 ? (
//                             <div className={`py-8 text-center ${textSub} text-sm`}>No comparison data available.</div>
//                         ) : (
//                             <>
//                                 <div style={{ width: '100%', height: Math.max(200, comparison.teams.length * 60) }}>
//                                     <ResponsiveContainer>
//                                         <BarChart data={comparison.teams} layout="vertical" margin={{ left: 100, right: 30 }}>
//                                             <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
//                                             <XAxis type="number" domain={[0, 100]} tickFormatter={(v: number) => `${v}%`} />
//                                             <YAxis type="category" dataKey="team_name" tick={{ fontSize: 13, fontWeight: 600 }} width={90} />
//                                             <Tooltip formatter={(v: number) => `${v}%`} />
//                                             <Bar dataKey="productivity_score" name="Productivity" radius={[0, 6, 6, 0]} barSize={28}>
//                                                 {comparison.teams.map(t => (
//                                                     <Cell key={t.team_id} fill={t.productivity_score >= 70 ? '#16a34a' : t.productivity_score >= 40 ? '#ca8a04' : '#dc2626'} />
//                                                 ))}
//                                             </Bar>
//                                         </BarChart>
//                                     </ResponsiveContainer>
//                                 </div>
//                                 <div className="overflow-x-auto mt-4">
//                                     <table className="w-full">
//                                         <thead className={`border-b ${dm ? 'bg-gray-700 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
//                                             <tr>
//                                                 {['Team', 'Score', 'Productive', 'Non-Prod', 'Members', 'Active'].map(h => (
//                                                     <th key={h} className={`px-4 py-3 text-left text-xs font-bold uppercase tracking-wider ${textSub}`}>{h}</th>
//                                                 ))}
//                                             </tr>
//                                         </thead>
//                                         <tbody className={`divide-y ${dm ? 'divide-gray-700' : 'divide-gray-100'}`}>
//                                             {comparison.teams.map(t => (
//                                                 <tr key={t.team_id} className={`${dm ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'} transition-colors`}>
//                                                     <td className={`px-4 py-3 text-sm font-semibold ${text}`}>{t.team_name}</td>
//                                                     <td className="px-4 py-3"><span className="text-sm font-bold" style={{ color: t.productivity_score >= 70 ? '#16a34a' : t.productivity_score >= 40 ? '#ca8a04' : '#dc2626' }}>{t.productivity_score}%</span></td>
//                                                     <td className="px-4 py-3 text-sm text-green-600 font-semibold">{formatDuration(t.productive_seconds)}</td>
//                                                     <td className="px-4 py-3 text-sm text-red-600 font-semibold">{formatDuration(t.non_productive_seconds)}</td>
//                                                     <td className={`px-4 py-3 text-sm ${text}`}>{t.member_count}</td>
//                                                     <td className={`px-4 py-3 text-sm ${text}`}>{t.active_members}</td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             )}

//             {/* ========= OVERVIEW VIEW ========= */}
//             {activeSubTab === 'overview' && (
//                 <>
//                     {/* Team selector */}
//                     <div className="flex items-center gap-3 flex-wrap">
//                         {teams.map(t => (
//                             <button key={t.id} onClick={() => setSelectedTeamId(t.id)}
//                                 className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${selectedTeamId === t.id ? 'bg-blue-600 text-white border-blue-600 shadow-md' : `${bg} ${border} ${text} hover:border-blue-400`}`}>
//                                 {t.name} <span className={`ml-1.5 text-xs ${selectedTeamId === t.id ? 'text-blue-200' : textSub}`}>({t.member_count})</span>
//                             </button>
//                         ))}
//                         {!showNewTeam ? (
//                             <button onClick={() => setShowNewTeam(true)} className={`px-3 py-2 rounded-lg text-sm font-semibold border border-dashed ${border} ${textSub} hover:border-blue-400 hover:text-blue-500 transition-all flex items-center gap-1.5`}><TIcon.Plus /> New Team</button>
//                         ) : (
//                             <div className="flex items-center gap-2">
//                                 <input value={newTeamName} onChange={e => setNewTeamName(e.target.value)} placeholder="Team name"
//                                     className={`px-3 py-2 rounded-lg text-sm border ${input} focus:outline-none focus:ring-1 focus:ring-blue-500`}
//                                     onKeyDown={e => e.key === 'Enter' && handleCreateTeam()} />
//                                 <button onClick={handleCreateTeam} className="px-3 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all">Create</button>
//                                 <button onClick={() => { setShowNewTeam(false); setNewTeamName(''); }} className={`px-2 py-2 rounded-lg text-sm ${textSub} hover:text-red-500 transition-all`}><TIcon.X /></button>
//                             </div>
//                         )}
//                     </div>

//                     {selectedTeamId && teamDetail && (
//                         <>
//                             {/* Members + Rules Grid */}
//                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                                 {/* Members */}
//                                 <div className={`border rounded-xl shadow-sm overflow-hidden ${bg} ${border}`}>
//                                     <div className={`flex items-center justify-between px-5 py-4 border-b ${border}`}>
//                                         <h3 className={`text-sm font-bold flex items-center gap-2 ${text}`}><TIcon.Users /> Members ({teamDetail.members.length})</h3>
//                                         <div className="flex items-center gap-2">
//                                             <button onClick={() => setShowAssignModal(true)} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all flex items-center gap-1"><TIcon.Plus /> Assign</button>
//                                             <button onClick={() => handleDeleteTeam(selectedTeamId)} className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-500 border border-red-200 hover:bg-red-50 transition-all"><TIcon.Trash /></button>
//                                         </div>
//                                     </div>
//                                     <div className="divide-y divide-gray-100" style={{ maxHeight: 320, overflowY: 'auto' }}>
//                                         {teamDetail.members.length === 0 ? (
//                                             <div className={`px-5 py-8 text-center ${textSub} text-sm`}>No members yet.</div>
//                                         ) : teamDetail.members.map(m => (
//                                             <div key={m.id} className={`flex items-center gap-3 px-5 py-3 hover:${dm ? 'bg-gray-700/50' : 'bg-gray-50'} transition-colors`}>
//                                                 <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#E3EAFC', color: '#2962FF' }}>{m.name.split(' ').map(n => n[0]).join('').substring(0, 2)}</div>
//                                                 <div className="flex-1 min-w-0">
//                                                     <div className={`text-sm font-semibold truncate ${text}`}>{m.name}</div>
//                                                     <div className={`text-xs ${textSub} truncate`}>{m.email}</div>
//                                                 </div>
//                                                 <span className={`text-xs px-2 py-0.5 rounded-full ${m.is_active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{m.is_active ? 'Active' : 'Inactive'}</span>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 {/* Rules */}
//                                 <div className={`border rounded-xl shadow-sm overflow-hidden ${bg} ${border}`}>
//                                     <div className={`flex items-center justify-between px-5 py-4 border-b ${border}`}>
//                                         <h3 className={`text-sm font-bold flex items-center gap-2 ${text}`}><TIcon.Shield /> App Rules ({teamDetail.rules.length})</h3>
//                                         <button onClick={() => loadSuggestions(selectedTeamId)} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-all flex items-center gap-1"><TIcon.Lightbulb /> Suggest Rules</button>
//                                     </div>
//                                     <div className="px-5 py-3 space-y-3">
//                                         <div className="flex items-center gap-2">
//                                             <input value={newRulePattern} onChange={e => setNewRulePattern(e.target.value)} placeholder="App or keyword..."
//                                                 className={`flex-1 px-3 py-2 rounded-lg text-sm border ${input} focus:outline-none focus:ring-1 focus:ring-blue-500`}
//                                                 onKeyDown={e => e.key === 'Enter' && handleAddRule()} />
//                                             <select value={newRuleCategory} onChange={e => setNewRuleCategory(e.target.value)} className={`px-3 py-2 rounded-lg text-sm border ${input} focus:outline-none`}>
//                                                 <option value="productive">Productive</option>
//                                                 <option value="non_productive">Non-Productive</option>
//                                                 <option value="neutral">Neutral</option>
//                                             </select>
//                                             <button onClick={handleAddRule} disabled={!newRulePattern.trim()} className="px-3 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 transition-all">Add</button>
//                                         </div>
//                                         <div className="space-y-1.5" style={{ maxHeight: 240, overflowY: 'auto' }}>
//                                             {teamDetail.rules.length === 0 ? (
//                                                 <div className={`py-6 text-center ${textSub} text-sm`}>No rules defined.</div>
//                                             ) : teamDetail.rules.map(rule => (
//                                                 <div key={rule.id} className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${border} ${dm ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'} transition-colors`}>
//                                                     <span className={`w-2 h-2 rounded-full flex-shrink-0 ${rule.category === 'productive' ? 'bg-green-500' : rule.category === 'non_productive' ? 'bg-red-500' : 'bg-gray-400'}`} />
//                                                     <span className={`text-sm font-medium flex-1 ${text}`}>{rule.app_pattern}</span>
//                                                     <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${rule.category === 'productive' ? 'bg-green-50 text-green-700' : rule.category === 'non_productive' ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
//                                                         {rule.category === 'non_productive' ? 'Non-Prod' : rule.category === 'productive' ? 'Productive' : 'Neutral'}
//                                                     </span>
//                                                     <button onClick={() => handleDeleteRule(rule.id)} className="text-gray-400 hover:text-red-500 transition-colors p-0.5"><TIcon.X /></button>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Productivity Report */}
//                             <div className={`border rounded-xl shadow-sm overflow-hidden ${bg} ${border}`}>
//                                 <div className={`flex items-center justify-between px-5 py-4 border-b ${border}`}>
//                                     <h3 className={`text-sm font-bold flex items-center gap-2 ${text}`}><TIcon.TrendingUp /> Team Productivity</h3>
//                                     <div className="flex items-center gap-2">
//                                         <button onClick={handleExport} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-all flex items-center gap-1"><TIcon.Download /> Export CSV</button>
//                                         <div className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg shadow-sm ${dm ? 'border-gray-600 bg-gray-700 text-gray-300' : 'border-gray-200 bg-white'}`}>
//                                             <TIcon.Calendar />
//                                             <input type="date" value={prodDate} onChange={e => setProdDate(e.target.value)} className={`bg-transparent border-none text-sm font-medium focus:outline-none ${dm ? 'text-gray-300' : 'text-gray-700'}`} />
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {prodLoading ? (
//                                     <div className="flex items-center justify-center py-12"><div className="custom-spinner" /></div>
//                                 ) : productivity ? (
//                                     <div className="p-5 space-y-5">
//                                         {/* Summary cards */}
//                                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                                             <div className={`rounded-xl p-4 border ${border} ${dm ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
//                                                 <div className={`text-xs font-semibold uppercase tracking-wider ${textSub}`}>Score</div>
//                                                 <div className={`text-2xl font-extrabold mt-1 ${productivity.summary.team_productivity_score >= 70 ? 'text-green-600' : productivity.summary.team_productivity_score >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>{productivity.summary.team_productivity_score}%</div>
//                                             </div>
//                                             <div className={`rounded-xl p-4 border ${border} ${dm ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
//                                                 <div className={`text-xs font-semibold uppercase tracking-wider ${textSub}`}>Productive</div>
//                                                 <div className="text-2xl font-extrabold mt-1 text-green-600">{formatDuration(productivity.summary.total_productive_seconds)}</div>
//                                             </div>
//                                             <div className={`rounded-xl p-4 border ${border} ${dm ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
//                                                 <div className={`text-xs font-semibold uppercase tracking-wider ${textSub}`}>Non-Productive</div>
//                                                 <div className="text-2xl font-extrabold mt-1 text-red-600">{formatDuration(productivity.summary.total_non_productive_seconds)}</div>
//                                             </div>
//                                             <div className={`rounded-xl p-4 border ${border} ${dm ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
//                                                 <div className={`text-xs font-semibold uppercase tracking-wider ${textSub}`}>Members</div>
//                                                 <div className={`text-2xl font-extrabold mt-1 ${text}`}>{productivity.summary.member_count}</div>
//                                             </div>
//                                         </div>

//                                         {/* Historical Trends Chart */}
//                                         {trends && trends.trends.length > 0 && (
//                                             <div className={`border rounded-xl p-4 ${border} ${dm ? 'bg-gray-700/30' : 'bg-gray-50/50'}`}>
//                                                 <div className="flex items-center justify-between mb-3">
//                                                     <h4 className={`text-xs font-bold uppercase tracking-wider ${textSub}`}>Productivity Trend</h4>
//                                                     <div className="flex items-center gap-1">
//                                                         {[7, 14, 30].map(d => (
//                                                             <button key={d} onClick={() => setTrendDays(d)}
//                                                                 className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${trendDays === d ? 'bg-blue-600 text-white' : `${dm ? 'bg-gray-600 text-gray-300' : 'bg-white text-gray-600'} border ${border}`}`}>
//                                                                 {d}D
//                                                             </button>
//                                                         ))}
//                                                     </div>
//                                                 </div>
//                                                 <div style={{ width: '100%', height: 200 }}>
//                                                     <ResponsiveContainer>
//                                                         <AreaChart data={trends.trends}>
//                                                             <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
//                                                             <XAxis dataKey="day" tick={{ fontSize: 11 }} />
//                                                             <YAxis domain={[0, 100]} tickFormatter={(v: number) => `${v}%`} tick={{ fontSize: 11 }} />
//                                                             <Tooltip formatter={(v: number) => `${v}%`} />
//                                                             <Area type="monotone" dataKey="productivity_score" stroke="#0F62FE" fill="#0F62FE" fillOpacity={0.15} strokeWidth={2} name="Score" />
//                                                         </AreaChart>
//                                                     </ResponsiveContainer>
//                                                 </div>
//                                             </div>
//                                         )}

//                                         {/* Member breakdown table (clickable for drill-down) */}
//                                         {productivity.members.length > 0 && (
//                                             <div className="overflow-x-auto">
//                                                 <table className="w-full">
//                                                     <thead className={`border-b ${dm ? 'bg-gray-700 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
//                                                         <tr>
//                                                             {['Employee', 'Score', 'Productive', 'Non-Prod', 'Neutral', 'Top Apps', ''].map(h => (
//                                                                 <th key={h} className={`px-4 py-3 text-left text-xs font-bold uppercase tracking-wider ${textSub}`}>{h}</th>
//                                                             ))}
//                                                         </tr>
//                                                     </thead>
//                                                     <tbody className={`divide-y ${dm ? 'divide-gray-700' : 'divide-gray-100'}`}>
//                                                         {[...productivity.members].sort((a, b) => b.productivity_score - a.productivity_score).map(m => (
//                                                             <tr key={m.user_id} className={`${dm ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'} transition-colors cursor-pointer`} onClick={() => handleDrillDown(m.user_id)}>
//                                                                 <td className="px-4 py-3">
//                                                                     <div className={`text-sm font-semibold ${text}`}>{m.name}</div>
//                                                                     <div className={`text-xs ${textSub}`}>{m.email}</div>
//                                                                 </td>
//                                                                 <td className="px-4 py-3">
//                                                                     <div className="flex items-center gap-2">
//                                                                         <div className={`w-12 h-1.5 rounded-full ${dm ? 'bg-gray-600' : 'bg-gray-200'} overflow-hidden`}>
//                                                                             <div className="h-full rounded-full transition-all" style={{ width: `${m.productivity_score}%`, background: m.productivity_score >= 70 ? '#16a34a' : m.productivity_score >= 40 ? '#ca8a04' : '#dc2626' }} />
//                                                                         </div>
//                                                                         <span className="text-xs font-bold" style={{ color: m.productivity_score >= 70 ? '#16a34a' : m.productivity_score >= 40 ? '#ca8a04' : '#dc2626' }}>{m.productivity_score}%</span>
//                                                                     </div>
//                                                                 </td>
//                                                                 <td className="px-4 py-3 text-sm font-semibold text-green-600">{formatDuration(m.productive_seconds)}</td>
//                                                                 <td className="px-4 py-3 text-sm font-semibold text-red-600">{formatDuration(m.non_productive_seconds)}</td>
//                                                                 <td className={`px-4 py-3 text-sm ${textSub}`}>{formatDuration(m.neutral_seconds)}</td>
//                                                                 <td className="px-4 py-3">
//                                                                     <div className="flex flex-wrap gap-1">
//                                                                         {m.top_apps.slice(0, 3).map((app, i) => (
//                                                                             <span key={i} className={`text-xs px-1.5 py-0.5 rounded-md ${dm ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>{app.name}</span>
//                                                                         ))}
//                                                                     </div>
//                                                                 </td>
//                                                                 <td className="px-4 py-3"><TIcon.Eye /></td>
//                                                             </tr>
//                                                         ))}
//                                                     </tbody>
//                                                 </table>
//                                             </div>
//                                         )}
//                                     </div>
//                                 ) : (
//                                     <div className={`py-12 text-center ${textSub} text-sm`}>No productivity data available for this date.</div>
//                                 )}
//                             </div>
//                         </>
//                     )}
//                 </>
//             )}

//             {/* ========= ASSIGN MEMBER MODAL ========= */}
//             {showAssignModal && (
//                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] animate-fade-in" onClick={() => setShowAssignModal(false)}>
//                     <div className={`rounded-2xl shadow-2xl w-full max-w-md border ${bg} ${border}`} onClick={e => e.stopPropagation()}>
//                         <div className={`flex items-center justify-between px-6 py-4 border-b ${border}`}>
//                             <h3 className={`text-base font-bold ${text}`}>Assign Employee to {teamDetail?.name}</h3>
//                             <button onClick={() => setShowAssignModal(false)} className={`${textSub} hover:text-red-500 transition-colors`}><TIcon.Close /></button>
//                         </div>
//                         <div className="px-6 py-4 space-y-1.5" style={{ maxHeight: 400, overflowY: 'auto' }}>
//                             {employees.filter(e => !teamDetail?.members.some(m => m.id === e.id)).length === 0 ? (
//                                 <div className={`py-6 text-center ${textSub} text-sm`}>All employees are already assigned.</div>
//                             ) : employees.filter(e => !teamDetail?.members.some(m => m.id === e.id)).map(emp => (
//                                 <div key={emp.id} className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer ${dm ? 'hover:bg-gray-700/50' : 'hover:bg-blue-50'} transition-colors border ${border}`} onClick={() => handleAssign(emp.id)}>
//                                     <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#E3EAFC', color: '#2962FF' }}>{emp.name.split(' ').map(n => n[0]).join('').substring(0, 2)}</div>
//                                     <div className="flex-1 min-w-0">
//                                         <div className={`text-sm font-semibold ${text}`}>{emp.name}</div>
//                                         <div className={`text-xs ${textSub}`}>{emp.email}</div>
//                                     </div>
//                                     <span className="text-xs font-semibold text-blue-600">Assign</span>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* ========= SUGGESTIONS MODAL ========= */}
//             {showSuggestions && suggestions && (
//                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] animate-fade-in" onClick={() => setShowSuggestions(false)}>
//                     <div className={`rounded-2xl shadow-2xl w-full max-w-lg border ${bg} ${border}`} onClick={e => e.stopPropagation()}>
//                         <div className={`flex items-center justify-between px-6 py-4 border-b ${border}`}>
//                             <h3 className={`text-base font-bold ${text}`}><TIcon.Lightbulb /> Rule Suggestions</h3>
//                             <button onClick={() => setShowSuggestions(false)} className={`${textSub} hover:text-red-500 transition-colors`}><TIcon.Close /></button>
//                         </div>
//                         <div className="px-6 py-4 space-y-2" style={{ maxHeight: 500, overflowY: 'auto' }}>
//                             {suggestions.suggestions.length === 0 ? (
//                                 <div className={`py-6 text-center ${textSub} text-sm`}>No suggestions available. All frequently used apps already have rules.</div>
//                             ) : suggestions.suggestions.map((s, i) => (
//                                 <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${border} ${dm ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'} transition-colors`}>
//                                     <div className="flex-1 min-w-0">
//                                         <div className={`text-sm font-semibold ${text}`}>{s.app_pattern}</div>
//                                         <div className={`text-xs ${textSub}`}>{s.usage_display} usage &middot; {s.confidence} confidence</div>
//                                     </div>
//                                     <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${s.suggested_category === 'productive' ? 'bg-green-50 text-green-700' : s.suggested_category === 'non_productive' ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
//                                         {s.suggested_category === 'non_productive' ? 'Non-Prod' : s.suggested_category === 'productive' ? 'Productive' : 'Neutral'}
//                                     </span>
//                                     <button onClick={() => handleAcceptSuggestion(s.app_pattern, s.suggested_category)} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all">Accept</button>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* ========= MEMBER DRILL-DOWN MODAL ========= */}
//             {showDrillDown && memberActivity && (
//                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] animate-fade-in" onClick={() => setShowDrillDown(false)}>
//                     <div className={`rounded-2xl shadow-2xl w-full max-w-2xl border ${bg} ${border}`} onClick={e => e.stopPropagation()}>
//                         <div className={`flex items-center justify-between px-6 py-4 border-b ${border}`}>
//                             <div>
//                                 <h3 className={`text-base font-bold ${text}`}>{memberActivity.name}</h3>
//                                 <div className={`text-xs ${textSub}`}>{memberActivity.email} &middot; {memberActivity.date}</div>
//                             </div>
//                             <button onClick={() => setShowDrillDown(false)} className={`${textSub} hover:text-red-500 transition-colors`}><TIcon.Close /></button>
//                         </div>
//                         <div className="px-6 py-4 space-y-4" style={{ maxHeight: 600, overflowY: 'auto' }}>
//                             {/* Score summary */}
//                             <div className="grid grid-cols-4 gap-3">
//                                 <div className={`rounded-lg p-3 border ${border} text-center`}>
//                                     <div className={`text-xs ${textSub} font-semibold`}>Score</div>
//                                     <div className="text-lg font-extrabold" style={{ color: memberActivity.productivity_score >= 70 ? '#16a34a' : memberActivity.productivity_score >= 40 ? '#ca8a04' : '#dc2626' }}>{memberActivity.productivity_score}%</div>
//                                 </div>
//                                 <div className={`rounded-lg p-3 border ${border} text-center`}>
//                                     <div className={`text-xs ${textSub} font-semibold`}>Productive</div>
//                                     <div className="text-lg font-extrabold text-green-600">{formatDuration(memberActivity.productive_seconds)}</div>
//                                 </div>
//                                 <div className={`rounded-lg p-3 border ${border} text-center`}>
//                                     <div className={`text-xs ${textSub} font-semibold`}>Non-Prod</div>
//                                     <div className="text-lg font-extrabold text-red-600">{formatDuration(memberActivity.non_productive_seconds)}</div>
//                                 </div>
//                                 <div className={`rounded-lg p-3 border ${border} text-center`}>
//                                     <div className={`text-xs ${textSub} font-semibold`}>Total</div>
//                                     <div className={`text-lg font-extrabold ${text}`}>{formatDuration(memberActivity.total_seconds)}</div>
//                                 </div>
//                             </div>

//                             {/* App breakdown */}
//                             <div>
//                                 <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${textSub}`}>App Usage Breakdown</h4>
//                                 <div className="space-y-2">
//                                     {memberActivity.apps.map((app, i) => {
//                                         const total = app.total_seconds || 1;
//                                         const prodPct = (app.productive_seconds / total) * 100;
//                                         const nonPct = (app.non_productive_seconds / total) * 100;
//                                         return (
//                                             <div key={i} className={`px-3 py-2.5 rounded-lg border ${border} ${dm ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'} transition-colors`}>
//                                                 <div className="flex items-center justify-between mb-1">
//                                                     <span className={`text-sm font-semibold ${text}`}>{app.app_name}</span>
//                                                     <span className={`text-xs font-semibold ${textSub}`}>{formatDuration(app.total_seconds)}</span>
//                                                 </div>
//                                                 <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden flex">
//                                                     <div className="h-full bg-green-500" style={{ width: `${prodPct}%` }} />
//                                                     <div className="h-full bg-gray-400" style={{ width: `${100 - prodPct - nonPct}%` }} />
//                                                     <div className="h-full bg-red-500" style={{ width: `${nonPct}%` }} />
//                                                 </div>
//                                                 {app.windows.length > 0 && (
//                                                     <div className="mt-1.5 flex flex-wrap gap-1">
//                                                         {app.windows.map((w, j) => (
//                                                             <span key={j} className={`text-[10px] px-1.5 py-0.5 rounded ${dm ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-500'} truncate max-w-[200px]`}>{w}</span>
//                                                         ))}
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         );
//                                     })}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
