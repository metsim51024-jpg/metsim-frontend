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
  Download
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
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    // Cargar datos cada 5 minutos
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      const [ordersRes, quotesRes, statsRes] = await Promise.all([
        axios.get(`${API}/admin/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API}/admin/quotes`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API}/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(() => null) // Stats es opcional
      ]);

      setOrders(ordersRes.data || []);
      setQuotes(quotesRes.data || []);
      
      if (statsRes?.data) {
        setStats(statsRes.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("admin_token");
        toast.error("Sesión expirada");
        navigate("/admin/login");
      } else {
        toast.error("Error al cargar datos");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    toast.success("Sesión cerrada");
    navigate("/admin/login");
  };

  const downloadQuoteFiles = async (quoteId) => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await axios.get(`${API}/quotes/${quoteId}/files`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Crear ZIP con archivos o descargar directo
      window.open(response.data.downloadUrl, '_blank');
      toast.success("Descargando archivos...");
    } catch (error) {
      toast.error("Error al descargar archivos");
    }
  };

  const handleContactClient = (email, phone) => {
    // Copiar email/teléfono al portapapeles
    if (email) {
      navigator.clipboard.writeText(email);
      toast.success("Email copiado");
    }
    if (phone) {
      window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}`, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Cargando datos...</p>
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

          <button
            onClick={handleLogout}
            className="logout-button"
            data-testid="admin-logout-button"
          >
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="admin-content">
        <div className="admin-container">
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
                          <p className="stat-label">Visitas Totales</p>
                          <p className="stat-value">{stats.totalVisits || 0}</p>
                        </div>
                      </div>

                      <div className="stat-card">
                        <div className="stat-icon today">
                          <Calendar size={32} />
                        </div>
                        <div className="stat-info">
                          <p className="stat-label">Hoy</p>
                          <p className="stat-value">{stats.visitsToday || 0}</p>
                        </div>
                      </div>

                      <div className="stat-card">
                        <div className="stat-icon quotes">
                          <FileText size={32} />
                        </div>
                        <div className="stat-info">
                          <p className="stat-label">Cotizaciones</p>
                          <p className="stat-value">{quotes.length}</p>
                        </div>
                      </div>

                      <div className="stat-card">
                        <div className="stat-icon conversion">
                          <TrendingUp size={32} />
                        </div>
                        <div className="stat-info">
                          <p className="stat-label">Conversión</p>
                          <p className="stat-value">
                            {quotes.length > 0 
                              ? Math.round((orders.length / quotes.length) * 100) 
                              : 0}%
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Resumen Rápido */}
                    <div className="summary-section">
                      <h3>Resumen Rápido</h3>
                      
                      <div className="summary-item">
                        <span>Cotizaciones Nuevas (Últimas 24h)</span>
                        <strong>
                          {quotes.filter(q => {
                            const date = new Date(q.created_at);
                            const oneDayAgo = new Date(Date.now() - 24*60*60*1000);
                            return date > oneDayAgo;
                          }).length}
                        </strong>
                      </div>

                      <div className="summary-item">
                        <span>Pedidos Pendientes</span>
                        <strong>{orders.filter(o => o.status === 'pending').length}</strong>
                      </div>

                      <div className="summary-item">
                        <span>Tasa de Respuesta Promedio</span>
                        <strong>24 horas</strong>
                      </div>

                      <div className="summary-item">
                        <span>Proyecto Más Solicitado</span>
                        <strong>
                          {quotes.length > 0 
                            ? "Estructuras Metálicas"
                            : "N/A"
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
                    </div>
                  ) : (
                    <div className="items-list">
                      {quotes.map((quote) => (
                        <div
                          key={quote.id}
                          className={`item-card ${
                            expandedId === quote.id ? "expanded" : ""
                          }`}
                        >
                          <div
                            className="item-header"
                            onClick={() =>
                              setExpandedId(
                                expandedId === quote.id ? null : quote.id
                              )
                            }
                          >
                            <div className="item-title">
                              <p className="item-id">
                                Cotización #{quote.id.slice(0, 8).toUpperCase()}
                              </p>
                              <p className="item-date">
                                {new Date(quote.created_at).toLocaleString("es-PY")}
                              </p>
                            </div>

                            <div className="item-controls">
                              <span className="status-badge">{quote.status}</span>
                              <ChevronDown
                                size={20}
                                className={`toggle-icon ${
                                  expandedId === quote.id ? "open" : ""
                                }`}
                              />
                            </div>
                          </div>

                          {expandedId === quote.id && (
                            <div className="item-details">
                              <div className="details-grid">
                                <div className="detail-item">
                                  <User size={16} />
                                  <div>
                                    <p className="detail-label">Cliente</p>
                                    <p className="detail-value">
                                      {quote.client_name}
                                    </p>
                                  </div>
                                </div>

                                <div className="detail-item">
                                  <Mail size={16} />
                                  <div>
                                    <p className="detail-label">Email</p>
                                    <p className="detail-value">
                                      {quote.client_email}
                                    </p>
                                  </div>
                                </div>

                                <div className="detail-item">
                                  <Phone size={16} />
                                  <div>
                                    <p className="detail-label">Teléfono</p>
                                    <p className="detail-value">
                                      {quote.client_phone}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="description-section">
                                <p className="section-title">Descripción del Proyecto</p>
                                <p className="description-text">
                                  {quote.description}
                                </p>
                              </div>

                              {/* Archivos adjuntos */}
                              {quote.file_urls && quote.file_urls.length > 0 && (
                                <div className="files-section">
                                  <p className="section-title">Archivos Adjuntos</p>
                                  <div className="files-list">
                                    {quote.file_urls.map((file, idx) => (
                                      <a
                                        key={idx}
                                        href={file.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="file-download"
                                      >
                                        <Download size={16} />
                                        {file.filename}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Acciones rápidas */}
                              <div className="action-buttons">
                                <button
                                  onClick={() =>
                                    handleContactClient(quote.client_email)
                                  }
                                  className="action-btn email"
                                >
                                  📧 Enviar Email
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
                    </div>
                  ) : (
                    <div className="items-list">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className={`item-card ${
                            expandedId === order.id ? "expanded" : ""
                          }`}
                        >
                          <div
                            className="item-header"
                            onClick={() =>
                              setExpandedId(
                                expandedId === order.id ? null : order.id
                              )
                            }
                          >
                            <div className="item-title">
                              <p className="item-id">
                                Pedido #{order.id.slice(0, 8).toUpperCase()}
                              </p>
                              <p className="item-date">
                                {new Date(order.created_at).toLocaleString("es-PY")}
                              </p>
                            </div>

                            <div className="item-controls">
                              <span className="status-badge">{order.status}</span>
                              <ChevronDown
                                size={20}
                                className={`toggle-icon ${
                                  expandedId === order.id ? "open" : ""
                                }`}
                              />
                            </div>
                          </div>

                          {expandedId === order.id && (
                            <div className="item-details">
                              <div className="details-grid">
                                <div className="detail-item">
                                  <User size={16} />
                                  <div>
                                    <p className="detail-label">Cliente</p>
                                    <p className="detail-value">
                                      {order.client_name}
                                    </p>
                                  </div>
                                </div>

                                <div className="detail-item">
                                  <Mail size={16} />
                                  <div>
                                    <p className="detail-label">Email</p>
                                    <p className="detail-value">
                                      {order.client_email}
                                    </p>
                                  </div>
                                </div>

                                <div className="detail-item">
                                  <Phone size={16} />
                                  <div>
                                    <p className="detail-label">Teléfono</p>
                                    <p className="detail-value">
                                      {order.client_phone}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="products-section">
                                <p className="section-title">Productos Solicitados</p>
                                <div className="products-list">
                                  {order.items && order.items.length > 0 ? (
                                    order.items.map((item, idx) => (
                                      <div key={idx} className="product-row">
                                        <span className="product-name">
                                          {item.product_name}
                                        </span>
                                        <span className="product-qty">
                                          x{item.quantity}
                                        </span>
                                      </div>
                                    ))
                                  ) : (
                                    <p className="no-items">Sin productos</p>
                                  )}
                                </div>
                              </div>

                              {/* Acciones rápidas */}
                              <div className="action-buttons">
                                <button
                                  onClick={() =>
                                    handleContactClient(order.client_email)
                                  }
                                  className="action-btn email"
                                >
                                  📧 Enviar Email
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