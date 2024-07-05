import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import DishCard from './Dish.js'; // Adjust the import path based on your file structure
import NavbarAdmin from './Navbaradmin.js';

const MenuAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newDish, setNewDish] = useState({ 
    name: '', 
    price: '',
    image: '', 
    description: '', 
    nutrients: '', 
    categoryId: '' 
  });
  const [showAddDishForm, setShowAddDishForm] = useState(false);

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

  const handleDelete = (id) => {
    // Update filteredDishes to remove the deleted dish
    const newFilteredDishes = filteredDishes.filter(dish => dish.id !== id);
    setFilteredDishes(newFilteredDishes);

    // You can optionally delete the dish from the backend here
  };

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

  const handleAddDishChange = (event) => {
    const { name, value } = event.target;
    setNewDish({ ...newDish, [name]: value });
  };

  const handleAddDishSubmit = (event) => {
    event.preventDefault();
    const newDishId = Math.max(...filteredDishes.map(dish => dish.id)) + 1; // Generate a new ID
    const dishToAdd = { ...newDish, id: newDishId };

    // Update the filteredDishes state
    setFilteredDishes([...filteredDishes, dishToAdd]);

    // Optionally, send the new dish to the backend
    axios.post('http://localhost:5000/dishes', dishToAdd)
      .then(response => {
        console.log('Dish added successfully:', response.data);
      })
      .catch(error => console.error('Error adding dish:', error));

    // Clear the form and hide it
    setNewDish({ name: '', price: '', image: '', description: '', nutrients: '', categoryId: '' });
    setShowAddDishForm(false);
  };

  return (
    <div>
      <NavbarAdmin />
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
                      admin={true}
                      delete={handleDelete}
                    />
                    {index !== filteredDishes.length - 1 && <hr className="my-4 border-gray-300" />} {/* Horizontal gray line */}
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-8 text-lg text-gray-600">No dishes found.</p>
            )}
          </div>

          {/* Add Dish Form Toggle */}
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAddDishForm(!showAddDishForm)}
              className="bg-green-700 text-white px-4 py-2 rounded-lg font-bold"
            >
              {showAddDishForm ? 'Cancel' : 'Add New Dish'}
            </button>
          </div>

          {/* Add Dish Form */}
          {showAddDishForm && (
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-center">Add New Dish</h3>
              <form onSubmit={handleAddDishSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newDish.name}
                    onChange={handleAddDishChange}
                    className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={newDish.price}
                    onChange={handleAddDishChange}
                    className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={newDish.image}
                    onChange={handleAddDishChange}
                    className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Description</label>
                  <textarea
                    name="description"
                    value={newDish.description}
                    onChange={handleAddDishChange}
                    className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Nutrients</label>
                  <input
                    type="text"
                    name="nutrients"
                    value={newDish.nutrients}
                    onChange={handleAddDishChange}
                    className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">Category</label>
                  <select
                    name="categoryId"
                    value={newDish.categoryId}
                    onChange={handleAddDishChange}
                    className="border border-gray-300 px-4 py-2 rounded-lg w-full"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold"
                  >
                    Add Dish
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuAdmin;
