import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import {
  LogOut,
  Package,
  FileText,
  Calendar,
  User,
  Phone,
  Mail,
  ChevronDown,
  TrendingUp,
  Eye,
  Download,
  AlertCircle,
  MessageSquare,
  Search,
  BarChart3
} from "lucide-react";
import "../styles/AdminDashboard.css";

const BACKEND_URL = "https://metsim-backend.onrender.com";
const API = `${BACKEND_URL}/api`;

// Estados de cotización: valor backend -> etiqueta y color
const QUOTE_STATUS = {
  pending:   { label: "Pendiente",  className: "st-pending" },
  responded: { label: "Respondido", className: "st-responded" },
  accepted:  { label: "Ganado",     className: "st-accepted" },
  rejected:  { label: "Perdido",    className: "st-rejected" }
};

const CONTACT_STATUS = {
  nuevo:      { label: "Nuevo",      className: "st-pending" },
  revisado:   { label: "Revisado",   className: "st-responded" },
  respondido: { label: "Respondido", className: "st-accepted" },
  cerrado:    { label: "Cerrado",    className: "st-rejected" }
};

// Normaliza la respuesta del backend (puede venir como array o {success, data})
const unwrap = (res) => {
  const d = res?.data;
  if (Array.isArray(d)) return d;
  if (Array.isArray(d?.data)) return d.data;
  return [];
};

