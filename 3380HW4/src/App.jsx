import { useState } from 'react'
import './App.css'
import { Flex, FormControl, FormLabel } from '@chakra-ui/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='topBar'>
        <h1>Databurger</h1>
        <img src="public/Databurger.png" className="Logo"></img>
      </div>
      

  <div className="mainContainer">
    <div class="menuArea">

      <button onClick={() => setCount((count) => count + 8.99)} class="menuItem">
        <div>
          <img src="public/Burger1.png" className="Burger1" alt="Burger1" />
          <p>The Databurger $8.99</p>
        </div>
      </button>
      
      <button onClick={() => setCount((count) => count + 9.99)} class="menuItem">
        <div>
          <img src="public/Burger2.png" className="Burger2" alt="Burger2" />
          <p>The Double Smash Patty $9.99</p>
        </div>
      </button>

      <button onClick={() => setCount((count) => count + 7.99)} class="menuItem">
        <div>
          <img src="public/ChickenSandwich.png" className="ChickenSandwich" alt="ChickenSandwich" />
          <p>The Chicken Sandwich $7.99</p>
        </div>
      </button>

      <button onClick={() => setCount((count) => count + 6.99)} class="menuItem">
        <div>
          <img src="public/ChickenTender.png" className="ChickenTender" alt="ChickenTender" />
          <p>Chicken Tenders $6.99</p>
        </div>
      </button>

      <button onClick={() => setCount((count) => count + 12.99)} class="menuItem">
        <div>
          <img src="public/b1Meal.png" className="b1Meal" alt="b1Meal" />
          <p>Databurger Meal $12.99</p>
        </div>
      </button>

      <button onClick={() => setCount((count) => count + 13.99)} class="menuItem">
        <div>
          <img src="public/b2Meal.png" className="b2Meal" alt="b2Meal" />
          <p>Double Patty Meal $13.99</p>
        </div>
      </button>

      <button onClick={() => setCount((count) => count + 11.99)} class="menuItem">
        <div>
          <img src="public/CSMeal.png" className="CSMeal" alt="CSMeal" />
          <p>Chicken Sandwhich Meal $11.99</p>
        </div>
      </button>

      <button onClick={() => setCount((count) => count + 10.99)} class="menuItem">
        <div>
          <img src="public/CTMeal.png" className="CTMeal" alt="CTMeal" />
          <p>Chicken Tender Meal $10.99</p>
        </div>
      </button>

      <button onClick={() => setCount((count) => count + 6.99)} class="menuItem">
        <div>
          <img src="public/Salad.png" className="Salad" alt="Salad" />
          <p>Chicken Salad $6.99</p>
        </div>
      </button>

      <button onClick={() => setCount((count) => count + 1.99)} class="menuItem">
        <div>
          <img src="public/Drink.png" className="Drink" alt="Drink" />
          <p>Fountain Drink $1.99</p>
        </div>
      </button>

      <button onClick={() => setCount((count) => count + 2.99)} class="menuItem">
        <div>
          <img src="public/Fries.png" className="Fries" alt="Fries" />
          <p>French Fries $2.99</p>
        </div>
      </button>

      <button onClick={() => setCount((count) => count + 3.99)} class="menuItem">
        <div>
          <img src="public/IceCream.png" className="IceCream" alt="IceCream" />
          <p>Ice Cream $3.99</p>
        </div>
      </button>

    </div>

    <div className='paymentInfo'>


    <p className='orderInfo'>Order Info:</p>
      <ul>
        <li>MENU ITEM HERE</li>
        <li>MENU ITEM HERE</li>
        <li>MENU ITEM HERE</li>
        <li>MENU ITEM HERE</li>
        <li>MENU ITEM HERE</li>
        <li>MENU ITEM HERE</li>
      </ul>

      <label for="CCInfo">Credit Card Number:</label>
      <input type="text" id="CCInfo"></input>

      <label for="CCV">CCV:</label>
      <input type="text" id="CCV"></input>

      <label for="CCDate">Exp. Date:</label>
      <input type="text" id="CCDate"></input>

      <label for="Address">Address:</label>
      <input type="text" id="Address"></input>

      <label for="Tip">Tip:</label>
      <input type="text" id="Tip"></input>

      <p><b>Price: {count}</b></p>

      <input type="button" className="orderButton" value="Place Order"></input>

    </div>

    <img src="public/ER.PNG" className="ER"></img>

  </div>
    </>
  )
}

export default App
