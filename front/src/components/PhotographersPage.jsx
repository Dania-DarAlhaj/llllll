import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion, AnimatePresence } from 'framer-motion';
import '../style/Photograph.css';

export default function PhotographyPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Welcome! I\'m here to help you find the perfect wedding photographer. How can I assist you today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const photographers = [
    {
      id: 1,
      name: 'Golden Memories Studio',
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=800&q=80',
      location: 'Ramallah',
      price: 2500,
      priceRange: 'high',
      rating: 4.9,
      reviews: 187,
      description: 'Professional wedding photography with specialized team and latest equipment. We provide high-quality photo and video services.',
      services: ['Photography', 'Videography', 'Drone Shots', 'Luxury Album']
    },
    {
      id: 2,
      name: 'Dream Lens Photography',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      location: 'Nablus',
      price: 1800,
      priceRange: 'medium',
      rating: 4.8,
      reviews: 156,
      description: 'Capturing the most beautiful moments of your special day with an elegant artistic style. Specialized in romantic and natural photography.',
      services: ['Photography', 'Videography', 'Album Design']
    },
    {
      id: 3,
      name: 'Royal Light Studio',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      location: 'Bethlehem',
      price: 3000,
      priceRange: 'high',
      rating: 5.0,
      reviews: 203,
      description: 'Luxury photography services with the best professional photographers. We provide an unforgettable photography experience with the highest quality standards.',
      services: ['Photography', 'Cinematic Video', 'Drone Shots', 'Luxury Album', 'Large Prints']
    },
    {
      id: 4,
      name: 'Happy Moments Photography',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
      location: 'Hebron',
      price: 1500,
      priceRange: 'medium',
      rating: 4.7,
      reviews: 142,
      description: 'Professional photography at affordable prices. We focus on capturing genuine emotions and spontaneous moments.',
      services: ['Photography', 'Videography', 'Digital Album']
    },
    {
      id: 5,
      name: 'Diamond Studio',
      image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=800&q=80',
      location: 'Ramallah',
      price: 2200,
      priceRange: 'high',
      rating: 4.9,
      reviews: 178,
      description: 'Elegant artistic photography combining authenticity and modernity. Professional team ensures your most beautiful memories.',
      services: ['Photography', 'Videography', 'Drone Shots', 'Luxury Album Design']
    },
    {
      id: 6,
      name: 'Art Lens Photography',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
      location: 'Nablus',
      price: 1200,
      priceRange: 'low',
      rating: 4.6,
      reviews: 128,
      description: 'Professional photography services at competitive prices. We offer diverse packages suitable for all budgets.',
      services: ['Photography', 'Videography', 'Album']
    },
    {
      id: 7,
      name: 'Pearl Studio',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
      location: 'Bethlehem',
      price: 2800,
      priceRange: 'high',
      rating: 4.8,
      reviews: 195,
      description: 'Luxury photography with attention to the finest details. We use the latest technology to ensure the best results.',
      services: ['Photography', 'Cinematic Video', 'Drone Shots', 'Luxury Album']
    },
    {
      id: 8,
      name: 'Beautiful Moment Photography',
      image: 'https://images.unsplash.com/photo-1522413452208-996ff3f3e740?auto=format&fit=crop&w=800&q=80',
      location: 'Hebron',
      price: 1600,
      priceRange: 'medium',
      rating: 4.7,
      reviews: 163,
      description: 'Natural and candid photography reflecting the beauty of your special day. We believe the best photos come from genuine moments.',
      services: ['Photography', 'Videography', 'Digital Album', 'Prints']
    }
  ];

  const locations = ['all', 'Ramallah', 'Nablus', 'Bethlehem', 'Hebron'];
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'low', label: 'Under 1500 ILS' },
    { value: 'medium', label: '1500 - 2500 ILS' },
    { value: 'high', label: 'Over 2500 ILS' }
  ];

  const filteredPhotographers = photographers.filter(photographer => {
    const matchesSearch = photographer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photographer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photographer.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = selectedLocation === 'all' || photographer.location === selectedLocation;
    
    const matchesPrice = selectedPriceRange === 'all' || photographer.priceRange === selectedPriceRange;
    
    return matchesSearch && matchesLocation && matchesPrice;
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
      return 'We have excellent photographers in Ramallah, Nablus, Bethlehem, and Hebron. Which location would you prefer?';
    } else if (lowerMessage.includes('book') || lowerMessage.includes('appointment') || lowerMessage.includes('reserve')) {
      return 'Great! To book a photographer, please call us at 02-1234567 or leave your phone number and we will arrange a consultation appointment for you.';
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('budget')) {
      return 'Photography prices range from 1200 to 3000 ILS depending on the package and services required. You can filter results by price to find what suits your budget.';
    } else if (lowerMessage.includes('service') || lowerMessage.includes('package') || lowerMessage.includes('offer')) {
      return 'We offer various services including: Photography, Videography, Drone Shots, Luxury Album Design, and Prints. Which service interests you?';
    } else if (lowerMessage.includes('rating') || lowerMessage.includes('review')) {
      return 'All our photographers have excellent ratings from previous clients. You can see ratings and reviews on each photographer card. Would you like recommendations for top-rated photographers?';
    } else if (lowerMessage.includes('thank')) {
      return 'You\'re welcome! Happy to serve you. Don\'t hesitate to ask any other questions. We\'re here to make your wedding day perfect! 💍✨';
    } else {
      return 'Thank you for contacting us! I can help you with:\n• Finding photographers by location\n• Information about prices and packages\n• Booking consultation appointments\n• Photographer recommendations\n\nWhat would you like to know?';
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

      <div className="photography-page">
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="page-title">Wedding Photographers</h1>
            <p className="page-subtitle">Capture the most beautiful moments of your special day with professional photographers</p>
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
                  placeholder="Search by photographer name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="search-icon">🔍</span>
              </div>

              <div className="row">
                <div className="col-md-6">
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

                <div className="col-md-6">
                  <div className="filter-group">
                    <label className="filter-label">Price Range</label>
                    <select
                      className="filter-select"
                      value={selectedPriceRange}
                      onChange={(e) => setSelectedPriceRange(e.target.value)}
                    >
                      {priceRanges.map(range => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Photographers Grid */}
          {filteredPhotographers.length > 0 ? (
            <div className="photographers-grid">
              {filteredPhotographers.map((photographer, index) => (
                <motion.div
                  key={photographer.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="photographer-card">
                    <div className="photographer-image-wrapper">
                      <img src={photographer.image} alt={photographer.name} className="photographer-image" />
                    </div>

                    <div className="photographer-content">
                      <div className="photographer-header">
                        <h3 className="photographer-name">{photographer.name}</h3>
                        <div className="photographer-rating">
                          <span className="star-icon">⭐</span>
                          <span>{photographer.rating}</span>
                          <span style={{color: 'var(--text-light)', fontSize: '0.85rem'}}>({photographer.reviews})</span>
                        </div>
                      </div>

                      <div className="photographer-location">
                        <span className="location-icon">📍</span>
                        <span>{photographer.location}</span>
                      </div>

                      <div className="photographer-price">
                        <span className="price-label">Starting from:</span>
                        <span className="price-value">{photographer.price} ILS</span>
                      </div>

                      <p className="photographer-description">{photographer.description}</p>

                      <div className="photographer-services">
                        {photographer.services.map((service, idx) => (
                          <span key={idx} className="service-badge">{service}</span>
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
              <p>No photographers found matching your search criteria. Try adjusting your filters.</p>
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
                <span>AI Photography Assistant</span>
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