// import { useAuth } from "../context/AuthContext";

// export default function Home() {
//   const { user, logout } = useAuth();

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
//       <h1 className="text-4xl font-bold mb-4">Welcome, {user?.name}!</h1>
//       <p className="text-lg mb-6">You are now logged in to our Sports E-commerce site 🎉</p>
//       <button
//         onClick={logout}
//         className="bg-red-500 px-6 py-2 rounded-lg hover:bg-red-600"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Heart, ArrowRight, Truck, Shield, Headphones, RotateCcw } from 'lucide-react';
import Navbar from './Navbar';
import Footer from '../components/Footer';

const Home = () => {
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSection, setVisibleSection] = useState('');

  const heroSlides = [
    {
      id: 1,
      title: "New Athletic Collection 2024",
      subtitle: "Performance Meets Style",
      description: "Discover our latest range of premium sportswear and equipment designed for modern athletes.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      buttonText: "Shop Collection",
      offer: "Up to 40% OFF"
    },
    {
      id: 2,
      title: "Professional Training Gear",
      subtitle: "Elevate Your Workout",
      description: "Premium quality equipment trusted by professional athletes and fitness enthusiasts worldwide.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      buttonText: "Explore Gear",
      offer: "Free Shipping"
    },
    {
      id: 3,
      title: "Smart Fitness Technology",
      subtitle: "Track Your Progress",
      description: "Advanced wearables and smart devices to monitor and enhance your athletic performance.",
      image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80",
      buttonText: "View Tech",
      offer: "Latest Models"
    }
  ];

  const categories = [
    {
      id: 1,
      name: "Running Shoes",
      itemCount: 120,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      id: 2,
      name: "Athletic Wear",
      itemCount: 85,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: "bg-gradient-to-br from-green-500 to-green-600"
    },
    {
      id: 3,
      name: "Gym Equipment",
      itemCount: 95,
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: "bg-gradient-to-br from-purple-500 to-purple-600"
    },
    {
      id: 4,
      name: "Yoga & Wellness",
      itemCount: 65,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: "bg-gradient-to-br from-pink-500 to-pink-600"
    },
    {
      id: 5,
      name: "Outdoor Sports",
      itemCount: 140,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: "bg-gradient-to-br from-orange-500 to-orange-600"
    },
    {
      id: 6,
      name: "Water Sports",
      itemCount: 75,
      image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      color: "bg-gradient-to-br from-cyan-500 to-cyan-600"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "AirMax Pro Running Shoes",
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.8,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Performance Training Set",
      price: 89.99,
      originalPrice: 119.99,
      rating: 4.6,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      badge: "New Arrival"
    },
    {
      id: 3,
      name: "Smart Fitness Watch",
      price: 279.99,
      originalPrice: 329.99,
      rating: 4.9,
      reviews: 412,
      image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      badge: "Limited"
    },
    {
      id: 4,
      name: "Premium Yoga Mat",
      price: 59.99,
      originalPrice: 79.99,
      rating: 4.7,
      reviews: 198,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      badge: "Eco-Friendly"
    }
  ];

  const benefits = [
    {
      icon: Truck,
      title: "Free Delivery",
      description: "Free shipping on all orders over $75"
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure payment processing"
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-day hassle-free return policy"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Customer support available anytime"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) setVisibleSection('categories');
      if (scrollPosition > 600) setVisibleSection('products');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      {/* Rectangular Auto-Sliding Hero */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden h-96 md:h-[500px]">
            {/* Slide Content */}
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
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
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      {slide.buttonText}
                    </button>
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
                    index === currentSlide ? 'bg-white scale-125' : 'bg-white bg-opacity-50'
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
              <div key={index} className="flex items-center space-x-3 justify-center text-center md:text-left">
                <benefit.icon size={24} className="text-blue-200 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-sm">{benefit.title}</div>
                  <div className="text-xs text-blue-200 hidden md:block">{benefit.description}</div>
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

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                  visibleSection === 'categories' ? 'animate-fade-in-up' : ''
                }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 ${category.color} opacity-70 group-hover:opacity-60 transition-opacity duration-300`} />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90 mb-4">{category.itemCount} Products</p>
                    <button className="self-start bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2">
                      <span>Shop Now</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            <button className="hidden md:flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              <span>View All</span>
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:-translate-y-1 ${
                  visibleSection === 'products' ? 'animate-fade-in-up' : ''
                }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {product.badge}
                    </span>
                  </div>
                  <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-50">
                    <Heart size={18} className="text-gray-600 hover:text-red-500" />
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
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-800">
                        ${product.price}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    </div>
                    <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-110">
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto">
              <span>View All Products</span>
              <ArrowRight size={20} />
            </button>
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
      <Footer/>
    </div>
  );
};

export default Home;
