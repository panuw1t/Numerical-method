import { useState } from 'react';
import { evaluate } from 'mathjs';
import CustomInputs from '../Custom_inputs';

function FalsePosition(){
  const head = "False position method";
  const field = {
    "f(x)":"x^2 - 7",
    XL:0,
    XR:4
  }
  return (
    <CustomInputs header={head} fields={field} calculate={calculate} />
  )
}

function calculate(inputs){
    const func = inputs["f(x)"];
    let xl = Number(inputs.XL);
    let xr = Number(inputs.XR);

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