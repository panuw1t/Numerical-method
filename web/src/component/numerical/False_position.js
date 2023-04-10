import { false_position } from '../calculate/false';
import CustomInputs from '../Custom_inputs';

function FalsePosition(){
  const head = "False position method";
  const field = {
    "f(x)":"x",
    XL:0,
    XR:0
  }
  return (
    <CustomInputs header={head} fields={field} calculate={false_position} 
    headTable={["XL", "XM", "XR"]}/>
  )
}

export default FalsePosition;