
import React, { useState } from 'react';
import { Search, ShoppingCart, User, Heart, Menu, X, Bell } from 'lucide-react';

const Navbar = () => {
  // Mock user for demo - replace with your auth context
  const user = { name: 'John Doe', email: 'john@example.com', avatar: null };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount] = useState(3);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const NavButton = ({ href, children, isActive = false, onClick }) => (
    <button
      onClick={onClick}
      className={`text-sm font-medium transition-colors duration-200 hover:text-amber-600 ${isActive ? 'text-amber-600' : 'text-gray-700'
        }`}
    >
      {children}
    </button>
  );

  const MobileNavButton = ({ href, children, isActive = false, onClick }) => (
    <button
      onClick={onClick}
      className={`block w-full text-left py-3 text-base font-medium transition-colors duration-200 ${isActive ? 'text-amber-600' : 'text-gray-700 hover:text-amber-600'
        }`}
    >
      {children}
    </button>
  );

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-3 group">
              {/* <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200">
                <span className="text-white font-bold text-xl">B</span>
              </div> */}
              <img
                src="/logo3.png"
                alt="Company Logo"
                className="mx-auto h-15 w-14"
              />
              <div className="flex flex-col">
                <span className="text-xl font-serif font-bold text-gray-900 group-hover:text-amber-600 transition-colors duration-200">
                  Braclays
                </span>
                <span className="text-xs text-gray-500 -mt-1">SPORTS</span>
              </div>
            </button>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands, categories..."
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-amber-600 transition-colors duration-200"
              >
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <NavButton isActive={true}>Home</NavButton>
            <NavButton>Products</NavButton>
            <NavButton>Categories</NavButton>
            <NavButton>Deals</NavButton>
          </div>

          {/* Action Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {/* Notifications */}
                <button className="p-2 text-gray-400 hover:text-amber-600 transition-colors duration-200 relative">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    2
                  </span>
                </button>

                {/* Wishlist */}
                <button className="p-2 text-gray-400 hover:text-amber-600 transition-colors duration-200 relative">
                  <Heart size={20} />
                </button>

                {/* Cart */}
                <button className="p-2 text-gray-400 hover:text-amber-600 transition-colors duration-200 relative">
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={toggleProfile}
                    className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-gray-200 flex items-center justify-center">
                      <User size={16} className="text-gray-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200">
                        Your Profile
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200">
                        Your Orders
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200">
                        Dashboard
                      </button>
                      <hr className="my-1" />
                      <button
                        onClick={() => setIsProfileOpen(false)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors duration-200">
                  Sign In
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors duration-200 shadow-md hover:shadow-lg">
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {user && (
              <button className="p-2 text-gray-400 hover:text-amber-600 relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-400 hover:text-amber-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          {/* Mobile Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-amber-600"
              >
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="px-4 py-2 space-y-1">
            <MobileNavButton isActive={true} onClick={() => setIsMenuOpen(false)}>
              Home
            </MobileNavButton>
            <MobileNavButton onClick={() => setIsMenuOpen(false)}>
              Products
            </MobileNavButton>
            <MobileNavButton onClick={() => setIsMenuOpen(false)}>
              Categories
            </MobileNavButton>
            <MobileNavButton onClick={() => setIsMenuOpen(false)}>
              Deals
            </MobileNavButton>
          </div>

          {/* Mobile User Section */}
          <div className="border-t border-gray-200 px-4 py-4">
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full border-2 border-gray-200 flex items-center justify-center">
                    <User size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>
                <div className="space-y-1">
                  <button className="block w-full text-left py-2 text-base text-gray-700 hover:text-amber-600 transition-colors duration-200">
                    Your Profile
                  </button>
                  <button className="block w-full text-left py-2 text-base text-gray-700 hover:text-amber-600 transition-colors duration-200">
                    Your Orders
                  </button>
                  <button className="block w-full text-left py-2 text-base text-gray-700 hover:text-amber-600 transition-colors duration-200">
                    Wishlist
                  </button>
                  <button className="block w-full text-left py-2 text-base text-gray-700 hover:text-amber-600 transition-colors duration-200">
                    Dashboard
                  </button>
                  <button className="block w-full text-left py-2 text-base text-red-600 hover:text-red-700 transition-colors duration-200">
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <button className="block w-full text-center py-2 px-4 text-base font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  Sign In
                </button>
                <button className="block w-full text-center py-2 px-4 text-base font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors duration-200">
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Backdrop for profile dropdown */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;