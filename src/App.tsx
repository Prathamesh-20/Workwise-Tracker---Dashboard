import React from 'react';
//         {heatmapData.map((row, ri) => (
//           <div key={ri} className="contents">
//             <div className="text-xs font-semibold text-gray-700 flex items-center pr-2 truncate">{row.name}</div>
//             {row.hours.map((intensity, hi) => (
//               <div key={hi} className="heatmap-cell rounded cursor-default" style={{ height: 26, background: getHeatColor(intensity) }}
//                 title={`${row.name} @ ${hourLabels[hi]}: ${Math.round(intensity * 100)}% active`} />
//             ))}
//           </div>
//         ))}
//       </div>
//       <div className="flex items-center gap-1.5 mt-3 justify-end">
//         <span className="text-[10px] text-gray-400">Less</span>
//         {[0, 0.25, 0.5, 0.75, 1].map((v, i) => (
//           <div key={i} className="w-3.5 h-3.5 rounded-sm" style={{ background: getHeatColor(v) }} />
//         ))}
//         <span className="text-[10px] text-gray-400">More</span>
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // LOGIN PAGE
// // ============================================================
// function LoginPage({ onLogin, onShowRegister }: { onLogin: () => void; onShowRegister: () => void }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(''); setLoading(true);
//     try { await api.login(email, password); onLogin(); }
//     catch (err) { setError(err instanceof Error ? err.message : 'Login failed'); }
//     finally { setLoading(false); }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at 50% 0%, #112D6E 0%, #0A1A4A 40%, #060E2B 100%)' }}>

//       {/* === 3D BACKGROUND LAYERS === */}

//       {/* Perspective grid floor */}
//       <div className="absolute inset-0" style={{
//         background: `
//           linear-gradient(rgba(15,98,254,0.07) 1px, transparent 1px),
//           linear-gradient(90deg, rgba(15,98,254,0.07) 1px, transparent 1px)
//         `,
//         backgroundSize: '60px 60px',
//         transform: 'perspective(500px) rotateX(60deg)',
//         transformOrigin: 'center top',
//         top: '45%',
//         height: '120%',
//         maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
//         WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
//         pointerEvents: 'none',
//         animation: 'gridScroll 20s linear infinite',
//       }} />

// }

// // ============================================================
// // REGISTER PAGE
// // ============================================================
// function RegisterPage({ onShowLogin }: { onShowLogin: () => void }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault(); setError('');
//     if (password !== confirmPassword) { setError('Passwords do not match'); return; }
//     if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
//     setLoading(true);
//     try { await api.register(email, password, name); setSuccess(true); }
//     catch (err) { setError(err instanceof Error ? err.message : 'Registration failed'); }
//     finally { setLoading(false); }
//   };

//   const bgElements = (
//     <>
//       <div className="absolute inset-0" style={{
//         background: 'linear-gradient(rgba(15,98,254,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(15,98,254,0.07) 1px, transparent 1px)',
//         backgroundSize: '60px 60px', transform: 'perspective(500px) rotateX(60deg)', transformOrigin: 'center top',
//         top: '45%', height: '120%',
//         maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
//         WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
//         pointerEvents: 'none', animation: 'gridScroll 20s linear infinite',
//       }} />
//       <div className="absolute" style={{ top: '15%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(15,98,254,0.2) 0%, rgba(15,98,254,0.05) 40%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none', animation: 'breathe 6s ease-in-out infinite' }} />
//       <div className="absolute" style={{ top: '25%', left: '8%', width: 200, height: 200, background: 'radial-gradient(circle, rgba(105,41,196,0.25) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', animation: 'floatOrb1 8s ease-in-out infinite', filter: 'blur(2px)' }} />
//       <div className="absolute" style={{ top: '60%', right: '5%', width: 250, height: 250, background: 'radial-gradient(circle, rgba(15,98,254,0.2) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', animation: 'floatOrb2 10s ease-in-out infinite', filter: 'blur(2px)' }} />
//       <div className="absolute" style={{ top: '50%', left: '50%', width: 520, height: 520, transform: 'translate(-50%, -50%)', border: '1px solid rgba(15,98,254,0.1)', borderRadius: '50%', pointerEvents: 'none', animation: 'ringRotate 20s linear infinite' }} />
//       <div className="absolute" style={{ top: '50%', left: '50%', width: 440, height: 440, transform: 'translate(-50%, -50%) rotate(45deg)', border: '1px solid rgba(105,41,196,0.08)', borderRadius: '50%', pointerEvents: 'none', animation: 'ringRotate 25s linear infinite reverse' }} />
//       {[...Array(8)].map((_, i) => (
//         <div key={i} className="absolute rounded-full" style={{
//           width: Math.random() * 3 + 1.5, height: Math.random() * 3 + 1.5,
//           background: i % 3 === 0 ? 'rgba(105,41,196,0.5)' : 'rgba(15,98,254,0.4)',
//           left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 80}%`,
//           pointerEvents: 'none', boxShadow: `0 0 ${4 + Math.random() * 6}px ${i % 3 === 0 ? 'rgba(105,41,196,0.3)' : 'rgba(15,98,254,0.3)'}`,
//           animation: `particleFloat${(i % 4) + 1} ${6 + Math.random() * 8}s ease-in-out infinite`, animationDelay: `${Math.random() * 5}s`,
//         }} />
//       ))}
//       <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to top, rgba(15,98,254,0.08), transparent)', pointerEvents: 'none' }} />
//     </>
//   );

//   const glassCardStyle = {
//     background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
//     borderColor: 'rgba(255,255,255,0.06)', boxShadow: '0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 60px rgba(15,98,254,0.03), 0 0 100px rgba(15,98,254,0.04)',
//   };

//   const inputStyle = { background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.08)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' };
//   const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = 'rgba(15,98,254,0.4)'; e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.2), 0 0 0 3px rgba(15,98,254,0.1)'; };
//   const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.2)'; };

//   if (success) {
//     return (
//       <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at 50% 0%, #112D6E 0%, #0A1A4A 40%, #060E2B 100%)' }}>
//         {bgElements}
//         <div className="w-full max-w-md p-10 rounded-2xl text-center relative z-10 border" style={glassCardStyle}>
//           <div className="absolute top-0 left-6 right-6 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }} />
//           <div className="w-16 h-16 rounded-full flex items-center justify-center text-green-400 text-3xl mx-auto mb-5" style={{ background: 'rgba(25,128,56,0.15)', boxShadow: '0 0 30px rgba(25,128,56,0.15)' }}>✓</div>
//           <h3 className="text-2xl font-bold text-white mb-2">Registration Successful!</h3>
//           <p className="text-blue-200/40 mb-6 text-sm">Your account is pending admin approval.</p>
//           <a href="#" onClick={(e) => { e.preventDefault(); onShowLogin(); }} className="text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors">Return to Login</a>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at 50% 0%, #112D6E 0%, #0A1A4A 40%, #060E2B 100%)' }}>
//       {bgElements}

//       <div className="w-full max-w-md p-10 rounded-2xl relative z-10 border" style={glassCardStyle}>
//         <div className="absolute top-0 left-6 right-6 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }} />

//         <div className="text-center mb-6">
//           <div className="relative inline-block mb-3">
//             <div className="absolute" style={{ inset: -12, borderRadius: 16, background: 'rgba(15,98,254,0.15)', filter: 'blur(20px)', animation: 'breathe 4s ease-in-out infinite' }} />
//             <div className="absolute inset-0 rounded-xl" style={{ background: 'rgba(15,98,254,0.35)', filter: 'blur(16px)', transform: 'translateY(8px) scale(0.8)' }} />
//             <img src={autonexLogo} alt="Autonex" className="relative w-14 h-14 rounded-xl object-cover" style={{ boxShadow: '0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)', animation: 'float 4s ease-in-out infinite' }} />
//             <div className="absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)' }} />
//           </div>
//           <h2 className="text-2xl font-bold text-white">Create Account</h2>
//           <p className="text-sm text-blue-200/35 mt-1">Join the Workwise platform</p>
//         </div>

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           {error && <div className="p-3 rounded-lg text-sm text-center font-medium text-red-300" style={{ background: 'rgba(218,30,40,0.15)', border: '1px solid rgba(218,30,40,0.25)' }}>{error}</div>}
//           <div className="space-y-1">
//             <label className="text-xs font-semibold text-blue-200/50 uppercase tracking-wide">Full Name</label>
//             <input type="text" className="w-full px-3.5 py-3 rounded-lg text-sm text-white placeholder-blue-300/25 focus:outline-none transition-all" style={inputStyle}
//               onFocus={handleInputFocus} onBlur={handleInputBlur} placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
//           </div>
//           <div className="space-y-1">
//             <label className="text-xs font-semibold text-blue-200/50 uppercase tracking-wide">Email</label>
//             <input type="email" className="w-full px-3.5 py-3 rounded-lg text-sm text-white placeholder-blue-300/25 focus:outline-none transition-all" style={inputStyle}
//               onFocus={handleInputFocus} onBlur={handleInputBlur} placeholder="you@autonex.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           </div>
//           <div className="space-y-1">
//             <label className="text-xs font-semibold text-blue-200/50 uppercase tracking-wide">Password</label>
//             <input type="password" className="w-full px-3.5 py-3 rounded-lg text-sm text-white placeholder-blue-300/25 focus:outline-none transition-all" style={inputStyle}
//               onFocus={handleInputFocus} onBlur={handleInputBlur} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
//           </div>
//           <div className="space-y-1">
//             <label className="text-xs font-semibold text-blue-200/50 uppercase tracking-wide">Confirm Password</label>
//             <input type="password" className="w-full px-3.5 py-3 rounded-lg text-sm text-white placeholder-blue-300/25 focus:outline-none transition-all" style={inputStyle}
//               onFocus={handleInputFocus} onBlur={handleInputBlur} placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
//           </div>
//           <button type="submit" disabled={loading}
//             className="w-full py-3 text-white font-semibold text-sm rounded-lg transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed mt-2 relative overflow-hidden group"
//             style={{ background: 'linear-gradient(135deg, #0F62FE, #3B82F6)', boxShadow: '0 8px 30px rgba(15,98,254,0.35), inset 0 1px 0 rgba(255,255,255,0.15)' }}>
//             <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
//             <span className="relative">{loading ? 'Creating Account...' : 'Register'}</span>
//           </button>
//         </form>
//         <div className="mt-6 text-center text-sm text-blue-200/30">
//           Already have an account?{' '}
//           <a href="#" onClick={(e) => { e.preventDefault(); onShowLogin(); }} className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">Sign In</a>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // STAT CARD
// // ============================================================
// function StatCard({ icon, label, value, subtext, color }: {
//   icon: React.ReactNode; label: string; value: string | number; subtext?: string; color: string;
// }) {
//   return (
//     <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
//       <div className="flex justify-between items-start mb-3">
//         <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: color + '18', color }}>{icon}</div>
//       </div>
//       <div className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</div>
//       <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">{label}</div>
//       {subtext && <div className="text-xs text-gray-400 mt-1">{subtext}</div>}
//       <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: color }} />
//     </div>
//   );
// }

// // ============================================================
// // PENDING APPROVALS
// // ============================================================
// function PendingApprovals({ users, onApprove, onReject, loading }: {
//   users: UserInfo[]; onApprove: (id: string) => void; onReject: (id: string) => void; loading: boolean;
// }) {
//   if (users.length === 0) return null;
//   return (
//     <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
//       <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
//         <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
//           <Icons.Alert /> Pending Approvals
//           <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700">{users.length}</span>
//         </h3>
//       </div>
//       {users.map((user) => (
//         <div key={user.id} className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors">
//           <div className="flex items-center gap-3">
//             <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs" style={{ background: getAvatarColor(user.name).bg, color: getAvatarColor(user.name).text }}>{getInitials(user.name)}</div>
//             <div>
//               <div className="font-semibold text-sm text-gray-900">{user.name}</div>
//               <div className="text-xs text-gray-500">{user.email}</div>
//             </div>
//           </div>
//           <div className="flex gap-2">
//             <button className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-xs font-semibold disabled:opacity-50"
//               onClick={() => onApprove(user.id)} disabled={loading}><Icons.Check /> Approve</button>
//             <button className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors text-xs font-semibold disabled:opacity-50"
//               onClick={() => onReject(user.id)} disabled={loading}><Icons.X /> Reject</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// // ============================================================
// // EMPLOYEE TABLE
// // ============================================================
// function EmployeeListView({ employees, employeeReports, onViewDetails, onDelete }: {
//   employees: UserInfo[]; employeeReports: Record<string, DailyReport>;
//   onViewDetails: (user: UserInfo) => void; onDelete: (id: string) => void;
// }) {
//   return (
//     <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-gray-50 border-b-2 border-gray-200">
//               <th className="px-5 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Employee</th>
//               <th className="px-5 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-5 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Today's Time</th>
//               <th className="px-5 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Productivity</th>
//               <th className="px-5 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Apps</th>
//               <th className="px-5 py-3 text-[11px] font-bold text-gray-500 uppercase tracking-wider text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.map((emp) => {
//               const report = employeeReports[emp.id];
//               const totalActive = report?.total_active_seconds || 0;
//               const totalIdle = report?.total_idle_seconds || 0;
//               const hasActivity = totalActive > 0;
//               const prodScore = getProductivityScore(totalActive, totalIdle);
//               const grade = getEfficiencyGrade(prodScore);

//               return (
//                 <tr key={emp.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
//                   <td className="px-5 py-3.5">
//                     <div className="flex items-center gap-3">
//                       <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs" style={{ background: getAvatarColor(emp.name).bg, color: getAvatarColor(emp.name).text }}>{getInitials(emp.name)}</div>
//                       <div>
//                         <div className="font-semibold text-sm text-gray-900">{emp.name}</div>
//                         <div className="text-xs text-gray-500">{emp.email}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-5 py-3.5">
//                     {hasActivity ? (
//                       <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700">
//                         <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot" /> Active
//                       </span>
//                     ) : (
//                       <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">
//                         <span className="w-1.5 h-1.5 rounded-full bg-gray-400" /> Inactive
//                       </span>
//                     )}
//                   </td>
//                   <td className="px-5 py-3.5">
//                     <span className="font-mono-custom font-semibold text-sm text-gray-700">{formatDuration(totalActive) || '0m'}</span>
//                   </td>
//                   <td className="px-5 py-3.5">
//                     <div className="flex items-center gap-2">
//                       <div className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
//                         <div className="h-full rounded-full transition-all duration-500" style={{ width: `${prodScore}%`, background: grade.color }} />
//                       </div>
//                       <span className="text-xs font-bold" style={{ color: grade.color }}>{prodScore}%</span>
//                     </div>
//                   </td>
//                   <td className="px-5 py-3.5 text-sm text-gray-500">{report?.apps?.length || 0} apps</td>
//                   <td className="px-5 py-3.5 text-center">
//                     <div className="flex items-center justify-center gap-1">
//                       <button className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors" onClick={() => onViewDetails(emp)} title="View"><Icons.Eye /></button>
//                       <button className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors" onClick={(e) => { e.stopPropagation(); onDelete(emp.id); }} title="Delete"><Icons.Trash /></button>
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//       {employees.length === 0 && <div className="p-12 text-center text-gray-500 text-sm">No employees found</div>}
//     </div>
//   );
// }

// // ============================================================
// // APP USAGE WITH SUB-ACTIVITIES (for modal detail)
// // ============================================================
// function AppUsageWithSubActivities({ report }: { report: DailyReport | null }) {
//   const [expandedApps, setExpandedApps] = useState<Set<string>>(new Set());

//   if (!report || !report.apps || report.apps.length === 0) {
//     return (
//       <div className="py-12 text-center">
//         <div className="text-4xl mb-3 opacity-30"></div>
//         <div className="text-base font-semibold text-gray-700">No activity recorded</div>
//         <div className="text-sm text-gray-500 mt-1">Activity will appear once the agent is running</div>
//       </div>
//     );
//   }

//   const toggleApp = (appName: string) => {
//     const n = new Set(expandedApps);
//     n.has(appName) ? n.delete(appName) : n.add(appName);
//     setExpandedApps(n);
//   };

//   const maxSeconds = Math.max(...report.apps.map(a => a.active_seconds));

//   return (
//     <div className="space-y-2">
//       {report.apps.map((app, idx) => {
//         const isExpanded = expandedApps.has(app.name);
//         const hasSub = app.sub_activities && app.sub_activities.length > 0;
//         const pct = Math.round((app.active_seconds / maxSeconds) * 100);
//         const color = CHART_PALETTE[idx % CHART_PALETTE.length];

//         return (
//           <div key={idx}>
//             <div onClick={() => hasSub && toggleApp(app.name)}
//               className={`flex items-center gap-3 p-3 border transition-all ${isExpanded ? 'bg-gray-50 border-gray-300 rounded-t-xl border-b-0' : 'bg-white border-gray-200 rounded-xl hover:shadow-sm hover:border-gray-300'} ${hasSub ? 'cursor-pointer' : ''}`}>
//               <div className="text-gray-300 w-3.5">
//                 {hasSub ? <Icons.ChevronRight expanded={isExpanded} /> : null}
//               </div>
//               <div className="w-9 h-9 rounded-lg flex items-center justify-center font-extrabold text-sm shrink-0" style={{ background: color + '18', color }}>
//                 {app.name.charAt(0).toUpperCase()}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="flex justify-between items-center mb-1.5">
//                   <div className="flex items-center gap-2 overflow-hidden">
//                     <span className="font-semibold text-sm text-gray-900 truncate">{app.name}</span>
//                     {app.is_browser && <span className="text-[9px] font-bold tracking-wider uppercase text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">Browser</span>}
//                   </div>
//                   <span className="font-mono-custom font-semibold text-sm" style={{ color }}>{formatDuration(app.active_seconds)}</span>
//                 </div>
//                 <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
//                   <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color }} />
//                 </div>
//               </div>
//             </div>
//             {isExpanded && hasSub && (
//               <div className="bg-gray-50 border-x border-b border-gray-300 rounded-b-xl divide-y divide-gray-200">
//                 {app.sub_activities.map((sub, si) => (
//                   <div key={si} className="flex items-center gap-2.5 py-2.5 px-4 pl-16 hover:bg-gray-100 transition-colors">
//                     <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color, opacity: 0.6 }} />
//                     <span className="flex-1 text-sm text-gray-700 truncate font-medium">{sub.name}</span>
//                     <span className="font-mono-custom text-xs text-gray-500 shrink-0">{formatDuration(sub.duration_seconds)}</span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// // ============================================================
// // EMPLOYEE DETAIL MODAL
// // ============================================================
// function EmployeeDetailModal({ employee, onClose }: { employee: UserInfo; onClose: () => void }) {
//   const [selectedDate, setSelectedDate] = useState(() => getLocalDateString(new Date()));
//   const [report, setReport] = useState<DailyReport | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const load = async () => {
//       setLoading(true);
//       try { const d = await api.getDailyReport(selectedDate, employee.id); setReport(d); }
//       catch { setReport(null); }
//       finally { setLoading(false); }
//     };
//     load();
//   }, [employee.id, selectedDate]);

