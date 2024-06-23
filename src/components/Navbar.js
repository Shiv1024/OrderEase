import React, { useState } from 'react';
import './index.css'
const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <img src={"https://imgs.search.brave.com/ndVksVneoAbvmB1oeoqQhllh_G9nNXUkjdFWNabCt1A/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9kMnVh/cnM3eGtkbXp0cS5j/bG91ZGZyb250Lm5l/dC9hcHBfcmVzb3Vy/Y2VzL2N1c3RvbWl6/YXRpb25zL1NBR0VD/QU5BREEvMTExNTE1/L3RodW1ic18xMTIv/aW1nOTE5ODAxMTUx/MDQxNzgwMjg1Mi5w/bmc_MWFiYWNiZmY5/NWZlYWI5YjQxMjQ4/OGY1NzRkOWYyMjI"} alt="OrderEase" className="h-8 w-8 mr-2" /> {/* Replace with your logo */}
        </div>
        <div className="flex items-center space-x-4 mr-10">
          <a href="#menu" className="text-gray-800 hover:text-blue-500">Menu</a>
          <a href="#cart" className="text-gray-800 hover:text-blue-500">Cart</a>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-gray-800 hover:text-blue-500 focus:outline-none"
            >
              More
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                <a href="#profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</a>
                <a href="#orders" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Orders</a>
                <a href="#settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
