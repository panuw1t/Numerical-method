import { fixed_point } from '../calculate/fixpoint'
import CustomInputs from '../Custom_inputs';


function FixedPointIteration(){
  const head = "Fixed-point iteration";
  const field = {
    "f(x)":"x",
    "g(x)":"x",
    X:0
  }
  return (
    <CustomInputs header={head} fields={field} calculate={fixed_point} 
    headTable={["X"]} url={"http://localhost:3001/sample/fixpoint/"}/>
  )
}

export default FixedPointIteration;