//   const totalActive = report?.total_active_seconds || 0;
//   const totalIdle = report?.total_idle_seconds || 0;
//   const appsCount = report?.apps?.length || 0;
//   const prodScore = getProductivityScore(totalActive, totalIdle);
//   const grade = getEfficiencyGrade(prodScore);

//   const changeDate = (days: number) => {
//     const d = new Date(selectedDate + 'T12:00:00');
//     d.setDate(d.getDate() + days);
//     setSelectedDate(getLocalDateString(d));
//   };

//   const todayStr = getLocalDateString(new Date());
//   const isToday = selectedDate === todayStr;

//   const appPieData = (report?.apps || []).slice(0, 6).map((app, i) => ({
//     name: app.name, value: app.active_seconds, fill: CHART_PALETTE[i % CHART_PALETTE.length]
//   }));

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'rgba(22,22,22,0.4)', backdropFilter: 'blur(6px)' }} onClick={onClose}>
//       <div className="w-full max-w-4xl bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-scale-in" style={{ maxHeight: '90vh' }} onClick={(e) => e.stopPropagation()}>
//         {/* Header */}
//         <div className="flex items-center justify-between p-5 border-b border-gray-200">
//           <div className="flex items-center gap-3">
//             <div className="w-11 h-11 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: getAvatarColor(employee.name).bg, color: getAvatarColor(employee.name).text }}>{getInitials(employee.name)}</div>
//             <div>
//               <h2 className="text-lg font-bold text-gray-900">{employee.name}</h2>
//               <p className="text-xs text-gray-500">{employee.email}</p>
//             </div>
//           </div>
//           <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors" onClick={onClose}><Icons.Close /></button>
//         </div>

//         {/* Date nav */}
//         <div className="flex items-center justify-center gap-4 p-3 bg-gray-50 border-b border-gray-100">
//           <button className="w-8 h-8 flex items-center justify-center border border-gray-200 bg-white rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all" onClick={() => changeDate(-1)}>←</button>
//           <div className="flex items-center gap-2 bg-white px-3 py-1.5 border border-gray-200 rounded-lg shadow-sm">
//             <Icons.Calendar />
//             <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} max={todayStr}
//               className="bg-transparent border-none text-gray-700 text-sm font-medium focus:outline-none" />
//             {isToday && <span className="text-[9px] font-bold uppercase bg-blue-50 text-blue-600 px-2 py-0.5 rounded">Today</span>}
//           </div>
//           <button className="w-8 h-8 flex items-center justify-center border border-gray-200 bg-white rounded-lg text-gray-500 hover:bg-gray-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
//             onClick={() => changeDate(1)} disabled={isToday}>→</button>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-4 gap-3 p-5 bg-gray-50 border-b border-gray-100">
//           <div className="bg-white rounded-xl p-3.5 text-center border border-gray-200 shadow-sm">
//             <div className="text-xl font-extrabold text-blue-600 font-mono-custom">{loading ? '...' : formatDuration(totalActive) || '0m'}</div>
//             <div className="text-[10px] font-bold uppercase text-gray-400 mt-1 tracking-wider">Active Time</div>
//           </div>
//           <div className="bg-white rounded-xl p-3.5 text-center border border-gray-200 shadow-sm">
//             <div className="text-xl font-extrabold text-gray-700 font-mono-custom">{loading ? '...' : formatDuration(totalIdle) || '0m'}</div>
//             <div className="text-[10px] font-bold uppercase text-gray-400 mt-1 tracking-wider">Idle Time</div>
//           </div>
//           <div className="bg-white rounded-xl p-3.5 text-center border border-gray-200 shadow-sm">
//             <div className="text-xl font-extrabold text-green-600 font-mono-custom">{loading ? '...' : appsCount}</div>
//             <div className="text-[10px] font-bold uppercase text-gray-400 mt-1 tracking-wider">Apps Used</div>
//           </div>
//           <div className="bg-white rounded-xl p-3.5 text-center border border-gray-200 shadow-sm">
//             <div className="text-xl font-extrabold font-mono-custom" style={{ color: grade.color }}>{loading ? '...' : `${prodScore}%`}</div>
//             <div className="text-[10px] font-bold uppercase text-gray-400 mt-1 tracking-wider">Productivity</div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto p-5 bg-white">
//           {!loading && appPieData.length > 0 && (
//             <div className="mb-6">
//               <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3">App Time Distribution</h4>
//               <div style={{ height: 200 }}>
//                 <ResponsiveContainer>
//                   <PieChart>
//                     <Pie data={appPieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
//                       {appPieData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
//                     </Pie>
//                     <Tooltip content={<ChartTooltip />} />
//                     <Legend iconType="circle" iconSize={8} formatter={(v: string) => <span className="text-xs text-gray-700">{v}</span>} />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           )}
//           <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3">Detailed Activity Log</h4>
//           {loading ? (
//             <div className="text-center py-12 text-gray-500 animate-pulse">Loading activity data...</div>
//           ) : (
//             <AppUsageWithSubActivities report={report} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // FRAUD ALERTS
// // ============================================================
// function FraudAlertPanel({ alerts }: { alerts: FraudAlert[] }) {
//   if (alerts.length === 0) {
//     return (
//       <div className="py-8 text-center">
//         <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3 text-green-600"><Icons.Check /></div>
//         <div className="text-sm text-gray-500">No suspicious activity detected</div>
//       </div>
//     );
//   }
//   return (
//     <div className="space-y-2">
//       {alerts.slice(0, 5).map((alert, idx) => {
//         const isCritical = alert.severity === 'CRITICAL';
//         return (
//           <div key={idx} className={`flex gap-2.5 p-3 rounded-xl border ${isCritical ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
//             <div className={`shrink-0 mt-0.5 ${isCritical ? 'text-red-500' : 'text-amber-500'}`}><Icons.Alert /></div>
//             <div className="flex-1 min-w-0">
//               <div className="flex justify-between items-start gap-2">
//                 <span className="font-semibold text-sm text-gray-900">{alert.user_email}</span>
//                 <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded ${isCritical ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-700'}`}>{alert.severity}</span>
//               </div>
//               <p className="text-xs text-gray-500 mt-1 leading-relaxed">{alert.message}</p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// // ============================================================
// // SIMPLE APP USAGE LIST (dashboard overview)
// // ============================================================
// function AppUsageList({ report }: { report: DailyReport | null }) {
//   if (!report || !report.apps || report.apps.length === 0) {
//     return <div className="py-8 text-center text-gray-500 text-sm">No activity data for today</div>;
//   }
//   const maxSeconds = Math.max(...report.apps.map(a => a.active_seconds));
//   return (
//     <div className="space-y-3">
//       {report.apps.slice(0, 8).map((app, idx) => {
//         const color = CHART_PALETTE[idx % CHART_PALETTE.length];
//         return (
//           <div key={idx} className="flex items-center gap-3">
//             <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0" style={{ background: color + '18', color }}>
//               {app.name.charAt(0).toUpperCase()}
//             </div>
//             <div className="flex-1 min-w-0">
//               <div className="flex justify-between mb-1">
//                 <span className="text-sm font-semibold text-gray-900 truncate pr-2">{app.name}</span>
//                 <span className="font-mono-custom text-xs font-semibold" style={{ color }}>{formatDuration(app.active_seconds)}</span>
//               </div>
//               <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
//                 <div className="h-full rounded-full" style={{ width: `${(app.active_seconds / maxSeconds) * 100}%`, background: color }} />
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// // ============================================================
// // CARD WRAPPER
// // ============================================================
// function Card({ title, icon, children, className = '' }: { title: string; icon: React.ReactNode; children: React.ReactNode; className?: string }) {
//   return (
//     <div className={`bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden ${className}`}>
//       <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
//         <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">{icon} {title}</h3>
//       </div>
//       <div className="p-5">{children}</div>
//     </div>
//   );
// }

// // ============================================================
// // MAIN DASHBOARD
// // ============================================================
// function Dashboard({ user, onLogout }: { user: { name: string; role: string }; onLogout: () => void }) {
//   const [activeTab, setActiveTab] = useState<'dashboard' | 'employees' | 'leaderboard'>('dashboard');
//   const [employees, setEmployees] = useState<UserInfo[]>([]);
//   const [pendingUsers, setPendingUsers] = useState<UserInfo[]>([]);
//   const [selectedEmployee, setSelectedEmployee] = useState<UserInfo | null>(null);
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [employeeReports, setEmployeeReports] = useState<Record<string, DailyReport>>({});
//   const [employeeReport, setEmployeeReport] = useState<DailyReport | null>(null);
//   const [fraudAlerts, setFraudAlerts] = useState<FraudAlert[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [weeklyData, setWeeklyData] = useState<any[]>([]);
//   // selectedDate controls which day's dashboard to view (YYYY-MM-DD)
//   const [selectedDate, setSelectedDate] = useState<string>(() => {
//     const d = new Date(); d.setDate(d.getDate() - 1); // default to yesterday
//     return getLocalDateString(d);
//   });
//   // viewMode: 'date' = single day, 'range' = multiple days aggregated
//   const [viewMode, setViewMode] = useState<'date' | 'range'>('date');
//   const [rangeDays, setRangeDays] = useState<number>(7);

//   const isAdmin = user.role === 'admin';

//   const changeSelectedDate = (delta: number) => {
//     try {
//       const d = new Date(selectedDate);
//       d.setDate(d.getDate() + delta);
//       setSelectedDate(getLocalDateString(d));
//     } catch (e) { /* ignore */ }
//   };
//   const setToToday = () => setSelectedDate(getLocalDateString(new Date()));

//   const applyPreset = (mode: 'date' | 'range', days?: number) => {
//     if (mode === 'date') {
//       setViewMode('date');
//       // keep selectedDate as-is
//       return;
//     }
//     // range mode: set end to yesterday (or keep current selectedDate if already set)
//     const end = new Date(); end.setDate(end.getDate() - 1);
//     setSelectedDate(getLocalDateString(end));
//     setRangeDays(days || 7);
//     setViewMode('range');
//   };

//   const loadData = async () => {
//     try {
//       if (isAdmin) {
//         const [emps, pending, fraudData] = await Promise.all([
//           api.getEmployees(), api.getPendingUsers(),
//           api.getFraudAlerts(7).catch(() => ({ alerts: [] }))
//         ]);
//         const filteredEmps = emps.filter(e => e.role !== 'admin');
//         setEmployees(filteredEmps);
//         setPendingUsers(pending);
//         setFraudAlerts(fraudData.alerts || []);

//         const reports: Record<string, DailyReport> = {};
//         if (viewMode === 'date') {
//           const dateStr = selectedDate;
//           await Promise.all(filteredEmps.map(async (emp) => {
//             try { reports[emp.id] = await api.getDailyReport(dateStr, emp.id); } catch { /* skip */ }
//           }));
//         } else {
//           // range mode: aggregate per-employee across the last `rangeDays` ending at selectedDate
//           const base = new Date(selectedDate);
//           const dates: string[] = [];
//           for (let i = rangeDays - 1; i >= 0; i--) {
//             const d = new Date(base); d.setDate(base.getDate() - i);
//             dates.push(getLocalDateString(d));
//           }
//           await Promise.all(filteredEmps.map(async (emp) => {
//             const agg: DailyReport = { date: `${dates[0]}..${dates[dates.length-1]}`, total_hours: 0, total_active_seconds: 0, total_idle_seconds: 0, user_id: emp.id, apps: [] };
//             const appMap: Record<string, { name: string; active_seconds: number; duration_seconds: number; is_browser?: boolean }> = {};
//             for (const ds of dates) {
//               try {
//                 const r = await api.getDailyReport(ds, emp.id);
//                 agg.total_hours += r.total_hours || 0;
//                 agg.total_active_seconds += r.total_active_seconds || 0;
//                 agg.total_idle_seconds += r.total_idle_seconds || 0;
//                 (r.apps || []).forEach(a => {
//                   if (!appMap[a.name]) appMap[a.name] = { name: a.name, active_seconds: 0, duration_seconds: 0, is_browser: a.is_browser };
//                   appMap[a.name].active_seconds += a.active_seconds || 0;
//                   appMap[a.name].duration_seconds += a.duration_seconds || 0;
//                 });
//               } catch { /* skip */ }
//             }
//             agg.apps = Object.values(appMap).map(a => ({ name: a.name, duration: '', duration_seconds: a.duration_seconds, active_seconds: a.active_seconds, is_browser: !!a.is_browser, sub_activities: [] }));
//             reports[emp.id] = agg;
//           }));
//         }
//         setEmployeeReports(reports);

//         // Weekly trend
//         const weekly: any[] = [];
//         const base = new Date(selectedDate);
//         for (let i = 6; i >= 0; i--) {
//           const d = new Date(base); d.setDate(base.getDate() - i);
//           const dateStr = getLocalDateString(d);
//           const dayName = d.toLocaleDateString('en', { weekday: 'short' });
//           let totalActive = 0, totalIdle = 0, empCount = 0;

//           if (i === 0) {
//             Object.values(reports).forEach(r => { totalActive += r.total_active_seconds || 0; totalIdle += r.total_idle_seconds || 0; empCount++; });
//           } else {
//             const sample = filteredEmps.slice(0, 5);
//             await Promise.all(sample.map(async (emp) => {
//               try { const r = await api.getDailyReport(dateStr, emp.id); totalActive += r.total_active_seconds || 0; totalIdle += r.total_idle_seconds || 0; empCount++; } catch { /* skip */ }
//             }));
//           }

//           const avgA = empCount > 0 ? Math.round(totalActive / empCount) : 0;
//           const avgI = empCount > 0 ? Math.round(totalIdle / empCount) : 0;
//           weekly.push({ day: dayName, active: avgA, idle: avgI, productivity: avgA + avgI > 0 ? Math.round((avgA / (avgA + avgI)) * 100) : 0 });
//         }
//         setWeeklyData(weekly);
//       } else {
//         if (viewMode === 'date') {
//           setEmployeeReport(await api.getDailyReport(selectedDate));
//         } else {
//           // aggregate for current user across rangeDays ending at selectedDate
//           const base = new Date(selectedDate);
//           const dates: string[] = [];
//           for (let i = rangeDays - 1; i >= 0; i--) { const d = new Date(base); d.setDate(base.getDate() - i); dates.push(getLocalDateString(d)); }
//           const agg: DailyReport = { date: `${dates[0]}..${dates[dates.length-1]}`, total_hours: 0, total_active_seconds: 0, total_idle_seconds: 0, user_id: '', apps: [] };
//           const appMap: Record<string, { name: string; active_seconds: number; duration_seconds: number; is_browser?: boolean }> = {};
//           await Promise.all(dates.map(async (ds) => {
//             try {
//               const r = await api.getDailyReport(ds);
//               agg.total_hours += r.total_hours || 0;
//               agg.total_active_seconds += r.total_active_seconds || 0;
//               agg.total_idle_seconds += r.total_idle_seconds || 0;
//               (r.apps || []).forEach(a => {
//                 if (!appMap[a.name]) appMap[a.name] = { name: a.name, active_seconds: 0, duration_seconds: 0, is_browser: a.is_browser };
//                 appMap[a.name].active_seconds += a.active_seconds || 0;
//                 appMap[a.name].duration_seconds += a.duration_seconds || 0;
//               });
//             } catch { /* skip */ }
//           }));
//           agg.apps = Object.values(appMap).map(a => ({ name: a.name, duration: '', duration_seconds: a.duration_seconds, active_seconds: a.active_seconds, is_browser: !!a.is_browser, sub_activities: [] }));
//           setEmployeeReport(agg);
//         }
//       }
//     } catch (error) { console.error('Failed to load data:', error); }
//     finally { setLoading(false); }
//   };

//   useEffect(() => { loadData(); const i = setInterval(loadData, 30000); return () => clearInterval(i); }, [selectedDate, viewMode, rangeDays]);

//   useEffect(() => {
//     const load = async () => {
//       if (selectedEmployee && !showDetailModal) {
//         try { setEmployeeReport(await api.getDailyReport(selectedDate, selectedEmployee.id)); } catch { setEmployeeReport(null); }
//       }
//     };
//     load();
//   }, [selectedEmployee, selectedDate, viewMode, rangeDays]);

//   const analytics = useMemo(() => {
//     const totalActive = Object.values(employeeReports).reduce((s, r) => s + (r.total_active_seconds || 0), 0);
//     const totalIdle = Object.values(employeeReports).reduce((s, r) => s + (r.total_idle_seconds || 0), 0);
//     const activeCount = Object.values(employeeReports).filter(r => (r.total_active_seconds || 0) > 0).length;
//     const teamProd = getProductivityScore(totalActive, totalIdle);

//     const appMap: Record<string, number> = {};
//     Object.values(employeeReports).forEach(r => (r.apps || []).forEach(a => { appMap[a.name] = (appMap[a.name] || 0) + a.active_seconds; }));
//     const topApps = Object.entries(appMap).sort(([, a], [, b]) => b - a).slice(0, 8)
//       .map(([name, seconds], i) => ({ name, value: seconds, fill: CHART_PALETTE[i % CHART_PALETTE.length] }));

//     const avgActive = employees.length > 0 ? Math.round(totalActive / employees.length) : 0;
//     return { totalActive, totalIdle, activeCount, teamProd, topApps, avgActive };
//   }, [employeeReports, employees]);

