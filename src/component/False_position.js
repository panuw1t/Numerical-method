import { useState } from 'react';
import { evaluate } from 'mathjs';
import Graph from './Graph';
import Table from './Table';

function FalsePosition(){
    const [inputs, setInputs] = useState({
      func:"x^2 - 7",
      XL:0,
      XR:4,
    });
    const [answer, setAnswer] = useState("");
    const [data, setData] = useState([]);
    const [error, setError] = useState([]);
  
    const f = () => {
      const outputs = calculate(inputs);
      setAnswer(outputs.ans);
      setData(outputs.data);
      setError(outputs.error);
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
    }
  
    const updateInputs = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(previousState => ({...previousState, [name]: value}))
    }
  
    
    return (
      <>
        <div class="container border-bottom border-end p-3 bg-light">
          <h1>False position method</h1>
          <form onSubmit={handleSubmit}>
            <div class="row mb-3 mt-3">
              <div class="col">
                <label class="form-label " for="func">f(x):</label>
                  <input
                    class="form-control "
                    type="text"
                    name="func"
                    id="func" 
                    value={inputs.func}
                    onChange={(e) => updateInputs(e)} 
                  />
              </div>
              <div class="col">
                <label class="form-label" for="XL">XL:</label>
                <input
                  class="form-control"
                  type="text"
                  name="XL" 
                  id="XL"
                  value={inputs.XL}
                  onChange={(e) => updateInputs(e)} 
                />
              </div>
              <div class="col">
                <label class="form-label" for="XR">XR:</label>
                <input
                  class="form-control"
                  type="text"
                  name="XR" 
                  id="XR"
                  value={inputs.XR}
                  onChange={(e) => updateInputs(e)}
                />
              </div>
            </div>
            <button class="btn btn-primary" onClick={() => f()}>Calculate</button>
          </form>
        </div>
        <div class="container">
          <h4><br />Answer is {answer}</h4>
        </div>
        <Graph Data={error}/>
        <Table data={data} header={["XL", "XM", "XR"]}/>
      </> 
    )
}

function calculate(inputs){
    const func = inputs.func;
    const eps = 0.0001;
    const outputs ={
      ans:0,
      data:[],
      error:[]
    }
    const f = (a) =>{
      const scope = {
        x:a
      }
      return evaluate(func, scope)
    }
  
    let xl = Number(inputs.XL);
    let xr = Number(inputs.XR);
    let xm = (xl + xr)/2.0;
    let xold = 0;
    let error;

    try {
      f(10);
    }
    catch {
      outputs.ans = "---Hey your function is suck! try betteer!----";
      console.log("f(x) is wrong must use only x");
      return outputs;
    }
  
    if(f(xl)*f(xr) > 0){
      outputs.ans = "---Hey your boundary xl or xr is suck! try betteer!----";
      console.log("boundary xl, xr is wrong");
      return outputs;
    }
    outputs.error.push(1);
  
    do{
      outputs.data.push([xl, xm, xr]);
      xold = xm;
      if(f(xl)*f(xm) > 0){
        xl = xm;
      }
      else{
        xr = xm;
      }
      xm = xr - (xl - xr)*f(xr)/(f(xl) - f(xr));
      error = (Math.abs(xm - xold)/Math.abs(xm))*100;
      outputs.error.push(error);
    }while(error > eps);
    outputs.data.push([xl, xm, xr]);
  
    outputs.ans = xm;
    return outputs;
}

export default FalsePosition;