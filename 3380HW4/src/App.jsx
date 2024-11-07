import { useState } from 'react';
import './App.css';
import { Flex, FormControl, FormLabel } from '@chakra-ui/react';

function App() {
  const [count, setCount] = useState(0);
  const [orderItems, setOrderItems] = useState([]);

  const menuItems = [
    { name: 'The Databurger', price: 8.99, img: 'Burger1.png' },
    { name: 'The Double Smash Patty', price: 9.99, img: 'Burger2.png' },
    { name: 'The Chicken Sandwich', price: 7.99, img: 'ChickenSandwich.png' },
    { name: 'Chicken Tenders', price: 6.99, img: 'ChickenTender.png' },
    { name: 'Databurger Meal', price: 12.99, img: 'b1Meal.png' },
    { name: 'Double Patty Meal', price: 13.99, img: 'b2Meal.png' },
    { name: 'Chicken Sandwich Meal', price: 11.99, img: 'CSMeal.png' },
    { name: 'Chicken Tender Meal', price: 10.99, img: 'CTMeal.png' },
    { name: 'Chicken Salad', price: 6.99, img: 'Salad.png' },
    { name: 'Fountain Drink', price: 1.99, img: 'Drink.png' },
    { name: 'French Fries', price: 2.99, img: 'Fries.png' },
    { name: 'Ice Cream', price: 3.99, img: 'IceCream.png' },
  ];

  const addItemToOrder = (item) => {
    setOrderItems((prevItems) => [...prevItems, item]);
    setCount((prevCount) => prevCount + item.price);
  };

  const clearOrder = () => {
    setOrderItems([]);
    setCount(0);
  };

  return (
    <>
      <div className='topBar'>
        <h1>Databurger</h1>
        <img src="public/Databurger.png" className="Logo" alt="Logo" />
      </div>

      <div className="mainContainer">
        <div className="menuArea">
          {menuItems.map((item, index) => (
            <button key={index} onClick={() => addItemToOrder(item)} className="menuItem">
              <div>
                <img src={`public/${item.img}`} className={item.img.replace('.png', '')} alt={item.name} />
                <p>{item.name} ${item.price.toFixed(2)}</p>
              </div>
            </button>
          ))}
        </div>

        <div className='paymentInfo'>
          <p className='orderInfo'>Order Info:</p>
          <ul>
            {orderItems.map((item, index) => (
              <li key={index}>{item.name} - ${item.price.toFixed(2)}</li>
            ))}
          </ul>

          <button onClick={clearOrder} className="clearButton">Clear Order</button>

          <label htmlFor="CCInfo">Credit Card Number:</label>
          <input type="text" id="CCInfo" />

          <label htmlFor="CCV">CCV:</label>
          <input type="text" id="CCV" />

          <label htmlFor="CCDate">Exp. Date:</label>
          <input type="text" id="CCDate" />

          <label htmlFor="Address">Address:</label>
          <input type="text" id="Address" />

          <label htmlFor="Tip">Tip:</label>
          <input type="text" id="Tip" />

          <p><b>Total Price: ${(count*1.0825).toFixed(2)}</b></p>

          <button className="orderButton">Place Order</button>
        </div>

        <img src="public/ER.PNG" className="ER" alt="ER Diagram" />
      </div>
    </>
  );
}

export default App;
