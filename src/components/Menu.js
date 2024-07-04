import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import DishCard from './Dish.js'; // Adjust the import path based on your file structure
import Offers from './offers.js';
import Navbar from './Navbar.js';

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [offers, setOffers] = useState([]);
  useEffect(() => {
    // Fetch categories and offers from db.json using axios
    axios.get('http://localhost:5000/categories')
      .then(response => {
        const categories = response.data;
        setCategories(categories);
        console.log(response);
        // Initially set filtered dishes to all dishes from all categories
        const allDishes = categories.flatMap(category => category.dishes);
        setFilteredDishes(allDishes);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    // Fetch offers from the correct endpoint
    axios.get('http://localhost:5000/offers')
      .then(response => {
        const offers = response.data;
        const offerTitles = offers.map(offer => offer.title);
        setOffers(offerTitles);
        console.log(offers);
      })
      .catch(error => console.error('Error fetching offers:', error));
  },[searchQuery]);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    filterDishes(selectedCategory, query);
  };

  const handleCategoryChange = (event) => {
    const categoryId = parseInt(event.target.value);
    setSelectedCategory(categoryId);

    filterDishes(categoryId, searchQuery);
  };

  const filterDishes = (categoryId, query) => {
    let allDishes = categories.flatMap(category => category.dishes);

    if (categoryId) {
      const category = categories.find(cat => cat.id == categoryId);
      allDishes = category ? category.dishes : [];
    }

    const filtered = allDishes.filter(dish =>
      dish.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredDishes(filtered);
  };

  return (
    <div>
      <Navbar />
    <div className="categories bg-gray-100 min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center text-black">Menu</h2>

        {/* Search and Category selection */}
        <div className="flex items-center justify-between mb-4">
          {/* Search bar */}
          <div className='relative flex-1 mr-4'>
            <input
              type="text"
              placeholder="Search for dishes"
              value={searchQuery}
              onChange={handleSearchChange}
              className="border border-gray-300 px-4 py-2 rounded-lg w-full text-center font-bold"
            />
            <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
              <SearchIcon className="text-gray-400" />
            </div>
          </div>

          {/* Category dropdown */}
          <div>
            <select
              value={selectedCategory || ''}
              onChange={handleCategoryChange}
              className="border border-gray-300 px-4 py-2 rounded-lg text-center font-bold"
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Offers Section */}
        {offers.length > 0 && <Offers offers={offers} />}
        {/* Dishes */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Dishes</h3>
          {filteredDishes.length > 0 ? (
            <div>
              {filteredDishes.map((dish, index) => (
                <div key={dish.id}>
                  <DishCard
                    id={dish.id}
                    image={dish.image}
                    name={dish.name}
                    price={dish.price}
                    item={dish}
                    description={dish.description}
                    nutrients={dish.nutrients}
                  />
                  {index !== filteredDishes.length - 1 && <hr className="my-4 border-gray-300" />} {/* Horizontal gray line */}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-8 text-lg text-gray-600">No dishes found.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Menu;