import { evaluate } from 'mathjs';

export function fixed_point(obj){
    const func = obj["f(x)"];
    const func2 = obj["g(x)"];
    const eps = 0.0001;
    const limit = 50;
    const patient = 10000;
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
  
    const g = (a) =>{
      const scope = {
        x:a
      }
      return evaluate(func2, scope);
    }
  
    const early_stop = () =>{
      if(outputs.data_graph.error[outputs.data_graph.error.length-1] >= outputs.data_graph.error[outputs.data_graph.error.length-2]){
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
    let xold = 0;
    let count=patient;
    outputs.data_graph.error.push(1);
  
    outputs.data.push([x]);
  
    do{
      if (error > 0.1){
        outputs.data.push([x]);
      }
      
      outputs.data_graph.a.push(x);
      xold = x;
      x = g(x);
      if(!isFinite(x)){
          console.log("x is infinite");
          break;
      }
      error = (Math.abs(x - xold)/Math.abs(x))*100;
      outputs.data_graph.error.push(error);
  
      if(early_stop()){
          console.log("early stop activated");
          outputs.data_graph.error = [];
          break;
      }
  
    }while(error > eps && outputs.data.length < limit); 
  
    outputs.data.push([x]);
    outputs.ans = x;
  
    return outputs;
  }