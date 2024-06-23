import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { green} from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import {addToCart, removeFromCart, increment, decrement} from "../store/CartSlice";

const DishCard = (props) => {

  const {cart} = useSelector((state) => state);
  const dispatch = useDispatch();

  const[present, setPresent] = useState(!cart.length || !(cart.some((product) => product.food.id === props.id)) ? true : false);

  const getQuantity = () => {

    if(!present)
      {
        const productInCart = cart.find((product) => product.food.id === props.item.id);
        return productInCart.amount;
      }
  
      else return 0;

  }

  const[quantity, setQuantity] = useState(getQuantity);

  console.log(quantity);

  const handleAddItem = () => {
    if(quantity === 0)
    {
      getQuantity();
      console.log("addToCart");
      dispatch(addToCart({food: props.item, amount: 1}));
      setPresent(false);
    } 
    else 
    {
      console.log("increment");
      dispatch(increment(props.item));
    }

    setQuantity(quantity+1);
  };

  const handleRemoveItem = () => {

    if(quantity !== 1)
      {
        console.log("decrement");
        dispatch(decrement(props.item));
      }
    else
    {
      console.log("removeFromCart");
      dispatch(removeFromCart(props.item));
      setPresent(true);
    }

    setQuantity(quantity-1);
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg mb-4 max-w-4xl mx-auto">
      <div className="flex items-center mb-4">
        <div className="w-24 h-24 mr-4">
          <img src={props.image} alt={props.name} className="w-full h-full object-cover rounded-lg" />
        </div>
        <div className="flex-1">
          <h4 className="text-xl font-bold">{props.name}</h4>
          <p className="text-black-500 mt-1 font-bold">{props.price}</p>
          <p className="text-gray-600 mt-2">{props.description}</p>
          <p className="text-gray-500 text-sm mt-2">[{props.nutrients}]</p>
        </div>
      </div>
      
      <div className="flex items-center justify-end">
        {quantity === 0 ? (
        <button
          className="text-gray-600 focus:outline-none bg-white-700 hover:bg-gray-300 px-4 py-2 rounded-lg flex items-center font-bold"
          style={{ color: green[700] }}
          onClick={handleAddItem}
        >
          ADD
        </button>
      ) : (
        <div className="flex items-center">
          <button
            className="text-gray-600 focus:outline-none  hover:bg-gray-300"
            onClick={handleRemoveItem}
          >
            <RemoveIcon style={{ color: green[700] }} />
          </button>
          <span className="mx-2 font-bold" style={{ color: green[700] }}>{quantity}</span>
          <button
            className="text-gray-600 focus:outline-none  hover:bg-gray-300"
            onClick={handleAddItem}
          >
            <AddIcon style={{ color: green[700] }} />
          </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default DishCard;