//   const handleApprove = async (id: string) => { setActionLoading(true); try { await api.approveUser(id); await loadData(); } catch (e) { console.error(e); } finally { setActionLoading(false); } };
//   const handleReject = async (id: string) => { setActionLoading(true); try { await api.rejectUser(id); await loadData(); } catch (e) { console.error(e); } finally { setActionLoading(false); } };
//   const handleDelete = async (id: string) => {
//     if (!confirm('Delete this employee?')) return;
//     setActionLoading(true);
//     try { await api.deleteUser(id); if (selectedEmployee?.id === id) { setSelectedEmployee(null); setEmployeeReport(null); } await loadData(); }
//     catch (e) { console.error(e); } finally { setActionLoading(false); }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="text-center"><div className="custom-spinner mx-auto" /><div className="mt-4 text-gray-500 text-sm font-medium">Loading Workwise...</div></div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen" style={{ background: '#F0F4FA' }}>
//       {/* ====== SIDEBAR ====== */}
//       <aside className="fixed top-0 left-0 w-[250px] h-full flex flex-col z-50 border-r border-gray-800" style={{ background: '#0a0032' }}>
//         <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-800">
//           <img src={companyLogo} alt="Autonex" className="w-9 h-9 rounded-lg object-cover shadow-sm" />
//           <div className="flex flex-col">
//             <span className="text-lg font-extrabold text-white tracking-tight leading-tight">Workwise</span>
//             <span className="text-[11px] text-gray-500 font-medium">by Autonex</span>
//           </div>
//         </div>

//         <nav className="flex-1 p-3 space-y-0.5">
//           <div onClick={() => setActiveTab('dashboard')}
//             className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all relative
//               ${activeTab === 'dashboard' ? 'bg-blue-400/15 text-blue-400 font-semibold' : 'text-gray-400 hover:bg-white/5 hover:text-gray-400'}`}>
//             {activeTab === 'dashboard' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-blue-400 rounded-r" />}
//             <Icons.Dashboard /> <span>Dashboard</span>
//           </div>
//           {isAdmin && (
//             <>
//               <div onClick={() => setActiveTab('employees')}
//                 className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all relative
//                   ${activeTab === 'employees' ?'bg-blue-400/15 text-blue-400 font-semibold' : 'text-gray-400 hover:bg-white/5 hover:text-gray-400'}`}>
//                 {activeTab === 'employees' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-blue-400 rounded-r" />}
//                 <Icons.Users /> <span>Employees</span>
//                 {pendingUsers.length > 0 && <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{pendingUsers.length}</span>}
//               </div>
//               <div onClick={() => setActiveTab('leaderboard')}
//                 className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all relative
//                   ${activeTab === 'leaderboard' ? 'bg-blue-400/15 text-blue-400 font-semibold' : 'text-gray-400 hover:bg-white/5 hover:text-gray-400'}`}>
//                 {activeTab === 'leaderboard' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-blue-400 rounded-r" />}
//                 <Icons.BarChart3 /> <span>Leaderboard</span>
//               </div>
//             </>
//           )}
//         </nav>

//         <div className="p-3 border-t border-gray-800">
//           <div onClick={onLogout} className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 cursor-pointer transition-all">
//             <Icons.Logout /> <span>Logout</span>
//           </div>
//         </div>
//       </aside>

//       {/* ====== MAIN ====== */}
//       <main className="flex-1 ml-[250px] min-h-screen flex flex-col">
//         <header className="flex justify-between items-center px-8 pt-6 pb-0">
//           <div>
//             <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">{activeTab === 'dashboard' ? 'Dashboard' : activeTab === 'employees' ? 'Employees' : 'Leaderboard'}</h1>
//             <p className="text-sm text-gray-500 mt-0.5">
//               {activeTab === 'dashboard' ? `Welcome back, ${user.name.split(' ')[0]}` : activeTab === 'employees' ? 'Manage your team members and approvals' : 'Top performers by productivity'}
//             </p>
//             {/* Date / range selector for dashboard */}
//             {activeTab === 'dashboard' && (
//               <div className="mt-3 flex items-center gap-3">
//                 <div className="inline-flex items-center bg-white rounded-lg border p-1">
//                   <button onClick={() => { setViewMode('date'); }}
//                     className={`px-3 py-1 text-sm rounded-md ${viewMode === 'date' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
//                     Date
//                   </button>
//                   <button onClick={() => { const d = new Date(); d.setDate(d.getDate() - 1); setSelectedDate(getLocalDateString(d)); setViewMode('date'); }}
//                     className="px-3 py-1 text-sm rounded-md text-gray-600 hover:bg-gray-50">
//                     Yesterday
//                   </button>
//                   <button onClick={() => applyPreset('range', 7)}
//                     className={`px-3 py-1 text-sm rounded-md ${viewMode === 'range' && rangeDays === 7 ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
//                     Last 7
//                   </button>
//                   <button onClick={() => applyPreset('range', 30)}
//                     className={`px-3 py-1 text-sm rounded-md ${viewMode === 'range' && rangeDays === 30 ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
//                     Last 30
//                   </button>
//                 </div>

//                 {viewMode === 'date' ? (
//                   <div className="flex items-center gap-2">
//                     <button className="px-2 py-1 rounded bg-white border text-sm text-gray-600 hover:bg-gray-50" onClick={() => changeSelectedDate(-1)} title="Previous day">â-€</button>
//                     <input type="date" value={selectedDate} onChange={(e) => { setSelectedDate(e.target.value); setViewMode('date'); }} className="px-2 py-1 text-sm rounded border" max={getLocalDateString(new Date())} />
//                     <button className="px-2 py-1 rounded bg-white border text-sm text-gray-600 hover:bg-gray-50" onClick={setToToday}>Today</button>
//                     <button className="px-2 py-1 rounded bg-white border text-sm text-gray-600 hover:bg-gray-50" onClick={() => changeSelectedDate(1)} title="Next day">▶</button>
//                   </div>
//                 ) : (
//                   <div className="text-sm text-gray-600">Viewing last <span className="font-semibold text-gray-800">{rangeDays}</span> days ending <span className="font-semibold text-gray-800">{selectedDate}</span></div>
//                 )}
//               </div>
//             )}
//           </div>
//           <div className="flex items-center gap-3">
//             <div className="text-right">
//               <div className="text-sm font-semibold text-gray-900">{user.name}</div>
//               <div className="text-[11px] text-gray-500 capitalize">{user.role}</div>
//             </div>
//             <div className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-xs shadow-sm border" style={{ background: getAvatarColor(user.name).bg, color: getAvatarColor(user.name).text, borderColor: getAvatarColor(user.name).bg }}>
//               {getInitials(user.name)}
//             </div>
//           </div>
//         </header>

//         {/* ====== ADMIN DASHBOARD ====== */}
//         {activeTab === 'dashboard' && isAdmin && (
//           <div className="p-8 pt-6 space-y-5 animate-fade-in">
//             {/* Stats */}
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
//               <StatCard icon={<Icons.Users />} label="Total Employees" value={employees.length} color="#0F62FE" subtext={`${analytics.activeCount} active today`} />
//               <StatCard icon={<Icons.Activity />} label="Avg. Active Time" value={formatDuration(analytics.avgActive) || '0m'} color="#1192E8" subtext="Per employee today" />
//               <StatCard icon={<Icons.Zap />} label="Team Productivity" value={`${analytics.teamProd}%`} color={analytics.teamProd >= 70 ? '#198038' : '#B28600'} subtext={getEfficiencyGrade(analytics.teamProd).grade + ' grade'} />
//               <StatCard icon={<Icons.Shield />} label="Fraud Alerts" value={fraudAlerts.length} color={fraudAlerts.length > 0 ? '#DA1E28' : '#198038'} subtext="Last 7 days" />
//             </div>

//             {/* Pending */}
//             <PendingApprovals users={pendingUsers} onApprove={handleApprove} onReject={handleReject} loading={actionLoading} />

//             {/* Weekly Trend + Productivity Score */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
//               <div className="lg:col-span-2">
//                 <Card title="Weekly Productivity Trend" icon={<Icons.BarChart3 />}>
//                   {weeklyData.length > 0 ? (
//                     <div style={{ height: 260 }}>
//                       <ResponsiveContainer>
//                         <AreaChart data={weeklyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
//                           <defs>
//                             <linearGradient id="activeGrad" x1="0" y1="0" x2="0" y2="1">
//                               <stop offset="0%" stopColor="#0F62FE" stopOpacity={0.3} />
//                               <stop offset="100%" stopColor="#0F62FE" stopOpacity={0} />
//                             </linearGradient>
//                             <linearGradient id="idleGrad" x1="0" y1="0" x2="0" y2="1">
//                               <stop offset="0%" stopColor="#A8A8A8" stopOpacity={0.2} />
//                               <stop offset="100%" stopColor="#A8A8A8" stopOpacity={0} />
//                             </linearGradient>
//                           </defs>
//                           <CartesianGrid strokeDasharray="3 3" stroke="#F4F4F4" vertical={false} />
//                           <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#6F6F6F' }} axisLine={false} tickLine={false} />
//                           <YAxis tick={{ fontSize: 11, fill: '#6F6F6F' }} axisLine={false} tickLine={false} tickFormatter={(v) => formatDuration(v)} width={55} />
//                           <Tooltip content={<ChartTooltip />} />
//                           <Area type="monotone" dataKey="active" name="Active" stroke="#0F62FE" fill="url(#activeGrad)" strokeWidth={2.5} dot={{ r: 3, fill: '#0F62FE' }} />
//                           <Area type="monotone" dataKey="idle" name="Idle" stroke="#A8A8A8" fill="url(#idleGrad)" strokeWidth={1.5} dot={false} />
//                         </AreaChart>
//                       </ResponsiveContainer>
//                     </div>
//                   ) : <div className="h-64 flex items-center justify-center text-gray-500">Loading trend data...</div>}
//                 </Card>
//               </div>

//               <Card title="Productivity Score" icon={<Icons.Zap />}>
//                 <div className="flex flex-col items-center justify-center">
//                   <ProductivityGauge score={analytics.teamProd} />
//                   <div className="text-center mt-2">
//                     <div className="text-xs text-gray-500">Team Average</div>
//                     <div className="text-sm font-semibold text-gray-700 mt-1">{formatDuration(analytics.totalActive)} active / {formatDuration(analytics.totalIdle)} idle</div>
//                   </div>
//                 </div>
//               </Card>
//             </div>

//             {/* Top Apps + Heatmap */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//               <Card title="Top Applications" icon={<Icons.Activity />}>
//                 {analytics.topApps.length > 0 ? (
//                   <div style={{ height: 280 }}>
//                     <ResponsiveContainer>
//                       <BarChart data={analytics.topApps} layout="vertical" margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
//                         <CartesianGrid strokeDasharray="3 3" stroke="#F4F4F4" horizontal={false} />
//                         <XAxis type="number" tick={{ fontSize: 11, fill: '#6F6F6F' }} axisLine={false} tickLine={false} tickFormatter={(v) => formatDuration(v)} />
//                         <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#393939', fontWeight: 500 }} axisLine={false} tickLine={false} width={90} />
//                         <Tooltip content={<ChartTooltip />} />
//                         <Bar dataKey="value" name="Time" radius={[0, 4, 4, 0]} barSize={20}>
//                           {analytics.topApps.map((e, i) => <Cell key={i} fill={e.fill} />)}
//                         </Bar>
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </div>
//                 ) : <div className="h-72 flex items-center justify-center text-gray-500 text-sm">No app data available</div>}
//               </Card>

//               <Card title="Team Activity Heatmap" icon={<Icons.Clock />}>
//                 <TeamHeatmap employees={employees} reports={employeeReports} />
//               </Card>
//             </div>

//             {/* Employee Activity + Fraud Alerts */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//               <Card title="Employee Activity" icon={<Icons.Users />}>
//                 {selectedEmployee ? (
//                   <>
//                     <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl mb-5">
//                       <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg" style={{ background: getAvatarColor(selectedEmployee.name).bg, color: getAvatarColor(selectedEmployee.name).text }}>{getInitials(selectedEmployee.name)}</div>
//                       <div>
//                         <div className="font-semibold text-base text-gray-900">{selectedEmployee.name}</div>
//                         <div className="text-xs text-gray-500">{selectedEmployee.email}</div>
//                       </div>
//                     </div>
//                     <AppUsageList report={employeeReport} />
//                   </>
//                 ) : (
//                   <div className="py-10 text-center">
//                     <div className="text-gray-300 mb-2"><Icons.Users /></div>
//                     <p className="text-sm text-gray-500">Select an employee from the Employees tab</p>
//                   </div>
//                 )}
//               </Card>

//               <Card title="Recent Alerts" icon={<Icons.Shield />}>
//                 <FraudAlertPanel alerts={fraudAlerts} />
//               </Card>
//             </div>

//             {/* Active vs Idle per employee */}
//             {employees.length > 0 && (
//               <Card title="Active vs Idle Time â€” Per Employee" icon={<Icons.BarChart3 />}>
//                 <div style={{ height: 300 }}>
//                   <ResponsiveContainer>
//                     <BarChart data={employees.map(emp => {
//                       const r = employeeReports[emp.id];
//                       return { name: emp.name.split(' ')[0], active: r?.total_active_seconds || 0, idle: r?.total_idle_seconds || 0 };
//                     })} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#F4F4F4" vertical={false} />
//                       <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6F6F6F' }} axisLine={false} tickLine={false} />
//                       <YAxis tick={{ fontSize: 11, fill: '#6F6F6F' }} axisLine={false} tickLine={false} tickFormatter={(v) => formatDuration(v)} width={55} />
//                       <Tooltip content={<ChartTooltip />} />
//                       <Bar dataKey="active" name="Active" fill="#0F62FE" radius={[4, 4, 0, 0]} barSize={24} />
//                       <Bar dataKey="idle" name="Idle" fill="#E0E0E0" radius={[4, 4, 0, 0]} barSize={24} />
//                       <Legend iconType="circle" iconSize={8} formatter={(v: string) => <span className="text-xs text-gray-700">{v}</span>} />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </Card>
//             )}
//           </div>
//         )}

//         {/* ====== EMPLOYEES TAB ====== */}
//         {activeTab === 'employees' && isAdmin && (
//           <div className="p-8 pt-6 space-y-5 animate-fade-in">
//             {pendingUsers.length > 0 && <PendingApprovals users={pendingUsers} onApprove={handleApprove} onReject={handleReject} loading={actionLoading} dm={dm} />}
//             <EmployeeListView employees={employees} employeeReports={employeeReports}
//               onViewDetails={(emp) => { setSelectedEmployee(emp); setShowDetailModal(true); }} onDelete={handleDelete} dm={dm} />
//             {showDetailModal && selectedEmployee && (
//               <EmployeeDetailModal employee={selectedEmployee} onClose={() => { setShowDetailModal(false); setSelectedEmployee(null); }} dm={dm} />
//             )}
//           </div>
//         )}

//         {/* ====== LEADERBOARD TAB ====== */}
//         {activeTab === 'leaderboard' && isAdmin && (
//           <div className="p-8 pt-6 animate-fade-in">
//             <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
//               <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
//                 <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2"><Icons.BarChart3 /> Top Performers</h3>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50 border-b border-gray-100">
//                     <tr>
//                       <th className="px-5 py-3 text-left text-xs font-bold uppercase text-gray-500 tracking-wider">Rank</th>
//                       <th className="px-5 py-3 text-left text-xs font-bold uppercase text-gray-500 tracking-wider">Employee</th>
//                       <th className="px-5 py-3 text-left text-xs font-bold uppercase text-gray-500 tracking-wider">Productivity</th>
//                       <th className="px-5 py-3 text-left text-xs font-bold uppercase text-gray-500 tracking-wider">Active Time</th>
//                       <th className="px-5 py-3 text-left text-xs font-bold uppercase text-gray-500 tracking-wider">Apps Used</th>
//                       <th className="px-5 py-3 text-left text-xs font-bold uppercase text-gray-500 tracking-wider">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-100">
//                     {employees
//                       .map((emp) => {
//                         const report = employeeReports[emp.id];
//                         const totalActive = report?.total_active_seconds || 0;
//                         const totalIdle = report?.total_idle_seconds || 0;
//                         const prod = getProductivityScore(totalActive, totalIdle);
//                         const appsCount = report?.apps?.length || 0;
//                         const empFraud = fraudAlerts.find(a => a.user_id === emp.id && a.date === (viewMode === 'date' ? selectedDate : selectedDate));
//                         return { emp, prod, totalActive, appsCount, fraud: empFraud };
//                       })
//                       .sort((a, b) => b.prod - a.prod)
//                       .map(({ emp, prod, totalActive, appsCount, fraud }, idx) => (
//                         <tr key={emp.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
//                           <td className="px-5 py-3.5">
//                             <div className="text-center">
//                               <div className="text-lg font-extrabold text-gray-900 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: idx < 3 ? (idx === 0 ? '#FFD700' : idx === 1 ? '#C0C0C0' : '#CD7F32') : '#E5E7EB', color: idx < 3 ? '#000' : '#6F6F6F' }}>
//                                 {idx + 1}
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-5 py-3.5">
//                             <div className="flex items-center gap-3">
//                               <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs" style={{ background: getAvatarColor(emp.name).bg, color: getAvatarColor(emp.name).text }}>{getInitials(emp.name)}</div>
//                               <div>
//                                 <div className="font-semibold text-sm text-gray-900">{emp.name}</div>
//                                 <div className="text-xs text-gray-500">{emp.email}</div>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-5 py-3.5">
//                             <div className="flex items-center gap-2">
//                               <div className="text-lg font-extrabold font-mono-custom" style={{ color: prod >= 70 ? '#198038' : prod >= 50 ? '#B28600' : '#DA1E28' }}>{prod}%</div>
//                               <div className="h-1.5 w-24 bg-gray-100 rounded-full overflow-hidden">
//                                 <div className="h-full rounded-full transition-all" style={{ width: `${prod}%`, background: prod >= 70 ? '#198038' : prod >= 50 ? '#B28600' : '#DA1E28' }} />
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-5 py-3.5">
//                             <div className="text-sm font-semibold text-gray-700">{formatDuration(totalActive) || '0m'}</div>
//                           </td>
//                           <td className="px-5 py-3.5">
//                             <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-lg">
//                               <div className="w-2 h-2 rounded-full bg-gray-400" />
//                               <span className="text-xs font-semibold text-gray-700">{appsCount} apps</span>
//                             </div>
//                           </td>
//                           <td className="px-5 py-3.5">
//                             {fraud ? (
//                               <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 rounded-lg border border-red-200">
//                                 <Icons.Alert />
//                                 <span className="text-xs font-bold text-red-700">{fraud.severity}</span>
//                               </div>
//                             ) : (
//                               <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 rounded-lg border border-green-200">
//                                 <Icons.Check />
//                                 <span className="text-xs font-bold text-green-700">Clear</span>
//                               </div>
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ====== EMPLOYEE (non-admin) VIEW ====== */}
//         {!isAdmin && (
//           <div className="p-8 pt-6 max-w-4xl mx-auto animate-fade-in">
//             <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden" style={{ borderTop: '3px solid #0F62FE' }}>
//               <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
//                 <div>
//                   <h2 className="text-lg font-bold text-gray-900">Today's Activity</h2>
//                   <p className="text-xs text-gray-500 mt-0.5">Your tracked productivity stats</p>
//                 </div>
//                 <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600"><Icons.Clock /></div>
//               </div>
//               <div className="p-5"><AppUsageList report={employeeReport} /></div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// // ============================================================
// // MAIN APP
// // ============================================================
// export default function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [showRegister, setShowRegister] = useState(false);
//   const [user, setUser] = useState<{ name: string; role: string } | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const check = async () => {
//       const token = api.getToken();
//       if (token) {
//         try { const u = await api.getMe(); setUser({ name: u.name, role: u.role }); setIsAuthenticated(true); }
//         catch { api.clearToken(); }
//       }
//       setLoading(false);
//     };
//     check();
//   }, []);

