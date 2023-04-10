import { evaluate } from 'mathjs';

export function secant(obj){
    const func = obj["f(x)"];
    const eps = 0.0001;
    const limit = 10000;
    const outputs ={
      ans:0,
      data:[],
      data_graph: {
        error: [],
        a: [],
        f:() => "function"
      }
    }
    const f = (a) =>{
      const scope = {
        x:a
      }
      return evaluate(func, scope);
    }
    outputs.data_graph.f = f;
  
    let x = Number(obj.X1);
    let x_prev = Number(obj.X0);
  
    if( f(x) === f(x_prev)){
      outputs.ans = "---Hey Bros f(x) equal f(x_prev) divide by zeros choose another x!----";
      return outputs;
    }
  
    let temp;
    let error;
    outputs.data_graph.error.push(1);
  
    do{
      outputs.data.push([x, x_prev]);
      outputs.data_graph.a.push(x);
      temp = x;
      x = x - f(x)*(x - x_prev) / (f(x) - f(x_prev));
      x_prev = temp;
      error = Math.abs(x - x_prev)/Math.abs(x);
      outputs.data_graph.error.push(error);
  
    }while(error > eps && outputs.data.length < limit);
  
    outputs.data.push([x, x_prev]);
    outputs.ans = x;
  
    return outputs;
  }