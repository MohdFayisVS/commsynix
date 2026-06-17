import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ShieldAlert, Terminal, Lock, User } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin-portal-login")({
  head: () => ({
    meta: [
      { title: "Gateway Access Login — COMMSYNIX" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [bootText, setBootText] = useState<string[]>([]);

  useEffect(() => {
    // Check if already authenticated
    if (sessionStorage.getItem("commsynix_admin_auth") === "true") {
      navigate({ to: "/admin-portal" });
      return;
    }

    const lines = [
      "INITIALIZING COMMSYNIX SECURITY LAYER...",
      "ESTABLISHING SECURE CONNECTION PROTOCOL...",
      "AUTHENTICATION GATEWAY READY.",
      "AWAITING OPERATOR CREDENTIALS..."
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < lines.length) {
        setBootText((prev) => [...prev, lines[current]]);
        current++;
      } else {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (email === "admin@commsynix.com" && password === "SynixSecure2026!") {
        sessionStorage.setItem("commsynix_admin_auth", "true");
        toast.success("Access Granted. Initializing console...");
        setTimeout(() => {
          navigate({ to: "/admin-portal" });
        }, 800);
      } else {
        toast.error("ACCESS DENIED. INVALID CREDENTIALS.");
        setBootText((prev) => [...prev, "AUTHENTICATION FAILURE: INVALID SIGNATURE LOGGED."]);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0A0D10] text-[#00E5FF] font-mono flex items-center justify-center p-4">
      {/* SCANLINE EFFECT */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-40" />

      <div className="w-full max-w-md bg-[#0F1317]/90 border border-[#00E5FF]/30 p-6 rounded-sm shadow-[0_0_30px_rgba(0,229,255,0.1)] relative overflow-hidden">
        {/* CORNER DETAILS */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#00E5FF]" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#00E5FF]" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#00E5FF]" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#00E5FF]" />

        {/* TERMINAL HEADER */}
        <div className="flex items-center justify-between pb-4 border-b border-[#00E5FF]/20 mb-6 text-[10px] uppercase tracking-widest text-[#00E5FF]/60">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-[#00E5FF] animate-pulse" />
            <span>Synix secure gateway v2.26</span>
          </div>
          <span>SECURE PORT: 443</span>
        </div>

        {/* BOOT LOG PANEL */}
        <div className="bg-black/40 border border-[#00E5FF]/10 rounded-sm p-4 h-32 overflow-y-auto mb-6 text-[11px] leading-relaxed space-y-1 text-[#00E5FF]/70 custom-scrollbar">
          {bootText.map((line, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="text-[#00E5FF]/40">&gt;&gt;</span>
              <span>{line}</span>
            </div>
          ))}
          <div className="terminal-cursor h-4 w-1 inline-block" />
        </div>

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider text-[#00E5FF]/60 flex items-center gap-1.5">
              <User size={12} /> Operator Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="operator@commsynix.com"
              className="w-full bg-black/60 border border-[#00E5FF]/30 focus:border-[#00E5FF] outline-none px-4 py-2.5 rounded-sm text-sm text-[#00E5FF] placeholder-[#00E5FF]/30 transition-all font-mono"
            />
            <span className="text-[9px] text-[#00E5FF]/40 block">Demo: admin@commsynix.com</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-wider text-[#00E5FF]/60 flex items-center gap-1.5">
              <Lock size={12} /> Access Passphrase
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••••"
              className="w-full bg-black/60 border border-[#00E5FF]/30 focus:border-[#00E5FF] outline-none px-4 py-2.5 rounded-sm text-sm text-[#00E5FF] placeholder-[#00E5FF]/30 transition-all font-mono"
            />
            <span className="text-[9px] text-[#00E5FF]/40 block">Demo: SynixSecure2026!</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00E5FF]/10 border border-[#00E5FF] hover:bg-[#00E5FF] hover:text-black py-2.5 text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.05)] hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]"
          >
            {loading ? "VERIFYING PASSKEY..." : "REQUEST CONSOLE ACCESS"}
          </button>
        </form>

        <div className="mt-6 text-center text-[9px] text-[#00E5FF]/40 border-t border-[#00E5FF]/10 pt-4 flex items-center justify-center gap-1.5">
          <ShieldAlert size={10} />
          <span>UNAUTHORIZED ACCESS ATTEMPTS WILL BE SHUNTED & REPORTED</span>
        </div>
      </div>
    </div>
  );
}
