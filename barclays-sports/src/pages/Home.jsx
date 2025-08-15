import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  Heart,
  ArrowRight,
  Truck,
  Shield,
  Headphones,
  RotateCcw,
} from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSection, setVisibleSection] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hero slides data
  const heroSlides = [
    {
      id: 1,
      title: "Summer Sports Festival 2025",
      subtitle: "Unleash Your Athletic Power",
      description: "Join the biggest sports celebration with exclusive gear, amazing deals, and community events.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      buttonText: "Join Festival",
      offer: "50% OFF",
      bgGradient: "from-pink-500 via-purple-500 to-indigo-600"
    },
    {
      id: 2,
      title: "Pro Athlete Training Zone",
      subtitle: "Train Like Champions",
      description: "Professional-grade equipment and expert training programs designed for peak performance.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      buttonText: "Start Training",
      offer: "Free Coaching",
      bgGradient: "from-green-400 via-blue-500 to-purple-600"
    },
    {
      id: 3,
      title: "Smart Fitness Revolution",
      subtitle: "Technology Meets Performance",
      description: "Revolutionary smart devices and AI-powered fitness solutions for the modern athlete.",
      image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      buttonText: "Explore Tech",
      offer: "New Launch",
      bgGradient: "from-orange-400 via-red-500 to-pink-600"
    }
  ];

  // Benefits data
  const benefits = [
    {
      icon: Truck,
      title: "Free Delivery",
      description: "Free shipping on all orders over $75",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure payment processing",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-day hassle-free return policy",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Customer support available anytime",
    },
  ];

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    const loadUserData = () => {
      setCart(JSON.parse(localStorage.getItem("cart")) || []);
      setWishlist(JSON.parse(localStorage.getItem("wishlist")) || []);
    };
    loadUserData();
  }, []);

  // Add event listener to sync cart when localStorage changes (e.g., from other tabs/pages)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        setCart(JSON.parse(e.newValue) || []);
      }
      if (e.key === 'wishlist') {
        setWishlist(JSON.parse(e.newValue) || []);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Also check for localStorage changes when component becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Page became visible, refresh cart and wishlist from localStorage
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
        setWishlist(JSON.parse(localStorage.getItem("wishlist")) || []);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          axios.get("http://localhost:3000/categories"),
          axios.get("http://localhost:3000/products")
        ]);
        
        setCategories(categoriesRes.data);
        
        // Get featured products (first 4 active products from the database)
        const featured = productsRes.data
          .filter(product => product.isActive !== false)
          .slice(0, 4)
          .map(product => ({
            ...product,
            originalPrice: product.price * 1.2, // Add 20% to create "original price"
            rating: 4.5 + Math.random() * 0.5, // Random rating between 4.5-5
            reviews: Math.floor(Math.random() * 100) + 50 // Random reviews 50-150
          }));
        
        setProducts(featured);
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Save to localStorage whenever cart or wishlist changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Auto-rotate hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Scroll detection for animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) setVisibleSection("categories");
      if (scrollPosition > 600) setVisibleSection("products");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      const newCart = existingItem
        ? prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevCart, { ...product, quantity: 1 }];
      
      // Save to localStorage immediately
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
    toast.success(`${product.name} added to cart!`);
  };

  const toggleWishlist = (product) => {
    setWishlist(prevWishlist => {
      const exists = prevWishlist.find((item) => item.id === product.id);
      const newWishlist = exists
        ? prevWishlist.filter((item) => item.id !== product.id)
        : [...prevWishlist, product];
      
      // Save to localStorage immediately
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      
      if (exists) {
        toast.error(`${product.name} removed from wishlist`);
      } else {
        toast.success(`${product.name} added to wishlist!`);
      }
      
      return newWishlist;
    });
  };

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  // Get category image and count from products
  const getEnhancedCategories = () => {
    return categories.map(category => {
      const categoryProducts = products.filter(
        p => p.category?.toLowerCase() === category.name.toLowerCase()
      );
      
      // Default images for each category
      const defaultImages = {
        football: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        running: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        basketball: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        tennis: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        cricket: "https://images.unsplash.com/photo-1600679472829-3044539ce8ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        hockey: "https://images.unsplash.com/photo-1519869325930-281384150729?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        volleyball: "https://images.unsplash.com/photo-1592656094267-764a451608e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      };
      
      return {
        ...category,
        image: categoryProducts[0]?.image || categoryProducts[0]?.images?.[0] || defaultImages[category.name.toLowerCase()] || "https://via.placeholder.com/500",
        itemCount: categoryProducts.length || Math.floor(Math.random() * 50) + 20,
        color: `bg-gradient-to-br from-${getRandomColor()}-500 to-${getRandomColor()}-600`
      };
    });
  };

  // Helper function to get random color for category cards
  const getRandomColor = () => {
    const colors = ["blue", "green", "purple", "pink", "orange", "cyan", "red", "yellow"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const enhancedCategories = getEnhancedCategories();

  return (
    <div className="min-h-screen bg-white">
      {/* Rectangular Auto-Sliding Hero */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden h-96 md:h-[500px]">
            {/* Slide Content */}
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentSlide
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-full"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50" />
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-2xl mx-auto text-center text-white px-6">
                    <div className="mb-4">
                      <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        {slide.offer}
                      </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                      {slide.title}
                    </h1>
                    <h2 className="text-xl md:text-2xl font-light mb-6 text-gray-200">
                      {slide.subtitle}
                    </h2>
                    <p className="text-lg mb-8 text-gray-300 max-w-lg mx-auto">
                      {slide.description}
                    </p>
                    <Link
                      to="/products"
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      {slide.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              <ChevronRight size={24} />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-white scale-125"
                      : "bg-white bg-opacity-50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="bg-blue-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 justify-center text-center md:text-left"
              >
                <benefit.icon
                  size={24}
                  className="text-blue-200 flex-shrink-0"
                />
                <div>
                  <div className="font-semibold text-sm">{benefit.title}</div>
                  <div className="text-xs text-blue-200 hidden md:block">
                    {benefit.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medium-Level Product Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600">
              Find exactly what you need for your sport
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {enhancedCategories.map((category, index) => (
                <Link
                  key={category.id}
                  to={`/products/${category.name.toLowerCase()}`}
                  className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                    visibleSection === "categories" ? "animate-fade-in-up" : ""
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/500";
                      }}
                    />
                    <div
                      className={`absolute inset-0 ${category.color} opacity-70 group-hover:opacity-60 transition-opacity duration-300`}
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                      <p className="text-sm opacity-90 mb-4">
                        {category.itemCount} Products
                      </p>
                      <div className="self-start bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2">
                        <span>Shop Now</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Featured Products
              </h2>
              <p className="text-xl text-gray-600">
                Top picks from our collection
              </p>
            </div>
            <Link
              to="/products"
              className="hidden md:flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <span>View All</span>
              <ArrowRight size={20} />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:-translate-y-1 ${
                    visibleSection === "products" ? "animate-fade-in-up" : ""
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image || product.images?.[0] || "https://via.placeholder.com/400"}
                      alt={product.name}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400";
                      }}
                    />
                    {product.badge && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          {product.badge}
                        </span>
                      </div>
                    )}
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product);
                      }}
                      className={`absolute top-4 right-4 p-2 rounded-full shadow-lg transition-all duration-300 ${
                        isInWishlist(product.id) 
                          ? "bg-red-50 text-red-500 opacity-100" 
                          : "bg-white text-gray-600 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500"
                      }`}
                    >
                      <Heart
                        size={18}
                        className={isInWishlist(product.id) ? "fill-current" : ""}
                      />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={`${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">
                        ({product.reviews})
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-800">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-110"
                        disabled={product.count === 0}
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8 md:hidden">
            <Link
              to="/products"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
            >
              <span>View All Products</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with Latest Releases
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get exclusive access to new products and special offers
          </p>
          <div className="flex flex-col md:flex-row max-w-lg mx-auto space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-lg border-0 focus:outline-none focus:ring-4 focus:ring-blue-300 text-gray-800"
            />
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
      <Footer />
    </div>
  );
};

export default Home;