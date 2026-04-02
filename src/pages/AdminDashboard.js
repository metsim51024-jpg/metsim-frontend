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
  Eye,
  EyeOff
} from "lucide-react";
import "../styles/AdminDashboard.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      const [ordersRes, quotesRes] = await Promise.all([
        axios.get(`${API}/admin/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API}/admin/quotes`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setOrders(ordersRes.data || []);
      setQuotes(quotesRes.data || []);
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
              src="https://i.ibb.co/fYjtsMdc/LOGO-FONDO-NEGRO.png"
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
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon orders">
                <Package size={32} />
              </div>
              <div className="stat-info">
                <p className="stat-label">Total Pedidos</p>
                <p className="stat-value">{orders.length}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon quotes">
                <FileText size={32} />
              </div>
              <div className="stat-info">
                <p className="stat-label">Presupuestos</p>
                <p className="stat-value">{quotes.length}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon total">
                <Calendar size={32} />
              </div>
              <div className="stat-info">
                <p className="stat-label">Total Consultas</p>
                <p className="stat-value">{orders.length + quotes.length}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs-section">
            <div className="tabs-header">
              <button
                onClick={() => setActiveTab("orders")}
                className={`tab-button ${activeTab === "orders" ? "active" : ""}`}
                data-testid="admin-orders-tab"
              >
                <Package size={18} />
                Pedidos ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab("quotes")}
                className={`tab-button ${activeTab === "quotes" ? "active" : ""}`}
                data-testid="admin-quotes-tab"
              >
                <FileText size={18} />
                Presupuestos ({quotes.length})
              </button>
            </div>

            <div className="tabs-content">
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
                                {new Date(order.created_at).toLocaleString(
                                  "es-PY"
                                )}
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
                                <p className="section-title">Productos</p>
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
                                    <p className="no-items">
                                      Sin productos
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "quotes" && (
                <div className="tab-pane">
                  {quotes.length === 0 ? (
                    <div className="empty-state">
                      <FileText size={48} />
                      <p>No hay presupuestos aún</p>
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
                                Presupuesto #{quote.id.slice(0, 8).toUpperCase()}
                              </p>
                              <p className="item-date">
                                {new Date(quote.created_at).toLocaleString(
                                  "es-PY"
                                )}
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
                                <p className="section-title">Descripción</p>
                                <p className="description-text">
                                  {quote.description}
                                </p>
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