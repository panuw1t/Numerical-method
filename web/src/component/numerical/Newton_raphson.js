import { newton } from '../calculate/newton';
import CustomInputs from '../Custom_inputs';

function NewtonRaphson(){
  const head = "Newton's method";
  const field = {
    "f(x)":"x",
    X:0
  }
  return (
    <CustomInputs header={head} fields={field} calculate={newton} 
    headTable={["X"]}/>
  )
}

export default NewtonRaphson;