import React, { useState, useEffect } from "react";
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
  AlertCircle
} from "lucide-react";
import "../styles/AdminDashboard.css";

const BACKEND_URL = "https://metsim-backend.onrender.com";
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [stats, setStats] = useState({
    totalVisits: 0,
    visitsToday: 0,
    totalConversions: 0,
    conversionRate: 0
  });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [expandedId, setExpandedId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      console.log("No token found, redirecting to login");
      navigate("/admin/login");
      return;
    }
    
    await fetchData();
  };

  const fetchData = async () => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      setError(null);
      setIsLoading(true);

      console.log("📊 Cargando datos del dashboard...");

      // Obtener cotizaciones
      const quotesRes = await axios.get(`${API}/admin/quotes`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        timeout: 15000
      }).catch(err => {
        console.warn("Error cargando cotizaciones:", err.message);
        return { data: [] };
      });

      // Obtener pedidos (si existe el endpoint)
      const ordersRes = await axios.get(`${API}/admin/orders`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        timeout: 15000
      }).catch(err => {
        console.warn("Error cargando pedidos:", err.message);
        return { data: [] };
      });

      console.log("✅ Cotizaciones cargadas:", quotesRes.data?.length || 0);
      console.log("✅ Pedidos cargados:", ordersRes.data?.length || 0);

      setQuotes(Array.isArray(quotesRes.data) ? quotesRes.data : []);
      setOrders(Array.isArray(ordersRes.data) ? ordersRes.data : []);

      // Calcular stats
      const newStats = {
        totalVisits: quotesRes.data?.length * 10 || 0,
        visitsToday: 0,
        totalConversions: ordersRes.data?.length || 0,
        conversionRate: quotesRes.data?.length ? 
          Math.round((ordersRes.data?.length / quotesRes.data?.length) * 100) : 0
      };
      setStats(newStats);

    } catch (error) {
      console.error("❌ Error fetching data:", error);
      setError("Error al cargar los datos");
      
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("admin_token");
        toast.error("Sesión expirada. Por favor inicia sesión nuevamente.");
        navigate("/admin/login");
      } else if (error.code === 'ECONNABORTED') {
        setError("Tiempo de conexión agotado");
        toast.error("⏱️ Tiempo de conexión agotado");
      } else {
        toast.error("Error al cargar datos");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    toast.success("Sesión cerrada correctamente");
    navigate("/admin/login");
  };

  const handleContactClient = (email, phone) => {
    if (email) {
      navigator.clipboard.writeText(email);
      toast.success("Email copiado al portapapeles");
    }
    if (phone) {
      const phoneNumber = phone.replace(/[^0-9]/g, '');
      window.open(`https://wa.me/${phoneNumber}`, '_blank');
    }
  };

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
            <img
              src="https://res.cloudinary.com/dk6wclcew/image/upload/v1775063931/metsim_logo-1_wrsnco.png"
              alt="METSIM"
              className="navbar-logo"
            />
            <h1 className="navbar-title">Panel Administrativo</h1>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={fetchData}
              className="refresh-button"
              title="Actualizar datos"
            >
              🔄 Actualizar
            </button>
            <button
              onClick={handleLogout}
              className="logout-button"
              data-testid="admin-logout-button"
            >
              <LogOut size={18} />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="admin-content">
        <div className="admin-container">
          {error && (
            <div className="error-banner">
              <AlertCircle size={20} />
              <span>{error}</span>
              <button onClick={fetchData}>Reintentar</button>
            </div>
          )}

          {/* PESTAÑAS */}
          <div className="tabs-section">
            <div className="tabs-header">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`tab-button ${activeTab === "dashboard" ? "active" : ""}`}
              >
                <TrendingUp size={18} />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("quotes")}
                className={`tab-button ${activeTab === "quotes" ? "active" : ""}`}
              >
                <FileText size={18} />
                Cotizaciones ({quotes.length})
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`tab-button ${activeTab === "orders" ? "active" : ""}`}
              >
                <Package size={18} />
                Pedidos ({orders.length})
              </button>
            </div>

            <div className="tabs-content">
              {/* ✅ DASHBOARD CON ESTADÍSTICAS */}
              {activeTab === "dashboard" && (
                <div className="tab-pane">
                  <div className="dashboard-grid">
                    {/* Stats Cards */}
                    <div className="stats-grid">
                      <div className="stat-card">
                        <div className="stat-icon visits">
                          <Eye size={32} />
                        </div>
                        <div className="stat-info">
                          <p className="stat-label">Cotizaciones Totales</p>
                          <p className="stat-value">{quotes.length}</p>
                        </div>
                      </div>

                      <div className="stat-card">
                        <div className="stat-icon today">
                          <Calendar size={32} />
                        </div>
                        <div className="stat-info">
                          <p className="stat-label">Hoy</p>
                          <p className="stat-value">
                            {quotes.filter(q => {
                              const date = new Date(q.created_at || q.createdAt);
                              const today = new Date();
                              return date.toDateString() === today.toDateString();
                            }).length}
                          </p>
                        </div>
                      </div>

                      <div className="stat-card">
                        <div className="stat-icon quotes">
                          <FileText size={32} />
                        </div>
                        <div className="stat-info">
                          <p className="stat-label">Con Archivos</p>
                          <p className="stat-value">
                            {quotes.filter(q => q.file_urls && q.file_urls.length > 0).length}
                          </p>
                        </div>
                      </div>

                      <div className="stat-card">
                        <div className="stat-icon conversion">
                          <TrendingUp size={32} />
                        </div>
                        <div className="stat-info">
                          <p className="stat-label">Pedidos</p>
                          <p className="stat-value">{orders.length}</p>
                        </div>
                      </div>
                    </div>

                    {/* Resumen Rápido */}
                    <div className="summary-section">
                      <h3>Resumen Rápido</h3>
                      
                      <div className="summary-item">
                        <span>Total de Cotizaciones</span>
                        <strong>{quotes.length}</strong>
                      </div>

                      <div className="summary-item">
                        <span>Cotizaciones Últimas 24h</span>
                        <strong>
                          {quotes.filter(q => {
                            const date = new Date(q.created_at || q.createdAt);
                            const oneDayAgo = new Date(Date.now() - 24*60*60*1000);
                            return date > oneDayAgo;
                          }).length}
                        </strong>
                      </div>

                      <div className="summary-item">
                        <span>Total de Pedidos</span>
                        <strong>{orders.length}</strong>
                      </div>

                      <div className="summary-item">
                        <span>Tasa de Conversión</span>
                        <strong>
                          {quotes.length > 0 
                            ? Math.round((orders.length / quotes.length) * 100) + "%"
                            : "0%"
                          }
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ✅ COTIZACIONES */}
              {activeTab === "quotes" && (
                <div className="tab-pane">
                  {quotes.length === 0 ? (
                    <div className="empty-state">
                      <FileText size={48} />
                      <p>No hay cotizaciones aún</p>
                      <small>Las cotizaciones aparecerán aquí cuando se envíen</small>
                    </div>
                  ) : (
                    <div className="items-list">
                      {quotes.map((quote) => (
                        <div
                          key={quote._id || quote.id}
                          className={`item-card ${
                            expandedId === (quote._id || quote.id) ? "expanded" : ""
                          }`}
                        >
                          <div
                            className="item-header"
                            onClick={() =>
                              setExpandedId(
                                expandedId === (quote._id || quote.id) ? null : (quote._id || quote.id)
                              )
                            }
                          >
                            <div className="item-title">
                              <p className="item-id">
                                Cotización #{(quote._id || quote.id || "---").slice(0, 8).toUpperCase()}
                              </p>
                              <p className="item-date">
                                {new Date(quote.created_at || quote.createdAt).toLocaleString("es-PY")}
                              </p>
                            </div>

                            <div className="item-controls">
                              <span className="status-badge">{quote.status || "pendiente"}</span>
                              <ChevronDown
                                size={20}
                                className={`toggle-icon ${
                                  expandedId === (quote._id || quote.id) ? "open" : ""
                                }`}
                              />
                            </div>
                          </div>

                          {expandedId === (quote._id || quote.id) && (
                            <div className="item-details">
                              <div className="details-grid">
                                <div className="detail-item">
                                  <User size={16} />
                                  <div>
                                    <p className="detail-label">Cliente</p>
                                    <p className="detail-value">
                                      {quote.client_name || "N/A"}
                                    </p>
                                  </div>
                                </div>

                                <div className="detail-item">
                                  <Mail size={16} />
                                  <div>
                                    <p className="detail-label">Email</p>
                                    <p className="detail-value">
                                      {quote.client_email || "N/A"}
                                    </p>
                                  </div>
                                </div>

                                <div className="detail-item">
                                  <Phone size={16} />
                                  <div>
                                    <p className="detail-label">Teléfono</p>
                                    <p className="detail-value">
                                      {quote.client_phone || "N/A"}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="description-section">
                                <p className="section-title">Descripción del Proyecto</p>
                                <p className="description-text">
                                  {quote.description || "Sin descripción"}
                                </p>
                              </div>

                              {/* Archivos adjuntos */}
                              {quote.file_urls && quote.file_urls.length > 0 && (
                                <div className="files-section">
                                  <p className="section-title">Archivos Adjuntos ({quote.file_urls.length})</p>
                                  <div className="files-list">
                                    {quote.file_urls.map((file, idx) => (
                                      <a
                                        key={idx}
                                        href={file.url || file}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="file-download"
                                      >
                                        <Download size={16} />
                                        {file.filename || `Archivo ${idx + 1}`}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Acciones rápidas */}
                              <div className="action-buttons">
                                <button
                                  onClick={() =>
                                    handleContactClient(quote.client_email, null)
                                  }
                                  className="action-btn email"
                                >
                                  📧 Copiar Email
                                </button>
                                <button
                                  onClick={() =>
                                    handleContactClient(null, quote.client_phone)
                                  }
                                  className="action-btn whatsapp"
                                >
                                  💬 WhatsApp
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ✅ PEDIDOS */}
              {activeTab === "orders" && (
                <div className="tab-pane">
                  {orders.length === 0 ? (
                    <div className="empty-state">
                      <Package size={48} />
                      <p>No hay pedidos aún</p>
                      <small>Los pedidos aparecerán aquí cuando se confirmen</small>
                    </div>
                  ) : (
                    <div className="items-list">
                      {orders.map((order) => (
                        <div
                          key={order._id || order.id}
                          className={`item-card ${
                            expandedId === (order._id || order.id) ? "expanded" : ""
                          }`}
                        >
                          <div
                            className="item-header"
                            onClick={() =>
                              setExpandedId(
                                expandedId === (order._id || order.id) ? null : (order._id || order.id)
                              )
                            }
                          >
                            <div className="item-title">
                              <p className="item-id">
                                Pedido #{(order._id || order.id || "---").slice(0, 8).toUpperCase()}
                              </p>
                              <p className="item-date">
                                {new Date(order.created_at || order.createdAt).toLocaleString("es-PY")}
                              </p>
                            </div>

                            <div className="item-controls">
                              <span className="status-badge">{order.status || "pendiente"}</span>
                              <ChevronDown
                                size={20}
                                className={`toggle-icon ${
                                  expandedId === (order._id || order.id) ? "open" : ""
                                }`}
                              />
                            </div>
                          </div>

                          {expandedId === (order._id || order.id) && (
                            <div className="item-details">
                              <div className="details-grid">
                                <div className="detail-item">
                                  <User size={16} />
                                  <div>
                                    <p className="detail-label">Cliente</p>
                                    <p className="detail-value">
                                      {order.client_name || "N/A"}
                                    </p>
                                  </div>
                                </div>

                                <div className="detail-item">
                                  <Mail size={16} />
                                  <div>
                                    <p className="detail-label">Email</p>
                                    <p className="detail-value">
                                      {order.client_email || "N/A"}
                                    </p>
                                  </div>
                                </div>

                                <div className="detail-item">
                                  <Phone size={16} />
                                  <div>
                                    <p className="detail-label">Teléfono</p>
                                    <p className="detail-value">
                                      {order.client_phone || "N/A"}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Acciones rápidas */}
                              <div className="action-buttons">
                                <button
                                  onClick={() =>
                                    handleContactClient(order.client_email, null)
                                  }
                                  className="action-btn email"
                                >
                                  📧 Copiar Email
                                </button>
                                <button
                                  onClick={() =>
                                    handleContactClient(null, order.client_phone)
                                  }
                                  className="action-btn whatsapp"
                                >
                                  💬 WhatsApp
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
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