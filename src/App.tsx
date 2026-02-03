import { useState, useEffect } from 'react';
import { api } from './lib/api';
import type { UserInfo, DailyReport, FraudAlert } from './lib/api';

// ============================================================
// ICONS (inline SVGs)
// ============================================================
const Icons = {
  Dashboard: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Clock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Alert: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  X: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Trash: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    </svg>
  ),
  Logout: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================
function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

// ============================================================
// LOGIN COMPONENT
// ============================================================
function LoginPage({ onLogin, onShowRegister }: { onLogin: () => void; onShowRegister: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.login(email, password);
      onLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md p-8 glass rounded-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600 mb-4 shadow-lg shadow-blue-500/20">
            <span className="text-3xl">⚡</span>
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
            Workwise
          </h1>
          <p className="text-slate-500 mt-2">Employee Productivity, Simplified</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-semibold py-3 rounded-lg shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{' '}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onShowRegister(); }}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// REGISTER COMPONENT
// ============================================================
function RegisterPage({ onShowLogin }: { onShowLogin: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await api.register(email, password, name);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
        <div className="w-full max-w-md p-8 glass rounded-2xl relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 text-3xl mb-6">
            ✓
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Registration Successful!</h3>
          <p className="text-slate-500 mb-8">
            Your account is pending admin approval. You'll be able to login once approved.
          </p>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onShowLogin(); }}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Return to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md p-8 glass rounded-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600 mb-4 shadow-lg shadow-blue-500/20">
            <span className="text-2xl">⚡</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Full Name</label>
            <input
              type="text"
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Email</label>
            <input
              type="email"
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Password</label>
            <input
              type="password"
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-semibold py-3 rounded-lg shadow-lg shadow-blue-500/25 transition-all mt-4"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); onShowLogin(); }} className="text-blue-600 hover:text-blue-700 font-medium">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PENDING APPROVALS COMPONENT (Admin)
// ============================================================
function PendingApprovals({
  users,
  onApprove,
  onReject,
  loading
}: {
  users: UserInfo[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  loading: boolean;
}) {
  if (users.length === 0) {
    return (
      <div className="glass-card p-6 text-center">
        <p className="text-slate-500 m-0">No pending approvals</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-800">
          <Icons.Alert /> Pending Approvals ({users.length})
        </h3>
      </div>

      <div className="space-y-3">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 hover:bg-white hover:shadow-sm transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                {getInitials(user.name)}
              </div>
              <div>
                <div className="font-medium text-slate-900">{user.name}</div>
                <div className="text-sm text-slate-500">{user.email}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium disabled:opacity-50"
                onClick={() => onApprove(user.id)}
                disabled={loading}
              >
                <Icons.Check /> Approve
              </button>
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium disabled:opacity-50"
                onClick={() => onReject(user.id)}
                disabled={loading}
              >
                <Icons.X /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// EXPAND ICON
// ============================================================
const ExpandIcon = ({ expanded }: { expanded: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// ============================================================
// EMPLOYEE LIST VIEW (TABLE)
// ============================================================
function EmployeeListView({
  employees,
  employeeReports,
  onViewDetails,
  onDelete
}: {
  employees: UserInfo[];
  employeeReports: Record<string, DailyReport>;
  onViewDetails: (user: UserInfo) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-slate-200">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
              <th className="px-6 py-4">Employee</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Today's Time</th>
              <th className="px-6 py-4">Apps Used</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employees.map((emp) => {
              const report = employeeReports[emp.id];
              const totalSeconds = report?.total_active_seconds || 0;
              const hasActivity = totalSeconds > 0;

              return (
                <tr key={emp.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm ring-2 ring-transparent group-hover:ring-blue-100 transition-all">
                        {getInitials(emp.name)}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{emp.name}</div>
                        <div className="text-sm text-slate-500">{emp.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {hasActivity ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" /> Inactive
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono font-medium text-slate-700">
                      {formatDuration(totalSeconds) || '0m'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-sm">
                    {report?.apps?.length || 0} apps
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        onClick={() => onViewDetails(emp)}
                        title="View Details"
                      >
                        <EyeIcon />
                      </button>
                      <button
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors"
                        onClick={(e) => { e.stopPropagation(); onDelete(emp.id); }}
                        title="Delete"
                      >
                        <Icons.Trash />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {employees.length === 0 && (
        <div className="p-12 text-center text-slate-500">
          No employees found
        </div>
      )}
    </div>
  );
}

// ============================================================
// APP USAGE WITH EXPANDABLE SUB-ACTIVITIES
// ============================================================
function AppUsageWithSubActivities({ report }: { report: DailyReport | null }) {
  const [expandedApps, setExpandedApps] = useState<Set<string>>(new Set());

  if (!report || !report.apps || report.apps.length === 0) {
    return (
      <div className="py-20 text-center text-slate-500">
        <div className="text-4xl mb-4 opacity-50 grayscale">📊</div>
        <div className="text-lg font-medium text-slate-700">No activity recorded</div>
        <div className="text-sm mt-2 text-slate-500">Activity will appear once the Workwise Agent is running</div>
      </div>
    );
  }

  const toggleApp = (appName: string) => {
    const newExpanded = new Set(expandedApps);
    if (newExpanded.has(appName)) {
      newExpanded.delete(appName);
    } else {
      newExpanded.add(appName);
    }
    setExpandedApps(newExpanded);
  };

  const maxSeconds = Math.max(...report.apps.map(a => a.active_seconds));

  return (
    <div className="space-y-3">
      {report.apps.map((app, idx) => {
        const isExpanded = expandedApps.has(app.name);
        const hasSubActivities = app.sub_activities && app.sub_activities.length > 0;
        const percentage = Math.round((app.active_seconds / maxSeconds) * 100);

        return (
          <div key={idx} className="animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${idx * 50}ms` }}>
            {/* App Row */}
            <div
              onClick={() => hasSubActivities && toggleApp(app.name)}
              className={`flex items-center gap-4 p-4 transition-all border ${isExpanded
                ? 'bg-slate-50 border-slate-300 rounded-t-xl'
                : 'bg-white border-slate-200 rounded-xl hover:shadow-md hover:border-blue-200'
                } ${hasSubActivities ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <div className="text-slate-400">
                {hasSubActivities ? <ExpandIcon expanded={isExpanded} /> : <div className="w-4" />}
              </div>

              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg shrink-0">
                {app.name.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="font-semibold text-slate-900 truncate">{app.name}</span>
                    {app.is_browser && (
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">Browser</span>
                    )}
                  </div>
                  <span className="font-mono font-medium text-blue-600">
                    {formatDuration(app.active_seconds)}
                  </span>
                </div>

                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Sub-Activities (expanded) */}
            {isExpanded && hasSubActivities && (
              <div className="bg-slate-50 border-x border-b border-slate-300 rounded-b-xl overflow-hidden divide-y divide-slate-200">
                {app.sub_activities.map((sub, subIdx) => (
                  <div
                    key={subIdx}
                    className="flex items-center gap-4 py-3 px-4 pl-20 hover:bg-slate-100 transition-colors"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    <div className="flex-1 text-sm text-slate-700 truncate font-medium">
                      {sub.name}
                    </div>
                    <div className="text-xs font-mono text-slate-500 shrink-0">
                      {formatDuration(sub.duration_seconds)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// EMPLOYEE DETAIL MODAL
// ============================================================
function EmployeeDetailModal({
  employee,
  onClose
}: {
  employee: UserInfo;
  onClose: () => void;
}) {
  // Use local date format to avoid timezone issues
  const getLocalDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState(() => getLocalDateString(new Date()));
  const [report, setReport] = useState<DailyReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReport = async () => {
      setLoading(true);
      try {
        const data = await api.getDailyReport(selectedDate, employee.id);
        setReport(data);
      } catch (err) {
        console.error('Failed to load report:', err);
        setReport(null);
      } finally {
        setLoading(false);
      }
    };
    loadReport();
  }, [employee.id, selectedDate]);

  const totalActiveSeconds = report?.total_active_seconds || 0;
  const totalIdleSeconds = report?.total_idle_seconds || 0;
  const appsCount = report?.apps?.length || 0;

  const changeDate = (days: number) => {
    const date = new Date(selectedDate + 'T12:00:00'); // Add time to avoid timezone issues
    date.setDate(date.getDate() + days);
    setSelectedDate(getLocalDateString(date));
  };

  const todayStr = getLocalDateString(new Date());
  const isToday = selectedDate === todayStr;

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
              {getInitials(employee.name)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{employee.name}</h2>
              <p className="text-sm text-slate-500">{employee.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Date Picker */}
        <div className="flex items-center justify-center gap-6 p-4 border-b border-slate-200 bg-slate-50">
          <button
            className="p-2 rounded-lg hover:bg-white hover:shadow-sm text-slate-500 hover:text-slate-900 transition-all border border-transparent hover:border-slate-200"
            onClick={() => changeDate(-1)}
          >
            ←
          </button>

          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
            <CalendarIcon />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={todayStr}
              className="bg-transparent border-none text-slate-700 text-sm font-medium focus:outline-none"
            />
            {isToday && (
              <span className="text-[10px] font-bold uppercase bg-blue-100 text-blue-600 px-2 py-0.5 rounded">
                Today
              </span>
            )}
          </div>

          <button
            className="p-2 rounded-lg hover:bg-white hover:shadow-sm text-slate-500 hover:text-slate-900 transition-all border border-transparent hover:border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={() => changeDate(1)}
            disabled={isToday}
          >
            →
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 p-6 bg-slate-50 border-b border-slate-200">
          <div className="bg-white rounded-xl p-4 text-center border border-slate-200 shadow-sm">
            <div className="text-2xl font-bold text-blue-600 font-mono">
              {loading ? '...' : formatDuration(totalActiveSeconds) || '0m'}
            </div>
            <div className="text-xs font-bold uppercase text-slate-400 mt-1">Active Time</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-slate-200 shadow-sm">
            <div className="text-2xl font-bold text-slate-700 font-mono">
              {loading ? '...' : formatDuration(totalIdleSeconds) || '0m'}
            </div>
            <div className="text-xs font-bold uppercase text-slate-400 mt-1">Idle Time</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-slate-200 shadow-sm">
            <div className="text-2xl font-bold text-green-600 font-mono">
              {loading ? '...' : appsCount}
            </div>
            <div className="text-xs font-bold uppercase text-slate-400 mt-1">Apps Used</div>
          </div>
        </div>

        {/* App Usage */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
            Detailed Activity Log
          </h3>
          {loading ? (
            <div className="text-center py-12 text-slate-500 animate-pulse">
              Loading activity data...
            </div>
          ) : (
            <AppUsageWithSubActivities report={report} />
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SIMPLE APP USAGE (for dashboard overview)
// ============================================================
function AppUsageList({ report }: { report: DailyReport | null }) {
  if (!report || !report.apps || report.apps.length === 0) {
    return (
      <div className="py-12 text-center text-slate-500">
        No activity data for today
      </div>
    );
  }

  const maxSeconds = Math.max(...report.apps.map(a => a.active_seconds));

  return (
    <div className="space-y-4">
      {report.apps.slice(0, 8).map((app, idx) => (
        <div key={idx} className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0 group-hover:bg-blue-100 transition-colors">
            {app.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-end mb-1">
              <span className="text-sm font-medium text-slate-900 truncate pr-4">{app.name}</span>
              <span className="text-xs font-mono text-slate-500">{formatDuration(app.active_seconds)}</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${(app.active_seconds / maxSeconds) * 100}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// FRAUD ALERTS COMPONENT
// ============================================================
function FraudAlertPanel({ alerts }: { alerts: FraudAlert[] }) {
  if (alerts.length === 0) {
    return (
      <div className="py-8 text-center text-slate-500">
        <div className="text-2xl mb-2 text-green-500">✓</div>
        No suspicious activity detected
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {alerts.slice(0, 5).map((alert, idx) => (
        <div key={idx} className={`p-4 rounded-xl border flex items-start gap-3 ${alert.severity === 'CRITICAL'
          ? 'bg-red-50 border-red-200'
          : 'bg-amber-50 border-amber-200'
          }`}>
          <div className={`mt-0.5 ${alert.severity === 'CRITICAL' ? 'text-red-500' : 'text-amber-500'}`}>
            <Icons.Alert />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <span className="font-medium text-slate-900 text-sm">{alert.user_email}</span>
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${alert.severity === 'CRITICAL' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                }`}>
                {alert.severity}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{alert.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// MAIN DASHBOARD COMPONENT
// ============================================================
function Dashboard({ user, onLogout }: { user: { name: string; role: string }; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'employees'>('dashboard');
  const [employees, setEmployees] = useState<UserInfo[]>([]);
  const [pendingUsers, setPendingUsers] = useState<UserInfo[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<UserInfo | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [employeeReports, setEmployeeReports] = useState<Record<string, DailyReport>>({});
  const [employeeReport, setEmployeeReport] = useState<DailyReport | null>(null);
  const [fraudAlerts, setFraudAlerts] = useState<FraudAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const isAdmin = user.role === 'admin';

  const loadData = async () => {
    try {
      if (isAdmin) {
        const [emps, pending, fraudData] = await Promise.all([
          api.getEmployees(),
          api.getPendingUsers(),
          api.getFraudAlerts(7).catch(() => ({ alerts: [] }))
        ]);
        const filteredEmps = emps.filter(e => e.role !== 'admin');
        setEmployees(filteredEmps);
        setPendingUsers(pending);
        setFraudAlerts(fraudData.alerts || []);

        // Load reports for all employees
        const reports: Record<string, DailyReport> = {};
        await Promise.all(filteredEmps.map(async (emp) => {
          try {
            // detailed modal uses local date, we must do the same here
            const getLocalDateString = (date: Date) => {
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              return `${year}-${month}-${day}`;
            };
            const todayStr = getLocalDateString(new Date());
            const report = await api.getDailyReport(todayStr, emp.id);
            reports[emp.id] = report;
          } catch {
            // Skip if report fails
          }
        }));
        setEmployeeReports(reports);
      } else {
        // Employee view - load own data
        const report = await api.getDailyReport();
        setEmployeeReport(report);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      loadData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadEmployeeReport = async () => {
      if (selectedEmployee) {
        try {
          const report = await api.getDailyReport(undefined, selectedEmployee.id);
          setEmployeeReport(report);
        } catch {
          setEmployeeReport(null);
        }
      }
    };
    loadEmployeeReport();
  }, [selectedEmployee]);

  const handleApprove = async (userId: string) => {
    setActionLoading(true);
    try {
      await api.approveUser(userId);
      await loadData();
    } catch (error) {
      console.error('Failed to approve user:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (userId: string) => {
    setActionLoading(true);
    try {
      await api.rejectUser(userId);
      await loadData();
    } catch (error) {
      console.error('Failed to reject user:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this employee?')) return;
    setActionLoading(true);
    try {
      await api.deleteUser(userId);
      if (selectedEmployee?.id === userId) {
        setSelectedEmployee(null);
        setEmployeeReport(null);
      }
      await loadData();
    } catch (error) {
      console.error('Failed to delete user:', error);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-slate-500 animate-pulse bg-slate-50">
        Loading Workwise...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Sidebar - Light Glass Effect */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-white/80 backdrop-blur-xl border-r border-slate-200 z-50 flex flex-col">
        <div className="flex items-center gap-3 px-6 py-6 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
            ⚡
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-violet-700">
            Workwise
          </span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer font-medium ${activeTab === 'dashboard'
              ? 'bg-blue-50 text-blue-600 border border-blue-100'
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Icons.Dashboard /> Dashboard
          </div>
          {isAdmin && (
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer font-medium ${activeTab === 'employees'
                ? 'bg-blue-50 text-blue-600 border border-blue-100'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              onClick={() => setActiveTab('employees')}
            >
              <Icons.Users /> Employees
            </div>
          )}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-700 transition-all cursor-pointer font-medium"
            onClick={onLogout}
          >
            <Icons.Logout /> Logout
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {activeTab === 'dashboard' ? 'Dashboard Overview' : 'Employee Management'}
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {activeTab === 'dashboard'
                ? `Welcome back, ${user.name.split(' ')[0]}`
                : 'Manage your team members and approvals'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <div className="font-medium text-sm text-slate-900">{user.name}</div>
                <div className="text-xs text-slate-500 capitalize">{user.role}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-semibold ring-2 ring-white shadow-sm">
                {getInitials(user.name)}
              </div>
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && isAdmin && (
          <div className="space-y-6 fade-in">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-blue-600">
                  <Icons.Users />
                </div>
                <div className="text-sm font-medium text-slate-500 mb-2">Total Employees</div>
                <div className="text-3xl font-bold text-slate-900">{employees.length}</div>
                <div className="mt-2 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-3/4 opacity-70"></div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
                <div className="text-sm font-medium text-slate-500 mb-2">Pending Approvals</div>
                <div className={`text-3xl font-bold ${pendingUsers.length > 0 ? 'text-amber-500' : 'text-slate-900'}`}>
                  {pendingUsers.length}
                </div>
                <div className="text-xs text-slate-400 mt-1">Needs attention</div>
              </div>

              <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
                <div className="text-sm font-medium text-slate-500 mb-2">Fraud Alerts</div>
                <div className={`text-3xl font-bold ${fraudAlerts.length > 0 ? 'text-red-500' : 'text-slate-900'}`}>
                  {fraudAlerts.length}
                </div>
                <div className="text-xs text-slate-400 mt-1">Last 7 days</div>
              </div>
            </div>

            {/* Pending Approvals */}
            {pendingUsers.length > 0 && (
              <div className="fade-in">
                <PendingApprovals
                  users={pendingUsers}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  loading={actionLoading}
                />
              </div>
            )}

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Employee Activity */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-800">
                    <Icons.Users /> Employee Activity
                  </h3>
                </div>

                {selectedEmployee ? (
                  <div className="fade-in">
                    <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg shadow-sm">
                        {getInitials(selectedEmployee.name)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-lg">{selectedEmployee.name}</div>
                        <div className="text-sm text-slate-500">{selectedEmployee.email}</div>
                      </div>
                    </div>
                    <AppUsageList report={employeeReport} />
                  </div>
                ) : (
                  <div className="py-12 text-center text-slate-400">
                    <Icons.Users />
                    <p className="mt-2 text-slate-500">Select an employee to view their activity</p>
                  </div>
                )}
              </div>

              {/* Fraud Alerts */}
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-800">
                    <Icons.Alert /> Recent Alerts
                  </h3>
                </div>
                <FraudAlertPanel alerts={fraudAlerts} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'employees' && isAdmin && (
          <div className="space-y-6 fade-in">
            <EmployeeListView
              employees={employees}
              employeeReports={employeeReports}
              onViewDetails={(emp) => {
                setSelectedEmployee(emp);
                setShowDetailModal(true);
              }}
              onDelete={handleDelete}
            />

            {/* Employee Detail Modal */}
            {showDetailModal && selectedEmployee && (
              <EmployeeDetailModal
                employee={selectedEmployee}
                onClose={() => {
                  setShowDetailModal(false);
                  setSelectedEmployee(null);
                }}
              />
            )}
          </div>
        )}

        {/* Employee View (non-admin) */}
        {!isAdmin && (
          <div className="max-w-4xl mx-auto space-y-8 fade-in">
            <div className="glass-card p-8 rounded-2xl border-t-4 border-blue-500">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Today's Activity</h2>
                  <p className="text-slate-500">Your tracked productivity stats</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                  <Icons.Clock />
                </div>
              </div>
              <AppUsageList report={employeeReport} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = api.getToken();
      if (token) {
        try {
          const userData = await api.getMe();
          setUser({ name: userData.name, role: userData.role });
          setIsAuthenticated(true);
        } catch {
          api.clearToken();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogin = async () => {
    try {
      const userData = await api.getMe();
      setUser({ name: userData.name, role: userData.role });
      setIsAuthenticated(true);
      setShowRegister(false);
    } catch (error) {
      console.error('Failed to get user data:', error);
    }
  };

  const handleLogout = () => {
    api.clearToken();
    setIsAuthenticated(false);
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <div className="text-slate-400 font-medium animate-pulse">Loading Workwise...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return showRegister
      ? <RegisterPage onShowLogin={() => setShowRegister(false)} />
      : <LoginPage onLogin={handleLogin} onShowRegister={() => setShowRegister(true)} />;
  }

  return <Dashboard user={user!} onLogout={handleLogout} />;
}
