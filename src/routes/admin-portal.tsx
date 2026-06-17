import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ShieldAlert, LogOut, Users, Image, FolderKanban, Trash2, Edit, Plus, FileSpreadsheet, X, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin-portal")({
  head: () => ({
    meta: [
      { title: "Control Console Dashboard — COMMSYNIX" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboardPage,
});

interface Lead {
  id: string;
  type: "estimator" | "contact";
  name: string;
  email: string;
  phone: string;
  company?: string;
  market?: string;
  scopes?: string[];
  description: string;
  timeline?: string;
  date: string;
  status: string;
}

interface Partner {
  id: string;
  name: string;
  logoUrl: string;
}

interface Project {
  id: string;
  title: string;
  category: string;
  imgUrl: string;
  description: string;
}

const DEFAULT_PARTNERS: Partner[] = [
  { id: "p-1", name: "Crestron", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Crestron_logo.svg" },
  { id: "p-2", name: "AMX", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Harman_International_Industries_logo.svg" },
  { id: "p-3", name: "Extron", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/07/Extron_logo.svg" },
  { id: "p-4", name: "Control4", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Control4_logo.svg" },
  { id: "p-5", name: "Q-SYS", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/30/QSC_Audio_Products_logo.svg" },
];

const DEFAULT_PROJECTS = [
  { id: "proj-1", title: "Mission Command Center", category: "AV", imgUrl: "/src/assets/portfolio-1.jpg", description: "High-density command center video wall installation." },
  { id: "proj-2", title: "Executive Boardroom", category: "AV", imgUrl: "/src/assets/portfolio-2.jpg", description: "Interactive executive boardroom with Q-SYS audio integration." },
  { id: "proj-3", title: "Edge Data Facility", category: "Networking", imgUrl: "/src/assets/portfolio-3.jpg", description: "Structured cabling backbone and data racks." },
  { id: "proj-4", title: "Residential Automation", category: "Automation", imgUrl: "/src/assets/portfolio-4.jpg", description: "Luxury home lighting, climate, and security loops." },
];

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"leads" | "partners" | "portfolio">("leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  // Dialog state
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [partnerName, setPartnerName] = useState("");
  const [partnerLogo, setPartnerLogo] = useState("");

  const [showProjModal, setShowProjModal] = useState(false);
  const [editingProj, setEditingProj] = useState<Project | null>(null);
  const [projTitle, setProjTitle] = useState("");
  const [projCategory, setProjCategory] = useState("AV");
  const [projImg, setProjImg] = useState("");
  const [projDesc, setProjDesc] = useState("");

  useEffect(() => {
    // Authentication Check
    if (sessionStorage.getItem("commsynix_admin_auth") !== "true") {
      navigate({ to: "/admin-portal-login" });
      return;
    }

    // Load Leads
    const savedLeads = localStorage.getItem("commsynix_leads");
    if (savedLeads) {
      setLeads(JSON.parse(savedLeads));
    } else {
      // Seed default lead if empty for demo
      const seed: Lead[] = [
        {
          id: "seed-1",
          type: "estimator",
          name: "Amit Kumar",
          email: "amit.kumar@techglobal.in",
          phone: "+91 98450 12345",
          company: "Tech Global Solutions",
          market: "commercial",
          scopes: ["structured_cabling", "cctv_acs"],
          description: "Structured cabling and access control deployment for Chennai branch office.",
          timeline: "urgent",
          date: new Date(Date.now() - 3600000 * 24).toISOString(),
          status: "new",
        },
      ];
      localStorage.setItem("commsynix_leads", JSON.stringify(seed));
      setLeads(seed);
    }

    // Load Partners
    const savedPartners = localStorage.getItem("commsynix_partners");
    if (savedPartners) {
      setPartners(JSON.parse(savedPartners));
    } else {
      localStorage.setItem("commsynix_partners", JSON.stringify(DEFAULT_PARTNERS));
      setPartners(DEFAULT_PARTNERS);
    }

    // Load Projects
    const savedProjects = localStorage.getItem("commsynix_projects");
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      localStorage.setItem("commsynix_projects", JSON.stringify(DEFAULT_PROJECTS));
      setProjects(DEFAULT_PROJECTS);
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("commsynix_admin_auth");
    toast.success("Logged out successfully");
    navigate({ to: "/admin-portal-login" });
  };

  // Leads Actions
  const handleDeleteLead = (id: string) => {
    const updated = leads.filter((l) => l.id !== id);
    setLeads(updated);
    localStorage.setItem("commsynix_leads", JSON.stringify(updated));
    toast.success("Lead entry removed");
  };

  const handleLeadStatusChange = (id: string, newStatus: string) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l));
    setLeads(updated);
    localStorage.setItem("commsynix_leads", JSON.stringify(updated));
    toast.success("Lead status updated to: " + newStatus);
  };

  const handleExportCSV = () => {
    if (leads.length === 0) {
      toast.error("No lead entries to export");
      return;
    }
    const headers = ["ID", "Type", "Name", "Email", "Phone", "Company", "Market", "Timeline", "Date", "Status"];
    const rows = leads.map((l) => [
      l.id,
      l.type,
      l.name,
      l.email,
      l.phone,
      l.company || "",
      l.market || "",
      l.timeline || "",
      l.date,
      l.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.map(val => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `commsynix_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Leads database exported to CSV");
  };

  // Partner CRUD
  const openPartnerModal = (partner: Partner | null = null) => {
    setEditingPartner(partner);
    if (partner) {
      setPartnerName(partner.name);
      setPartnerLogo(partner.logoUrl);
    } else {
      setPartnerName("");
      setPartnerLogo("");
    }
    setShowPartnerModal(true);
  };

  const savePartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerName || !partnerLogo) {
      toast.error("Please fill out name and logo URL");
      return;
    }

    let updated: Partner[];
    if (editingPartner) {
      updated = partners.map((p) =>
        p.id === editingPartner.id ? { ...p, name: partnerName, logoUrl: partnerLogo } : p
      );
      toast.success("Partner updated successfully");
    } else {
      const newP: Partner = {
        id: "p-" + Date.now(),
        name: partnerName,
        logoUrl: partnerLogo,
      };
      updated = [...partners, newP];
      toast.success("Partner added successfully");
    }

    setPartners(updated);
    localStorage.setItem("commsynix_partners", JSON.stringify(updated));
    setShowPartnerModal(false);
  };

  const handleDeletePartner = (id: string) => {
    const updated = partners.filter((p) => p.id !== id);
    setPartners(updated);
    localStorage.setItem("commsynix_partners", JSON.stringify(updated));
    toast.success("Partner logo removed");
  };

  // Project CRUD
  const openProjModal = (proj: Project | null = null) => {
    setEditingProj(proj);
    if (proj) {
      setProjTitle(proj.title);
      setProjCategory(proj.category);
      setProjImg(proj.imgUrl);
      setProjDesc(proj.description);
    } else {
      setProjTitle("");
      setProjCategory("AV");
      setProjImg("/src/assets/portfolio-1.jpg");
      setProjDesc("");
    }
    setShowProjModal(true);
  };

  const saveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle || !projImg || !projDesc) {
      toast.error("Please fill out all project details");
      return;
    }

    let updated: Project[];
    if (editingProj) {
      updated = projects.map((p) =>
        p.id === editingProj.id
          ? { ...p, title: projTitle, category: projCategory, imgUrl: projImg, description: projDesc }
          : p
      );
      toast.success("Case study updated successfully");
    } else {
      const newProj: Project = {
        id: "proj-" + Date.now(),
        title: projTitle,
        category: projCategory,
        imgUrl: projImg,
        description: projDesc,
      };
      updated = [...projects, newProj];
      toast.success("Case study added to portfolio");
    }

    setProjects(updated);
    localStorage.setItem("commsynix_projects", JSON.stringify(updated));
    setShowProjModal(false);
  };

  const handleDeleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    localStorage.setItem("commsynix_projects", JSON.stringify(updated));
    toast.success("Case study deleted");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* HEADER CONTROL BAR */}
      <header className="border-b border-border/80 bg-card py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--cyan-glow)]" />
          <h1 className="font-heading text-lg uppercase tracking-widest text-foreground flex items-center gap-2">
            Commsynix Control Console <span className="text-xs text-primary font-mono lowercase">/ root</span>
          </h1>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] uppercase tracking-wider bg-destructive/10 border border-destructive/30 hover:bg-destructive hover:text-destructive-foreground text-destructive rounded-sm transition-all cursor-pointer"
        >
          <LogOut size={12} /> Log Out
        </button>
      </header>

      {/* DASHBOARD LAYOUT */}
      <div className="flex-1 grid lg:grid-cols-12">
        {/* SIDEBAR TABS */}
        <aside className="lg:col-span-2 border-r border-border/80 bg-card/50 p-4 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab("leads")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-xs uppercase tracking-wider text-left border transition-all cursor-pointer ${
              activeTab === "leads"
                ? "border-primary/40 bg-primary/5 text-primary shadow-[0_0_10px_rgba(34,211,238,0.02)]"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/35"
            }`}
          >
            <Users size={16} /> Leads Manager
          </button>

          <button
            onClick={() => setActiveTab("partners")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-xs uppercase tracking-wider text-left border transition-all cursor-pointer ${
              activeTab === "partners"
                ? "border-primary/40 bg-primary/5 text-primary shadow-[0_0_10px_rgba(34,211,238,0.02)]"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/35"
            }`}
          >
            <Image size={16} /> Partner Logos
          </button>

          <button
            onClick={() => setActiveTab("portfolio")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-sm text-xs uppercase tracking-wider text-left border transition-all cursor-pointer ${
              activeTab === "portfolio"
                ? "border-primary/40 bg-primary/5 text-primary shadow-[0_0_10px_rgba(34,211,238,0.02)]"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/35"
            }`}
          >
            <FolderKanban size={16} /> Portfolio CMS
          </button>
        </aside>

        {/* MAIN PANEL */}
        <main className="lg:col-span-10 p-6 md:p-8 space-y-6 overflow-x-hidden">
          {/* TAB 1: LEADS MANAGER */}
          {activeTab === "leads" && (
            <div className="space-y-4 animate-fade-up">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading text-xl uppercase tracking-wider text-foreground">
                    Leads Database
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Manage and review contact submissions and dynamic quote configurations.
                  </p>
                </div>
                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider rounded-sm border border-border/80 hover:border-primary hover:text-primary transition-all cursor-pointer"
                >
                  <FileSpreadsheet size={14} /> Export to CSV
                </button>
              </div>

              <div className="border border-border/80 rounded-sm bg-card/30 overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="border-b border-border/80 bg-muted/20 text-[10px] uppercase tracking-wider text-muted-foreground">
                      <th className="p-4">Date / Contact</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Details</th>
                      <th className="p-4">Timeline</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40 text-xs">
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-muted-foreground font-mono">
                          NO LEADS LOGGED IN SECURE MEMORY.
                        </td>
                      </tr>
                    ) : (
                      leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-muted/10 transition-colors">
                          <td className="p-4 space-y-1">
                            <span className="font-semibold text-foreground block">{lead.name}</span>
                            <span className="text-[10px] text-muted-foreground block">{lead.email}</span>
                            <span className="text-[10px] text-muted-foreground block">{lead.phone}</span>
                            {lead.company && (
                              <span className="text-[9px] uppercase tracking-wider text-primary block">{lead.company}</span>
                            )}
                          </td>
                          <td className="p-4">
                            <span
                              className={`text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-sm border ${
                                lead.type === "estimator"
                                  ? "border-primary/40 bg-primary/10 text-primary"
                                  : "border-purple-500/40 bg-purple-500/10 text-purple-400"
                              }`}
                            >
                              {lead.type}
                            </span>
                            {lead.market && (
                              <span className="text-[10px] text-muted-foreground block mt-1 uppercase">
                                {lead.market}
                              </span>
                            )}
                          </td>
                          <td className="p-4 max-w-sm">
                            <p className="line-clamp-2 text-muted-foreground leading-relaxed">
                              {lead.description}
                            </p>
                            {lead.scopes && lead.scopes.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1.5">
                                {lead.scopes.map((s) => (
                                  <span key={s} className="text-[8px] uppercase tracking-wider bg-border/60 text-muted-foreground px-1 py-0.5 rounded-sm">
                                    {s.replace("_", " ")}
                                  </span>
                                ))}
                              </div>
                            )}
                          </td>
                          <td className="p-4 uppercase text-[10px] tracking-wider text-muted-foreground">
                            {lead.timeline || "N/A"}
                          </td>
                          <td className="p-4">
                            <select
                              value={lead.status}
                              onChange={(e) => handleLeadStatusChange(lead.id, e.target.value)}
                              className="bg-background border border-border/80 focus:border-primary outline-none px-2 py-1 text-[10px] uppercase rounded-sm text-foreground"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="qualified">Qualified</option>
                              <option value="archived">Archived</option>
                            </select>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="text-destructive hover:text-red-400 p-1.5 transition-colors cursor-pointer"
                              title="Delete entry"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: PARTNER LOGOS */}
          {activeTab === "partners" && (
            <div className="space-y-4 animate-fade-up">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading text-xl uppercase tracking-wider text-foreground">
                    Integration Partners
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Manage manufacturer and vendor logos displayed dynamically on the frontend carousel.
                  </p>
                </div>
                <button
                  onClick={() => openPartnerModal()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider bg-primary text-background font-semibold rounded-sm transition-all cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                >
                  <Plus size={14} /> Add Partner
                </button>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {partners.map((partner) => (
                  <div key={partner.id} className="border border-border/80 bg-card/30 rounded-sm p-5 flex flex-col items-center justify-between min-h-[160px] relative">
                    <div className="w-full flex items-center justify-center flex-1 py-4">
                      <img
                        src={partner.logoUrl}
                        alt={partner.name}
                        className="max-h-12 max-w-[80%] object-contain filter invert opacity-80"
                      />
                    </div>
                    <div className="w-full border-t border-border/60 pt-3 flex items-center justify-between">
                      <span className="font-heading text-xs uppercase tracking-wider text-muted-foreground">
                        {partner.name}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openPartnerModal(partner)}
                          className="text-muted-foreground hover:text-primary p-1 transition-colors cursor-pointer"
                        >
                          <Edit size={12} />
                        </button>
                        <button
                          onClick={() => handleDeletePartner(partner.id)}
                          className="text-destructive hover:text-red-400 p-1 transition-colors cursor-pointer"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PORTFOLIO Showcase CMS */}
          {activeTab === "portfolio" && (
            <div className="space-y-4 animate-fade-up">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading text-xl uppercase tracking-wider text-foreground">
                    Portfolio Case Studies
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Publish, edit, or delete past integration project profiles.
                  </p>
                </div>
                <button
                  onClick={() => openProjModal()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider bg-primary text-background font-semibold rounded-sm transition-all cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                >
                  <Plus size={14} /> Add Project
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="border border-border/80 bg-card/30 rounded-sm p-4 flex gap-4 items-start">
                    <img
                      src={proj.imgUrl}
                      alt={proj.title}
                      className="w-24 h-24 object-cover border border-border rounded-sm shrink-0"
                    />
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-sm border border-primary/40 text-primary">
                          {proj.category}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openProjModal(proj)}
                            className="text-muted-foreground hover:text-primary p-1 transition-colors cursor-pointer"
                          >
                            <Edit size={12} />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="text-destructive hover:text-red-400 p-1 transition-colors cursor-pointer"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                      <h4 className="font-heading text-base uppercase tracking-wide text-foreground">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* PARTNER MODAL */}
      {showPartnerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-card border border-border p-6 rounded-sm corner-frame relative animate-fade-up">
            <button
              onClick={() => setShowPartnerModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X size={18} />
            </button>
            <h3 className="font-heading text-lg uppercase tracking-wide mb-6">
              {editingPartner ? "Edit Partner Logo" : "Add Partner Logo"}
            </h3>
            <form onSubmit={savePartner} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="uppercase tracking-wider text-muted-foreground">Brand Name</label>
                <input
                  type="text"
                  required
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="e.g. Crestron"
                  className="w-full bg-background border border-border/80 focus:border-primary outline-none px-3 py-2 rounded-sm text-foreground"
                />
              </div>
              <div className="space-y-1.5">
                <label className="uppercase tracking-wider text-muted-foreground">Logo Image URL</label>
                <input
                  type="text"
                  required
                  value={partnerLogo}
                  onChange={(e) => setPartnerLogo(e.target.value)}
                  placeholder="e.g. https://domain.com/logo.svg"
                  className="w-full bg-background border border-border/80 focus:border-primary outline-none px-3 py-2 rounded-sm text-foreground font-mono"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-background font-semibold py-2 rounded-sm uppercase tracking-wider cursor-pointer"
              >
                Save Partner
              </button>
            </form>
          </div>
        </div>
      )}

      {/* PROJECT MODAL */}
      {showProjModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-card border border-border p-6 rounded-sm corner-frame relative animate-fade-up">
            <button
              onClick={() => setShowProjModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X size={18} />
            </button>
            <h3 className="font-heading text-lg uppercase tracking-wide mb-6">
              {editingProj ? "Edit Case Study" : "Add Case Study"}
            </h3>
            <form onSubmit={saveProject} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="uppercase tracking-wider text-muted-foreground">Project Title</label>
                  <input
                    type="text"
                    required
                    value={projTitle}
                    onChange={(e) => setProjTitle(e.target.value)}
                    placeholder="e.g. Dubai Smart Office"
                    className="w-full bg-background border border-border/80 focus:border-primary outline-none px-3 py-2 rounded-sm text-foreground"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="uppercase tracking-wider text-muted-foreground">Category</label>
                  <select
                    value={projCategory}
                    onChange={(e) => setProjCategory(e.target.value)}
                    className="w-full bg-background border border-border/80 focus:border-primary outline-none px-3 py-2 rounded-sm text-foreground"
                  >
                    <option value="AV">Audio Visual (AV)</option>
                    <option value="ELV">ELV Systems</option>
                    <option value="Networking">Networking</option>
                    <option value="Automation">Smart Automation</option>
                    <option value="Smart Buildings">Smart Buildings</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="uppercase tracking-wider text-muted-foreground">Image Path / URL</label>
                <input
                  type="text"
                  required
                  value={projImg}
                  onChange={(e) => setProjImg(e.target.value)}
                  placeholder="e.g. /src/assets/portfolio-1.jpg"
                  className="w-full bg-background border border-border/80 focus:border-primary outline-none px-3 py-2 rounded-sm text-foreground font-mono"
                />
              </div>
              <div className="space-y-1.5">
                <label className="uppercase tracking-wider text-muted-foreground">Brief Description</label>
                <textarea
                  required
                  value={projDesc}
                  onChange={(e) => setProjDesc(e.target.value)}
                  placeholder="Summarize the client scope and engineering solution..."
                  rows={3}
                  className="w-full bg-background border border-border/80 focus:border-primary outline-none px-3 py-2 rounded-sm text-foreground custom-scrollbar"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-background font-semibold py-2 rounded-sm uppercase tracking-wider cursor-pointer"
              >
                Save Project
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
