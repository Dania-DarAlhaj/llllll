import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion, AnimatePresence } from 'framer-motion';
import '../style/VenueOwnerPage.css';

export default function VenueOwnerPage() {
  const [owner, setOwner] = useState({
    id: 1,
    name: 'Grand Palace Hall',
    serviceType: 'Venue',
    email: 'info@grandpalace.com',
    phone: '+970-59-123-4567',
    location: 'Ramallah',
    status: 'Active',
    capacity: 500,
    avatar: 'GP'
  });

  const [stats, setStats] = useState({
    upcomingReservations: 8,
    newNotifications: 5,
    totalCapacity: 500
  });

  const [venues, setVenues] = useState([
    { id: 1, name: 'Main Hall', capacity: 300, price: '2500', status: 'Available', image: '🏛️' },
    { id: 2, name: 'Garden Terrace', capacity: 150, price: '1800', status: 'Available', image: '🌳' },
    { id: 3, name: 'Royal Ballroom', capacity: 500, price: '3500', status: 'Available', image: '👑' },
    { id: 4, name: 'Outdoor Pavilion', capacity: 200, price: '2000', status: 'Available', image: '⛺' }
  ]);

  const [reservations, setReservations] = useState([
    { id: 101, customer: 'Ahmad K.', date: '2026-03-15', status: 'Waiting', venue: 'Main Hall', guests: 250 },
    { id: 102, customer: 'Layla S.', date: '2026-03-22', status: 'Approved', venue: 'Garden Terrace', guests: 120 },
    { id: 103, customer: 'Omar T.', date: '2026-04-10', status: 'Waiting', venue: 'Royal Ballroom', guests: 400 },
    { id: 104, customer: 'Noor M.', date: '2026-04-18', status: 'Approved', venue: 'Main Hall', guests: 280 },
    { id: 105, customer: 'Yara H.', date: '2026-05-05', status: 'Waiting', venue: 'Outdoor Pavilion', guests: 180 }
  ]);

  const [visitRequests, setVisitRequests] = useState([
    { id: 201, name: 'Fatima A.', date: '2026-02-15', time: '14:00', status: 'Pending', phone: '+970-59-222-3333', venue: 'Main Hall' },
    { id: 202, name: 'Hassan B.', date: '2026-02-18', time: '16:00', status: 'Pending', phone: '+970-59-444-5555', venue: 'Royal Ballroom' }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New venue booking request from Ahmad K.', time: '2h', type: 'order' },
    { id: 2, text: 'Visit request approved for Fatima A.', time: '5h', type: 'success' },
    { id: 3, text: 'Payment received for booking #102', time: '1d', type: 'info' },
    { id: 4, text: 'Reminder: Upcoming event tomorrow', time: '1d', type: 'warning' },
    { id: 5, text: 'New review posted by Layla S.', time: '2d', type: 'info' }
  ]);

  const [showAddVenueModal, setShowAddVenueModal] = useState(false);
  const [newVenueName, setNewVenueName] = useState('');
  const [newVenueCapacity, setNewVenueCapacity] = useState('');
  const [newVenuePrice, setNewVenuePrice] = useState('');
  const [newVenueImage, setNewVenueImage] = useState('🏛️');
  const [filterTab, setFilterTab] = useState('all');

  const messagesEndRef = useRef(null);

  const approveReservation = (id) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
    setNotifications(prev => [{ id: Date.now(), text: `Reservation #${id} approved`, time: 'now', type: 'success' }, ...prev]);
    setStats(prev => ({ ...prev, upcomingReservations: Math.max(0, prev.upcomingReservations - 1) }));
  };

  const rejectReservation = (id) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status: 'Rejected' } : r));
    setNotifications(prev => [{ id: Date.now(), text: `Reservation #${id} rejected`, time: 'now', type: 'warning' }, ...prev]);
    setStats(prev => ({ ...prev, upcomingReservations: Math.max(0, prev.upcomingReservations - 1) }));
  };

  const addVenue = () => {
    if (!newVenueName.trim() || !newVenueCapacity) return;
    const newVenue = { 
      id: Date.now(), 
      name: newVenueName, 
      capacity: parseInt(newVenueCapacity),
      price: newVenuePrice || 'Contact', 
      status: 'Available',
      image: newVenueImage 
    };
    setVenues(prev => [newVenue, ...prev]);
    setShowAddVenueModal(false);
    setNewVenueName('');
    setNewVenueCapacity('');
    setNewVenuePrice('');
    setNewVenueImage('🏛️');
    setNotifications(prev => [{ id: Date.now(), text: `New venue added: ${newVenue.name}`, time: 'now', type: 'success' }, ...prev]);
  };

  const deleteVenue = (id) => {
    setVenues(prev => prev.filter(v => v.id !== id));
  };

  const approveVisit = (id) => {
    setVisitRequests(prev => prev.map(v => v.id === id ? { ...v, status: 'Approved' } : v));
    setNotifications(prev => [{ id: Date.now(), text: `Visit request #${id} approved`, time: 'now', type: 'success' }, ...prev]);
  };

  const rejectVisit = (id) => {
    setVisitRequests(prev => prev.map(v => v.id === id ? { ...v, status: 'Rejected' } : v));
    setNotifications(prev => [{ id: Date.now(), text: `Visit request #${id} rejected`, time: 'now', type: 'warning' }, ...prev]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [notifications]);

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('.wps-navbar');
      if (!nav) return;
      if (window.scrollY > 40) nav.classList.add('navbar-scrolled'); 
      else nav.classList.remove('navbar-scrolled');
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light wps-navbar">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: 'spring' }}
              style={{
                width: 52, 
                height: 52, 
                borderRadius: 14,
                background: 'linear-gradient(135deg, #D4AF37 0%, #8B7355 100%)',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: '#fff', 
                fontWeight: 700,
                fontSize: '1.5rem',
                boxShadow: '0 8px 20px rgba(212,175,55,0.3)'
              }}
            >
              V
            </motion.div>
            <span className="ms-3 brand-primary">Wedding Planning System</span>
          </a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
              <li className="nav-item"><a className="nav-link active" href="/venue-owner">Venue Owner</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="owner-hero container">
        <div className="hero-gradient"></div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <div className="row align-items-center mb-5">
            <div className="col-lg-8">
              <h1 style={{ 
                fontFamily: 'Playfair Display', 
                fontSize: '3rem', 
                fontWeight: 800,
                background: 'linear-gradient(135deg, #D4AF37 0%, #8B7355 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1rem'
              }}>
                Venue Owner Dashboard
              </h1>
              <p className="text-muted mb-0" style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                Manage your prestigious wedding venue spaces, upcoming bookings, and client visits with elegance.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
              <div className="d-inline-flex align-items-center gap-3 p-3" style={{
                background: 'white',
                borderRadius: 20,
                boxShadow: '0 8px 30px rgba(0,0,0,0.08)'
              }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{owner.name}</div>
                  <div className="text-muted" style={{ fontSize: '.95rem' }}>{owner.serviceType} • {owner.location}</div>
                </div>
                <div style={{ 
                  width: 64, 
                  height: 64, 
                  borderRadius: 16, 
                  background: 'linear-gradient(135deg,#D4AF37 0%,#8B7355 100%)', 
                  color: '#fff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  boxShadow: '0 8px 20px rgba(212,175,55,0.3)'
                }}>
                  {owner.avatar}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="row g-4">
            <div className="col-md-4">
              <motion.div 
                className="stats-card text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="stats-icon">📅</div>
                <div className="text-muted mb-2" style={{ fontWeight: 600 }}>Upcoming Bookings</div>
                <div className="stats-value">{stats.upcomingReservations}</div>
              </motion.div>
            </div>
            <div className="col-md-4">
              <motion.div 
                className="stats-card text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="stats-icon">🔔</div>
                <div className="text-muted mb-2" style={{ fontWeight: 600 }}>New Notifications</div>
                <div className="stats-value">{stats.newNotifications}</div>
              </motion.div>
            </div>
            <div className="col-md-4">
              <motion.div 
                className="stats-card text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="stats-icon">👥</div>
                <div className="text-muted mb-2" style={{ fontWeight: 600 }}>Total Capacity</div>
                <div className="stats-value">{stats.totalCapacity}</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <main className="container my-5">
        <div className="row g-4">
          {/* Sidebar */}
          <aside className="col-lg-4">
            {/* Profile Card */}
            <motion.div 
              className="profile-card mb-4" 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="profile-avatar">{owner.avatar}</div>
              <div className="profile-content text-center">
                <h4 style={{ fontFamily: 'Playfair Display', fontWeight: 700, marginTop: '1rem' }}>
                  {owner.name}
                </h4>
                <div className="mb-3">
                  <span className={`status-pill ${owner.status === 'Active' ? 'status-approved' : 'status-waiting'}`}>
                    {owner.status}
                  </span>
                </div>
              </div>
              
              <div style={{ background: 'var(--cream)', borderRadius: 12, padding: '1rem', marginBottom: '1rem' }}>
                <div className="mb-3">
                  <div className="text-muted small mb-1">Email</div>
                  <div style={{ fontWeight: 600 }}>{owner.email}</div>
                </div>
                <div className="mb-3">
                  <div className="text-muted small mb-1">Phone</div>
                  <div style={{ fontWeight: 600 }}>{owner.phone}</div>
                </div>
                <div className="mb-3">
                  <div className="text-muted small mb-1">Location</div>
                  <div style={{ fontWeight: 600 }}>{owner.location}</div>
                </div>
                <div>
                  <div className="text-muted small mb-1">Max Capacity</div>
                  <div style={{ fontWeight: 600 }}>{owner.capacity} guests</div>
                </div>
              </div>
              
              <div className="d-grid gap-2">
                <button className="btn btn-outline-custom" onClick={() => alert('Edit profile')}>
                  ✏️ Edit Profile
                </button>
                <button className="btn btn-outline-danger" style={{ borderRadius: 50 }} onClick={() => alert('Log out')}>
                  🚪 Logout
                </button>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              className="section-card mb-4" 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h6 className="section-header" style={{ fontSize: '1.2rem' }}>Quick Actions</h6>
              <div className="d-grid gap-3">
                <div className="quick-action" onClick={() => window.location.hash = '#venues'}>
                  <div className="quick-action-icon">🏛️</div>
                  <div>Manage Venues</div>
                </div>
                <div className="quick-action" onClick={() => window.location.hash = '#reservations'}>
                  <div className="quick-action-icon">📋</div>
                  <div>Manage Bookings</div>
                </div>
                <div className="quick-action" onClick={() => window.location.hash = '#visits'}>
                  <div className="quick-action-icon">👥</div>
                  <div>Manage Visits</div>
                </div>
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.div 
              className="section-card" 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h6 className="section-header" style={{ fontSize: '1.2rem' }}>Notifications</h6>
              <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                {notifications.map(n => (
                  <div key={n.id} className="notification-item">
                    <div className="d-flex align-items-start gap-3">
                      <div className={`notification-icon notification-${n.type}`}>
                        {n.type === 'order' && '📦'}
                        {n.type === 'success' && '✅'}
                        {n.type === 'info' && 'ℹ️'}
                        {n.type === 'warning' && '⚠️'}
                      </div>
                      <div className="flex-grow-1">
                        <div style={{ fontSize: '.95rem', fontWeight: 500 }}>{n.text}</div>
                        <div className="text-muted small mt-1">{n.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </motion.div>
          </aside>

          {/* Main Content Area */}
          <section className="col-lg-8">
            {/* Reservations */}
            <motion.div 
              id="reservations" 
              className="section-card mb-4" 
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="section-header mb-0">Upcoming Wedding Bookings</h5>
              </div>

              <div className="filter-tabs">
                <button 
                  className={`filter-tab ${filterTab === 'all' ? 'active' : ''}`}
                  onClick={() => setFilterTab('all')}
                >
                  All
                </button>
                <button 
                  className={`filter-tab ${filterTab === 'waiting' ? 'active' : ''}`}
                  onClick={() => setFilterTab('waiting')}
                >
                  Waiting
                </button>
                <button 
                  className={`filter-tab ${filterTab === 'approved' ? 'active' : ''}`}
                  onClick={() => setFilterTab('approved')}
                >
                  Approved
                </button>
              </div>

              <div className="table-responsive">
                <table className="table table-custom">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Venue</th>
                      <th>Date</th>
                      <th>Guests</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.filter(r => {
                      if (filterTab === 'all') return true;
                      if (filterTab === 'waiting') return r.status === 'Waiting';
                      if (filterTab === 'approved') return r.status === 'Approved';
                      return true;
                    }).map(r => (
                      <tr key={r.id}>
                        <td style={{ fontWeight: 600 }}>{r.customer}</td>
                        <td>{r.venue}</td>
                        <td>{r.date}</td>
                        <td>{r.guests}</td>
                        <td>
                          <span className={`status-pill ${
                            r.status === 'Waiting' ? 'status-waiting' : 
                            r.status === 'Approved' ? 'status-approved' : 
                            'status-rejected'
                          }`}>
                            {r.status}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button 
                              className="btn btn-sm btn-success" 
                              disabled={r.status !== 'Waiting'} 
                              onClick={() => approveReservation(r.id)}
                              style={{ borderRadius: 8 }}
                            >
                              ✓
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-danger" 
                              disabled={r.status !== 'Waiting'} 
                              onClick={() => rejectReservation(r.id)}
                              style={{ borderRadius: 8 }}
                            >
                              ✕
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Venues */}
            <motion.div 
              id="venues" 
              className="section-card mb-4" 
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="section-header mb-0">Venue Spaces</h5>
                <button className="btn btn-primary-custom" onClick={() => setShowAddVenueModal(true)}>
                  ➕ Add New Venue
                </button>
              </div>

              <div className="row g-3">
                {venues.map(v => (
                  <div key={v.id} className="col-md-6">
                    <div className="item-card">
                      <div className="item-icon">{v.image}</div>
                      <div className="flex-grow-1">
                        <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                          {v.name}
                        </div>
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <span style={{ 
                            background: 'linear-gradient(135deg, var(--gold) 0%, var(--primary) 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: 700
                          }}>
                            {v.price === 'Contact' ? 'Contact for Price' : `${v.price} ILS`}
                          </span>
                          <span className="text-muted" style={{ fontSize: '0.85rem' }}>
                            • {v.capacity} guests
                          </span>
                        </div>
                        <span className="status-pill status-approved" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
                          {v.status}
                        </span>
                        <div className="d-flex gap-2 mt-2">
                          <button className="btn btn-sm btn-outline-secondary" style={{ borderRadius: 8 }} onClick={() => alert('Edit venue')}>
                            Edit
                          </button>
                          <button className="btn btn-sm btn-outline-danger" style={{ borderRadius: 8 }} onClick={() => deleteVenue(v.id)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Visit Requests */}
            <motion.div 
              id="visits" 
              className="section-card" 
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h5 className="section-header">Visit Requests</h5>

              <div className="row g-3">
                {visitRequests.map(v => (
                  <div key={v.id} className="col-12">
                    <div className="item-card">
                      <div className="item-icon">👤</div>
                      <div className="flex-grow-1">
                        <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                          {v.name}
                        </div>
                        <div className="text-muted mb-2">
                          🏛️ {v.venue} • 📅 {v.date} • 🕐 {v.time} • 📱 {v.phone}
                        </div>
                        <span className={`status-pill ${v.status === 'Pending' ? 'status-waiting' : v.status === 'Approved' ? 'status-approved' : 'status-rejected'}`} style={{ fontSize: '0.8rem' }}>
                          {v.status}
                        </span>
                      </div>
                      <div className="d-flex flex-column gap-2">
                        <button 
                          className="btn btn-sm btn-success" 
                          style={{ borderRadius: 8 }} 
                          onClick={() => approveVisit(v.id)}
                          disabled={v.status !== 'Pending'}
                        >
                          Approve Visit
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger" 
                          style={{ borderRadius: 8 }} 
                          onClick={() => rejectVisit(v.id)}
                          disabled={v.status !== 'Pending'}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {visitRequests.length === 0 && (
                  <div className="col-12 text-center text-muted p-4">
                    No pending visit requests
                  </div>
                )}
              </div>
            </motion.div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <div style={{ 
                fontFamily: 'Playfair Display', 
                color: 'var(--gold)', 
                fontSize: '1.5rem', 
                fontWeight: 700,
                marginBottom: '0.8rem'
              }}>
                Wedding Planning System
              </div>
              <p className="text-muted mb-0" style={{ color: '#c9c5c0' }}>
                Premium venue owner dashboard for managing your wedding spaces with elegance and efficiency.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="d-flex gap-4 justify-content-md-end flex-wrap">
                <div>
                  <div className="text-muted small mb-2" style={{ fontWeight: 600 }}>Company</div>
                  <div className="text-muted small">About • Careers • Blog</div>
                </div>
                <div>
                  <div className="text-muted small mb-2" style={{ fontWeight: 600 }}>Support</div>
                  <div className="text-muted small">Help • Contact • Terms</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-muted small mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            © {new Date().getFullYear()} Wedding Planning System — Premium Venue Dashboard Prototype
          </div>
        </div>
      </footer>

      {/* Add Venue Modal */}
      <AnimatePresence>
        {showAddVenueModal && (
          <motion.div 
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
            style={{ zIndex: 2000, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setShowAddVenueModal(false)}
          >
            <motion.div 
              className="modal-custom" 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h5 className="modal-header-custom">Add New Venue Space</h5>
              
              <div className="mb-3">
                <label className="form-label" style={{ fontWeight: 600 }}>Venue Name</label>
                <input 
                  className="form-control form-control-custom" 
                  value={newVenueName} 
                  onChange={(e) => setNewVenueName(e.target.value)}
                  placeholder="e.g., Crystal Ballroom"
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label" style={{ fontWeight: 600 }}>Capacity (guests)</label>
                <input 
                  type="number"
                  className="form-control form-control-custom" 
                  value={newVenueCapacity} 
                  onChange={(e) => setNewVenueCapacity(e.target.value)}
                  placeholder="e.g., 300"
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label" style={{ fontWeight: 600 }}>Price (ILS)</label>
                <input 
                  className="form-control form-control-custom" 
                  value={newVenuePrice} 
                  onChange={(e) => setNewVenuePrice(e.target.value)}
                  placeholder="Leave empty for 'Contact for Price'"
                />
              </div>
              
              <div className="mb-4">
                <label className="form-label" style={{ fontWeight: 600 }}>Icon</label>
                <div className="d-flex gap-2 flex-wrap">
                  {['🏛️', '🌳', '👑', '⛺', '🏰', '🌺', '✨', '🎭'].map(icon => (
                    <button
                      key={icon}
                      className={`btn ${newVenueImage === icon ? 'btn-primary-custom' : 'btn-outline-custom'}`}
                      style={{ 
                        width: 50, 
                        height: 50, 
                        fontSize: '1.5rem',
                        padding: 0
                      }}
                      onClick={() => setNewVenueImage(icon)}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="d-flex justify-content-end gap-3">
                <button 
                  className="btn btn-outline-custom" 
                  onClick={() => setShowAddVenueModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-primary-custom" 
                  onClick={addVenue}
                >
                  Add Venue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}