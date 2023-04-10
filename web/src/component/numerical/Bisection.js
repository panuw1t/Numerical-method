import CustomInputs from '../Custom_inputs';
import { bisection } from '../calculate/bisection';

function Bisection(){
  const head = "Bisection method";
  const field = {
    "f(x)":"x",
    XL:0,
    XR:0,
  }
  return (
    <CustomInputs header={head} fields={field} calculate={bisection} 
    headTable={["XL", "XM", "XR"]}/>
  )
}

export default Bisection;