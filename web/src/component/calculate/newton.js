import { evaluate } from 'mathjs';
import { derivative } from 'mathjs';

export function newton(obj){
    const func = obj["f(x)"];
    const dfunc = derivative(func, 'x');
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
    outputs.data_graph.error.push(1);
  
    do{
      outputs.data.push([x]);
      outputs.data_graph.a.push(x);
      xold = x;
      x = xold - f(xold)/df(xold);
      error = Math.abs(x-xold)/Math.abs(x);
      outputs.data_graph.error.push(error);
      
    }while(error > eps && outputs.data.length < limit); 
    outputs.data.push([x]);
    outputs.ans = x;
  
    return outputs;
  }