import { Routes, Route } from "react-router-dom"
import Login from "./Login";
import Register from "./Register";
import Order from "./Order";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </>
  )
}

export default App;
