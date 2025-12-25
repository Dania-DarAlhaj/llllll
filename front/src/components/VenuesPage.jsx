import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion, AnimatePresence } from 'framer-motion';
import '../style/VenuesPage.css';


export default function VenuesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedCapacity, setSelectedCapacity] = useState('all');
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Welcome! I\'m here to help you find the perfect venue for your wedding celebration. How can I assist you today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const venues = [
    {
      id: 1,
      name: 'Royal Diamond Hall',
      image: '/images/RoyalDiamondHall.jpg',
      rating: 4.9,
      reviews: 156,
      location: 'Ramallah',
      price: 8500,
      capacity: 300,
      description: 'Luxurious hall with royal design, crystal lighting and golden decorations'
    },
    {
      id: 2,
      name: 'Golden Dreams Palace',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      reviews: 203,
      location: 'Nablus',
      price: 7200,
      capacity: 250,
      description: 'Elegant palace with outdoor gardens and breathtaking panoramic views'
    },
    {
      id: 3,
      name: 'White Pearl Hall',
      image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      reviews: 178,
      location: 'Bethlehem',
      price: 9000,
      capacity: 350,
      description: 'Modern hall with contemporary design and advanced sound and lighting systems'
    },
    {
      id: 4,
      name: 'Blue Sapphire Hall',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      reviews: 142,
      location: 'Hebron',
      price: 6500,
      capacity: 200,
      description: 'Elegant hall with classic decorations and warm romantic atmosphere'
    },
    {
      id: 5,
      name: 'Royal Emerald Palace',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      rating: 5.0,
      reviews: 189,
      location: 'Ramallah',
      price: 10500,
      capacity: 400,
      description: 'Most luxurious venue with VIP services and professional staff at the highest level'
    },
    {
      id: 6,
      name: 'Golden Stars Hall',
      image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      reviews: 167,
      location: 'Nablus',
      price: 7800,
      capacity: 280,
      description: 'Distinctive hall with star-studded ceiling and enchanting lighting'
    }
  ];

  const locations = ['all', 'Ramallah', 'Nablus', 'Bethlehem', 'Hebron'];
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'low', label: 'Under 7,000 ₪' },
    { value: 'medium', label: '7,000 - 9,000 ₪' },
    { value: 'high', label: 'Over 9,000 ₪' }
  ];
  const capacityRanges = [
    { value: 'all', label: 'All Capacities' },
    { value: 'small', label: 'Under 250 guests' },
    { value: 'medium', label: '250 - 350 guests' },
    { value: 'large', label: 'Over 350 guests' }
  ];

  const filteredVenues = venues.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = selectedLocation === 'all' || venue.location === selectedLocation;
    
    const matchesPrice = selectedPrice === 'all' ||
                        (selectedPrice === 'low' && venue.price < 7000) ||
                        (selectedPrice === 'medium' && venue.price >= 7000 && venue.price <= 9000) ||
                        (selectedPrice === 'high' && venue.price > 9000);
    
    const matchesCapacity = selectedCapacity === 'all' ||
                           (selectedCapacity === 'small' && venue.capacity < 250) ||
                           (selectedCapacity === 'medium' && venue.capacity >= 250 && venue.capacity <= 350) ||
                           (selectedCapacity === 'large' && venue.capacity > 350);
    
    return matchesSearch && matchesLocation && matchesPrice && matchesCapacity;
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
      return 'Our venue prices range from 6,500 ₪ to 10,500 ₪ depending on capacity and services offered. I can help you find a venue that fits your budget. What budget range are you considering?';
    } else if (lowerMessage.includes('location') || lowerMessage.includes('where')) {
      return 'We have luxurious venues in Ramallah, Nablus, Bethlehem, and Hebron. Which location do you prefer for your wedding celebration?';
    } else if (lowerMessage.includes('capacity') || lowerMessage.includes('guests')) {
      return 'Our venues accommodate from 200 to 400 guests. How many guests are you expecting at your celebration?';
    } else if (lowerMessage.includes('book') || lowerMessage.includes('reservation')) {
      return 'Excellent! To book a venue visit appointment, please call us at 02-1234567 or you can leave your phone number and we will contact you within 24 hours.';
    } else if (lowerMessage.includes('service') || lowerMessage.includes('feature')) {
      return 'All our venues are equipped with professional sound and lighting systems, luxurious decorations, premium hospitality service, and spacious parking. Would you like to know more about a specific venue?';
    } else if (lowerMessage.includes('thank')) {
      return 'You\'re welcome! Happy to serve you. Don\'t hesitate to ask any other questions. We\'re here to make your wedding day perfect! 💍✨';
    } else {
      return 'Thank you for contacting us! I can help you with:\n• Information about prices and packages\n• Venue locations and capacities\n• Booking a visit appointment\n• Services and features\n\nWhat would you like to know?';
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;500;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    if (!document.querySelector('link[href*="Playfair+Display"]')) {
      document.head.appendChild(fontLink);
    }

    // Add scroll effect for navbar
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
              <li className="nav-item ms-3"><a className="btn btn-primary-custom" href="/log in">Log in</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="venues-page">
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="page-title">Luxury Wedding Venues</h1>
            <p className="page-subtitle">Discover the most exquisite venues for your dream wedding</p>
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
                  placeholder="Search for your perfect venue..."
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
                    <label className="filter-label">Capacity</label>
                    <select
                      className="filter-select"
                      value={selectedCapacity}
                      onChange={(e) => setSelectedCapacity(e.target.value)}
                    >
                      {capacityRanges.map(range => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Venues Grid */}
          {filteredVenues.length > 0 ? (
            <div className="venues-grid">
              {filteredVenues.map((venue, index) => (
                <motion.div
                  key={venue.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="venue-card">
                    <div className="venue-image-wrapper">
                      <img src={venue.image} alt={venue.name} className="venue-image" />
                      {venue.rating >= 4.9 && (
                        <div className="venue-badge">Top Rated</div>
                      )}
                    </div>

                    <div className="venue-content">
                      <h3 className="venue-name">{venue.name}</h3>

                      <div className="venue-rating">
                        <span className="rating-stars">⭐</span>
                        <span className="rating-number">{venue.rating}</span>
                        <span className="rating-reviews">({venue.reviews} reviews)</span>
                      </div>

                      <p className="venue-description">{venue.description}</p>

                      <div className="venue-details">
                        <div className="venue-detail-item">
                          <div className="detail-icon">📍</div>
                          <div className="detail-label">Location</div>
                          <div className="detail-value">{venue.location}</div>
                        </div>
                        <div className="venue-detail-item">
                          <div className="detail-icon">👥</div>
                          <div className="detail-label">Capacity</div>
                          <div className="detail-value">{venue.capacity} guests</div>
                        </div>
                      </div>

                      <div className="venue-price">{venue.price.toLocaleString()} ₪</div>

                      <button className="btn-book">Book Now</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No venues found matching your search. Try adjusting your filters.</p>
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
                <span>AI Booking Assistant</span>
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