//   const handleLogin = async () => {
//     try { const u = await api.getMe(); setUser({ name: u.name, role: u.role }); setIsAuthenticated(true); setShowRegister(false); }
//     catch (e) { console.error(e); }
//   };

//   const handleLogout = () => { api.clearToken(); setIsAuthenticated(false); setUser(null); };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center"><div className="custom-spinner mx-auto" /><div className="mt-4 text-gray-500 text-sm font-medium animate-pulse">Loading Workwise...</div></div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return showRegister ? <RegisterPage onShowLogin={() => setShowRegister(false)} /> : <LoginPage onLogin={handleLogin} onShowRegister={() => setShowRegister(true)} />;
//   }

//   return <Dashboard user={user!} onLogout={handleLogout} />;
// }




import { useState, useEffect, useMemo } from 'react';
import { api } from './lib/api';
import type { UserInfo, DailyReport, FraudAlert, EmployeeSummaryRecord } from './lib/api';
import companyLogo from './assets/company-logo.jpg';
import autonexLogo from './assets/autonex_ai_logo.jpg';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, Legend
} from 'recharts';

const CHART_PALETTE = ['#0F62FE', '#6929C4', '#1192E8', '#005D5D', '#9F1853', '#FA4D56', '#570408', '#198038', '#002D9C', '#EE5396', '#B28600', '#009D9A'];

const Icons = {
  Dashboard: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>),
  Users: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>),
  Clock: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>),
  Alert: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>),
  Check: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>),
  X: () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>),
  Trash: () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /></svg>),
  Logout: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>),
  Eye: () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>),
  Activity: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>),
  BarChart3: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M7 16V8" /><path d="M11 16V4" /><path d="M15 16v-5" /><path d="M19 16v-8" /></svg>),
  Shield: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>),
  Zap: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>),
  Calendar: () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>),
  Close: () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>),
  ChevronRight: ({ expanded }: { expanded: boolean }) => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.2s ease' }}><polyline points="9 18 15 12 9 6" /></svg>),
  Moon: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>),
  Sun: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>),
  Download: () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>),
  FileText: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>),
  TrendingUp: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>),
  Search: () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>),
};

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}
function getInitials(name: string): string { return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2); }
function getAvatarColor(name: string): { bg: string; text: string } {
  const colors = [{ bg: '#D0E2FF', text: '#0043CE' }, { bg: '#E8DAEF', text: '#6929C4' }, { bg: '#BAE6FF', text: '#0058A1' }, { bg: '#D9F0D3', text: '#198038' }, { bg: '#FFD6E8', text: '#9F1853' }, { bg: '#FFF1C9', text: '#8A6500' }, { bg: '#FFD7D9', text: '#A2191F' }, { bg: '#D4BBFF', text: '#491D8B' }, { bg: '#B6F0E8', text: '#005D5D' }, { bg: '#FFDDC1', text: '#8A3800' }];
  let hash = 0; for (let i = 0; i < name.length; i++) { hash = name.charCodeAt(i) + ((hash << 5) - hash); }
  return colors[Math.abs(hash) % colors.length];
}
function getLocalDateString(date: Date): string { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; }
function getProductivityScore(a: number, i: number): number { const t = a + i; return t === 0 ? 0 : Math.round((a / t) * 100); }
function getEfficiencyGrade(score: number): { grade: string; color: string; bg: string } {
  if (score >= 90) return { grade: 'A+', color: '#198038', bg: '#DEFBE6' };
  if (score >= 80) return { grade: 'A', color: '#198038', bg: '#DEFBE6' };
  if (score >= 70) return { grade: 'B+', color: '#0F62FE', bg: '#D0E2FF' };
  if (score >= 60) return { grade: 'B', color: '#0F62FE', bg: '#D0E2FF' };
  if (score >= 50) return { grade: 'C', color: '#B28600', bg: '#FFF8E1' };
  return { grade: 'D', color: '#DA1E28', bg: '#FFF1F1' };
}

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (<div className="bg-gray-900 text-white px-3.5 py-2.5 rounded-lg text-xs shadow-xl border-0"><div className="font-semibold mb-1 text-gray-400">{label}</div>{payload.map((p: any, i: number) => (<div key={i} className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} /><span className="text-gray-300">{p.name}:</span><span className="font-semibold">{typeof p.value === 'number' && p.value > 300 ? formatDuration(p.value) : p.value}</span></div>))}</div>);
}

function ProductivityGauge({ score }: { score: number }) {
  const data = [{ name: 'Score', value: score, fill: score >= 70 ? '#0F62FE' : score >= 50 ? '#B28600' : '#DA1E28' }];
  const grade = getEfficiencyGrade(score);
  return (<div className="relative w-full" style={{ height: 180 }}><ResponsiveContainer><RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="95%" startAngle={180} endAngle={0} data={data} barSize={14}><RadialBar background={{ fill: '#F4F4F4' }} dataKey="value" cornerRadius={8} /></RadialBarChart></ResponsiveContainer><div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-center" style={{ transform: 'translate(-50%, -20%)' }}><div className="text-4xl font-extrabold text-gray-900 tracking-tight">{score}%</div><div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mt-1" style={{ background: grade.bg, color: grade.color }}>GRADE {grade.grade}</div></div></div>);
}

function TeamHeatmap({ employees, reports }: { employees: UserInfo[]; reports: Record<string, DailyReport> }) {
  const hours = Array.from({ length: 12 }, (_, i) => i + 8);
  const hourLabels = hours.map(h => h <= 12 ? `${h}${h < 12 ? 'a' : 'p'}` : `${h - 12}p`);
  const heatmapData = employees.slice(0, 8).map(emp => { const report = reports[emp.id]; const totalSecs = report?.total_active_seconds || 0; const avgPerHour = totalSecs / 9; return { name: emp.name.split(' ')[0], hours: hours.map(() => { if (totalSecs === 0) return 0; return Math.min(1, (avgPerHour * (0.4 + Math.random() * 1.2)) / 3600); }) }; });
  const getHeatColor = (v: number): string => { if (v === 0) return '#F4F4F4'; if (v < 0.25) return '#D0E2FF'; if (v < 0.5) return '#78A9FF'; if (v < 0.75) return '#4589FF'; return '#0F62FE'; };
  return (<div className="overflow-x-auto"><div className="grid gap-0.5" style={{ gridTemplateColumns: `72px repeat(${hours.length}, 1fr)`, minWidth: 480 }}><div />{hourLabels.map((l, i) => (<div key={i} className="text-center text-[10px] font-semibold text-gray-400 py-1">{l}</div>))}{heatmapData.map((row, ri) => (<div key={ri} className="contents"><div className="text-xs font-semibold text-gray-700 flex items-center pr-2 truncate">{row.name}</div>{row.hours.map((v, hi) => (<div key={hi} className="heatmap-cell rounded cursor-default" style={{ height: 26, background: getHeatColor(v) }} title={`${row.name} @ ${hourLabels[hi]}: ${Math.round(v * 100)}% active`} />))}</div>))}</div><div className="flex items-center gap-1.5 mt-3 justify-end"><span className="text-[10px] text-gray-400">Less</span>{[0, 0.25, 0.5, 0.75, 1].map((v, i) => (<div key={i} className="w-3.5 h-3.5 rounded-sm" style={{ background: getHeatColor(v) }} />))}<span className="text-[10px] text-gray-400">More</span></div></div>);
}

// ============================================================
// LOGIN PAGE
// ============================================================
function LoginPage({ onLogin, onShowRegister }: { onLogin: () => void; onShowRegister: () => void }) {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setError(''); setLoading(true); try { await api.login(email, password); onLogin(); } catch (err) { setError(err instanceof Error ? err.message : 'Login failed'); } finally { setLoading(false); } };
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at 50% 0%, #112D6E 0%, #0A1A4A 40%, #060E2B 100%)' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(rgba(15,98,254,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(15,98,254,0.07) 1px, transparent 1px)', backgroundSize: '60px 60px', transform: 'perspective(500px) rotateX(60deg)', transformOrigin: 'center top', top: '45%', height: '120%', maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)', pointerEvents: 'none', animation: 'gridScroll 20s linear infinite' }} />
      <div className="absolute" style={{ top: '15%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(15,98,254,0.2) 0%, rgba(15,98,254,0.05) 40%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none', animation: 'breathe 6s ease-in-out infinite' }} />
      <div className="absolute" style={{ top: '25%', left: '8%', width: 200, height: 200, background: 'radial-gradient(circle, rgba(105,41,196,0.25) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', animation: 'floatOrb1 8s ease-in-out infinite', filter: 'blur(2px)' }} />
      <div className="absolute" style={{ top: '60%', right: '5%', width: 250, height: 250, background: 'radial-gradient(circle, rgba(15,98,254,0.2) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', animation: 'floatOrb2 10s ease-in-out infinite', filter: 'blur(2px)' }} />
      <div className="absolute" style={{ top: '10%', right: '20%', width: 100, height: 100, background: 'radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none', animation: 'floatOrb3 7s ease-in-out infinite' }} />
      <div className="absolute" style={{ top: '48%', left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent 0%, rgba(15,98,254,0.15) 30%, rgba(15,98,254,0.3) 50%, rgba(15,98,254,0.15) 70%, transparent 100%)', pointerEvents: 'none', animation: 'linePulse 4s ease-in-out infinite' }} />
      <div className="absolute" style={{ top: '50%', left: '50%', width: 520, height: 520, transform: 'translate(-50%, -50%)', border: '1px solid rgba(15,98,254,0.1)', borderRadius: '50%', pointerEvents: 'none', animation: 'ringRotate 20s linear infinite' }}><div className="absolute" style={{ top: 0, left: '50%', transform: 'translate(-50%, -50%)', width: 6, height: 6, borderRadius: '50%', background: 'rgba(15,98,254,0.6)', boxShadow: '0 0 12px rgba(15,98,254,0.4)' }} /></div>
      <div className="absolute" style={{ top: '50%', left: '50%', width: 440, height: 440, transform: 'translate(-50%, -50%) rotate(45deg)', border: '1px solid rgba(105,41,196,0.08)', borderRadius: '50%', pointerEvents: 'none', animation: 'ringRotate 25s linear infinite reverse' }} />
      {[...Array(12)].map((_, i) => (<div key={i} className="absolute rounded-full" style={{ width: Math.random() * 3 + 1.5, height: Math.random() * 3 + 1.5, background: i % 3 === 0 ? 'rgba(105,41,196,0.5)' : 'rgba(15,98,254,0.4)', left: `${10 + Math.random() * 80}%`, top: `${10 + Math.random() * 80}%`, pointerEvents: 'none', boxShadow: `0 0 ${4 + Math.random() * 6}px ${i % 3 === 0 ? 'rgba(105,41,196,0.3)' : 'rgba(15,98,254,0.3)'}`, animation: `particleFloat${(i % 4) + 1} ${6 + Math.random() * 8}s ease-in-out infinite`, animationDelay: `${Math.random() * 5}s` }} />))}
      <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to top, rgba(15,98,254,0.08), transparent)', pointerEvents: 'none' }} />
      <div className="w-full max-w-md p-10 rounded-2xl relative z-10 border" style={{ background: 'rgba(255,255,255,0.01)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(60px)', borderColor: 'rgba(255,255,255,0.06)', boxShadow: '0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 60px rgba(15,98,254,0.03), 0 0 100px rgba(15,98,254,0.04)' }}>
        <div className="absolute top-0 left-6 right-6 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }} />
        <div className="text-center mb-8">
          <div className="relative inline-block mb-5">
            <div className="absolute" style={{ inset: -20, borderRadius: 28, background: 'rgba(15,98,254,0.15)', filter: 'blur(30px)', animation: 'breathe 4s ease-in-out infinite' }} />
            <div className="absolute inset-0 rounded-2xl" style={{ background: 'rgba(15,98,254,0.35)', filter: 'blur(20px)', transform: 'translateY(12px) scale(0.8)' }} />
            <img src={autonexLogo} alt="Autonex" className="relative w-20 h-20 rounded-2xl object-cover" style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1), 0 0 30px rgba(15,98,254,0.15)', animation: 'float 4s ease-in-out infinite' }} />
            <div className="absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)' }} />
          </div>
          <div className="flex items-baseline justify-center gap-2"><h1 className="text-3xl font-extrabold text-white tracking-tight">Workwise</h1><span className="text-sm text-blue-300/50 font-medium">by Autonex</span></div>
          <p className="text-sm font-semibold text-blue-200/70 mt-1.5">Employee Productivity Intelligence</p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {error && (<div className="p-3 rounded-lg text-sm text-center font-medium text-red-300" style={{ background: 'rgba(218,30,40,0.15)', border: '1px solid rgba(218,30,40,0.25)' }}>{error}</div>)}
          <div className="space-y-1.5"><label className="text-xs font-semibold text-blue-200/70 uppercase tracking-wide">Email</label><input type="email" className="w-full px-3.5 py-3 rounded-lg text-sm text-white placeholder-blue-300/25 focus:outline-none transition-all" style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.08)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }} onFocus={(e) => { e.target.style.borderColor = 'rgba(15,98,254,0.4)'; e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.2), 0 0 0 3px rgba(15,98,254,0.1)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.2)'; }} placeholder="you@autonex.com" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
          <div className="space-y-1.5"><label className="text-xs font-semibold text-blue-200/70 uppercase tracking-wide">Password</label><input type="password" className="w-full px-3.5 py-3 rounded-lg text-sm text-white placeholder-blue-300/25 focus:outline-none transition-all" style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.08)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }} onFocus={(e) => { e.target.style.borderColor = 'rgba(15,98,254,0.4)'; e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.2), 0 0 0 3px rgba(15,98,254,0.1)'; }} onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.2)'; }} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
          <button type="submit" disabled={loading} className="w-full py-3 text-white font-semibold text-sm rounded-lg transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden group" style={{ background: 'linear-gradient(135deg, #0F62FE, #3B82F6)', boxShadow: '0 8px 30px rgba(15,98,254,0.35), inset 0 1px 0 rgba(255,255,255,0.15)' }}><div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} /><span className="relative">{loading ? 'Signing in...' : 'Sign In'}</span></button>
        </form>
        <div className="mt-6 text-center text-sm text-blue-200/30">Don't have an account?{' '}<a href="#" onClick={(e) => { e.preventDefault(); onShowRegister(); }} className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">Register</a></div>
      </div>
    </div>
  );
}

