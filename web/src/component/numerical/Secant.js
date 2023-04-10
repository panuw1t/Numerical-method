import { secant } from '../calculate/secant';
import CustomInputs from '../Custom_inputs';

function Secant(){
  const head = "Secant method";
  const field = {
    "f(x)":"x",
    X1:0,
    X0:0
  }
  return (
    <CustomInputs header={head} fields={field} calculate={secant} 
    headTable={["X1", "X0"]}/>
  )
}


export default Secant;