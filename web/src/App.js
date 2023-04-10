import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './component/Navbar';
import Home from './component/Home';
import NoPage from "./component/NoPage";
import Bisection from "./component/numerical/Bisection";
import NewtonRaphson from "./component/numerical/Newton_raphson";
import Secant from "./component/numerical/Secant";
import FalsePosition from "./component/numerical/False_position";
import FixedPointIteration from "./component/numerical/Fixed_point_iteration";
import CramerRule from "./component/numerical/Cramer_rule";


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
          <Route path="Fixed_point_iteration" element={<FixedPointIteration />}/>
          <Route path="Cramer_rule" element={<CramerRule />}/>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
