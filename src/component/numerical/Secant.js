import { useState } from 'react';
import { evaluate } from 'mathjs';
import Graph from '../Graph';
import Table from '../Table';

function Secant(){
    const [inputs, setInputs] = useState({
      func:"x^2 - 7",
      X1:1,
      X0:0
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
            <h1>Secant method</h1>
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
                        <label className="form-label" >X1:</label>
                        <input
                        className="form-control"
                        type="number"
                        name="X1"
                        id="X1"
                        value={inputs.X1}
                        onChange={(e) => updateInputs(e)} 
                        />
                    </div>
                    <div className="col">
                        <label className="form-label" >X0:</label>
                        <input
                        className="form-control"
                        type="number"
                        name="X0"
                        id="X0"
                        value={inputs.X0}
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
        <Table data={data} header={["X", "Xi-1"]}/>
      </> 
    )
}

function calculate(obj){
  const func = obj.func;
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

  let x = Number(obj.X1);
  let x_prev = Number(obj.X0);

  if( f(x) === f(x_prev)){
    outputs.ans = "---Hey Bros f(x) equal f(x_prev) divide by zeros choose another x!----";
    return outputs;
  }

  let temp;
  let error;
  outputs.error.push(1);

  do{
    outputs.data.push([x, x_prev]);
    temp = x;
    x = x - f(x)*(x - x_prev) / (f(x) - f(x_prev));
    x_prev = temp;
    error = Math.abs(x - x_prev)/Math.abs(x);
    outputs.error.push(error);

  }while(error > eps && outputs.error.length < limit);

  outputs.data.push([x, x_prev]);
  outputs.ans = x;

  return outputs;
}

export default Secant;