// ============================================================
// REGISTER PAGE
// ============================================================
function RegisterPage({ onShowLogin }: { onShowLogin: () => void }) {
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [confirmPassword, setConfirmPassword] = useState(''); const [error, setError] = useState(''); const [success, setSuccess] = useState(false); const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); setError(''); if (password !== confirmPassword) { setError('Passwords do not match'); return; } if (password.length < 6) { setError('Password must be at least 6 characters'); return; } setLoading(true); try { await api.register(email, password, name); setSuccess(true); } catch (err) { setError(err instanceof Error ? err.message : 'Registration failed'); } finally { setLoading(false); } };
  const bgElements = (<><div className="absolute inset-0" style={{ background: 'linear-gradient(rgba(15,98,254,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(15,98,254,0.07) 1px, transparent 1px)', backgroundSize: '60px 60px', transform: 'perspective(500px) rotateX(60deg)', transformOrigin: 'center top', top: '45%', height: '120%', maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)', pointerEvents: 'none', animation: 'gridScroll 20s linear infinite' }} /><div className="absolute" style={{ top: '15%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(15,98,254,0.2) 0%, rgba(15,98,254,0.05) 40%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none', animation: 'breathe 6s ease-in-out infinite' }} /><div className="absolute" style={{ top: '50%', left: '50%', width: 520, height: 520, transform: 'translate(-50%, -50%)', border: '1px solid rgba(15,98,254,0.1)', borderRadius: '50%', pointerEvents: 'none', animation: 'ringRotate 20s linear infinite' }} /><div className="absolute" style={{ top: '50%', left: '50%', width: 440, height: 440, transform: 'translate(-50%, -50%) rotate(45deg)', border: '1px solid rgba(105,41,196,0.08)', borderRadius: '50%', pointerEvents: 'none', animation: 'ringRotate 25s linear infinite reverse' }} /><div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to top, rgba(15,98,254,0.08), transparent)', pointerEvents: 'none' }} /></>);
  const glassCardStyle = { background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)', borderColor: 'rgba(255,255,255,0.06)', boxShadow: '0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 0 60px rgba(15,98,254,0.03), 0 0 100px rgba(15,98,254,0.04)' };
  const inputStyle = { background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.08)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' };
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = 'rgba(15,98,254,0.4)'; e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.2), 0 0 0 3px rgba(15,98,254,0.1)'; };
  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.2)'; };
  if (success) { return (<div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at 50% 0%, #112D6E 0%, #0A1A4A 40%, #060E2B 100%)' }}>{bgElements}<div className="w-full max-w-md p-10 rounded-2xl text-center relative z-10 border" style={glassCardStyle}><div className="absolute top-0 left-6 right-6 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }} /><div className="w-16 h-16 rounded-full flex items-center justify-center text-green-400 text-3xl mx-auto mb-5" style={{ background: 'rgba(25,128,56,0.15)', boxShadow: '0 0 30px rgba(25,128,56,0.15)' }}>✓</div><h3 className="text-2xl font-bold text-white mb-2">Registration Successful!</h3><p className="text-blue-200/40 mb-6 text-sm">Your account is pending admin approval.</p><a href="#" onClick={(e) => { e.preventDefault(); onShowLogin(); }} className="text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors">Return to Login</a></div></div>); }
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'radial-gradient(ellipse at 50% 0%, #112D6E 0%, #0A1A4A 40%, #060E2B 100%)' }}>
      {bgElements}
      <div className="w-full max-w-md p-10 rounded-2xl relative z-10 border" style={glassCardStyle}>
        <div className="absolute top-0 left-6 right-6 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }} />
        <div className="text-center mb-6"><div className="relative inline-block mb-3"><div className="absolute" style={{ inset: -12, borderRadius: 16, background: 'rgba(15,98,254,0.15)', filter: 'blur(20px)', animation: 'breathe 4s ease-in-out infinite' }} /><div className="absolute inset-0 rounded-xl" style={{ background: 'rgba(15,98,254,0.35)', filter: 'blur(16px)', transform: 'translateY(8px) scale(0.8)' }} /><img src={autonexLogo} alt="Autonex" className="relative w-14 h-14 rounded-xl object-cover" style={{ boxShadow: '0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)', animation: 'float 4s ease-in-out infinite' }} /></div><h2 className="text-2xl font-bold text-white">Create Account</h2><p className="text-sm text-blue-200/35 mt-1">Join the Workwise platform</p></div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && <div className="p-3 rounded-lg text-sm text-center font-medium text-red-300" style={{ background: 'rgba(218,30,40,0.15)', border: '1px solid rgba(218,30,40,0.25)' }}>{error}</div>}
          <div className="space-y-1"><label className="text-xs font-semibold text-blue-200/50 uppercase tracking-wide">Full Name</label><input type="text" className="w-full px-3.5 py-3 rounded-lg text-sm text-white placeholder-blue-300/25 focus:outline-none transition-all" style={inputStyle} onFocus={handleInputFocus} onBlur={handleInputBlur} placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required /></div>
          <div className="space-y-1"><label className="text-xs font-semibold text-blue-200/50 uppercase tracking-wide">Email</label><input type="email" className="w-full px-3.5 py-3 rounded-lg text-sm text-white placeholder-blue-300/25 focus:outline-none transition-all" style={inputStyle} onFocus={handleInputFocus} onBlur={handleInputBlur} placeholder="you@autonex.com" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
          <div className="space-y-1"><label className="text-xs font-semibold text-blue-200/50 uppercase tracking-wide">Password</label><input type="password" className="w-full px-3.5 py-3 rounded-lg text-sm text-white placeholder-blue-300/25 focus:outline-none transition-all" style={inputStyle} onFocus={handleInputFocus} onBlur={handleInputBlur} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
          <div className="space-y-1"><label className="text-xs font-semibold text-blue-200/50 uppercase tracking-wide">Confirm Password</label><input type="password" className="w-full px-3.5 py-3 rounded-lg text-sm text-white placeholder-blue-300/25 focus:outline-none transition-all" style={inputStyle} onFocus={handleInputFocus} onBlur={handleInputBlur} placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /></div>
          <button type="submit" disabled={loading} className="w-full py-3 text-white font-semibold text-sm rounded-lg transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed mt-2 relative overflow-hidden group" style={{ background: 'linear-gradient(135deg, #0F62FE, #3B82F6)', boxShadow: '0 8px 30px rgba(15,98,254,0.35), inset 0 1px 0 rgba(255,255,255,0.15)' }}><div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} /><span className="relative">{loading ? 'Creating Account...' : 'Register'}</span></button>
        </form>
        <div className="mt-6 text-center text-sm text-blue-200/30">Already have an account?{' '}<a href="#" onClick={(e) => { e.preventDefault(); onShowLogin(); }} className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">Sign In</a></div>
      </div>
    </div>
  );
}

// ============================================================
// SMALL COMPONENTS
// ============================================================
function StatCard({ icon, label, value, subtext, color, dm }: { icon: React.ReactNode; label: string; value: string | number; subtext?: string; color: string; dm?: boolean }) {
  return (<div className={`border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group ${dm ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}><div className="flex justify-between items-start mb-3"><div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: color + '18', color }}>{icon}</div></div><div className={`text-3xl font-extrabold tracking-tight ${dm ? 'text-white' : 'text-gray-900'}`}>{value}</div><div className={`text-xs font-semibold uppercase tracking-wider mt-1 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{label}</div>{subtext && <div className={`text-xs mt-1 ${dm ? 'text-gray-500' : 'text-gray-400'}`}>{subtext}</div>}<div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: color }} /></div>);
}

function PendingApprovals({ users, onApprove, onReject, loading, dm }: { users: UserInfo[]; onApprove: (id: string) => void; onReject: (id: string) => void; loading: boolean; dm?: boolean }) {
  if (users.length === 0) return null;
  return (<div className={`border rounded-xl shadow-sm overflow-hidden ${dm ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}><div className={`flex items-center justify-between px-5 py-4 border-b ${dm ? 'border-gray-700' : 'border-gray-100'}`}><h3 className={`text-sm font-bold flex items-center gap-2 ${dm ? 'text-white' : 'text-gray-900'}`}><Icons.Alert /> Pending Approvals <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700">{users.length}</span></h3></div>{users.map((user) => (<div key={user.id} className={`flex items-center justify-between px-5 py-3.5 border-b last:border-b-0 transition-colors ${dm ? 'border-gray-700/50 hover:bg-gray-700/30' : 'border-gray-50 hover:bg-gray-50'}`}><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs" style={{ background: getAvatarColor(user.name).bg, color: getAvatarColor(user.name).text }}>{getInitials(user.name)}</div><div><div className={`font-semibold text-sm ${dm ? 'text-white' : 'text-gray-900'}`}>{user.name}</div><div className={`text-xs ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</div></div></div><div className="flex gap-2"><button className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 text-xs font-semibold disabled:opacity-50" onClick={() => onApprove(user.id)} disabled={loading}><Icons.Check /> Approve</button><button className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 text-xs font-semibold disabled:opacity-50" onClick={() => onReject(user.id)} disabled={loading}><Icons.X /> Reject</button></div></div>))}</div>);
}