const AdminDashboard = () => {
  const [quotes, setQuotes] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [visits, setVisits] = useState({ total: 0, today: 0, last7days: 0, topPages: [] });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [expandedId, setExpandedId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
    "Content-Type": "application/json"
  });

  const fetchData = async () => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      setError(null);
      setIsLoading(true);

      const [quotesRes, contactsRes, visitsRes] = await Promise.all([
        axios.get(`${API}/admin/quotes`, { headers: authHeaders(), timeout: 20000 })
          .catch((e) => { console.warn("quotes:", e.message); return { data: [] }; }),
        axios.get(`${API}/admin/contacts`, { headers: authHeaders(), timeout: 20000 })
          .catch((e) => { console.warn("contacts:", e.message); return { data: [] }; }),
        axios.get(`${API}/admin/visits`, { headers: authHeaders(), timeout: 20000 })
          .catch((e) => { console.warn("visits:", e.message); return { data: { data: {} } }; })
      ]);

      setQuotes(unwrap(quotesRes));
      setContacts(unwrap(contactsRes));

      const v = visitsRes?.data?.data || {};
      setVisits({
        total: v.total || 0,
        today: v.today || 0,
        last7days: v.last7days || 0,
        topPages: v.topPages || []
      });
    } catch (err) {
      console.error("Error fetching data:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("admin_token");
        toast.error("Sesión expirada. Iniciá sesión nuevamente.");
        navigate("/admin/login");
      } else {
        setError("Error al cargar los datos");
        toast.error("Error al cargar datos");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuoteStatus = async (id, status) => {
    try {
      await axios.patch(`${API}/admin/quotes/${id}/status`, { status }, { headers: authHeaders() });
      setQuotes((prev) => prev.map((q) => (q._id === id || q.id === id ? { ...q, status } : q)));
      toast.success(`Estado: ${QUOTE_STATUS[status]?.label || status}`);
    } catch (e) {
      toast.error("No se pudo actualizar el estado");
    }
  };

  const updateContactStatus = async (id, status) => {
    try {
      await axios.patch(`${API}/admin/contacts/${id}/status`, { status }, { headers: authHeaders() });
      setContacts((prev) => prev.map((c) => (c._id === id || c.id === id ? { ...c, status } : c)));
      toast.success(`Estado: ${CONTACT_STATUS[status]?.label || status}`);
    } catch (e) {
      toast.error("No se pudo actualizar el estado");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    toast.success("Sesión cerrada");
    navigate("/admin/login");
  };

  const contactClient = (email, phone) => {
    if (email) {
      navigator.clipboard.writeText(email);
      toast.success("Email copiado");
    }
    if (phone) {
      window.open(`https://wa.me/${phone.replace(/[^0-9]/g, "")}`, "_blank");
    }
  };

  // Cotizaciones filtradas por búsqueda + estado
  const filteredQuotes = useMemo(() => {
    const term = search.trim().toLowerCase();
    return quotes.filter((q) => {
      const matchTerm =
        !term ||
        (q.client_name || "").toLowerCase().includes(term) ||
        (q.client_email || "").toLowerCase().includes(term) ||
        (q.description || "").toLowerCase().includes(term);
      const matchStatus = statusFilter === "all" || (q.status || "pending") === statusFilter;
      return matchTerm && matchStatus;
    });
  }, [quotes, search, statusFilter]);

  const exportCSV = () => {
    const rows = filteredQuotes.length ? filteredQuotes : quotes;
    if (!rows.length) {
      toast.error("No hay cotizaciones para exportar");
      return;
    }
    const headers = ["Fecha", "Cliente", "Email", "Telefono", "Estado", "Descripcion"];
    const escape = (s) => `"${String(s ?? "").replace(/"/g, '""')}"`;
    const lines = rows.map((q) =>
      [
        new Date(q.created_at || q.createdAt).toLocaleString("es-PY"),
        q.client_name,
        q.client_email,
        q.client_phone,
        QUOTE_STATUS[q.status || "pending"]?.label || q.status,
        (q.description || "").replace(/\n/g, " ")
      ].map(escape).join(",")
    );
    const csv = "﻿" + [headers.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cotizaciones-metsim-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`${rows.length} cotizaciones exportadas`);
  };

  const quotesToday = quotes.filter((q) => {
    const d = new Date(q.created_at || q.createdAt);
    return d.toDateString() === new Date().toDateString();
  }).length;

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Cargando datos del panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <nav className="admin-navbar">
        <div className="navbar-content">
          <div className="navbar-logo-section">
            <img src="/metsim-isotipo.png" alt="METSIM" className="navbar-logo" />
            <h1 className="navbar-title">Panel Administrativo</h1>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <button onClick={fetchData} className="refresh-button" title="Actualizar datos">
              🔄 Actualizar
            </button>
            <button onClick={handleLogout} className="logout-button" data-testid="admin-logout-button">
              <LogOut size={18} />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      <div className="admin-content">
        <div className="admin-container">
          {error && (
            <div className="error-banner">
              <AlertCircle size={20} />
              <span>{error}</span>
              <button onClick={fetchData}>Reintentar</button>
            </div>
          )}

          <div className="tabs-section">
            <div className="tabs-header">
              <button onClick={() => setActiveTab("dashboard")} className={`tab-button ${activeTab === "dashboard" ? "active" : ""}`}>
                <TrendingUp size={18} /> Dashboard
              </button>
              <button onClick={() => setActiveTab("quotes")} className={`tab-button ${activeTab === "quotes" ? "active" : ""}`}>
                <FileText size={18} /> Cotizaciones ({quotes.length})
              </button>
              <button onClick={() => setActiveTab("contacts")} className={`tab-button ${activeTab === "contacts" ? "active" : ""}`}>
                <MessageSquare size={18} /> Mensajes ({contacts.length})
              </button>
            </div>

            <div className="tabs-content">
              {/* ===== DASHBOARD ===== */}
              {activeTab === "dashboard" && (
                <div className="tab-pane">
                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-icon visits"><Eye size={32} /></div>
                      <div className="stat-info">
                        <p className="stat-label">Visitas Totales</p>
                        <p className="stat-value">{visits.total}</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon today"><Calendar size={32} /></div>
                      <div className="stat-info">
                        <p className="stat-label">Visitas Hoy</p>
                        <p className="stat-value">{visits.today}</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon quotes"><FileText size={32} /></div>
                      <div className="stat-info">
                        <p className="stat-label">Cotizaciones</p>
                        <p className="stat-value">{quotes.length}</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon conversion"><TrendingUp size={32} /></div>
                      <div className="stat-info">
                        <p className="stat-label">Conversión (visitas→cot.)</p>
                        <p className="stat-value">
                          {visits.total > 0 ? Math.round((quotes.length / visits.total) * 100) : 0}%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="dashboard-grid">
                    {/* Páginas más visitadas */}
                    <div className="summary-section">
                      <h3><BarChart3 size={18} style={{ verticalAlign: "-3px", marginRight: 6 }} />Páginas más visitadas (real)</h3>
                      {visits.topPages.length === 0 ? (
                        <p className="muted-note">Aún no hay visitas registradas. Empezarán a contarse desde ahora.</p>
                      ) : (
                        visits.topPages.map((p, i) => (
                          <div className="summary-item" key={i}>
                            <span>{p.path}</span>
                            <strong>{p.count}</strong>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Resumen */}
                    <div className="summary-section">
                      <h3>Resumen Rápido</h3>
                      <div className="summary-item"><span>Visitas últimos 7 días</span><strong>{visits.last7days}</strong></div>
                      <div className="summary-item"><span>Cotizaciones hoy</span><strong>{quotesToday}</strong></div>
                      <div className="summary-item"><span>Cotizaciones ganadas</span><strong>{quotes.filter(q => q.status === "accepted").length}</strong></div>
                      <div className="summary-item"><span>Mensajes nuevos</span><strong>{contacts.filter(c => (c.status || "nuevo") === "nuevo").length}</strong></div>
                    </div>
                  </div>
                </div>
              )}

              {/* ===== COTIZACIONES ===== */}
              {activeTab === "quotes" && (
                <div className="tab-pane">
                  {/* Barra de búsqueda + filtros + export */}
                  <div className="toolbar">
                    <div className="search-box">
                      <Search size={16} />
                      <input
                        type="text"
                        placeholder="Buscar por nombre, email o descripción..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                      <option value="all">Todos los estados</option>
                      <option value="pending">Pendiente</option>
                      <option value="responded">Respondido</option>
                      <option value="accepted">Ganado</option>
                      <option value="rejected">Perdido</option>
                    </select>
                    <button className="export-btn" onClick={exportCSV}>
                      <Download size={16} /> Exportar CSV
                    </button>
                  </div>

                  {filteredQuotes.length === 0 ? (
                    <div className="empty-state">
                      <FileText size={48} />
                      <p>{quotes.length === 0 ? "No hay cotizaciones aún" : "Sin resultados para el filtro"}</p>
                    </div>
                  ) : (
                    <div className="items-list">
                      {filteredQuotes.map((quote) => {
                        const id = quote._id || quote.id;
                        const st = QUOTE_STATUS[quote.status || "pending"] || QUOTE_STATUS.pending;
                        return (
                          <div key={id} className={`item-card ${expandedId === id ? "expanded" : ""}`}>
                            <div className="item-header" onClick={() => setExpandedId(expandedId === id ? null : id)}>
                              <div className="item-title">
                                <p className="item-id">{quote.client_name || "Cliente"} · #{(id || "---").slice(-6).toUpperCase()}</p>
                                <p className="item-date">{new Date(quote.created_at || quote.createdAt).toLocaleString("es-PY")}</p>
                              </div>
                              <div className="item-controls">
                                <span className={`status-badge ${st.className}`}>{st.label}</span>
                                <ChevronDown size={20} className={`toggle-icon ${expandedId === id ? "open" : ""}`} />
                              </div>
                            </div>

                            {expandedId === id && (
                              <div className="item-details">
                                <div className="details-grid">
                                  <div className="detail-item"><User size={16} /><div><p className="detail-label">Cliente</p><p className="detail-value">{quote.client_name || "N/A"}</p></div></div>
                                  <div className="detail-item"><Mail size={16} /><div><p className="detail-label">Email</p><p className="detail-value">{quote.client_email || "N/A"}</p></div></div>
                                  <div className="detail-item"><Phone size={16} /><div><p className="detail-label">Teléfono</p><p className="detail-value">{quote.client_phone || "N/A"}</p></div></div>
                                </div>

                                <div className="description-section">
                                  <p className="section-title">Descripción del Proyecto</p>
                                  <p className="description-text">{quote.description || "Sin descripción"}</p>
                                </div>

                                {quote.file_urls && quote.file_urls.length > 0 && (
                                  <div className="files-section">
                                    <p className="section-title">Archivos Adjuntos ({quote.file_urls.length})</p>
                                    <div className="files-list">
                                      {quote.file_urls.map((file, idx) => (
                                        <a key={idx} href={file.url || file} target="_blank" rel="noopener noreferrer" className="file-download">
                                          <Download size={16} /> {file.filename || `Archivo ${idx + 1}`}
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Estado (CRM) */}
                                <div className="status-control">
                                  <span className="section-title">Cambiar estado:</span>
                                  <div className="status-options">
                                    {Object.entries(QUOTE_STATUS).map(([key, val]) => (
                                      <button
                                        key={key}
                                        className={`status-pill ${val.className} ${(quote.status || "pending") === key ? "active" : ""}`}
                                        onClick={() => updateQuoteStatus(id, key)}
                                      >
                                        {val.label}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                <div className="action-buttons">
                                  <button onClick={() => contactClient(quote.client_email, null)} className="action-btn email">📧 Copiar Email</button>
                                  <button onClick={() => contactClient(null, quote.client_phone)} className="action-btn whatsapp">💬 WhatsApp</button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ===== MENSAJES DE CONTACTO ===== */}
              {activeTab === "contacts" && (
                <div className="tab-pane">
                  {contacts.length === 0 ? (
                    <div className="empty-state">
                      <MessageSquare size={48} />
                      <p>No hay mensajes aún</p>
                      <small>Los mensajes del formulario de contacto aparecerán aquí</small>
                    </div>
                  ) : (
                    <div className="items-list">
                      {contacts.map((c) => {
                        const id = c._id || c.id;
                        const st = CONTACT_STATUS[c.status || "nuevo"] || CONTACT_STATUS.nuevo;
                        return (
                          <div key={id} className={`item-card ${expandedId === id ? "expanded" : ""}`}>
                            <div className="item-header" onClick={() => setExpandedId(expandedId === id ? null : id)}>
                              <div className="item-title">
                                <p className="item-id">{c.client_name || "Contacto"} · #{(id || "---").slice(-6).toUpperCase()}</p>
                                <p className="item-date">{new Date(c.createdAt || c.created_at).toLocaleString("es-PY")}</p>
                              </div>
                              <div className="item-controls">
                                <span className={`status-badge ${st.className}`}>{st.label}</span>
                                <ChevronDown size={20} className={`toggle-icon ${expandedId === id ? "open" : ""}`} />
                              </div>
                            </div>

                            {expandedId === id && (
                              <div className="item-details">
                                <div className="details-grid">
                                  <div className="detail-item"><User size={16} /><div><p className="detail-label">Nombre</p><p className="detail-value">{c.client_name || "N/A"}</p></div></div>
                                  <div className="detail-item"><Mail size={16} /><div><p className="detail-label">Email</p><p className="detail-value">{c.client_email || "N/A"}</p></div></div>
                                  <div className="detail-item"><Phone size={16} /><div><p className="detail-label">Teléfono</p><p className="detail-value">{c.client_phone || "N/A"}</p></div></div>
                                </div>
                                <div className="description-section">
                                  <p className="section-title">Mensaje</p>
                                  <p className="description-text">{c.description || "Sin mensaje"}</p>
                                </div>

                                <div className="status-control">
                                  <span className="section-title">Cambiar estado:</span>
                                  <div className="status-options">
                                    {Object.entries(CONTACT_STATUS).map(([key, val]) => (
                                      <button
                                        key={key}
                                        className={`status-pill ${val.className} ${(c.status || "nuevo") === key ? "active" : ""}`}
                                        onClick={() => updateContactStatus(id, key)}
                                      >
                                        {val.label}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                <div className="action-buttons">
                                  <button onClick={() => contactClient(c.client_email, null)} className="action-btn email">📧 Copiar Email</button>
                                  <button onClick={() => contactClient(null, c.client_phone)} className="action-btn whatsapp">💬 WhatsApp</button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
