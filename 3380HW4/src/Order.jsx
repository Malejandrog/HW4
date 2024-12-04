import { useState } from 'react'
import './Order.css'
import axios from 'axios';

function Order() {
  const [count, setCount] = useState(0);
  const [orderItems, setOrderItems] = useState([]);
  const [location, setLocation] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [ccv, setCcv] = useState('');
  const [expDate, setExpDate] = useState('');
  const [tip, setTip] = useState('');
  const [error, setError] = useState('');


  const menuItems = [
    { name: 'The Databurger', price: 8.99, img: 'Burger1.png' },
    { name: 'The Double Smash Patty', price: 9.99, img: 'Burger2.png' },
    { name: 'The Chicken Sandwich', price: 7.99, img: 'ChickenSandwich.png' },
    { name: 'Chicken Tenders', price: 6.99, img: 'ChickenTender.png' },
    { name: 'Databurger Meal', price: 14.99, img: 'b1Meal.png' },
    { name: 'Double Patty Meal', price: 15.99, img: 'b2Meal.png' },
    { name: 'Chicken Sandwich Meal', price: 13.99, img: 'CSMeal.png' },
    { name: 'Chicken Tender Meal', price: 12.99, img: 'CTMeal.png' },
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

  const TestDB = async () => {
    try {
        const response = await axios.post('http://172.19.155.78:5000/start-function');
        console.log(response.data.message); // Logs "Function executed successfully!"
    } catch (error) {
        console.error('Error calling the backend:', error);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://172.19.155.78:5000/place-order', {
        count: count, //total price
        location: location,
        paymentMethod: paymentMethod,
        cardNumber: cardNumber,
        ccv: ccv,
        expDate: expDate,
        tip: tip
      });
  
      if (response.data.success) {
        console.log('Order Placed:', response.data.message);
        setError(''); // Clear any previous errors
      } else {
        setError('Invalid order. Please try again.');
      }
    } catch (err) {
      console.error('Error during ordering:', err);
      setError('An error occurred during ordering. Please try again.');
    }
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

          <label htmlFor="Locations">Select a Location:</label>
          <select
            name="Locations"
            id="Locations"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="" disabled>Select a city</option>
            <option value="PHX">Phoenix, AZ</option>
            <option value="LAG">Los Angeles, CA</option>
            <option value="SDE">San Diego, CA</option>
            <option value="CHI">Chicago, IL</option>
            <option value="NYC">New York, NY</option>
            <option value="PHI">Philadelphia, PA</option>
            <option value="HOU">Houston, TX</option>
            <option value="SAT">San Antonio, TX</option>
          </select>

          <label htmlFor="PaymentMethod">Payment Method:</label>
          <select
            name="PaymentMethod"
            id="PaymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="" disabled>Payment:</option>
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
            <option value="GiftCard">Gift Card</option>
          </select>

          <div className='CCInfo'>
            <label htmlFor="CCNum">Card Number:</label>
            <input
              type="text"
              id="CCNum"
              value={cardNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ''); // Allow only numbers
                setCardNumber(value);
              }}
              maxLength={16} // Limit to 16 digits
              placeholder="Card Number"
            />



            <label htmlFor="CCV">CCV:</label>
            <input
              type="text"
              id="CCV"
              value={ccv}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                setCcv(value);
              }}
              maxLength={4} // Limit to 4 digits
              placeholder="CCV"
            />

            <label htmlFor="CCDate">Exp. Date:</label>
            <input
              type="text"
              id="CCDate"
              value={expDate}
              onChange={(e) => {
                let value = e.target.value.replace(/[^0-9/]/g, ''); // Allow only numbers and "/"
                if (value.length === 2 && !value.includes('/')) {
                  value = value + '/'; // Add slash after MM
                }
                setExpDate(value.slice(0, 5)); // Limit to "MM/YY"
              }}
              placeholder="MM/YY"
            />
          </div>

          <label htmlFor="Tip">Tip:</label>
            <input
              type="text"
              id="Tip"
              value={tip}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.]/g, ''); // Allow only numbers and "."
                const isValid = /^\d*\.?\d{0,2}$/.test(value); // Ensure valid format (max 2 decimal places)
                if (isValid) setTip(value);
              }}
              placeholder="Tip"
            />

          <p className='subtotal'><b>Subtotal: ${count.toFixed(2)}</b></p>
          <p className='tax'><b>Tax: ${(count * 0.0825).toFixed(2)}</b></p>
          <p className='totalPrice'><b>Total Price: ${(count * 1.0825 + (parseFloat(tip) || 0)).toFixed(2)}</b></p>


          <button className="orderButton" onClick={handlePlaceOrder}>Place Order</button>

          <button onClick={TestDB} className="testerButton">Test DB</button>
        </div>
      </div>
    </>
  );
}

export default Order;