function EmployeeListView({ employees, employeeReports, onViewDetails, onDelete, dm }: { employees: UserInfo[]; employeeReports: Record<string, DailyReport>; onViewDetails: (user: UserInfo) => void; onDelete: (id: string) => void; dm?: boolean }) {
  return (<div className={`border rounded-xl shadow-sm overflow-hidden ${dm ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}><div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className={`border-b-2 ${dm ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}><th className={`px-5 py-3 text-[11px] font-bold uppercase tracking-wider ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Employee</th><th className={`px-5 py-3 text-[11px] font-bold uppercase tracking-wider ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Status</th><th className={`px-5 py-3 text-[11px] font-bold uppercase tracking-wider ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Today's Time</th><th className={`px-5 py-3 text-[11px] font-bold uppercase tracking-wider ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Productivity</th><th className={`px-5 py-3 text-[11px] font-bold uppercase tracking-wider ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Apps</th><th className={`px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-center ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Actions</th></tr></thead><tbody>{employees.map((emp) => { const report = employeeReports[emp.id]; const totalActive = report?.total_active_seconds || 0; const totalIdle = report?.total_idle_seconds || 0; const hasActivity = totalActive > 0; const prodScore = getProductivityScore(totalActive, totalIdle); const grade = getEfficiencyGrade(prodScore); return (<tr key={emp.id} className={`border-b transition-colors ${dm ? 'border-gray-700/50 hover:bg-gray-700/30' : 'border-gray-100 hover:bg-gray-50'}`}><td className="px-5 py-3.5"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs" style={{ background: getAvatarColor(emp.name).bg, color: getAvatarColor(emp.name).text }}>{getInitials(emp.name)}</div><div><div className={`font-semibold text-sm ${dm ? 'text-white' : 'text-gray-900'}`}>{emp.name}</div><div className={`text-xs ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{emp.email}</div></div></div></td><td className="px-5 py-3.5">{hasActivity ? (<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot" /> Active</span>) : (<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500"><span className="w-1.5 h-1.5 rounded-full bg-gray-400" /> Inactive</span>)}</td><td className="px-5 py-3.5"><span className={`font-mono-custom font-semibold text-sm ${dm ? 'text-gray-300' : 'text-gray-700'}`}>{formatDuration(totalActive) || '0m'}</span></td><td className="px-5 py-3.5"><div className="flex items-center gap-2"><div className={`w-16 h-1.5 rounded-full overflow-hidden ${dm ? 'bg-gray-700' : 'bg-gray-100'}`}><div className="h-full rounded-full transition-all duration-500" style={{ width: `${prodScore}%`, background: grade.color }} /></div><span className="text-xs font-bold" style={{ color: grade.color }}>{prodScore}%</span></div></td><td className={`px-5 py-3.5 text-sm ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{report?.apps?.length || 0} apps</td><td className="px-5 py-3.5 text-center"><div className="flex items-center justify-center gap-1"><button className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors" onClick={() => onViewDetails(emp)}><Icons.Eye /></button><button className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors" onClick={(e) => { e.stopPropagation(); onDelete(emp.id); }}><Icons.Trash /></button></div></td></tr>); })}</tbody></table></div>{employees.length === 0 && <div className="p-12 text-center text-gray-500 text-sm">No employees found</div>}</div>);
}

function AppUsageWithSubActivities({ report }: { report: DailyReport | null }) {
  const [expandedApps, setExpandedApps] = useState<Set<string>>(new Set());
  if (!report || !report.apps || report.apps.length === 0) return (<div className="py-12 text-center"><div className="text-4xl mb-3 opacity-30"></div><div className="text-base font-semibold text-gray-700">No activity recorded</div><div className="text-sm text-gray-500 mt-1">Activity will appear once the agent is running</div></div>);
  const toggleApp = (n: string) => { const s = new Set(expandedApps); s.has(n) ? s.delete(n) : s.add(n); setExpandedApps(s); };
  const maxSeconds = Math.max(...report.apps.map(a => a.active_seconds));
  return (<div className="space-y-2">{report.apps.map((app, idx) => { const isExp = expandedApps.has(app.name); const hasSub = app.sub_activities && app.sub_activities.length > 0; const pct = Math.round((app.active_seconds / maxSeconds) * 100); const color = CHART_PALETTE[idx % CHART_PALETTE.length]; return (<div key={idx}><div onClick={() => hasSub && toggleApp(app.name)} className={`flex items-center gap-3 p-3 border transition-all ${isExp ? 'bg-gray-50 border-gray-300 rounded-t-xl border-b-0' : 'bg-white border-gray-200 rounded-xl hover:shadow-sm hover:border-gray-300'} ${hasSub ? 'cursor-pointer' : ''}`}><div className="text-gray-300 w-3.5">{hasSub ? <Icons.ChevronRight expanded={isExp} /> : null}</div><div className="w-9 h-9 rounded-lg flex items-center justify-center font-extrabold text-sm shrink-0" style={{ background: color + '18', color }}>{app.name.charAt(0).toUpperCase()}</div><div className="flex-1 min-w-0"><div className="flex justify-between items-center mb-1.5"><div className="flex items-center gap-2 overflow-hidden"><span className="font-semibold text-sm text-gray-900 truncate">{app.name}</span>{app.is_browser && <span className="text-[9px] font-bold tracking-wider uppercase text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">Browser</span>}</div><span className="font-mono-custom font-semibold text-sm" style={{ color }}>{formatDuration(app.active_seconds)}</span></div><div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color }} /></div></div></div>{isExp && hasSub && (<div className="bg-gray-50 border-x border-b border-gray-300 rounded-b-xl divide-y divide-gray-200">{app.sub_activities.map((sub, si) => (<div key={si} className="flex items-center gap-2.5 py-2.5 px-4 pl-16 hover:bg-gray-100 transition-colors"><div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color, opacity: 0.6 }} /><span className="flex-1 text-sm text-gray-700 truncate font-medium">{sub.name}</span><span className="font-mono-custom text-xs text-gray-500 shrink-0">{formatDuration(sub.duration_seconds)}</span></div>))}</div>)}</div>); })}</div>);
}

function EmployeeDetailModal({ employee, onClose }: { employee: UserInfo; onClose: () => void }) {
  const [selectedDate, setSelectedDate] = useState(() => getLocalDateString(new Date())); const [report, setReport] = useState<DailyReport | null>(null); const [loading, setLoading] = useState(true);
  useEffect(() => { const load = async () => { setLoading(true); try { const d = await api.getDailyReport(selectedDate, employee.id); setReport(d); } catch { setReport(null); } finally { setLoading(false); } }; load(); }, [employee.id, selectedDate]);
  const totalActive = report?.total_active_seconds || 0; const totalIdle = report?.total_idle_seconds || 0; const appsCount = report?.apps?.length || 0; const prodScore = getProductivityScore(totalActive, totalIdle); const grade = getEfficiencyGrade(prodScore);
  const changeDate = (days: number) => { const d = new Date(selectedDate + 'T12:00:00'); d.setDate(d.getDate() + days); setSelectedDate(getLocalDateString(d)); };
  const todayStr = getLocalDateString(new Date()); const isToday = selectedDate === todayStr;
  const appPieData = (report?.apps || []).slice(0, 6).map((app, i) => ({ name: app.name, value: app.active_seconds, fill: CHART_PALETTE[i % CHART_PALETTE.length] }));
  return (<div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'rgba(22,22,22,0.4)', backdropFilter: 'blur(6px)' }} onClick={onClose}><div className="w-full max-w-4xl bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-scale-in" style={{ maxHeight: '90vh' }} onClick={(e) => e.stopPropagation()}><div className="flex items-center justify-between p-5 border-b border-gray-200"><div className="flex items-center gap-3"><div className="w-11 h-11 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: getAvatarColor(employee.name).bg, color: getAvatarColor(employee.name).text }}>{getInitials(employee.name)}</div><div><h2 className="text-lg font-bold text-gray-900">{employee.name}</h2><p className="text-xs text-gray-500">{employee.email}</p></div></div><button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors" onClick={onClose}><Icons.Close /></button></div><div className="flex items-center justify-center gap-4 p-3 bg-gray-50 border-b border-gray-100"><button className="w-8 h-8 flex items-center justify-center border border-gray-200 bg-white rounded-lg text-gray-500 hover:bg-gray-50 transition-all" onClick={() => changeDate(-1)}>←</button><div className="flex items-center gap-2 bg-white px-3 py-1.5 border border-gray-200 rounded-lg shadow-sm"><Icons.Calendar /><input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} max={todayStr} className="bg-transparent border-none text-gray-700 text-sm font-medium focus:outline-none" />{isToday && <span className="text-[9px] font-bold uppercase bg-blue-50 text-blue-600 px-2 py-0.5 rounded">Today</span>}</div><button className="w-8 h-8 flex items-center justify-center border border-gray-200 bg-white rounded-lg text-gray-500 hover:bg-gray-50 transition-all disabled:opacity-30" onClick={() => changeDate(1)} disabled={isToday}>→</button></div><div className="grid grid-cols-4 gap-3 p-5 bg-gray-50 border-b border-gray-100"><div className="bg-white rounded-xl p-3.5 text-center border border-gray-200 shadow-sm"><div className="text-xl font-extrabold text-blue-600 font-mono-custom">{loading ? '...' : formatDuration(totalActive) || '0m'}</div><div className="text-[10px] font-bold uppercase text-gray-400 mt-1 tracking-wider">Active Time</div></div><div className="bg-white rounded-xl p-3.5 text-center border border-gray-200 shadow-sm"><div className="text-xl font-extrabold text-gray-700 font-mono-custom">{loading ? '...' : formatDuration(totalIdle) || '0m'}</div><div className="text-[10px] font-bold uppercase text-gray-400 mt-1 tracking-wider">Idle Time</div></div><div className="bg-white rounded-xl p-3.5 text-center border border-gray-200 shadow-sm"><div className="text-xl font-extrabold text-green-600 font-mono-custom">{loading ? '...' : appsCount}</div><div className="text-[10px] font-bold uppercase text-gray-400 mt-1 tracking-wider">Apps Used</div></div><div className="bg-white rounded-xl p-3.5 text-center border border-gray-200 shadow-sm"><div className="text-xl font-extrabold font-mono-custom" style={{ color: grade.color }}>{loading ? '...' : `${prodScore}%`}</div><div className="text-[10px] font-bold uppercase text-gray-400 mt-1 tracking-wider">Productivity</div></div></div><div className="flex-1 overflow-y-auto p-5 bg-white">{!loading && appPieData.length > 0 && (<div className="mb-6"><h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3">App Time Distribution</h4><div style={{ height: 200 }}><ResponsiveContainer><PieChart><Pie data={appPieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">{appPieData.map((e, i) => <Cell key={i} fill={e.fill} />)}</Pie><Tooltip content={<ChartTooltip />} /><Legend iconType="circle" iconSize={8} formatter={(v: string) => <span className="text-xs text-gray-700">{v}</span>} /></PieChart></ResponsiveContainer></div></div>)}<h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3">Detailed Activity Log</h4>{loading ? (<div className="text-center py-12 text-gray-500 animate-pulse">Loading activity data...</div>) : (<AppUsageWithSubActivities report={report} />)}</div></div></div>);
}

function FraudAlertPanel({ alerts }: { alerts: FraudAlert[] }) {
  if (alerts.length === 0) return (<div className="py-8 text-center"><div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3 text-green-600"><Icons.Check /></div><div className="text-sm text-gray-500">No suspicious activity detected</div></div>);
  return (<div className="space-y-2">{alerts.slice(0, 5).map((alert, idx) => { const isCritical = alert.severity === 'CRITICAL'; return (<div key={idx} className={`flex gap-2.5 p-3 rounded-xl border ${isCritical ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}><div className={`shrink-0 mt-0.5 ${isCritical ? 'text-red-500' : 'text-amber-500'}`}><Icons.Alert /></div><div className="flex-1 min-w-0"><div className="flex justify-between items-start gap-2"><span className="font-semibold text-sm text-gray-900">{alert.user_email}</span><span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded ${isCritical ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-700'}`}>{alert.severity}</span></div><p className="text-xs text-gray-500 mt-1 leading-relaxed">{alert.message}</p></div></div>); })}</div>);
}

function AppUsageList({ report }: { report: DailyReport | null }) {
  if (!report || !report.apps || report.apps.length === 0) return <div className="py-8 text-center text-gray-500 text-sm">No activity data for today</div>;
  const maxSeconds = Math.max(...report.apps.map(a => a.active_seconds));
  return (<div className="space-y-3">{report.apps.slice(0, 8).map((app, idx) => { const color = CHART_PALETTE[idx % CHART_PALETTE.length]; return (<div key={idx} className="flex items-center gap-3"><div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0" style={{ background: color + '18', color }}>{app.name.charAt(0).toUpperCase()}</div><div className="flex-1 min-w-0"><div className="flex justify-between mb-1"><span className="text-sm font-semibold text-gray-900 truncate pr-2">{app.name}</span><span className="font-mono-custom text-xs font-semibold" style={{ color }}>{formatDuration(app.active_seconds)}</span></div><div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${(app.active_seconds / maxSeconds) * 100}%`, background: color }} /></div></div></div>); })}</div>);
}

function Card({ title, icon, children, className = '', dm, action }: { title: string; icon: React.ReactNode; children: React.ReactNode; className?: string; dm?: boolean; action?: React.ReactNode }) {
  return (<div className={`border rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden ${className} ${dm ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}><div className={`flex items-center justify-between px-5 py-4 border-b ${dm ? 'border-gray-700' : 'border-gray-100'}`}><h3 className={`text-sm font-bold flex items-center gap-2 ${dm ? 'text-white' : 'text-gray-900'}`}>{icon} {title}</h3>{action}</div><div className="p-5">{children}</div></div>);
}

// ============================================================
// EXPORT CSV HELPERS
// ============================================================
function exportCSV(employees: UserInfo[], reports: Record<string, DailyReport>, alerts: FraudAlert[], dateLabel: string) {
  const headers = ['Employee Name', 'Email', 'Status', 'Active Time (min)', 'Idle Time (min)', 'Productivity %', 'Apps Used', 'Top App'];
  const rows = employees.map(emp => { const r = reports[emp.id]; const a = r?.total_active_seconds || 0; const idle = r?.total_idle_seconds || 0; const prod = getProductivityScore(a, idle); const topApp = r?.apps?.length ? r.apps.reduce((x, b) => x.active_seconds > b.active_seconds ? x : b).name : 'N/A'; return [emp.name, emp.email, a > 0 ? 'Active' : 'Inactive', Math.round(a / 60), Math.round(idle / 60), prod, r?.apps?.length || 0, topApp].join(','); });
  const alertSection = alerts.length > 0 ? ['\nFraud Alerts', 'Email,Severity,Message', ...alerts.map(a => `${a.user_email},${a.severity},"${a.message.replace(/"/g, '""')}"`)].join('\n') : '';
  const csv = [headers.join(','), ...rows, alertSection].join('\n');
  downloadCSVBlob(csv, `workwise-${dateLabel}-${getLocalDateString(new Date())}.csv`);
}

function downloadCSVBlob(csvContent: string, filename: string) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url);
}

function exportSummaryRecordsCSV(data: EmployeeSummaryRecord[], label: string) {
  const headers = ['Employee Name', 'Email', 'Date', 'Active Hours', 'Idle Hours', 'Total Hours', 'Mouse Events', 'Key Events', 'Unique Apps', 'Top App', 'Activity Score'];
  const rows = data.map(r => [
    `"${r.user_name}"`, `"${r.user_email}"`, r.date,
    r.active_hours, r.idle_hours, r.total_hours,
    r.total_mouse_events, r.total_key_events, r.unique_apps,
    `"${r.top_app}"`, r.activity_score
  ].join(','));
  downloadCSVBlob([headers.join(','), ...rows].join('\n'), `workwise-detailed-${label}-${getLocalDateString(new Date())}.csv`);
}

// ============================================================
// REPORTS TAB
// ============================================================
function ReportsTab({ employees, employeeReports, fraudAlerts, dm }: { employees: UserInfo[]; employeeReports: Record<string, DailyReport>; fraudAlerts: FraudAlert[]; dm?: boolean }) {
  const [quickLoading, setQuickLoading] = useState<string | null>(null);
  const [detailEmpId, setDetailEmpId] = useState<string>('all');
  const [detailDays, setDetailDays] = useState<number>(1);
  const [detailData, setDetailData] = useState<EmployeeSummaryRecord[]>([]);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailFetched, setDetailFetched] = useState(false);

  const handleQuickExport = async (period: 'today' | 'weekly' | 'monthly') => {
    setQuickLoading(period);
    try {
      if (period === 'today') { exportCSV(employees, employeeReports, fraudAlerts, 'daily'); }
      else {
        const days = period === 'weekly' ? 7 : 30;
        const agg: Record<string, DailyReport> = {};
        for (const emp of employees) {
          let totalActive = 0, totalIdle = 0; const allApps: Record<string, number> = {};
          for (let i = 0; i < days; i++) { const d = new Date(); d.setDate(d.getDate() - i); try { const r = await api.getDailyReport(getLocalDateString(d), emp.id); totalActive += r.total_active_seconds || 0; totalIdle += r.total_idle_seconds || 0; (r.apps || []).forEach(a => { allApps[a.name] = (allApps[a.name] || 0) + a.active_seconds; }); } catch { } }
          agg[emp.id] = { date: getLocalDateString(new Date()), total_hours: 0, user_id: emp.id, total_active_seconds: totalActive, total_idle_seconds: totalIdle, apps: Object.entries(allApps).map(([name, secs]) => ({ name, active_seconds: secs, is_browser: false, sub_activities: [], duration: '', duration_seconds: 0 })).sort((a, b) => b.active_seconds - a.active_seconds) } as DailyReport;
        }
        exportCSV(employees, agg, fraudAlerts, period);
      }
    } catch (e) { console.error(e); } finally { setQuickLoading(null); }
  };

  const handleFetchDetailed = async () => {
    setDetailLoading(true);
    try {
      const targetEmps = detailEmpId === 'all' ? employees : employees.filter(e => e.id === detailEmpId);
      const results: EmployeeSummaryRecord[] = [];
      for (const emp of targetEmps) {
        for (let i = 0; i < detailDays; i++) {
          const d = new Date(); d.setDate(d.getDate() - i);
          const dateStr = getLocalDateString(d);
          try {
            const r = await api.getDailyReport(dateStr, emp.id);
            const activeH = parseFloat((r.total_active_seconds / 3600).toFixed(2));
            const idleH = parseFloat((r.total_idle_seconds / 3600).toFixed(2));
            const totalH = parseFloat(((r.total_active_seconds + r.total_idle_seconds) / 3600).toFixed(2));
            const topApp = r.apps?.length ? r.apps.reduce((x, b) => x.active_seconds > b.active_seconds ? x : b).name : 'N/A';
            const score = getProductivityScore(r.total_active_seconds, r.total_idle_seconds);
            results.push({
              user_id: emp.id, user_email: emp.email, user_name: emp.name,
              date: dateStr, active_hours: activeH, idle_hours: idleH, total_hours: totalH,
              total_mouse_events: 0, total_key_events: 0,
              unique_apps: r.apps?.length || 0, top_app: topApp, activity_score: score,
            });
          } catch { /* no data for this day */ }
        }
      }
      setDetailData(results);
      setDetailFetched(true);
    } catch (e) { console.error('Fetch failed:', e); setDetailData([]); setDetailFetched(true); }
    finally { setDetailLoading(false); }
  };

  const handleExportDetailed = () => {
    if (detailData.length === 0) return;
    const empLabel = detailEmpId === 'all' ? 'all' : (employees.find(e => e.id === detailEmpId)?.name.replace(/\s/g, '_') || detailEmpId);
    exportSummaryRecordsCSV(detailData, `${empLabel}-${detailDays}d`);
  };

  const cardCls = `border rounded-xl p-6 ${dm ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`;
  const labelCls = `text-xs font-bold uppercase tracking-wider mb-1.5 ${dm ? 'text-gray-400' : 'text-gray-500'}`;
  const selectCls = `px-3 py-2 rounded-lg text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all ${dm ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-white border-gray-200 text-gray-700'}`;
  const btnPri = (disabled: boolean) => `flex items-center gap-2 px-4 py-2.5 text-white text-sm font-semibold rounded-lg transition-all active:scale-[0.98] ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110'}`;
  const btnOut = `flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg border transition-all active:scale-[0.98] ${dm ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`;

  const quickCards = [
    { id: 'today' as const, title: 'Daily Summary', desc: "Today's team productivity overview", icon: 'daily', color: '#0F62FE' },
    { id: 'weekly' as const, title: 'Weekly Summary', desc: 'Aggregated last 7 days', icon: 'weekly', color: '#6929C4' },
    { id: 'monthly' as const, title: 'Monthly Summary', desc: 'Aggregated last 30 days', icon: 'monthly', color: '#198038' },
  ];

  const periodOpts = [{ value: 1, label: 'Today' }, { value: 7, label: 'Last 7 Days' }, { value: 14, label: 'Last 14 Days' }, { value: 30, label: 'Last 30 Days' }, { value: 60, label: 'Last 60 Days' }, { value: 90, label: 'Last 90 Days' }];

  return (
    <div className="p-8 pt-6 space-y-8 animate-fade-in">

      {/* === SECTION 1: QUICK TEAM SUMMARY === */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 rounded-full bg-blue-500" />
          <h2 className={`text-base font-bold ${dm ? 'text-white' : 'text-gray-900'}`}>Quick Team Summary</h2>
          <span className={`text-xs ${dm ? 'text-gray-500' : 'text-gray-400'}`}>â€” One-click export for all employees</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {quickCards.map(rc => (
            <div key={rc.id} className={`${cardCls} transition-all hover:shadow-lg`}>
              <div className="flex items-start justify-between mb-3">{rc.id === 'today' ? <Icons.FileText /> : rc.id === 'weekly' ? <Icons.BarChart3 /> : <Icons.TrendingUp />}<span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${dm ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>{employees.length} employees</span></div>
              <h3 className={`text-lg font-bold mb-1 ${dm ? 'text-white' : 'text-gray-900'}`}>{rc.title}</h3>
              <p className={`text-sm mb-5 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{rc.desc}</p>
              <button onClick={() => handleQuickExport(rc.id)} disabled={quickLoading !== null} className={btnPri(quickLoading !== null)} style={{ background: rc.color, boxShadow: `0 4px 15px ${rc.color}40` }}>
                {quickLoading === rc.id ? (<><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating...</>) : (<><Icons.Download /> Export CSV</>)}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* === SECTION 2: DETAILED EMPLOYEE REPORTS === */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-5 rounded-full bg-purple-500" />
          <h2 className={`text-base font-bold ${dm ? 'text-white' : 'text-gray-900'}`}>Detailed Employee Reports</h2>
          <span className={`text-xs ${dm ? 'text-gray-500' : 'text-gray-400'}`}>â€” Per-employee, per-day breakdown with productivity scores</span>
        </div>
        <div className={cardCls}>
          <div className="flex flex-wrap items-end gap-4 mb-5">
            <div><div className={labelCls}>Employee</div><select value={detailEmpId} onChange={e => { setDetailEmpId(e.target.value); setDetailFetched(false); }} className={selectCls} style={{ minWidth: 200 }}><option value="all">All Employees</option>{employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}</select></div>
            <div><div className={labelCls}>Period</div><select value={detailDays} onChange={e => { setDetailDays(Number(e.target.value)); setDetailFetched(false); }} className={selectCls}>{periodOpts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>
            <button onClick={handleFetchDetailed} disabled={detailLoading} className={btnPri(detailLoading)} style={{ background: '#6929C4', boxShadow: '0 4px 15px rgba(105,41,196,0.3)' }}>
              {detailLoading ? (<><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Loading...</>) : (<><Icons.Eye /> Fetch Data</>)}
            </button>
            {detailFetched && detailData.length > 0 && (<button onClick={handleExportDetailed} className={btnOut}><Icons.Download /> Download CSV</button>)}
          </div>

          {detailFetched && detailData.length === 0 && (
            <div className={`py-10 text-center rounded-xl border ${dm ? 'border-gray-700 bg-gray-800/30' : 'border-gray-100 bg-gray-50'}`}>
              <div className="text-3xl mb-2 opacity-40"><Icons.Search /></div>
              <div className={`text-sm font-semibold ${dm ? 'text-gray-400' : 'text-gray-500'}`}>No data found for the selected filters</div>
              <div className={`text-xs mt-1 ${dm ? 'text-gray-500' : 'text-gray-400'}`}>Try a different employee or a wider date range</div>
            </div>
          )}

          {detailFetched && detailData.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-bold uppercase tracking-wider ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{detailData.length} records found</span>
                <span className={`text-xs ${dm ? 'text-gray-500' : 'text-gray-400'}`}>{detailEmpId === 'all' ? 'All employees' : employees.find(e => e.id === detailEmpId)?.name} · Last {detailDays} day{detailDays > 1 ? 's' : ''}</span>
              </div>
              <div className="overflow-x-auto rounded-xl border" style={{ maxHeight: 400, overflowY: 'auto' }}>
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 z-10"><tr className={`border-b ${dm ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                    {['Employee', 'Date', 'Active', 'Idle', 'Total', 'Apps', 'Top App', 'Productivity'].map(h => (<th key={h} className={`px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{h}</th>))}
                  </tr></thead>
                  <tbody className={`divide-y ${dm ? 'divide-gray-700/50' : 'divide-gray-100'}`}>
                    {detailData.slice(0, 100).map((row, i) => (
                      <tr key={i} className={`transition-colors ${dm ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50'}`}>
                        <td className="px-3 py-2"><div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-[9px]" style={{ background: getAvatarColor(row.user_name).bg, color: getAvatarColor(row.user_name).text }}>{getInitials(row.user_name)}</div><span className={`text-xs font-medium truncate ${dm ? 'text-white' : 'text-gray-900'}`} style={{ maxWidth: 120 }}>{row.user_name}</span></div></td>
                        <td className={`px-3 py-2 text-xs font-mono-custom ${dm ? 'text-gray-300' : 'text-gray-600'}`}>{row.date}</td>
                        <td className="px-3 py-2 text-xs font-mono-custom text-blue-500 font-semibold">{row.active_hours}h</td>
                        <td className={`px-3 py-2 text-xs font-mono-custom ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{row.idle_hours}h</td>
                        <td className={`px-3 py-2 text-xs font-mono-custom font-semibold ${dm ? 'text-gray-300' : 'text-gray-700'}`}>{row.total_hours}h</td>
                        <td className={`px-3 py-2 text-xs ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{row.unique_apps}</td>
                        <td className={`px-3 py-2 text-xs font-medium truncate ${dm ? 'text-gray-300' : 'text-gray-700'}`} style={{ maxWidth: 100 }}>{row.top_app}</td>
                        <td className="px-3 py-2"><span className={`text-xs font-bold px-2 py-0.5 rounded-full ${row.activity_score >= 80 ? 'bg-green-50 text-green-700' : row.activity_score >= 50 ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>{row.activity_score}%</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {detailData.length > 100 && <div className={`text-center py-2 text-xs ${dm ? 'text-gray-500' : 'text-gray-400'}`}>Showing first 100 of {detailData.length} rows · Download CSV for full data</div>}
            </div>
          )}
        </div>
      </div>

      {/* === PREVIEW TABLE === */}
      <div className={cardCls}>
        <h3 className={`text-sm font-bold mb-4 flex items-center gap-2 ${dm ? 'text-white' : 'text-gray-900'}`}><Icons.FileText /> Current Session Preview â€” Today</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead><tr className={`border-b ${dm ? 'border-gray-700' : 'border-gray-200'}`}>
              <th className={`px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Employee</th>
              <th className={`px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Active</th>
              <th className={`px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Idle</th>
              <th className={`px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Productivity</th>
              <th className={`px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Top App</th>
            </tr></thead>
            <tbody>{employees.map(emp => {
              const r = employeeReports[emp.id]; const a = r?.total_active_seconds || 0; const idle = r?.total_idle_seconds || 0;
              const prod = getProductivityScore(a, idle); const grade = getEfficiencyGrade(prod);
              const topApp = r?.apps?.length ? r.apps.reduce((x, b) => x.active_seconds > b.active_seconds ? x : b).name : 'â€”';
              return (<tr key={emp.id} className={`border-b ${dm ? 'border-gray-700/50' : 'border-gray-50'}`}>
                <td className="px-4 py-2.5"><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px]" style={{ background: getAvatarColor(emp.name).bg, color: getAvatarColor(emp.name).text }}>{getInitials(emp.name)}</div><span className={`text-sm font-medium ${dm ? 'text-white' : 'text-gray-900'}`}>{emp.name}</span></div></td>
                <td className={`px-4 py-2.5 text-sm font-mono-custom ${dm ? 'text-gray-300' : 'text-gray-700'}`}>{formatDuration(a) || '0m'}</td>
                <td className={`px-4 py-2.5 text-sm font-mono-custom ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{formatDuration(idle) || '0m'}</td>
                <td className="px-4 py-2.5"><span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: grade.bg, color: grade.color }}>{prod}%</span></td>
                <td className={`px-4 py-2.5 text-sm ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{topApp}</td>
              </tr>);
            })}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


// ============================================================
// MAIN DASHBOARD
// ============================================================
function Dashboard({ user, onLogout }: { user: { name: string; role: string }; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'employees' | 'advanced-analytics' | 'leaderboard' | 'notifications-hub' | 'reports'>('dashboard');
  const [employees, setEmployees] = useState<UserInfo[]>([]);
  const [pendingUsers, setPendingUsers] = useState<UserInfo[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<UserInfo | null>(null);
  const [comparisonEmployee, setComparisonEmployee] = useState<UserInfo | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [employeeReports, setEmployeeReports] = useState<Record<string, DailyReport>>({});
  const [employeeReport, setEmployeeReport] = useState<DailyReport | null>(null);
  const [fraudAlerts, setFraudAlerts] = useState<FraudAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(() => getLocalDateString(new Date()));
  const [viewMode, setViewMode] = useState<'date' | 'range'>('date');
  const [rangeDays, setRangeDays] = useState<number>(7);
  const isAdmin = user.role === 'admin';
  const dm = darkMode;

  const loadData = async () => {
    try {
      if (isAdmin) {
        const [emps, pending, fraudData] = await Promise.all([api.getEmployees(), api.getPendingUsers(), api.getFraudAlerts(7).catch(() => ({ alerts: [] }))]);
        const filteredEmps = emps.filter(e => e.role !== 'admin');
        setEmployees(filteredEmps); setPendingUsers(pending); setFraudAlerts(fraudData.alerts || []);
        const reports: Record<string, DailyReport> = {};

        if (viewMode === 'date') {
          await Promise.all(filteredEmps.map(async (emp) => { try { reports[emp.id] = await api.getDailyReport(selectedDate, emp.id); } catch { } }));
        } else {
          for (const emp of filteredEmps) {
            let totalActive = 0, totalIdle = 0;
            const allApps: Record<string, number> = {};
            for (let i = 0; i < rangeDays; i++) {
              const d = new Date(selectedDate + 'T12:00:00');
              d.setDate(d.getDate() + i);
              try {
                const r = await api.getDailyReport(getLocalDateString(d), emp.id);
                totalActive += r.total_active_seconds || 0;
                totalIdle += r.total_idle_seconds || 0;
                (r.apps || []).forEach(a => { allApps[a.name] = (allApps[a.name] || 0) + a.active_seconds; });
              } catch { }
            }
            reports[emp.id] = {
              date: selectedDate,
              total_hours: 0,
              user_id: emp.id,
              total_active_seconds: totalActive,
              total_idle_seconds: totalIdle,
              apps: Object.entries(allApps).map(([name, secs]) => ({ name, active_seconds: secs, is_browser: false, sub_activities: [], duration: '', duration_seconds: 0 })).sort((a, b) => b.active_seconds - a.active_seconds)
            } as DailyReport;
          }
        }
        setEmployeeReports(reports);

        const weekly: any[] = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date(); d.setDate(d.getDate() - i); const dateStr = getLocalDateString(d); const dayName = d.toLocaleDateString('en', { weekday: 'short' });
          let totalActive = 0, totalIdle = 0, empCount = 0;
          if (i === 0) { Object.values(reports).forEach(r => { totalActive += r.total_active_seconds || 0; totalIdle += r.total_idle_seconds || 0; empCount++; }); }
          else { const sample = filteredEmps.slice(0, 5); await Promise.all(sample.map(async (emp) => { try { const r = await api.getDailyReport(dateStr, emp.id); totalActive += r.total_active_seconds || 0; totalIdle += r.total_idle_seconds || 0; empCount++; } catch { } })); }
          const avgA = empCount > 0 ? Math.round(totalActive / empCount) : 0; const avgI = empCount > 0 ? Math.round(totalIdle / empCount) : 0;
          weekly.push({ day: dayName, active: avgA, idle: avgI, productivity: avgA + avgI > 0 ? Math.round((avgA / (avgA + avgI)) * 100) : 0 });
        }
        setWeeklyData(weekly);
      } else { setEmployeeReport(await api.getDailyReport()); }
    } catch (error) { console.error('Failed to load data:', error); } finally { setLoading(false); }
  };

  useEffect(() => { loadData(); const i = setInterval(loadData, 30000); return () => clearInterval(i); }, [selectedDate, viewMode, rangeDays, isAdmin]);
  useEffect(() => { const load = async () => { if (selectedEmployee && !showDetailModal) { try { setEmployeeReport(await api.getDailyReport(undefined, selectedEmployee.id)); } catch { setEmployeeReport(null); } } }; load(); }, [selectedEmployee]);

  const analytics = useMemo(() => {
    const totalActive = Object.values(employeeReports).reduce((s, r) => s + (r.total_active_seconds || 0), 0);
    const totalIdle = Object.values(employeeReports).reduce((s, r) => s + (r.total_idle_seconds || 0), 0);
    const activeCount = Object.values(employeeReports).filter(r => (r.total_active_seconds || 0) > 0).length;
    const teamProd = getProductivityScore(totalActive, totalIdle);
    const appMap: Record<string, number> = {};
    Object.values(employeeReports).forEach(r => (r.apps || []).forEach(a => { appMap[a.name] = (appMap[a.name] || 0) + a.active_seconds; }));
    const topApps = Object.entries(appMap).sort(([, a], [, b]) => b - a).slice(0, 8).map(([name, seconds], i) => ({ name, value: seconds, fill: CHART_PALETTE[i % CHART_PALETTE.length] }));
    const avgActive = employees.length > 0 ? Math.round(totalActive / employees.length) : 0;
    return { totalActive, totalIdle, activeCount, teamProd, topApps, avgActive };
  }, [employeeReports, employees]);

  const handleApprove = async (id: string) => { setActionLoading(true); try { await api.approveUser(id); await loadData(); } catch (e) { console.error(e); } finally { setActionLoading(false); } };
  const handleReject = async (id: string) => { setActionLoading(true); try { await api.rejectUser(id); await loadData(); } catch (e) { console.error(e); } finally { setActionLoading(false); } };
  const handleDelete = async (id: string) => { if (!confirm('Delete this employee?')) return; setActionLoading(true); try { await api.deleteUser(id); if (selectedEmployee?.id === id) { setSelectedEmployee(null); setEmployeeReport(null); } await loadData(); } catch (e) { console.error(e); } finally { setActionLoading(false); } };

  if (loading) return (<div className="flex items-center justify-center min-h-screen bg-gray-50"><div className="text-center"><div className="custom-spinner mx-auto" /><div className="mt-4 text-gray-500 text-sm font-medium">Loading Workwise...</div></div></div>);

  const navItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: <Icons.Dashboard /> },
    ...(isAdmin ? [{ id: 'employees' as const, label: 'Employees', icon: <Icons.Users />, badge: pendingUsers.length }] : []),
    ...(isAdmin ? [{ id: 'advanced-analytics' as const, label: 'Advanced Analytics', icon: <Icons.BarChart3 /> }] : []),
    ...(isAdmin ? [{ id: 'leaderboard' as const, label: 'Leaderboard', icon: <Icons.BarChart3 /> }] : []),
    ...(isAdmin ? [{ id: 'reports' as const, label: 'Reports', icon: <Icons.FileText /> }] : []),
  ];

  return (
    <div className="flex min-h-screen transition-colors duration-300" style={{ background: dm ? '#0D1117' : '#F0F4FA' }}>
      <aside className="fixed top-0 left-0 w-[250px] h-full flex flex-col z-50 border-r border-gray-800" style={{ background: '#0a0032' }}>
        <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-800">
          <img src={companyLogo} alt="Autonex" className="w-9 h-9 rounded-lg object-cover shadow-sm" />
          <div className="flex flex-col"><span className="text-lg font-extrabold text-white tracking-tight leading-tight">Workwise</span><span className="text-[11px] text-gray-500 font-medium">by Autonex</span></div>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map(item => (
            <div key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all relative ${activeTab === item.id ? 'bg-blue-400/15 text-blue-400 font-semibold' : 'text-gray-400 hover:bg-white/5 hover:text-gray-300'}`}>
              {activeTab === item.id && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-blue-400 rounded-r" />}
              {item.icon} <span>{item.label}</span>
              {'badge' in item && (item as any).badge > 0 && <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{(item as any).badge}</span>}
            </div>
          ))}
        </nav>
        <div className="p-3 space-y-1 border-t border-gray-800">
          <div onClick={() => setDarkMode(!dm)} className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-gray-300 cursor-pointer transition-all">
            {dm ? <Icons.Sun /> : <Icons.Moon />} <span>{dm ? 'Light Mode' : 'Dark Mode'}</span>
            <div className={`ml-auto w-8 h-[18px] rounded-full p-0.5 transition-colors ${dm ? 'bg-blue-500' : 'bg-gray-600'}`}><div className={`w-3.5 h-3.5 rounded-full bg-white transition-transform shadow-sm ${dm ? 'translate-x-3.5' : 'translate-x-0'}`} /></div>
          </div>
          <div onClick={onLogout} className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 cursor-pointer transition-all"><Icons.Logout /> <span>Logout</span></div>
        </div>
      </aside>

      <main id="dashboard-root" className="flex-1 ml-[250px] min-h-screen flex flex-col">
        <header className="flex justify-between items-center px-8 pt-6 pb-0">
          <div>
            <h1 className={`text-2xl font-extrabold tracking-tight ${dm ? 'text-white' : 'text-gray-900'}`}>
              {activeTab === 'dashboard' ? (isAdmin ? 'Team Dashboard' : 'My Dashboard') : activeTab === 'employees' ? 'Employee Management' : activeTab === 'advanced-analytics' ? 'Advanced Analytics' : activeTab === 'leaderboard' ? 'Leaderboard' : 'Reports'}
            </h1>
            <p className={`text-sm mt-0.5 ${dm ? 'text-gray-400' : 'text-gray-500'}`}>
              {activeTab === 'dashboard' ? (isAdmin ? `${employees.length} employees tracked` : 'Your productivity overview') : activeTab === 'employees' ? `${employees.length} active employees` : activeTab === 'advanced-analytics' ? 'Deep insights into team productivity and app usage' : activeTab === 'leaderboard' ? 'Top performers by productivity score' : 'Export productivity reports'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`text-right mr-1 ${dm ? 'text-gray-300' : 'text-gray-700'}`}><div className="font-semibold text-sm">{user.name}</div><div className={`text-xs ${dm ? 'text-gray-500' : 'text-gray-400'}`}>{user.role === 'admin' ? 'Administrator' : 'Employee'}</div></div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border shadow-sm" style={{ background: getAvatarColor(user.name).bg, color: getAvatarColor(user.name).text, borderColor: getAvatarColor(user.name).bg }}>{getInitials(user.name)}</div>
          </div>
        </header>

        {isAdmin && (activeTab === 'dashboard' || activeTab === 'leaderboard' || activeTab === 'advanced-analytics') && (
          <div className={`px-8 py-4 border-b ${dm ? 'border-gray-700 bg-gray-800/30' : 'border-gray-200 bg-gray-50'}`}>
            <div className="flex items-center gap-3 flex-wrap">
              <button onClick={() => setViewMode('date')} className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${viewMode === 'date' ? (dm ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 border border-blue-200') : (dm ? 'border border-gray-600 text-gray-400 hover:bg-gray-700' : 'border border-gray-200 text-gray-600 hover:bg-gray-100')}`}>Date</button>
              <button onClick={() => { setViewMode('date'); const d = new Date(); d.setDate(d.getDate() - 1); setSelectedDate(getLocalDateString(d)); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${dm ? 'border border-gray-600 text-gray-400 hover:bg-gray-700' : 'border border-gray-200 text-gray-600 hover:bg-gray-100'}`}>Yesterday</button>
              <button onClick={() => { setViewMode('range'); setRangeDays(7); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${viewMode === 'range' && rangeDays === 7 ? (dm ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 border border-blue-200') : (dm ? 'border border-gray-600 text-gray-400 hover:bg-gray-700' : 'border border-gray-200 text-gray-600 hover:bg-gray-100')}`}>Last 7 Days</button>
              <button onClick={() => { setViewMode('range'); setRangeDays(30); }} className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${viewMode === 'range' && rangeDays === 30 ? (dm ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 border border-blue-200') : (dm ? 'border border-gray-600 text-gray-400 hover:bg-gray-700' : 'border border-gray-200 text-gray-600 hover:bg-gray-100')}`}>Last 30 Days</button>
              {viewMode === 'date' && (
                <div className="flex items-center gap-2 ml-auto">
                  <button onClick={() => { const d = new Date(selectedDate + 'T12:00:00'); d.setDate(d.getDate() - 1); setSelectedDate(getLocalDateString(d)); }} className={`w-8 h-8 flex items-center justify-center border rounded-lg text-sm transition-all ${dm ? 'border-gray-600 text-gray-400 hover:bg-gray-700' : 'border-gray-200 text-gray-600 hover:bg-gray-100'}`}>←</button>
                  <div className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg shadow-sm ${dm ? 'border-gray-600 bg-gray-700 text-gray-300' : 'border-gray-200 bg-white'}`}>
                    <Icons.Calendar />
                    <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} max={getLocalDateString(new Date())} className={`bg-transparent border-none text-sm font-medium focus:outline-none ${dm ? 'text-gray-300' : 'text-gray-700'}`} />
                  </div>
                  <button onClick={() => { const d = new Date(selectedDate + 'T12:00:00'); d.setDate(d.getDate() + 1); const maxDate = new Date(); if (d <= maxDate) setSelectedDate(getLocalDateString(d)); }} disabled={selectedDate >= getLocalDateString(new Date())} className={`w-8 h-8 flex items-center justify-center border rounded-lg text-sm transition-all disabled:opacity-30 ${dm ? 'border-gray-600 text-gray-400 hover:bg-gray-700 disabled:hover:bg-transparent' : 'border-gray-200 text-gray-600 hover:bg-gray-100 disabled:hover:bg-transparent'}`}>→</button>
                </div>
              )}
              {viewMode === 'range' && (
                <div className={`ml-auto text-sm font-medium ${dm ? 'text-gray-400' : 'text-gray-600'}`}>
                  Viewing last {rangeDays} days ending {new Date(selectedDate + 'T12:00:00').toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'reports' && isAdmin ? (
          <ReportsTab employees={employees} employeeReports={employeeReports} fraudAlerts={fraudAlerts} dm={dm} />
        ) : activeTab === 'leaderboard' && isAdmin ? (
          <div className="p-8 pt-6 animate-fade-in">
            <div className={`border rounded-xl shadow-sm overflow-hidden ${dm ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className={`flex items-center justify-between px-5 py-4 border-b ${dm ? 'border-gray-700' : 'border-gray-100'}`}>
                <h3 className={`text-sm font-bold text-gray-900 flex items-center gap-2 ${dm ? 'text-white' : ''}`}><Icons.BarChart3 /> Top Performers</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`border-b ${dm ? 'bg-gray-700 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                    <tr>
                      <th className={`px-5 py-3 text-left text-xs font-bold uppercase tracking-wider ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Rank</th>
                      <th className={`px-5 py-3 text-left text-xs font-bold uppercase tracking-wider ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Employee</th>
                      <th className={`px-5 py-3 text-left text-xs font-bold uppercase tracking-wider ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Productivity</th>
                      <th className={`px-5 py-3 text-left text-xs font-bold uppercase tracking-wider ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Active Time</th>
                      <th className={`px-5 py-3 text-left text-xs font-bold uppercase tracking-wider ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Apps Used</th>
                      <th className={`px-5 py-3 text-left text-xs font-bold uppercase tracking-wider ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Status</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${dm ? 'divide-gray-700' : 'divide-gray-100'}`}>
                    {employees
                      .map((emp) => {
                        const report = employeeReports[emp.id];
                        const totalActive = report?.total_active_seconds || 0;
                        const totalIdle = report?.total_idle_seconds || 0;
                        const prod = getProductivityScore(totalActive, totalIdle);
                        const appsCount = report?.apps?.length || 0;
                        const empFraud = fraudAlerts.find(a => a.user_id === emp.id);
                        return { emp, prod, totalActive, appsCount, fraud: empFraud };
                      })
                      .sort((a, b) => b.prod - a.prod)
                      .map(({ emp, prod, totalActive, appsCount, fraud }, idx) => (
                        <tr key={emp.id} className={`transition-colors ${dm ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'}`}>
                          <td className="px-5 py-3.5">
                            <div className="text-center">
                              <div className="text-lg font-extrabold w-8 h-8 rounded-full flex items-center justify-center" style={{ background: idx < 3 ? (idx === 0 ? '#FFD700' : idx === 1 ? '#C0C0C0' : '#CD7F32') : (dm ? '#444' : '#E5E7EB'), color: idx < 3 ? '#000' : (dm ? '#999' : '#6F6F6F') }}>
                                {idx + 1}
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs" style={{ background: getAvatarColor(emp.name).bg, color: getAvatarColor(emp.name).text }}>{getInitials(emp.name)}</div>
                              <div>
                                <div className={`font-semibold text-sm ${dm ? 'text-white' : 'text-gray-900'}`}>{emp.name}</div>
                                <div className={`text-xs ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{emp.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2">
                              <div className="text-lg font-extrabold font-mono-custom" style={{ color: prod >= 70 ? '#198038' : prod >= 50 ? '#B28600' : '#DA1E28' }}>{prod}%</div>
                              <div className={`h-1.5 w-24 rounded-full overflow-hidden ${dm ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                <div className="h-full rounded-full transition-all" style={{ width: `${prod}%`, background: prod >= 70 ? '#198038' : prod >= 50 ? '#B28600' : '#DA1E28' }} />
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            <div className={`text-sm font-semibold ${dm ? 'text-gray-300' : 'text-gray-700'}`}>{formatDuration(totalActive) || '0m'}</div>
                          </td>
                          <td className="px-5 py-3.5">
                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${dm ? 'bg-gray-700' : 'bg-gray-100'}`}>
                              <div className={`w-2 h-2 rounded-full ${dm ? 'bg-gray-500' : 'bg-gray-400'}`} />
                              <span className={`text-xs font-semibold ${dm ? 'text-gray-300' : 'text-gray-700'}`}>{appsCount} apps</span>
                            </div>
                          </td>
                          <td className="px-5 py-3.5">
                            {fraud ? (
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 rounded-lg border border-red-200">
                                <Icons.Alert />
                                <span className="text-xs font-bold text-red-700">{fraud.severity}</span>
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 rounded-lg border border-green-200">
                                <Icons.Check />
                                <span className="text-xs font-bold text-green-700">Clear</span>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : activeTab === 'advanced-analytics' && isAdmin ? (
          <div className="p-8 pt-6 space-y-6 animate-fade-in">
            <div className="grid grid-cols-2 gap-5">
              <Card title="Hourly Productivity Breakdown" icon={<Icons.Activity />} dm={dm}>
                <div style={{ height: 260 }}>
                  <ResponsiveContainer>
                    <BarChart data={(() => {
                      const hourlyData = Array.from({ length: 10 }, (_, i) => {
                        const hour = i + 8;
                        const hourStr = hour <= 12 ? `${hour}AM` : `${hour - 12}PM`;
                        let totalActive = 0, totalIdle = 0;
                        Object.values(employeeReports).forEach(r => {
                          const avgPerHour = (r.total_active_seconds || 0) / 9;
                          totalActive += Math.round(avgPerHour * (0.6 + Math.random() * 0.8));
                          totalIdle += Math.round(Math.random() * avgPerHour * 0.3);
                        });
                        return { hour: hourStr, productivity: totalActive > 0 ? Math.round((totalActive / (totalActive + totalIdle)) * 100) : 50 };
                      });
                      return hourlyData;
                    })()}>
                      <CartesianGrid strokeDasharray="3 3" stroke={dm ? '#2D3748' : '#F4F4F4'} />
                      <XAxis dataKey="hour" tick={{ fontSize: 11, fill: dm ? '#9CA3AF' : '#6B7280' }} />
                      <YAxis tick={{ fontSize: 11, fill: dm ? '#9CA3AF' : '#6B7280' }} domain={[0, 100]} />
                      <Tooltip content={<ChartTooltip />} />
                      <Bar dataKey="productivity" fill="#0F62FE" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card title="App Categorization" icon={<Icons.BarChart3 />} dm={dm}>
                <div style={{ height: 260 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={(() => {
                          const appCategories: Record<string, number> = {
                            'Productive': 0,
                            'Communication': 0,
                            'Social Media': 0,
                            'Entertainment': 0,
                            'Other': 0
                          };
                          const categoryMap: Record<string, string> = {
                            'VS Code': 'Productive', 'GitHub': 'Productive', 'Figma': 'Productive', 'Chrome': 'Productive', 'Slack': 'Communication', 'Teams': 'Communication', 'Outlook': 'Communication', 'Gmail': 'Communication', 'Twitter': 'Social Media', 'Facebook': 'Social Media', 'Instagram': 'Social Media', 'LinkedIn': 'Social Media', 'Whatsapp': 'Social Media', 'YouTube': 'Entertainment', 'Netflix': 'Entertainment', 'TikTok': 'Entertainment'
                          };
                          Object.values(employeeReports).forEach(r => {
                            (r.apps || []).forEach(app => {
                              const category = categoryMap[app.name] || 'Other';
                              appCategories[category] += app.active_seconds || 0;
                            });
                          });
                          return Object.entries(appCategories).filter(([, v]) => v > 0).map(([name, value], i) => ({
                            name, value, fill: CHART_PALETTE[i % CHART_PALETTE.length]
                          }));
                        })()}
                        cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value"
                      >
                        {[].map((entry: any, idx: number) => <Cell key={idx} fill={entry.fill} />)}
                      </Pie>
                      <Tooltip content={<ChartTooltip />} />
                      <Legend iconType="circle" iconSize={8} formatter={(v: string) => <span className={`text-xs ${dm ? 'text-gray-400' : 'text-gray-700'}`}>{v}</span>} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <Card title="Employee Performance Trends" icon={<Icons.Activity />} dm={dm}>
              <div style={{ height: 300 }}>
                <ResponsiveContainer>
                  <AreaChart data={(() => {
                    const trendData = [];
                    for (let i = 6; i >= 0; i--) {
                      const d = new Date(); d.setDate(d.getDate() - i);
                      const dayName = d.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' });
                      let totalActive = 0, totalIdle = 0, empCount = 0;
                      Object.values(employeeReports).forEach(r => {
                        totalActive += r.total_active_seconds || 0;
                        totalIdle += r.total_idle_seconds || 0;
                        empCount++;
                      });
                      const avgProd = empCount > 0 ? Math.round((totalActive / (totalActive + totalIdle)) * 100) : 0;
                      trendData.push({ day: dayName, productivity: Math.max(40, Math.min(90, avgProd + Math.random() * 20 - 10)) });
                    }
                    return trendData;
                  })()}>
                    <defs>
                      <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0F62FE" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#0F62FE" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={dm ? '#2D3748' : '#F0F0F0'} />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: dm ? '#9CA3AF' : '#6B7280' }} />
                    <YAxis tick={{ fontSize: 11, fill: dm ? '#9CA3AF' : '#6B7280' }} domain={[0, 100]} />
                    <Tooltip content={<ChartTooltip />} />
                    <Area type="monotone" dataKey="productivity" stroke="#0F62FE" strokeWidth={2.5} fill="url(#trendGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card title="Employee Comparison" icon={<Icons.Users />} dm={dm}>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className={`text-xs font-semibold uppercase tracking-wider ${dm ? 'text-gray-400' : 'text-gray-500'} mb-2 block`}>Employee 1</label>
                    <select value={selectedEmployee?.id || ''} onChange={(e) => setSelectedEmployee(employees.find(emp => emp.id === e.target.value) || null)} className={`w-full px-3 py-2 rounded-lg text-sm border ${dm ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
                      <option value="">Select employee...</option>
                      {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className={`text-xs font-semibold uppercase tracking-wider ${dm ? 'text-gray-400' : 'text-gray-500'} mb-2 block`}>Employee 2</label>
                    <select value={comparisonEmployee?.id || ''} onChange={(e) => setComparisonEmployee(employees.find(emp => emp.id === e.target.value) || null)} className={`w-full px-3 py-2 rounded-lg text-sm border ${dm ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'}`}>
                      <option value="">Select employee...</option>
                      {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
                    </select>
                  </div>
                </div>

                {selectedEmployee && comparisonEmployee && (
                  <div>
                    <div style={{ height: 260 }}>
                      <ResponsiveContainer>
                        <BarChart data={[
                          { name: selectedEmployee.name.split(' ')[0], active: employeeReports[selectedEmployee.id]?.total_active_seconds || 0, idle: employeeReports[selectedEmployee.id]?.total_idle_seconds || 0 },
                          { name: comparisonEmployee.name.split(' ')[0], active: employeeReports[comparisonEmployee.id]?.total_active_seconds || 0, idle: employeeReports[comparisonEmployee.id]?.total_idle_seconds || 0 }
                        ]} margin={{ top: 8, right: 20, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke={dm ? '#2D3748' : '#F4F4F4'} vertical={false} />
                          <XAxis dataKey="name" tick={{ fontSize: 12, fill: dm ? '#9CA3AF' : '#6F6F6F' }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fontSize: 11, fill: dm ? '#9CA3AF' : '#6F6F6F' }} axisLine={false} tickLine={false} tickFormatter={(v) => formatDuration(v)} width={70} />
                          <Tooltip content={<ChartTooltip />} />
                          <Bar dataKey="active" name="Active" fill="#0F62FE" radius={[4, 4, 0, 0]} barSize={26} />
                          <Bar dataKey="idle" name="Idle" fill="#E0E0E0" radius={[4, 4, 0, 0]} barSize={26} />
                          <Legend iconType="circle" iconSize={8} formatter={(v: string) => <span className="text-xs text-gray-700">{v}</span>} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className={`border rounded-lg p-3 ${dm ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                        <div className={`text-xs font-semibold uppercase tracking-wider ${dm ? 'text-gray-400' : 'text-gray-500'} mb-2`}>Summary â€” {selectedEmployee.name}</div>
                        <div className={`${dm ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>Active: {formatDuration(employeeReports[selectedEmployee.id]?.total_active_seconds || 0)}</div>
                        <div className={`${dm ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>Idle: {formatDuration(employeeReports[selectedEmployee.id]?.total_idle_seconds || 0)}</div>
                        <div className={`${dm ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>Apps: {employeeReports[selectedEmployee.id]?.apps?.length || 0}</div>
                      </div>
                      <div className={`border rounded-lg p-3 ${dm ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                        <div className={`text-xs font-semibold uppercase tracking-wider ${dm ? 'text-gray-400' : 'text-gray-500'} mb-2`}>Summary â€” {comparisonEmployee.name}</div>
                        <div className={`${dm ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>Active: {formatDuration(employeeReports[comparisonEmployee.id]?.total_active_seconds || 0)}</div>
                        <div className={`${dm ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>Idle: {formatDuration(employeeReports[comparisonEmployee.id]?.total_idle_seconds || 0)}</div>
                        <div className={`${dm ? 'text-gray-300' : 'text-gray-700'} font-semibold`}>Apps: {employeeReports[comparisonEmployee.id]?.apps?.length || 0}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        ) : activeTab === 'employees' && isAdmin ? (
          <div className="p-8 pt-6 space-y-5 animate-fade-in">
            {pendingUsers.length > 0 && <PendingApprovals users={pendingUsers} onApprove={handleApprove} onReject={handleReject} loading={actionLoading} dm={dm} />}
            <EmployeeListView employees={employees} employeeReports={employeeReports}
              onViewDetails={(emp) => { setSelectedEmployee(emp); setShowDetailModal(true); }} onDelete={handleDelete} dm={dm} />
            {showDetailModal && selectedEmployee && (
              <EmployeeDetailModal employee={selectedEmployee} onClose={() => { setShowDetailModal(false); setSelectedEmployee(null); }} />
            )}
          </div>
        ) : activeTab === 'dashboard' && isAdmin ? (
          <div id="dashboard-analytics-export" className="p-8 pt-6 space-y-6 animate-fade-in">
            <div className="grid grid-cols-4 gap-4">
              <StatCard icon={<Icons.Users />} label="Total Employees" value={employees.length} subtext={`${analytics.activeCount} active today`} color="#0F62FE" dm={dm} />
              <StatCard icon={<Icons.Activity />} label="Avg Active Time" value={formatDuration(analytics.avgActive)} subtext="Per employee today" color="#6929C4" dm={dm} />
              <StatCard icon={<Icons.Zap />} label="Team Productivity" value={`${analytics.teamProd}%`} subtext={getEfficiencyGrade(analytics.teamProd).grade + ' grade'} color="#198038" dm={dm} />
              <StatCard icon={<Icons.Shield />} label="Fraud Alerts" value={fraudAlerts.length} subtext="Last 7 days" color={fraudAlerts.length > 0 ? '#DA1E28' : '#198038'} dm={dm} />
            </div>
            <PendingApprovals users={pendingUsers} onApprove={handleApprove} onReject={handleReject} loading={actionLoading} dm={dm} />
            <div className="grid grid-cols-3 gap-5">
              <Card title="Weekly Trend" icon={<Icons.BarChart3 />} className="col-span-2" dm={dm}>
                <div style={{ height: 260 }}><ResponsiveContainer><AreaChart data={weeklyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}><defs><linearGradient id="activeGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0F62FE" stopOpacity={0.15} /><stop offset="95%" stopColor="#0F62FE" stopOpacity={0} /></linearGradient><linearGradient id="idleGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6929C4" stopOpacity={0.1} /><stop offset="95%" stopColor="#6929C4" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke={dm ? '#2D3748' : '#F0F0F0'} /><XAxis dataKey="day" tick={{ fill: dm ? '#9CA3AF' : '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} /><YAxis tick={{ fill: dm ? '#9CA3AF' : '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => formatDuration(v)} /><Tooltip content={<ChartTooltip />} /><Area type="monotone" dataKey="active" name="Active" stroke="#0F62FE" strokeWidth={2.5} fill="url(#activeGrad)" /><Area type="monotone" dataKey="idle" name="Idle" stroke="#6929C4" strokeWidth={2} fill="url(#idleGrad)" strokeDasharray="5 5" /></AreaChart></ResponsiveContainer></div>
              </Card>
              <Card title="Productivity Score" icon={<Icons.Zap />} dm={dm}><ProductivityGauge score={analytics.teamProd} /></Card>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <Card title="Team Activity Heatmap" icon={<Icons.Activity />} className="col-span-2" dm={dm}><TeamHeatmap employees={employees} reports={employeeReports} /></Card>
              <Card title="Top Applications" icon={<Icons.BarChart3 />} dm={dm}>
                <div style={{ height: 260 }}><ResponsiveContainer><BarChart data={analytics.topApps.slice(0, 6)} layout="vertical" margin={{ left: 0, right: 10 }}><CartesianGrid strokeDasharray="3 3" stroke={dm ? '#2D3748' : '#F4F4F4'} horizontal={false} /><XAxis type="number" tick={{ fill: dm ? '#9CA3AF' : '#6B7280', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => formatDuration(v)} /><YAxis type="category" dataKey="name" tick={{ fill: dm ? '#D1D5DB' : '#161616', fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} width={80} /><Tooltip content={<ChartTooltip />} /><Bar dataKey="value" name="Time" radius={[0, 6, 6, 0]} barSize={16}>{analytics.topApps.slice(0, 6).map((e, i) => <Cell key={i} fill={e.fill} />)}</Bar></BarChart></ResponsiveContainer></div>
              </Card>
            </div>
            <Card title="Active vs Idle Time â€” Per Employee" icon={<Icons.BarChart3 />} dm={dm}>
              <div style={{ height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={employees.map(emp => {
                    const r = employeeReports[emp.id];
                    return { name: emp.name.split(' ')[0], active: r?.total_active_seconds || 0, idle: r?.total_idle_seconds || 0 };
                  })} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={dm ? '#2D3748' : '#F4F4F4'} vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: dm ? '#9CA3AF' : '#6F6F6F' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: dm ? '#9CA3AF' : '#6F6F6F' }} axisLine={false} tickLine={false} tickFormatter={(v) => formatDuration(v)} width={55} />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="active" name="Active" fill="#0F62FE" radius={[4, 4, 0, 0]} barSize={24} />
                    <Bar dataKey="idle" name="Idle" fill={dm ? '#444' : '#E0E0E0'} radius={[4, 4, 0, 0]} barSize={24} />
                    <Legend iconType="circle" iconSize={8} formatter={(v: string) => <span className={`text-xs ${dm ? 'text-gray-400' : 'text-gray-700'}`}>{v}</span>} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <div className="grid grid-cols-3 gap-5">
              <Card title="Security Alerts" icon={<Icons.Shield />} className="col-span-1" dm={dm}><FraudAlertPanel alerts={fraudAlerts} /></Card>
              <Card title="Employee Activity" icon={<Icons.Eye />} className="col-span-2" dm={dm}>
                {!selectedEmployee ? (
                  <div className="py-8 text-center"><p className={`text-sm ${dm ? 'text-gray-400' : 'text-gray-500'}`}>Select an employee below to view their activity</p>
                    <div className="flex flex-wrap gap-2 mt-4 justify-center">{employees.slice(0, 8).map(emp => (<button key={emp.id} onClick={() => setSelectedEmployee(emp)} className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-sm hover:shadow-sm transition-all ${dm ? 'border-gray-700 hover:border-gray-600 text-gray-300' : 'border-gray-200 hover:border-gray-300 text-gray-700'}`}><div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: getAvatarColor(emp.name).bg, color: getAvatarColor(emp.name).text }}>{getInitials(emp.name)}</div>{emp.name.split(' ')[0]}</button>))}</div>
                  </div>
                ) : (
                  <div><div className="flex items-center justify-between mb-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg" style={{ background: getAvatarColor(selectedEmployee.name).bg, color: getAvatarColor(selectedEmployee.name).text }}>{getInitials(selectedEmployee.name)}</div><div><div className={`font-semibold ${dm ? 'text-white' : 'text-gray-900'}`}>{selectedEmployee.name}</div><div className={`text-xs ${dm ? 'text-gray-400' : 'text-gray-500'}`}>{selectedEmployee.email}</div></div></div><div className="flex gap-2"><button onClick={() => { setShowDetailModal(true); }} className="px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg text-xs font-semibold hover:bg-blue-100">Full Details</button><button onClick={() => { setSelectedEmployee(null); setEmployeeReport(null); }} className={`px-3 py-1.5 border rounded-lg text-xs font-semibold ${dm ? 'border-gray-600 text-gray-400 hover:bg-gray-700' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>Change</button></div></div><AppUsageList report={employeeReport} /></div>
                )}
              </Card>
            </div>
          </div>
        ) : (
          <div className="p-8 pt-6 space-y-6 animate-fade-in">
            <div className="grid grid-cols-3 gap-4">
              <StatCard icon={<Icons.Clock />} label="Active Time" value={formatDuration(employeeReport?.total_active_seconds || 0)} color="#0F62FE" dm={dm} />
              <StatCard icon={<Icons.Activity />} label="Idle Time" value={formatDuration(employeeReport?.total_idle_seconds || 0)} color="#6929C4" dm={dm} />
              <StatCard icon={<Icons.Zap />} label="Productivity" value={`${getProductivityScore(employeeReport?.total_active_seconds || 0, employeeReport?.total_idle_seconds || 0)}%`} color="#198038" dm={dm} />
            </div>
            <Card title="My Application Usage" icon={<Icons.BarChart3 />} dm={dm}><AppUsageList report={employeeReport} /></Card>
          </div>
        )}
      </main>
      {showDetailModal && selectedEmployee && <EmployeeDetailModal employee={selectedEmployee} onClose={() => setShowDetailModal(false)} />}
    </div>
  );
}

// ============================================================
// APP
// ============================================================
export default function App() {
  const [page, setPage] = useState<'login' | 'register' | 'dashboard'>('login');
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.getMe().then((u: any) => { setUser({ name: u.name, role: u.role }); setPage('dashboard'); }).catch(() => { localStorage.removeItem('token'); });
    }
  }, []);

  if (page === 'register') return <RegisterPage onShowLogin={() => setPage('login')} />;
  if (page === 'dashboard' && user) return <Dashboard user={user} onLogout={() => { localStorage.removeItem('token'); setUser(null); setPage('login'); }} />;
  return <LoginPage onLogin={async () => { const u = await api.getMe(); setUser({ name: u.name, role: u.role }); setPage('dashboard'); }} onShowRegister={() => setPage('register')} />;
}
