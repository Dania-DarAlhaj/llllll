import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion, AnimatePresence } from 'framer-motion';
import '../style/Dj.css';

export default function DJPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Welcome! I\'m here to help you find the perfect DJ for your wedding celebration. How can I assist you today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const djs = [
    {
      id: 1,
      name: 'DJ Maestro',
      image: '/images/DJ.jpg',
      rating: 4.9,
      reviews: 142,
      location: 'Ramallah',
      price: 2500,
      experience: '10+ years',
      description: 'Professional DJ with extensive experience in weddings and special events',
      availableDates: ['2024-01-15', '2024-02-20', '2024-03-10']
    },
    {
      id: 2,
      name: 'DJ Rhythm',
      image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      reviews: 128,
      location: 'Nablus',
      price: 2200,
      experience: '8+ years',
      description: 'Energetic DJ specializing in Arabic and international music',
      availableDates: ['2024-01-20', '2024-02-15', '2024-03-25']
    },
    {
      id: 3,
      name: 'DJ Elite',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
      rating: 5.0,
      reviews: 165,
      location: 'Bethlehem',
      price: 3000,
      experience: '12+ years',
      description: 'Premium DJ service with state-of-the-art equipment and lighting',
      availableDates: ['2024-01-10', '2024-02-28', '2024-03-15']
    },
    {
      id: 4,
      name: 'DJ Vibe',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      reviews: 98,
      location: 'Hebron',
      price: 1800,
      experience: '6+ years',
      description: 'Dynamic DJ with a modern approach to wedding entertainment',
      availableDates: ['2024-01-25', '2024-02-10', '2024-03-20']
    },
    {
      id: 5,
      name: 'DJ Pulse',
      image: '/images/DJ.jpg',
      rating: 4.9,
      reviews: 156,
      location: 'Ramallah',
      price: 2800,
      experience: '11+ years',
      description: 'Expert in creating unforgettable party atmospheres with premium sound',
      availableDates: ['2024-01-18', '2024-02-22', '2024-03-12']
    },
    {
      id: 6,
      name: 'DJ Fusion',
      image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      reviews: 134,
      location: 'Nablus',
      price: 2400,
      experience: '9+ years',
      description: 'Versatile DJ mixing traditional and contemporary music styles',
      availableDates: ['2024-01-22', '2024-02-18', '2024-03-28']
    }
  ];

  const locations = ['all', 'Ramallah', 'Nablus', 'Bethlehem', 'Hebron'];
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'low', label: 'Under 2,000 ₪' },
    { value: 'medium', label: '2,000 - 2,500 ₪' },
    { value: 'high', label: 'Over 2,500 ₪' }
  ];

  const filteredDJs = djs.filter(dj => {
    const matchesSearch = dj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dj.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = selectedLocation === 'all' || dj.location === selectedLocation;
    
    const matchesPrice = selectedPrice === 'all' ||
                        (selectedPrice === 'low' && dj.price < 2000) ||
                        (selectedPrice === 'medium' && dj.price >= 2000 && dj.price <= 2500) ||
                        (selectedPrice === 'high' && dj.price > 2500);
    
    const matchesDate = !selectedDate || dj.availableDates.includes(selectedDate);
    
    return matchesSearch && matchesLocation && matchesPrice && matchesDate;
  });

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const userMessage = { type: 'user', text: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    }, 1000);
  };

  const generateBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return 'Our DJ services range from 1,800 ₪ to 3,000 ₪ depending on experience and equipment. I can help you find a DJ that fits your budget. What price range are you considering?';
    } else if (lowerMessage.includes('location') || lowerMessage.includes('where')) {
      return 'We have professional DJs available in Ramallah, Nablus, Bethlehem, and Hebron. Which location do you prefer for your wedding?';
    } else if (lowerMessage.includes('date') || lowerMessage.includes('available')) {
      return 'Our DJs have various availability dates. You can use the date filter to check which DJs are available on your preferred date. When is your wedding date?';
    } else if (lowerMessage.includes('book') || lowerMessage.includes('reservation')) {
      return 'Excellent! To book a DJ consultation, please call us at 02-1234567 or you can leave your phone number and we will contact you within 24 hours.';
    } else if (lowerMessage.includes('service') || lowerMessage.includes('equipment')) {
      return 'All our DJs come with professional sound systems, lighting equipment, and microphones. Some also offer additional services like MC hosting and special effects. Would you like to know more about a specific DJ?';
    } else if (lowerMessage.includes('thank')) {
      return 'You\'re welcome! Happy to serve you. Don\'t hesitate to ask any other questions. We\'re here to make your wedding day perfect! 💍✨';
    } else {
      return 'Thank you for contacting us! I can help you with:\n• Information about prices and packages\n• DJ locations and availability\n• Booking a consultation\n• Equipment and services\n\nWhat would you like to know?';
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.wps-navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('navbar-scrolled');
        } else {
          navbar.classList.remove('navbar-scrolled');
        }
      }
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
              transition={{ duration: 0.8, type: "spring" }}
              style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #D4AF37 0%, #8B7355 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
                color: 'var(--white)',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                boxShadow: '0 8px 20px rgba(212, 175, 55, 0.3)'
              }}
            >
              WPS
            </motion.div>
            <span className="brand-primary">Wedding Planning System</span>
          </a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav ms-auto align-items-lg-center">
       <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
              <li className="nav-item"><a className="nav-link " href="/Venuespage">Venues</a></li>
              <li className="nav-item"><a className="nav-link" href="/DecorPage">Decoration</a></li>
              <li className="nav-item"><a className="nav-link" href="/DJ">DJ</a></li>
              <li className="nav-item"><a className="nav-link" href="/CakePage">Cakes</a></li>
              <li className="nav-item"><a className="nav-link" href="/PhotographersPage">Photography</a></li>
              <li className="nav-item ms-3"><a className="btn btn-primary-custom" href="/login">Log in</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="dj-page">
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="page-title">Professional Wedding DJs</h1>
            <p className="page-subtitle">Find the perfect DJ to create unforgettable moments at your celebration</p>
          </motion.div>

          {/* Search & Filters */}
          <motion.div
            className="search-filter-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="container">
              <div className="search-box">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search by DJ name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="search-icon">🔍</span>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="filter-group">
                    <label className="filter-label">Location</label>
                    <select
                      className="filter-select"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      <option value="all">All Locations</option>
                      {locations.slice(1).map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="filter-group">
                    <label className="filter-label">Price Range</label>
                    <select
                      className="filter-select"
                      value={selectedPrice}
                      onChange={(e) => setSelectedPrice(e.target.value)}
                    >
                      {priceRanges.map(range => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="filter-group">
                    <label className="filter-label">Available Date</label>
                    <input
                      type="date"
                      className="filter-date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* DJs Grid */}
          {filteredDJs.length > 0 ? (
            <div className="dj-grid">
              {filteredDJs.map((dj, index) => (
                <motion.div
                  key={dj.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="dj-card">
                    <div className="dj-image-wrapper">
                      <img src={dj.image} alt={dj.name} className="dj-image" />
                      {dj.rating >= 4.9 && (
                        <div className="dj-badge">Top Rated</div>
                      )}
                    </div>

                    <div className="dj-content">
                      <h3 className="dj-name">{dj.name}</h3>

                      <div className="dj-rating">
                        <span className="rating-stars">⭐</span>
                        <span className="rating-number">{dj.rating}</span>
                        <span className="rating-reviews">({dj.reviews} reviews)</span>
                      </div>

                      <p className="dj-description">{dj.description}</p>

                      <div className="dj-details">
                        <div className="dj-detail-item">
                          <div className="detail-icon">📍</div>
                          <div className="detail-label">Location</div>
                          <div className="detail-value">{dj.location}</div>
                        </div>
                        <div className="dj-detail-item">
                          <div className="detail-icon">🎵</div>
                          <div className="detail-label">Experience</div>
                          <div className="detail-value">{dj.experience}</div>
                        </div>
                      </div>

                      <div className="dj-price">{dj.price.toLocaleString()} ₪</div>

                      <button className="btn-book">Book Now</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No DJs found matching your search. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="brand-primary" style={{fontSize: '1.6rem', marginBottom: '1rem'}}>Wedding Planning System</div>
              <p style={{color: '#c9c5c0', fontFamily: 'Lato, sans-serif'}}>Your trusted partner in orchestrating extraordinary Palestinian wedding celebrations with unparalleled elegance and sophistication.</p>
            </div>
            <div className="col-lg-2 col-md-4 mb-4">
              <h5 className="footer-heading">Company</h5>
              <ul className="footer-links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-4 mb-4">
              <h5 className="footer-heading">Support</h5>
              <ul className="footer-links">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-4 mb-4">
              <h5 className="footer-heading">Vendors</h5>
              <ul className="footer-links">
                <li><a href="#">List Your Venue</a></li>
                <li><a href="#">Join as Vendor</a></li>
                <li><a href="#">Vendor Resources</a></li>
              </ul>
            </div>
            <div className="col-lg-2 mb-4">
              <h5 className="footer-heading">Connect</h5>
              <ul className="footer-links">
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Wedding Planning System. All rights reserved. Crafted with excellence.</p>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <div className="chatbot-container">
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              className="chatbot-window"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="chatbot-header">
                <span>AI DJ Assistant</span>
                <button className="chatbot-close" onClick={() => setChatOpen(false)}>×</button>
              </div>

              <div className="chatbot-messages">
                {messages.map((msg, index) => (
                  <div key={index} className={`message message-${msg.type}`}>
                    <div className="message-bubble">{msg.text}</div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="chatbot-input-area">
                <input
                  type="text"
                  className="chatbot-input"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button className="chatbot-send" onClick={handleSendMessage}>
                  ➤
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button className="chatbot-toggle" onClick={() => setChatOpen(!chatOpen)}>
          {chatOpen ? '✕' : '💬'}
        </button>
      </div>
    </div>
  );
}