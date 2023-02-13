import { useState } from 'react';
import { evaluate } from 'mathjs';
import { derivative } from 'mathjs';
import Graph from '../Graph';
import Table from '../Table';

function NewtonRaphson(){
    const [inputs, setInputs] = useState({
      func:"x^2 - 7",
      X:1
    });
    const [answer, setAnswer] = useState("");
    const [data, setData] = useState([]);
    const [error, setError] = useState([]);
  
    const f = () => {
      const outputs = calNewton(inputs);
      setData(outputs.data);
      setError(outputs.error);
      setAnswer(outputs.ans);
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
        <div className="container border-bottom border-end p-3 bg-light">
          <h1>Newton's method</h1>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3 mt-3">
              <div className="col">
                <label className="form-label">f(x):</label>
                  <input
                    className="form-control"
                    type="text"
                    name="func" 
                    id="func"
                    value={inputs.func}
                    onChange={(e) => updateInputs(e)} 
                  />
              </div>
              <div className="col">
                <label className="form-label">X:</label>
                <input
                  className="form-control"
                  type="number"
                  name="X"
                  id="X"
                  value={inputs.X}
                  onChange={(e) => updateInputs(e)} 
                />
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => f()}>Calculate</button>
          </form>
        </div>
        <div className="container">
          <h4><br />Answer is {answer}</h4>
        </div>
        <Graph Data={error}/>
        <Table data={data} header={["X"]}/>
      </> 
    )
}

function calNewton(obj){
  const func = obj.func;
  const dfunc = derivative(func, 'x');
  const eps = 0.0001;
  const limit = 10000;
  const outputs ={
    ans:0,
    data:[],
    error:[]
  }
  const f = (a) =>{
    const scope = {
      x:a
    }
    return evaluate(func, scope);
  }
  const df = (a) =>{
    const scope = {
      x:a
    }
    return dfunc.evaluate(scope);
  }

  try {
    f(10);
  }
  catch {
    outputs.ans = "---Hey your function is suck! try betteer!----";
    console.log("f(x) is wrong must use only x");
    return outputs;
  }

  if(df(obj.X) === 0){
    outputs.ans = "---your X derivative is 0 choose another X!----";
    console.log("cant divide by zero");
    return outputs;
  }
  
  let x = Number(obj.X);
  let xold = 0;
  let error;
  outputs.error.push(1);

  do{
    outputs.data.push([x]);
    xold = x;
    x = xold - f(xold)/df(xold);
    error = Math.abs(x-xold)/Math.abs(x);
    outputs.error.push(error);
    
  }while(error > eps && outputs.data.length < limit); 
  outputs.data.push([x]);
  outputs.ans = x;

  return outputs;
}

export default NewtonRaphson;