import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion, AnimatePresence } from 'framer-motion';
import '../style/AdminPage.css';

export default function AdminPage() {
  const [admin, setAdmin] = useState({
    id: 1,
    name: 'System Administrator',
    email: 'admin@weddingplanning.com',
    role: 'Super Admin',
    avatar: 'SA'
  });

  const [stats, setStats] = useState({
    totalVenues: 12,
    totalCustomers: 156,
    pendingApprovals: 8,
    totalRevenue: 125000,
    activeBookings: 24,
    totalServiceProviders: 45,
    totalComplaints: 5,
    pendingPayments: 15000
  });

  const [venueOwners, setVenueOwners] = useState([
    { id: 1, name: 'Grand Palace Hall', email: 'info@grandpalace.com', phone: '+970-59-123-4567', location: 'Ramallah', status: 'Active', venues: 4, joinDate: '2024-01-15', commission: 15 },
    { id: 2, name: 'Royal Gardens', email: 'contact@royalgardens.com', phone: '+970-59-234-5678', location: 'Nablus', status: 'Pending', venues: 2, joinDate: '2024-02-20', commission: 15 },
    { id: 3, name: 'Crystal Events', email: 'info@crystalevents.com', phone: '+970-59-345-6789', location: 'Bethlehem', status: 'Active', venues: 3, joinDate: '2024-01-10', commission: 15 },
    { id: 4, name: 'Golden Hall', email: 'hello@goldenhall.com', phone: '+970-59-456-7890', location: 'Hebron', status: 'Suspended', venues: 2, joinDate: '2024-03-05', commission: 15 }
  ]);

  const [customers, setCustomers] = useState([
    { id: 1, name: 'Ahmad Khalil', email: 'ahmad.k@email.com', phone: '+970-59-111-2222', bookings: 1, totalSpent: 5000, joinDate: '2024-02-01', status: 'Active' },
    { id: 2, name: 'Layla Salem', email: 'layla.s@email.com', phone: '+970-59-222-3333', bookings: 2, totalSpent: 8500, joinDate: '2024-01-15', status: 'Active' },
    { id: 3, name: 'Omar Taha', email: 'omar.t@email.com', phone: '+970-59-333-4444', bookings: 1, totalSpent: 6200, joinDate: '2024-03-10', status: 'Active' },
    { id: 4, name: 'Noor Mahmoud', email: 'noor.m@email.com', phone: '+970-59-444-5555', bookings: 0, totalSpent: 0, joinDate: '2024-03-20', status: 'Inactive' }
  ]);

  const [bookings, setBookings] = useState([
    { id: 101, customer: 'Ahmad Khalil', venue: 'Grand Palace - Main Hall', date: '2026-03-15', amount: 2500, status: 'Confirmed', owner: 'Grand Palace Hall', paymentStatus: 'Paid' },
    { id: 102, customer: 'Layla Salem', venue: 'Royal Gardens - Terrace', date: '2026-03-22', amount: 1800, status: 'Pending', owner: 'Royal Gardens', paymentStatus: 'Pending' },
    { id: 103, customer: 'Omar Taha', venue: 'Crystal Events - Ballroom', date: '2026-04-10', amount: 3500, status: 'Confirmed', owner: 'Crystal Events', paymentStatus: 'Paid' },
    { id: 104, customer: 'Noor Mahmoud', venue: 'Golden Hall - Garden', date: '2026-04-18', amount: 2000, status: 'Cancelled', owner: 'Golden Hall', paymentStatus: 'Refunded' }
  ]);

  const [serviceProviders, setServiceProviders] = useState([
    { id: 1, name: 'Elite Catering', type: 'Catering', email: 'info@elitecatering.com', phone: '+970-59-555-6666', status: 'Active', rating: 4.8 },
    { id: 2, name: 'Perfect Photos', type: 'Photography', email: 'contact@perfectphotos.com', phone: '+970-59-666-7777', status: 'Active', rating: 4.9 },
    { id: 3, name: 'Floral Dreams', type: 'Flowers', email: 'hello@floraldreams.com', phone: '+970-59-777-8888', status: 'Pending', rating: 4.7 },
    { id: 4, name: 'Sound Masters', type: 'Music/DJ', email: 'info@soundmasters.com', phone: '+970-59-888-9999', status: 'Active', rating: 4.6 }
  ]);

  const [complaints, setComplaints] = useState([
    { id: 1, customer: 'Ahmad Khalil', subject: 'Late delivery of decoration', description: 'The decoration team arrived 2 hours late', date: '2024-03-10', status: 'Open', priority: 'High', assignedTo: 'Support Team' },
    { id: 2, customer: 'Layla Salem', subject: 'Poor sound quality', description: 'DJ equipment had technical issues during the event', date: '2024-03-08', status: 'In Progress', priority: 'Medium', assignedTo: 'Technical Team' },
    { id: 3, customer: 'Omar Taha', subject: 'Incorrect cake flavor', description: 'Received vanilla instead of chocolate cake', date: '2024-03-05', status: 'Resolved', priority: 'Low', assignedTo: 'Customer Service' },
    { id: 4, customer: 'Noor Mahmoud', subject: 'Photographer no-show', description: 'Photographer did not arrive at the venue', date: '2024-03-12', status: 'Open', priority: 'Critical', assignedTo: 'Management' },
    { id: 5, customer: 'Sara Ali', subject: 'Venue cleanliness issue', description: 'Hall was not properly cleaned before event', date: '2024-03-15', status: 'Open', priority: 'Medium', assignedTo: 'Facility Team' }
  ]);

  const [payments, setPayments] = useState([
    { id: 1, booking: 101, customer: 'Ahmad Khalil', amount: 2500, commission: 375, netAmount: 2125, date: '2024-03-01', status: 'Completed', method: 'Credit Card' },
    { id: 2, booking: 102, customer: 'Layla Salem', amount: 1800, commission: 270, netAmount: 1530, date: '2024-03-05', status: 'Pending', method: 'Bank Transfer' },
    { id: 3, booking: 103, customer: 'Omar Taha', amount: 3500, commission: 525, netAmount: 2975, date: '2024-03-08', status: 'Completed', method: 'Cash' },
    { id: 4, booking: 104, customer: 'Noor Mahmoud', amount: 2000, commission: 300, netAmount: 1700, date: '2024-03-10', status: 'Refunded', method: 'Credit Card' }
  ]);

  const [activityLog, setActivityLog] = useState([
    { id: 1, user: 'Admin', action: 'Approved venue owner: Royal Gardens', timestamp: '2024-03-15 10:30 AM', type: 'approval' },
    { id: 2, user: 'Ahmad Khalil', action: 'Created new booking #101', timestamp: '2024-03-15 09:15 AM', type: 'booking' },
    { id: 3, user: 'Admin', action: 'Updated system settings', timestamp: '2024-03-14 03:45 PM', type: 'settings' },
    { id: 4, user: 'Layla Salem', action: 'Submitted complaint #2', timestamp: '2024-03-14 11:20 AM', type: 'complaint' },
    { id: 5, user: 'Admin', action: 'Processed payment #1', timestamp: '2024-03-13 02:30 PM', type: 'payment' },
    { id: 6, user: 'Grand Palace Hall', action: 'Updated venue details', timestamp: '2024-03-13 10:00 AM', type: 'update' },
    { id: 7, user: 'Admin', action: 'Suspended user: Golden Hall', timestamp: '2024-03-12 04:15 PM', type: 'suspension' },
    { id: 8, user: 'Omar Taha', action: 'Left review for Crystal Events', timestamp: '2024-03-12 01:30 PM', type: 'review' }
  ]);

  const [contentPages, setContentPages] = useState([
    { id: 1, title: 'Terms & Conditions', slug: 'terms', lastUpdated: '2024-02-01', status: 'Published', author: 'Admin' },
    { id: 2, title: 'Privacy Policy', slug: 'privacy', lastUpdated: '2024-02-01', status: 'Published', author: 'Admin' },
    { id: 3, title: 'About Us', slug: 'about', lastUpdated: '2024-01-15', status: 'Published', author: 'Admin' },
    { id: 4, title: 'FAQ', slug: 'faq', lastUpdated: '2024-03-10', status: 'Draft', author: 'Admin' }
  ]);

  const [systemSettings, setSystemSettings] = useState({
    siteName: 'Wedding Planning System',
    defaultCommission: 15,
    currency: 'ILS',
    timezone: 'Asia/Jerusalem',
    maintenanceMode: false,
    allowNewRegistrations: true,
    requireEmailVerification: true,
    maxBookingsPerDay: 10,
    cancellationDeadline: 24
  });

  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New venue owner registration: Royal Gardens', time: '1h', type: 'order' },
    { id: 2, text: 'Payment received for booking #101 - 2500 ILS', time: '2h', type: 'success' },
    { id: 3, text: 'Service provider pending approval: Floral Dreams', time: '3h', type: 'warning' },
    { id: 4, text: 'Customer complaint reported for booking #104', time: '5h', type: 'warning' },
    { id: 5, text: 'System backup completed successfully', time: '1d', type: 'info' }
  ]);

  const [activeTab, setActiveTab] = useState('overview');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const messagesEndRef = useRef(null);

  const approveVenueOwner = (id) => {
    setVenueOwners(prev => prev.map(v => v.id === id ? { ...v, status: 'Active' } : v));
    setNotifications(prev => [{ id: Date.now(), text: `Venue owner approved: ${venueOwners.find(v => v.id === id)?.name}`, time: 'now', type: 'success' }, ...prev]);
    setStats(prev => ({ ...prev, pendingApprovals: Math.max(0, prev.pendingApprovals - 1) }));
    setActivityLog(prev => [{ id: Date.now(), user: 'Admin', action: `Approved venue owner: ${venueOwners.find(v => v.id === id)?.name}`, timestamp: new Date().toLocaleString(), type: 'approval' }, ...prev]);
  };

  const suspendVenueOwner = (id) => {
    setVenueOwners(prev => prev.map(v => v.id === id ? { ...v, status: 'Suspended' } : v));
    setNotifications(prev => [{ id: Date.now(), text: `Venue owner suspended: ${venueOwners.find(v => v.id === id)?.name}`, time: 'now', type: 'warning' }, ...prev]);
    setActivityLog(prev => [{ id: Date.now(), user: 'Admin', action: `Suspended venue owner: ${venueOwners.find(v => v.id === id)?.name}`, timestamp: new Date().toLocaleString(), type: 'suspension' }, ...prev]);
  };

  const deleteVenueOwner = (id) => {
    const owner = venueOwners.find(v => v.id === id);
    setVenueOwners(prev => prev.filter(v => v.id !== id));
    setNotifications(prev => [{ id: Date.now(), text: `Venue owner deleted: ${owner?.name}`, time: 'now', type: 'warning' }, ...prev]);
    setActivityLog(prev => [{ id: Date.now(), user: 'Admin', action: `Deleted venue owner: ${owner?.name}`, timestamp: new Date().toLocaleString(), type: 'deletion' }, ...prev]);
  };

  const approveServiceProvider = (id) => {
    setServiceProviders(prev => prev.map(s => s.id === id ? { ...s, status: 'Active' } : s));
    setNotifications(prev => [{ id: Date.now(), text: `Service provider approved: ${serviceProviders.find(s => s.id === id)?.name}`, time: 'now', type: 'success' }, ...prev]);
    setActivityLog(prev => [{ id: Date.now(), user: 'Admin', action: `Approved service provider: ${serviceProviders.find(s => s.id === id)?.name}`, timestamp: new Date().toLocaleString(), type: 'approval' }, ...prev]);
  };

  const suspendCustomer = (id) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, status: 'Suspended' } : c));
    setNotifications(prev => [{ id: Date.now(), text: `Customer suspended: ${customers.find(c => c.id === id)?.name}`, time: 'now', type: 'warning' }, ...prev]);
    setActivityLog(prev => [{ id: Date.now(), user: 'Admin', action: `Suspended customer: ${customers.find(c => c.id === id)?.name}`, timestamp: new Date().toLocaleString(), type: 'suspension' }, ...prev]);
  };

  const updateComplaintStatus = (id, newStatus) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    setNotifications(prev => [{ id: Date.now(), text: `Complaint #${id} status updated to ${newStatus}`, time: 'now', type: 'info' }, ...prev]);
    setActivityLog(prev => [{ id: Date.now(), user: 'Admin', action: `Updated complaint #${id} status to ${newStatus}`, timestamp: new Date().toLocaleString(), type: 'complaint' }, ...prev]);
  };

  const processPayment = (id) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, status: 'Completed' } : p));
    setNotifications(prev => [{ id: Date.now(), text: `Payment #${id} processed successfully`, time: 'now', type: 'success' }, ...prev]);
    setActivityLog(prev => [{ id: Date.now(), user: 'Admin', action: `Processed payment #${id}`, timestamp: new Date().toLocaleString(), type: 'payment' }, ...prev]);
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    setShowModal(true);
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

  const renderOverview = () => (
    <div className="row g-4">
      <div className="col-md-6 col-lg-3">
        <motion.div 
          className="stats-card text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="stats-icon">🏛️</div>
          <div className="text-muted mb-2" style={{ fontWeight: 600 }}>Total Venues</div>
          <div className="stats-value">{stats.totalVenues}</div>
        </motion.div>
      </div>
      <div className="col-md-6 col-lg-3">
        <motion.div 
          className="stats-card text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stats-icon">👥</div>
          <div className="text-muted mb-2" style={{ fontWeight: 600 }}>Total Customers</div>
          <div className="stats-value">{stats.totalCustomers}</div>
        </motion.div>
      </div>
      <div className="col-md-6 col-lg-3">
        <motion.div 
          className="stats-card text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stats-icon">⏳</div>
          <div className="text-muted mb-2" style={{ fontWeight: 600 }}>Pending Approvals</div>
          <div className="stats-value">{stats.pendingApprovals}</div>
        </motion.div>
      </div>
      <div className="col-md-6 col-lg-3">
        <motion.div 
          className="stats-card text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="stats-icon">💰</div>
          <div className="text-muted mb-2" style={{ fontWeight: 600 }}>Total Revenue</div>
          <div className="stats-value">{stats.totalRevenue.toLocaleString()}</div>
          <div className="text-muted small">ILS</div>
        </motion.div>
      </div>
      <div className="col-md-6 col-lg-3">
        <motion.div 
          className="stats-card text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="stats-icon">📅</div>
          <div className="text-muted mb-2" style={{ fontWeight: 600 }}>Active Bookings</div>
          <div className="stats-value">{stats.activeBookings}</div>
        </motion.div>
      </div>
      <div className="col-md-6 col-lg-3">
        <motion.div 
          className="stats-card text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="stats-icon">🎯</div>
          <div className="text-muted mb-2" style={{ fontWeight: 600 }}>Service Providers</div>
          <div className="stats-value">{stats.totalServiceProviders}</div>
        </motion.div>
      </div>
      <div className="col-md-6 col-lg-3">
        <motion.div 
          className="stats-card text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="stats-icon">⚠️</div>
          <div className="text-muted mb-2" style={{ fontWeight: 600 }}>Open Complaints</div>
          <div className="stats-value">{stats.totalComplaints}</div>
        </motion.div>
      </div>
      <div className="col-md-6 col-lg-3">
        <motion.div 
          className="stats-card text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="stats-icon">💳</div>
          <div className="text-muted mb-2" style={{ fontWeight: 600 }}>Pending Payments</div>
          <div className="stats-value">{stats.pendingPayments.toLocaleString()}</div>
          <div className="text-muted small">ILS</div>
        </motion.div>
      </div>
    </div>
  );

  const renderVenueOwners = () => (
    <div className="section-card">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="section-header mb-0">Venue Owners Management</h5>
        <div className="d-flex gap-2">
          <select 
            className="form-select form-control-custom" 
            style={{ width: 'auto' }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-custom">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Location</th>
              <th>Venues</th>
              <th>Commission %</th>
              <th>Join Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {venueOwners.filter(v => filterStatus === 'all' || v.status === filterStatus).map(owner => (
              <tr key={owner.id}>
                <td style={{ fontWeight: 600 }}>{owner.name}</td>
                <td>
                  <div style={{ fontSize: '0.9rem' }}>
                    <div>{owner.email}</div>
                    <div className="text-muted">{owner.phone}</div>
                  </div>
                </td>
                <td>{owner.location}</td>
                <td>{owner.venues}</td>
                <td>{owner.commission}%</td>
                <td>{owner.joinDate}</td>
                <td>
                  <span className={`status-pill status-${owner.status.toLowerCase()}`}>
                    {owner.status}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    {owner.status === 'Pending' && (
                      <button 
                        className="btn btn-sm btn-success" 
                        style={{ borderRadius: 8 }}
                        onClick={() => approveVenueOwner(owner.id)}
                        title="Approve"
                      >
                        ✓
                      </button>
                    )}
                    {owner.status === 'Active' && (
                      <button 
                        className="btn btn-sm btn-warning" 
                        style={{ borderRadius: 8 }}
                        onClick={() => suspendVenueOwner(owner.id)}
                        title="Suspend"
                      >
                        ⏸
                      </button>
                    )}
                    <button 
                      className="btn btn-sm btn-outline-primary" 
                      style={{ borderRadius: 8 }}
                      onClick={() => openModal('viewOwner', owner)}
                      title="View Details"
                    >
                      👁️
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger" 
                      style={{ borderRadius: 8 }}
                      onClick={() => deleteVenueOwner(owner.id)}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="section-card">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="section-header mb-0">Customer Management</h5>
      </div>

      <div className="table-responsive">
        <table className="table table-custom">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Bookings</th>
              <th>Total Spent</th>
              <th>Join Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td style={{ fontWeight: 600 }}>{customer.name}</td>
                <td>
                  <div style={{ fontSize: '0.9rem' }}>
                    <div>{customer.email}</div>
                    <div className="text-muted">{customer.phone}</div>
                  </div>
                </td>
                <td>{customer.bookings}</td>
                <td>{customer.totalSpent.toLocaleString()} ILS</td>
                <td>{customer.joinDate}</td>
                <td>
                  <span className={`status-pill status-${customer.status.toLowerCase()}`}>
                    {customer.status}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-sm btn-outline-primary" 
                      style={{ borderRadius: 8 }}
                      onClick={() => openModal('viewCustomer', customer)}
                      title="View Details"
                    >
                      👁️
                    </button>
                    {customer.status === 'Active' && (
                      <button 
                        className="btn btn-sm btn-warning" 
                        style={{ borderRadius: 8 }}
                        onClick={() => suspendCustomer(customer.id)}
                        title="Suspend"
                      >
                        ⏸
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="section-card">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="section-header mb-0">All Bookings</h5>
      </div>

      <div className="table-responsive">
        <table className="table table-custom">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Venue</th>
              <th>Owner</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td style={{ fontWeight: 600 }}>#{booking.id}</td>
                <td>{booking.customer}</td>
                <td>{booking.venue}</td>
                <td>{booking.owner}</td>
                <td>{booking.date}</td>
                <td>{booking.amount.toLocaleString()} ILS</td>
                <td>
                  <span className={`status-pill status-${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                </td>
                <td>
                  <span className={`status-pill status-${booking.paymentStatus.toLowerCase()}`}>
                    {booking.paymentStatus}
                  </span>
                </td>
                <td>
                  <button 
                    className="btn btn-sm btn-outline-primary" 
                    style={{ borderRadius: 8 }}
                    onClick={() => openModal('viewBooking', booking)}
                    title="View Details"
                  >
                    👁️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderServiceProviders = () => (
    <div className="section-card">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="section-header mb-0">Service Providers</h5>
      </div>

      <div className="table-responsive">
        <table className="table table-custom">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Contact</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {serviceProviders.map(provider => (
              <tr key={provider.id}>
                <td style={{ fontWeight: 600 }}>{provider.name}</td>
                <td>{provider.type}</td>
                <td>
                  <div style={{ fontSize: '0.9rem' }}>
                    <div>{provider.email}</div>
                    <div className="text-muted">{provider.phone}</div>
                  </div>
                </td>
                <td>
                  <span style={{ color: 'var(--gold)', fontWeight: 600 }}>
                    ⭐ {provider.rating}
                  </span>
                </td>
                <td>
                  <span className={`status-pill status-${provider.status.toLowerCase()}`}>
                    {provider.status}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    {provider.status === 'Pending' && (
                      <button 
                        className="btn btn-sm btn-success" 
                        style={{ borderRadius: 8 }}
                        onClick={() => approveServiceProvider(provider.id)}
                        title="Approve"
                      >
                        ✓
                      </button>
                    )}
                    <button 
                      className="btn btn-sm btn-outline-primary" 
                      style={{ borderRadius: 8 }}
                      onClick={() => openModal('viewProvider', provider)}
                      title="View Details"
                    >
                      👁️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderComplaints = () => (
    <div className="section-card">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="section-header mb-0">Complaints Management</h5>
        <div className="d-flex gap-2">
          <select 
            className="form-select form-control-custom" 
            style={{ width: 'auto' }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-custom">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.filter(c => filterStatus === 'all' || c.status === filterStatus).map(complaint => (
              <tr key={complaint.id}>
                <td style={{ fontWeight: 600 }}>#{complaint.id}</td>
                <td>{complaint.customer}</td>
                <td>{complaint.subject}</td>
                <td>{complaint.date}</td>
                <td>
                  <span className={`status-pill priority-${complaint.priority.toLowerCase()}`}>
                    {complaint.priority}
                  </span>
                </td>
                <td>
                  <span className={`status-pill status-${complaint.status.toLowerCase().replace(' ', '-')}`}>
                    {complaint.status}
                  </span>
                </td>
                <td>{complaint.assignedTo}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-sm btn-outline-primary" 
                      style={{ borderRadius: 8 }}
                      onClick={() => openModal('viewComplaint', complaint)}
                      title="View Details"
                    >
                      👁️
                    </button>
                    {complaint.status !== 'Resolved' && (
                      <button 
                        className="btn btn-sm btn-success" 
                        style={{ borderRadius: 8 }}
                        onClick={() => updateComplaintStatus(complaint.id, 'Resolved')}
                        title="Mark as Resolved"
                      >
                        ✓
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="section-card">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="section-header mb-0">Payments & Commissions</h5>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div style={{ 
            background: 'linear-gradient(135deg, #E8F7EE 0%, #D1F0DD 100%)', 
            padding: '1.5rem', 
            borderRadius: 16,
            border: '1px solid rgba(31,122,52,0.2)'
          }}>
            <div className="text-muted mb-2" style={{ fontWeight: 600 }}>Total Revenue</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1F7A34' }}>
              {payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()} ILS
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div style={{ 
            background: 'linear-gradient(135deg, #FFF4CE 0%, #FFE8A3 100%)', 
            padding: '1.5rem', 
            borderRadius: 16,
            border: '1px solid rgba(138,107,0,0.2)'
          }}>
            <div className="text-muted mb-2" style={{ fontWeight: 600 }}>Total Commission</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#8A6B00' }}>
              {payments.reduce((sum, p) => sum + p.commission, 0).toLocaleString()} ILS
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div style={{ 
            background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)', 
            padding: '1.5rem', 
            borderRadius: 16,
            border: '1px solid rgba(21,101,192,0.2)'
          }}>
            <div className="text-muted mb-2" style={{ fontWeight: 600 }}>Net to Owners</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1565C0' }}>
              {payments.reduce((sum, p) => sum + p.netAmount, 0).toLocaleString()} ILS
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-custom">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Booking</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Commission (15%)</th>
              <th>Net Amount</th>
              <th>Date</th>
              <th>Method</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id}>
                <td style={{ fontWeight: 600 }}>#{payment.id}</td>
                <td>#{payment.booking}</td>
                <td>{payment.customer}</td>
                <td>{payment.amount.toLocaleString()} ILS</td>
                <td style={{ color: 'var(--gold)', fontWeight: 600 }}>{payment.commission.toLocaleString()} ILS</td>
                <td style={{ fontWeight: 600 }}>{payment.netAmount.toLocaleString()} ILS</td>
                <td>{payment.date}</td>
                <td>{payment.method}</td>
                <td>
                  <span className={`status-pill status-${payment.status.toLowerCase()}`}>
                    {payment.status}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-sm btn-outline-primary" 
                      style={{ borderRadius: 8 }}
                      onClick={() => openModal('viewPayment', payment)}
                      title="View Details"
                    >
                      👁️
                    </button>
                    {payment.status === 'Pending' && (
                      <button 
                        className="btn btn-sm btn-success" 
                        style={{ borderRadius: 8 }}
                        onClick={() => processPayment(payment.id)}
                        title="Process Payment"
                      >
                        ✓
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="section-card">
      <h5 className="section-header">Financial Reports & Analytics</h5>
      
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: 16,
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h6 style={{ fontFamily: 'Playfair Display', fontWeight: 700, marginBottom: '1.5rem' }}>
              📊 Monthly Revenue Trend
            </h6>
            <div style={{ height: 250, display: 'flex', alignItems: 'flex-end', gap: 10 }}>
              {[45, 62, 58, 75, 82, 70].map((height, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ 
                    width: '100%', 
                    height: `${height}%`, 
                    background: 'linear-gradient(135deg, var(--gold) 0%, var(--primary) 100%)',
                    borderRadius: '8px 8px 0 0',
                    transition: 'all 0.3s ease'
                  }}></div>
                  <div className="text-muted small mt-2">M{i+1}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: 16,
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h6 style={{ fontFamily: 'Playfair Display', fontWeight: 700, marginBottom: '1.5rem' }}>
              💰 Revenue Breakdown
            </h6>
            <div className="d-flex flex-column gap-3">
              <div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Venue Bookings</span>
                  <span style={{ fontWeight: 700 }}>65%</span>
                </div>
                <div style={{ 
                  height: 12, 
                  background: 'var(--cream)', 
                  borderRadius: 6, 
                  overflow: 'hidden' 
                }}>
                  <div style={{ 
                    width: '65%', 
                    height: '100%', 
                    background: 'linear-gradient(90deg, var(--gold), var(--primary))',
                    transition: 'width 0.5s ease'
                  }}></div>
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Photography</span>
                  <span style={{ fontWeight: 700 }}>20%</span>
                </div>
                <div style={{ 
                  height: 12, 
                  background: 'var(--cream)', 
                  borderRadius: 6, 
                  overflow: 'hidden' 
                }}>
                  <div style={{ 
                    width: '20%', 
                    height: '100%', 
                    background: 'linear-gradient(90deg, var(--gold), var(--primary))',
                    transition: 'width 0.5s ease'
                  }}></div>
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Catering & Others</span>
                  <span style={{ fontWeight: 700 }}>15%</span>
                </div>
                <div style={{ 
                  height: 12, 
                  background: 'var(--cream)', 
                  borderRadius: 6, 
                  overflow: 'hidden' 
                }}>
                  <div style={{ 
                    width: '15%', 
                    height: '100%', 
                    background: 'linear-gradient(90deg, var(--gold), var(--primary))',
                    transition: 'width 0.5s ease'
                  }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div style={{ 
            background: 'linear-gradient(135deg, #E8F7EE 0%, #D1F0DD 100%)', 
            padding: '1.5rem', 
            borderRadius: 16,
            border: '1px solid rgba(31,122,52,0.2)'
          }}>
            <div className="text-muted mb-2" style={{ fontWeight: 600 }}>Avg. Booking Value</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1F7A34' }}>2,450 ILS</div>
            <div className="text-muted small mt-2">↑ 12% from last month</div>
          </div>
        </div>
        <div className="col-md-4">
          <div style={{ 
            background: 'linear-gradient(135deg, #FFF4CE 0%, #FFE8A3 100%)', 
            padding: '1.5rem', 
            borderRadius: 16,
            border: '1px solid rgba(138,107,0,0.2)'
          }}>
            <div className="text-muted mb-2" style={{ fontWeight: 600 }}>Commission Rate</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#8A6B00' }}>15%</div>
            <div className="text-muted small mt-2">Standard rate</div>
          </div>
        </div>
        <div className="col-md-4">
          <div style={{ 
            background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)', 
            padding: '1.5rem', 
            borderRadius: 16,
            border: '1px solid rgba(21,101,192,0.2)'
          }}>
            <div className="text-muted mb-2" style={{ fontWeight: 600 }}>Customer Retention</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1565C0' }}>78%</div>
            <div className="text-muted small mt-2">↑ 5% from last quarter</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="section-card">
      <h5 className="section-header">System Settings</h5>
      
      <div className="row g-4">
        <div className="col-md-6">
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: 16,
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h6 style={{ fontFamily: 'Playfair Display', fontWeight: 700, marginBottom: '1.5rem' }}>
              ⚙️ General Settings
            </h6>
            <div className="mb-3">
              <label className="text-muted small mb-2">Site Name</label>
              <input 
                type="text" 
                className="form-control form-control-custom" 
                value={systemSettings.siteName}
                onChange={(e) => setSystemSettings({...systemSettings, siteName: e.target.value})}
              />
            </div>
            <div className="mb-3">
              <label className="text-muted small mb-2">Default Commission (%)</label>
              <input 
                type="number" 
                className="form-control form-control-custom" 
                value={systemSettings.defaultCommission}
                onChange={(e) => setSystemSettings({...systemSettings, defaultCommission: parseInt(e.target.value)})}
              />
            </div>
            <div className="mb-3">
              <label className="text-muted small mb-2">Currency</label>
              <select 
                className="form-select form-control-custom"
                value={systemSettings.currency}
                onChange={(e) => setSystemSettings({...systemSettings, currency: e.target.value})}
              >
                <option value="ILS">ILS (Israeli Shekel)</option>
                <option value="USD">USD (US Dollar)</option>
                <option value="EUR">EUR (Euro)</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="text-muted small mb-2">Timezone</label>
              <select 
                className="form-select form-control-custom"
                value={systemSettings.timezone}
                onChange={(e) => setSystemSettings({...systemSettings, timezone: e.target.value})}
              >
                <option value="Asia/Jerusalem">Asia/Jerusalem</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">America/New_York</option>
              </select>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: 16,
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h6 style={{ fontFamily: 'Playfair Display', fontWeight: 700, marginBottom: '1.5rem' }}>
              🔒 Security & Access
            </h6>
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center p-3" style={{ 
                background: 'var(--cream)', 
                borderRadius: 12 
              }}>
                <div>
                  <div style={{ fontWeight: 600 }}>Maintenance Mode</div>
                  <div className="text-muted small">Disable public access</div>
                </div>
                <div className="form-check form-switch">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={systemSettings.maintenanceMode}
                    onChange={(e) => setSystemSettings({...systemSettings, maintenanceMode: e.target.checked})}
                    style={{ width: 50, height: 25 }}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center p-3" style={{ 
                background: 'var(--cream)', 
                borderRadius: 12 
              }}>
                <div>
                  <div style={{ fontWeight: 600 }}>Allow New Registrations</div>
                  <div className="text-muted small">Enable user sign-ups</div>
                </div>
                <div className="form-check form-switch">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={systemSettings.allowNewRegistrations}
                    onChange={(e) => setSystemSettings({...systemSettings, allowNewRegistrations: e.target.checked})}
                    style={{ width: 50, height: 25 }}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center p-3" style={{ 
                background: 'var(--cream)', 
                borderRadius: 12 
              }}>
                <div>
                  <div style={{ fontWeight: 600 }}>Email Verification Required</div>
                  <div className="text-muted small">Verify user emails</div>
                </div>
                <div className="form-check form-switch">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={systemSettings.requireEmailVerification}
                    onChange={(e) => setSystemSettings({...systemSettings, requireEmailVerification: e.target.checked})}
                    style={{ width: 50, height: 25 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: 16,
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h6 style={{ fontFamily: 'Playfair Display', fontWeight: 700, marginBottom: '1.5rem' }}>
              📋 Booking Settings
            </h6>
            <div className="mb-3">
              <label className="text-muted small mb-2">Max Bookings Per Day</label>
              <input 
                type="number" 
                className="form-control form-control-custom" 
                value={systemSettings.maxBookingsPerDay}
                onChange={(e) => setSystemSettings({...systemSettings, maxBookingsPerDay: parseInt(e.target.value)})}
              />
            </div>
            <div className="mb-3">
              <label className="text-muted small mb-2">Cancellation Deadline (hours)</label>
              <input 
                type="number" 
                className="form-control form-control-custom" 
                value={systemSettings.cancellationDeadline}
                onChange={(e) => setSystemSettings({...systemSettings, cancellationDeadline: parseInt(e.target.value)})}
              />
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: 16,
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h6 style={{ fontFamily: 'Playfair Display', fontWeight: 700, marginBottom: '1.5rem' }}>
              💾 System Actions
            </h6>
            <div className="d-grid gap-3">
              <button className="btn btn-outline-custom" onClick={() => alert('Backup initiated')}>
                💾 Backup Database
              </button>
              <button className="btn btn-outline-custom" onClick={() => alert('Cache cleared')}>
                🗑️ Clear Cache
              </button>
              <button className="btn btn-outline-custom" onClick={() => alert('Logs exported')}>
                📄 Export Logs
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-end mt-4">
        <button 
          className="btn btn-primary-custom"
          onClick={() => {
            setNotifications(prev => [{ id: Date.now(), text: 'System settings updated successfully', time: 'now', type: 'success' }, ...prev]);
            setActivityLog(prev => [{ id: Date.now(), user: 'Admin', action: 'Updated system settings', timestamp: new Date().toLocaleString(), type: 'settings' }, ...prev]);
          }}
        >
          💾 Save Settings
        </button>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="section-card">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="section-header mb-0">Content Management</h5>
        <button className="btn btn-primary-custom" onClick={() => openModal('addContent')}>
          ➕ Add New Page
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-custom">
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Last Updated</th>
              <th>Author</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contentPages.map(page => (
              <tr key={page.id}>
                <td style={{ fontWeight: 600 }}>{page.title}</td>
                <td>/{page.slug}</td>
                <td>{page.lastUpdated}</td>
                <td>{page.author}</td>
                <td>
                  <span className={`status-pill status-${page.status.toLowerCase()}`}>
                    {page.status}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-sm btn-outline-primary" 
                      style={{ borderRadius: 8 }}
                      onClick={() => openModal('editContent', page)}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-success" 
                      style={{ borderRadius: 8 }}
                      onClick={() => alert(`Preview: ${page.title}`)}
                      title="Preview"
                    >
                      👁️
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger" 
                      style={{ borderRadius: 8 }}
                      onClick={() => {
                        setContentPages(prev => prev.filter(p => p.id !== page.id));
                        setNotifications(prev => [{ id: Date.now(), text: `Content page deleted: ${page.title}`, time: 'now', type: 'warning' }, ...prev]);
                      }}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderActivityLog = () => (
    <div className="section-card">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="section-header mb-0">Activity Log</h5>
        <button className="btn btn-outline-custom" onClick={() => alert('Logs exported')}>
          📥 Export Logs
        </button>
      </div>

      <div style={{ maxHeight: 600, overflowY: 'auto' }}>
        {activityLog.map(log => (
          <div key={log.id} className="notification-item">
            <div className="d-flex align-items-start gap-3">
              <div className={`notification-icon notification-${
                log.type === 'approval' ? 'success' :
                log.type === 'booking' ? 'info' :
                log.type === 'complaint' ? 'warning' :
                log.type === 'payment' ? 'success' :
                log.type === 'suspension' ? 'warning' :
                'info'
              }`}>
                {log.type === 'approval' && '✓'}
                {log.type === 'booking' && '📋'}
                {log.type === 'complaint' && '⚠️'}
                {log.type === 'payment' && '💰'}
                {log.type === 'suspension' && '⏸'}
                {log.type === 'settings' && '⚙️'}
                {log.type === 'update' && '✏️'}
                {log.type === 'review' && '⭐'}
                {log.type === 'deletion' && '🗑️'}
              </div>
              <div className="flex-grow-1">
                <div style={{ fontSize: '.95rem', fontWeight: 500 }}>
                  <span style={{ color: 'var(--gold)', fontWeight: 700 }}>{log.user}</span> {log.action}
                </div>
                <div className="text-muted small mt-1">{log.timestamp}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

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
              W
            </motion.div>
            <span className="ms-3 brand-primary">Wedding Planning System</span>
          </a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
              <li className="nav-item"><a className="nav-link active" href="/admin">Admin</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="admin-hero container">
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
                Admin Dashboard
              </h1>
              <p className="text-muted mb-0" style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                Complete system control and management for the Wedding Planning Platform
              </p>
            </div>
            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
              <div className="d-inline-flex align-items-center gap-3 p-3" style={{
                background: 'white',
                borderRadius: 20,
                boxShadow: '0 8px 30px rgba(0,0,0,0.08)'
              }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{admin.name}</div>
                  <div className="text-muted" style={{ fontSize: '.95rem' }}>{admin.role}</div>
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
                  {admin.avatar}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <main className="container my-5">
        <div className="row g-4">
          {/* Sidebar */}
          <aside className="col-lg-3">
            {/* Profile Card */}
            <motion.div 
              className="profile-card mb-4" 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="profile-avatar">{admin.avatar}</div>
              <div className="profile-content text-center">
                <h4 style={{ fontFamily: 'Playfair Display', fontWeight: 700, marginTop: '1rem' }}>
                  {admin.name}
                </h4>
                <div className="mb-3">
                  <span className="status-pill status-active">
                    {admin.role}
                  </span>
                </div>
              </div>
              
              <div style={{ background: 'var(--cream)', borderRadius: 12, padding: '1rem', marginBottom: '1rem' }}>
                <div className="mb-3">
                  <div className="text-muted small mb-1">Email</div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{admin.email}</div>
                </div>
                <div>
                  <div className="text-muted small mb-1">Access Level</div>
                  <div style={{ fontWeight: 600 }}>Full Control</div>
                </div>
              </div>
              
              <div className="d-grid gap-2">
                <button className="btn btn-outline-custom" onClick={() => setActiveTab('settings')}>
                  ⚙️ Settings
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
                <div className="quick-action" onClick={() => setActiveTab('venues')}>
                  <div className="quick-action-icon">🏛️</div>
                  <div>Manage Venues</div>
                </div>
                <div className="quick-action" onClick={() => setActiveTab('complaints')}>
                  <div className="quick-action-icon">⚠️</div>
                  <div>View Complaints</div>
                </div>
                <div className="quick-action" onClick={() => setActiveTab('payments')}>
                  <div className="quick-action-icon">💰</div>
                  <div>Payments</div>
                </div>
                <div className="quick-action" onClick={() => setActiveTab('reports')}>
                  <div className="quick-action-icon">📊</div>
                  <div>Reports</div>
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
              <h6 className="section-header" style={{ fontSize: '1.2rem' }}>System Alerts</h6>
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
          <section className="col-lg-9">
            {/* Tab Navigation */}
            <div className="tab-nav">
              <button 
                className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                📊 Overview
              </button>
              <button 
                className={`tab-button ${activeTab === 'venues' ? 'active' : ''}`}
                onClick={() => setActiveTab('venues')}
              >
                🏛️ Venues
              </button>
              <button 
                className={`tab-button ${activeTab === 'customers' ? 'active' : ''}`}
                onClick={() => setActiveTab('customers')}
              >
                👥 Customers
              </button>
              <button 
                className={`tab-button ${activeTab === 'bookings' ? 'active' : ''}`}
                onClick={() => setActiveTab('bookings')}
              >
                📋 Bookings
              </button>
              <button 
                className={`tab-button ${activeTab === 'providers' ? 'active' : ''}`}
                onClick={() => setActiveTab('providers')}
              >
                🎯 Providers
              </button>
              <button 
                className={`tab-button ${activeTab === 'complaints' ? 'active' : ''}`}
                onClick={() => setActiveTab('complaints')}
              >
                ⚠️ Complaints
              </button>
              <button 
                className={`tab-button ${activeTab === 'payments' ? 'active' : ''}`}
                onClick={() => setActiveTab('payments')}
              >
                💰 Payments
              </button>
              <button 
                className={`tab-button ${activeTab === 'reports' ? 'active' : ''}`}
                onClick={() => setActiveTab('reports')}
              >
                📊 Reports
              </button>
              <button 
                className={`tab-button ${activeTab === 'content' ? 'active' : ''}`}
                onClick={() => setActiveTab('content')}
              >
                📄 Content
              </button>
              <button 
                className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                ⚙️ Settings
              </button>
              <button 
                className={`tab-button ${activeTab === 'activity' ? 'active' : ''}`}
                onClick={() => setActiveTab('activity')}
              >
                📜 Activity Log
              </button>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'overview' && renderOverview()}
                {activeTab === 'venues' && renderVenueOwners()}
                {activeTab === 'customers' && renderCustomers()}
                {activeTab === 'bookings' && renderBookings()}
                {activeTab === 'providers' && renderServiceProviders()}
                {activeTab === 'complaints' && renderComplaints()}
                {activeTab === 'payments' && renderPayments()}
                {activeTab === 'reports' && renderReports()}
                {activeTab === 'content' && renderContent()}
                {activeTab === 'settings' && renderSettings()}
                {activeTab === 'activity' && renderActivityLog()}
              </motion.div>
            </AnimatePresence>
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
                Complete administrative control for managing the wedding planning platform.
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
            © {new Date().getFullYear()} Wedding Planning System — Admin Dashboard
          </div>
        </div>
      </footer>

      {/* View Details Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
            style={{ zIndex: 2000, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div 
              className="modal-custom" 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h5 className="modal-header-custom">
                {modalType === 'viewOwner' && '🏛️ Venue Owner Details'}
                {modalType === 'viewCustomer' && '👤 Customer Details'}
                {modalType === 'viewBooking' && '📋 Booking Details'}
                {modalType === 'viewProvider' && '🎯 Service Provider Details'}
                {modalType === 'viewComplaint' && '⚠️ Complaint Details'}
                {modalType === 'viewPayment' && '💰 Payment Details'}
                {modalType === 'addContent' && '➕ Add New Page'}
                {modalType === 'editContent' && '✏️ Edit Page'}
              </h5>
              
              {selectedItem && (
                <div>
                  {modalType === 'viewOwner' && (
                    <div>
                      <div className="mb-3">
                        <label className="text-muted small">Name</label>
                        <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{selectedItem.name}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Email</label>
                        <div>{selectedItem.email}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Phone</label>
                        <div>{selectedItem.phone}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Location</label>
                        <div>{selectedItem.location}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Total Venues</label>
                        <div>{selectedItem.venues}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Commission Rate</label>
                        <div>{selectedItem.commission}%</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Join Date</label>
                        <div>{selectedItem.joinDate}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Status</label>
                        <div>
                          <span className={`status-pill status-${selectedItem.status.toLowerCase()}`}>
                            {selectedItem.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {modalType === 'viewCustomer' && (
                    <div>
                      <div className="mb-3">
                        <label className="text-muted small">Name</label>
                        <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{selectedItem.name}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Email</label>
                        <div>{selectedItem.email}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Phone</label>
                        <div>{selectedItem.phone}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Total Bookings</label>
                        <div>{selectedItem.bookings}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Total Spent</label>
                        <div>{selectedItem.totalSpent.toLocaleString()} ILS</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Join Date</label>
                        <div>{selectedItem.joinDate}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Status</label>
                        <div>
                          <span className={`status-pill status-${selectedItem.status.toLowerCase()}`}>
                            {selectedItem.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {modalType === 'viewBooking' && (
                    <div>
                      <div className="mb-3">
                        <label className="text-muted small">Booking ID</label>
                        <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>#{selectedItem.id}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Customer</label>
                        <div>{selectedItem.customer}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Venue</label>
                        <div>{selectedItem.venue}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Venue Owner</label>
                        <div>{selectedItem.owner}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Event Date</label>
                        <div>{selectedItem.date}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Amount</label>
                        <div style={{ fontWeight: 600, color: 'var(--gold)' }}>{selectedItem.amount.toLocaleString()} ILS</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Booking Status</label>
                        <div>
                          <span className={`status-pill status-${selectedItem.status.toLowerCase()}`}>
                            {selectedItem.status}
                          </span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Payment Status</label>
                        <div>
                          <span className={`status-pill status-${selectedItem.paymentStatus.toLowerCase()}`}>
                            {selectedItem.paymentStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {modalType === 'viewProvider' && (
                    <div>
                      <div className="mb-3">
                        <label className="text-muted small">Name</label>
                        <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{selectedItem.name}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Service Type</label>
                        <div>{selectedItem.type}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Email</label>
                        <div>{selectedItem.email}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Phone</label>
                        <div>{selectedItem.phone}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Rating</label>
                        <div style={{ color: 'var(--gold)', fontWeight: 600 }}>⭐ {selectedItem.rating}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Status</label>
                        <div>
                          <span className={`status-pill status-${selectedItem.status.toLowerCase()}`}>
                            {selectedItem.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {modalType === 'viewComplaint' && (
                    <div>
                      <div className="mb-3">
                        <label className="text-muted small">Complaint ID</label>
                        <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>#{selectedItem.id}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Customer</label>
                        <div>{selectedItem.customer}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Subject</label>
                        <div style={{ fontWeight: 600 }}>{selectedItem.subject}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Description</label>
                        <div>{selectedItem.description}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Date Submitted</label>
                        <div>{selectedItem.date}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Priority</label>
                        <div>
                          <span className={`status-pill priority-${selectedItem.priority.toLowerCase()}`}>
                            {selectedItem.priority}
                          </span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Status</label>
                        <div>
                          <span className={`status-pill status-${selectedItem.status.toLowerCase().replace(' ', '-')}`}>
                            {selectedItem.status}
                          </span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Assigned To</label>
                        <div>{selectedItem.assignedTo}</div>
                      </div>
                    </div>
                  )}

                  {modalType === 'viewPayment' && (
                    <div>
                      <div className="mb-3">
                        <label className="text-muted small">Payment ID</label>
                        <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>#{selectedItem.id}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Booking ID</label>
                        <div>#{selectedItem.booking}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Customer</label>
                        <div>{selectedItem.customer}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Total Amount</label>
                        <div style={{ fontWeight: 600, fontSize: '1.2rem' }}>{selectedItem.amount.toLocaleString()} ILS</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Commission (15%)</label>
                        <div style={{ color: 'var(--gold)', fontWeight: 600 }}>{selectedItem.commission.toLocaleString()} ILS</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Net Amount to Owner</label>
                        <div style={{ fontWeight: 600 }}>{selectedItem.netAmount.toLocaleString()} ILS</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Payment Date</label>
                        <div>{selectedItem.date}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Payment Method</label>
                        <div>{selectedItem.method}</div>
                      </div>
                      <div className="mb-3">
                        <label className="text-muted small">Status</label>
                        <div>
                          <span className={`status-pill status-${selectedItem.status.toLowerCase()}`}>
                            {selectedItem.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {(modalType === 'addContent' || modalType === 'editContent') && (
                <div>
                  <div className="mb-3">
                    <label className="text-muted small mb-2">Page Title</label>
                    <input 
                      type="text" 
                      className="form-control form-control-custom" 
                      placeholder="Enter page title"
                      defaultValue={selectedItem?.title || ''}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="text-muted small mb-2">URL Slug</label>
                    <input 
                      type="text" 
                      className="form-control form-control-custom" 
                      placeholder="page-url-slug"
                      defaultValue={selectedItem?.slug || ''}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="text-muted small mb-2">Content</label>
                    <textarea 
                      className="form-control form-control-custom" 
                      rows={6}
                      placeholder="Enter page content..."
                      defaultValue={selectedItem?.content || ''}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="text-muted small mb-2">Status</label>
                    <select className="form-select form-control-custom" defaultValue={selectedItem?.status || 'Draft'}>
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                    </select>
                  </div>
                </div>
              )}
              
              <div className="d-flex justify-content-end gap-3 mt-4">
                {(modalType === 'addContent' || modalType === 'editContent') && (
                  <button 
                    className="btn btn-primary-custom" 
                    onClick={() => {
                      setShowModal(false);
                      setNotifications(prev => [{ id: Date.now(), text: `Content page ${modalType === 'addContent' ? 'created' : 'updated'} successfully`, time: 'now', type: 'success' }, ...prev]);
                    }}
                  >
                    💾 Save Page
                  </button>
                )}
                <button 
                  className="btn btn-outline-custom" 
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}