import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './component/Navbar';
import Home from './component/Home';
import NoPage from "./component/NoPage";
import Bisection from './component/Bisection';
import NewtonRaphson from "./component/Newton_raphson";
import Secant from "./component/Secant";
import FalsePosition from "./component/False_position";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="Bisection" element={<Bisection />}/>
          <Route path="Newton_raphson" element={<NewtonRaphson />}/>
          <Route path="Secant" element={<Secant />}/>
          <Route path="False_position" element={<FalsePosition />}/>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
