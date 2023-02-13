import { useState } from 'react';
import { evaluate } from 'mathjs';
import Graph from '../Graph';
import Table from '../Table';

function FixedPointIteration(){
    const [inputs, setInputs] = useState({
      func:"x^2 - x - 1",
      func2:"1 + 1/x",
      X:1
    });
    const [answer, setAnswer] = useState("");
    const [data, setData] = useState([]);
    const [error, setError] = useState([]);
  
    const f = () => {
      const outputs = calculate(inputs);
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
          <h1>Fixed-point iteration</h1>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3 mt-3">
              <div className="col">
                <label className="form-label" >f(x):</label>
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
                <label className="form-label" >g(x):</label>
                  <input
                    className="form-control"
                    type="text"
                    name="func2" 
                    id="func2"
                    value={inputs.func2}
                    onChange={(e) => updateInputs(e)} 
                  />
              </div>
              <div className="col">
                <label className="form-label" for="X">X:</label>
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

function calculate(obj){
  const func = obj.func;
  const func2 = obj.func2;
  const eps = 0.0001;
  const limit = 50;
  const patient = 10000;
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
  const g = (a) =>{
    const scope = {
      x:a
    }
    return evaluate(func2, scope);
  }
  const early_stop = () =>{
    if(outputs.error[outputs.error.length-1] >= outputs.error[outputs.error.length-2]){
        count = count-1;
    }
    else{
        count = patient;
    }

    if(count <= 0){
        return true;
    }
    return false;
  }
  
  let x = Number(obj.X);
  let error;
  let count=patient;
  outputs.error.push(1);

  do{
    outputs.data.push([x]);
    x = g(x);
    if(!isFinite(x)){
        console.log("x is infinite");
        break;
    }
    error = Math.abs(f(x));
    outputs.error.push(error);

    if(early_stop()){
        console.log("early stop activated");
        break;
    }

  }while(error > eps && outputs.data.length < limit); 

  outputs.data.push([x]);
  outputs.ans = x;

  return outputs;
}

export default FixedPointIteration;