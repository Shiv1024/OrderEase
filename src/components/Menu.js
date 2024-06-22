import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css'; // assuming you have custom styles in index.css
import SearchIcon from '@mui/icons-material/Search';
import DishCard from './Dish.js'; // Adjust the import path based on your file structure
import Offers from './offers.js';
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
        const categories=response.data;
        setCategories(categories);
        console.log(response)
        // Initially set filtered dishes to all dishes from all categories
        const allDishes = categories.flatMap(category => category.dishes);
        setFilteredDishes(allDishes);
      })
      .catch(error => console.error('Error fetching categories and offers:', error));
  }, []);
  
  useEffect(() => {
    // Fetch offers from the correct endpoint
    axios.get('http://localhost:5000/offers')
      .then(response => {
        const offers = response.data;
        offers.map((offers)=>{
          setOffers(previous=>{
            return [...previous,offers.title];
          })
        })    
        console.log(offers);
      })
      .catch(error => console.error('Error fetching offers:', error));
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value; // Get the search query from input
    setSearchQuery(query); // Update searchQuery state with the new query

    // Filter dishes based on search query and selected category
    const allDishes = categories.flatMap(category => category.dishes);
    const filtered = allDishes.filter(dish =>
      dish.name.toLowerCase().includes(query.toLowerCase()) &&
      (!selectedCategory || categories.find(category => category.id === selectedCategory)?.dishes.includes(dish))
    );
    setFilteredDishes(filtered);
  };

  const handleCategoryChange = (event) => {
    const categoryId = parseInt(event.target.value);
    setSelectedCategory(categoryId);

    if (!categoryId) {
      // Show all dishes if no category is selected
      const allDishes = categories.flatMap(category => category.dishes);
      setFilteredDishes(allDishes);
    } else {
      const category = categories.find(cat => cat.id === categoryId);
      if (category) {
        setFilteredDishes(category.dishes.filter(dish =>
          dish.name.toLowerCase().includes(searchQuery)
        ));
      } else {
        setFilteredDishes([]);
      }
    }
  };

  return (
    <div className="categories bg-gray-100 min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Menu</h2>

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
                    price={"Rs.73"}
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
  );
};

export default Menu;