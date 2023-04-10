import { evaluate } from 'mathjs';

export function bisection(inputs){
    const func = inputs["f(x)"];
    let xl = Number(inputs.XL);
    let xr = Number(inputs.XR);
    const eps = 0.0001;
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
      return evaluate(func, scope)
    }
    outputs.data_graph.f = f;

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
  
    if(f(xl)*f(xr) >= 0){
      outputs.ans = "---Hey your boundary xl or xr is suck! try betteer!----";
      console.log("boundary xl, xr is wrong");
      return outputs;
    }
    outputs.data_graph.error.push(1);

    outputs.data.push([xl, xm, xr]);

    do{
      if (error > 0.1){
        outputs.data.push([xl, xm, xr]);
      }

      outputs.data_graph.a.push(xm);
      xold = xm;
      if(f(xl)*f(xm) > 0){
        xl = xm;
      }
      else{
        xr = xm;
      }
      xm = (xl + xr)/2.0
      error = (Math.abs(xm - xold)/Math.abs(xm))*100;
      outputs.data_graph.error.push(error);
    }while(error > eps);
    outputs.data.push([xl, xm, xr]);

    outputs.ans = xm;
    return outputs;
}