import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion, AnimatePresence } from 'framer-motion';
import '../style/DecorPage.css';
export default function DecorationPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Welcome! I\'m here to help you find the perfect decoration services for your wedding. How can I assist you today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const decorationTypes = [
    "Groom's Car Decoration",
    "Wedding Favors",
    "Wedding Entrance Decor",
    "Table Centerpieces",
    "Flower Arrangements",
    "Stage Decoration",
    "Lighting Setup",
    "Custom Signage",
    "Photo Booth Setup"
  ];

  const decorationServices = [
    {
      id: 1,
      name: 'Elegant Events Decor',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
      location: 'Ramallah',
      services: ["Stage Decoration", "Lighting Setup", "Flower Arrangements", "Table Centerpieces"],
      rating: 4.8,
      reviews: 156,
      description: 'Specializing in luxurious wedding decorations with a focus on elegant floral arrangements and stunning stage designs.'
    },
    {
      id: 2,
      name: 'Golden Touch Decorations',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
      location: 'Nablus',
      services: ["Wedding Entrance Decor", "Custom Signage", "Photo Booth Setup", "Wedding Favors"],
      rating: 4.9,
      reviews: 203,
      description: 'Creating memorable wedding experiences with custom signage, photo booths, and personalized wedding favors.'
    },
    {
      id: 3,
      name: 'Royal Decorations',
      image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=800&q=80',
      location: 'Bethlehem',
      services: ["Stage Decoration", "Flower Arrangements", "Lighting Setup", "Table Centerpieces"],
      rating: 4.7,
      reviews: 189,
      description: 'Premium decoration services featuring royal-themed designs with exquisite lighting and floral artistry.'
    },
    {
      id: 4,
      name: 'Dream Wedding Decor',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      location: 'Hebron',
      services: ["Groom's Car Decoration", "Wedding Entrance Decor", "Photo Booth Setup", "Custom Signage"],
      rating: 4.6,
      reviews: 142,
      description: 'Transforming wedding venues into dream destinations with creative entrance decor and car decorations.'
    },
    {
      id: 5,
      name: 'Blossom Decorations',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      location: 'Ramallah',
      services: ["Flower Arrangements", "Table Centerpieces", "Wedding Favors", "Stage Decoration"],
      rating: 4.9,
      reviews: 221,
      description: 'Expert florists creating breathtaking floral arrangements and elegant table centerpieces for your special day.'
    },
    {
      id: 6,
      name: 'Sparkle Events',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
      location: 'Nablus',
      services: ["Lighting Setup", "Stage Decoration", "Photo Booth Setup", "Wedding Entrance Decor"],
      rating: 4.8,
      reviews: 178,
      description: 'Illuminating your wedding with spectacular lighting designs and interactive photo booth experiences.'
    },
    {
      id: 7,
      name: 'Pearl Decorations',
      image: 'https://images.unsplash.com/photo-1522413452208-996ff3f3e740?auto=format&fit=crop&w=800&q=80',
      location: 'Bethlehem',
      services: ["Table Centerpieces", "Wedding Favors", "Custom Signage", "Flower Arrangements"],
      rating: 4.7,
      reviews: 165,
      description: 'Crafting personalized wedding details with custom favors, elegant signage, and beautiful centerpieces.'
    },
    {
      id: 8,
      name: 'Luxury Events Decor',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80',
      location: 'Hebron',
      services: ["Stage Decoration", "Lighting Setup", "Groom's Car Decoration", "Wedding Entrance Decor"],
      rating: 4.9,
      reviews: 195,
      description: 'High-end decoration services offering complete venue transformation with luxury stage and entrance designs.'
    }
  ];

  const locations = ['all', 'Ramallah', 'Nablus', 'Bethlehem', 'Hebron'];

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const filteredServices = decorationServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = selectedLocation === 'all' || service.location === selectedLocation;
    
    const matchesTypes = selectedTypes.length === 0 || 
                        selectedTypes.some(type => service.services.includes(type));
    
    return matchesSearch && matchesLocation && matchesTypes;
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
    
    if (lowerMessage.includes('location') || lowerMessage.includes('where')) {
      return 'We have excellent decoration services in Ramallah, Nablus, Bethlehem, and Hebron. Which location would you prefer?';
    } else if (lowerMessage.includes('book') || lowerMessage.includes('appointment') || lowerMessage.includes('reserve')) {
      return 'Great! To book a decoration service, please call us at 02-1234567 or leave your phone number and we will arrange a consultation appointment for you.';
    } else if (lowerMessage.includes('service') || lowerMessage.includes('type') || lowerMessage.includes('decoration')) {
      return 'We offer various decoration services including: Stage Decoration, Flower Arrangements, Lighting Setup, Photo Booth Setup, Wedding Entrance Decor, Table Centerpieces, and more. Which service are you interested in?';
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('budget')) {
      return 'Decoration prices vary based on your specific requirements and venue size. Please contact the service provider directly for a detailed quote tailored to your wedding vision.';
    } else if (lowerMessage.includes('rating') || lowerMessage.includes('review')) {
      return 'All our decoration partners have excellent ratings from previous clients. You can see their ratings and reviews on each service card. Would you like recommendations for top-rated services?';
    } else if (lowerMessage.includes('thank')) {
      return 'You\'re welcome! Happy to serve you. Don\'t hesitate to ask any other questions. We\'re here to make your wedding day perfect! 💍✨';
    } else {
      return 'Thank you for contacting us! I can help you with:\n• Finding decoration services by location\n• Information about service types\n• Booking consultation appointments\n• Service recommendations\n\nWhat would you like to know?';
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

      <div className="decoration-page">
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="page-title">Wedding Decoration Services</h1>
            <p className="page-subtitle">Transform your wedding venue into a magical celebration space</p>
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
                  placeholder="Search by service name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="search-icon">🔍</span>
              </div>

              <div className="row">
                <div className="col-md-12">
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

                <div className="col-md-12">
                  <div className="filter-group">
                    <label className="filter-label">Decoration Types (Select multiple)</label>
                    <div className="type-filters">
                      {decorationTypes.map(type => (
                        <button
                          key={type}
                          className={`type-chip ${selectedTypes.includes(type) ? 'active' : ''}`}
                          onClick={() => handleTypeToggle(type)}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Services Grid */}
          {filteredServices.length > 0 ? (
            <div className="services-grid">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="service-card">
                    <div className="service-image-wrapper">
                      <img src={service.image} alt={service.name} className="service-image" />
                    </div>

                    <div className="service-content">
                      <div className="service-header">
                        <h3 className="service-name">{service.name}</h3>
                        <div className="service-rating">
                          <span className="star-icon">⭐</span>
                          <span>{service.rating}</span>
                          <span style={{color: 'var(--text-light)', fontSize: '0.85rem'}}>({service.reviews})</span>
                        </div>
                      </div>

                      <div className="service-location">
                        <span className="location-icon">📍</span>
                        <span>{service.location}</span>
                      </div>

                      <p className="service-description">{service.description}</p>

                      <div className="service-types">
                        {service.services.map((type, idx) => (
                          <span key={idx} className="service-type-badge">{type}</span>
                        ))}
                      </div>

                      <button className="btn-contact">Contact for Booking</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No decoration services found matching your criteria. Try adjusting your filters.</p>
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
                <span>AI Decoration Assistant</span>
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