import Plot from 'react-plotly.js';
import React from 'react';


function Graph(props){
    if(props.Data.error.length < 1){
      return (<></>)
    }
    const labels = props.Data.error.map((value, index) => index);


    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <div className='chart-container border'>
              <ErrorPlot x={labels} y={props.Data.error} width={630}/>
            </div>
          </div>
          <div className="col-md-6">
            <div className='chart-container border'>
              <SomePlot f={props.Data.f} data={props.Data.a} width={630}/>                   
            </div>           
          </div>
        </div>
      </div>          
    )
}

const ErrorPlot = ({x, y, width}) => {
  const data = [{
    x:x,
    y:y,
    type: 'scatter',
    mode: 'lines+markers',
    marker: {color: 'red'},
  }]

  const layout = {
    title: 'Error',
    xaxis: {title: 'Iteration'},
    yaxis: {
      title: 'Error',
      type: 'log'
    },
    width: width,
    hovermode: 'x',
  };

  const config = {
    displayModeBar: false
  };

  return (
    <Plot data={data} layout={layout} config={config}/>
  )
}


function SomePlot({f, data, width}) {
  const start = Math.min(...data)-1;
  const end = Math.max(...data)+1;
  const step = 0.01;

  const numSteps = Math.floor((end - start) / step) + 1;
  const x = Array.from({length: numSteps}, (_, index) => (index * step) + start);

  const y = x.map((x) => f(x));

  const func = {
    x: x || [1, 2, 3, 4],
    y: y || [10, 11, 12, 13],
    type: 'scatter',
    mode: 'lines',
    name: 'f(x)',
    hoverinfo: 'skip',
    line: {
      color: 'blue',
      width: 3
    }
  };

  const x_ans = data.map(x => [x, x]).flat();
  const y_ans = data.map(x => [0, f(x)]).flat();

  const ans = {
    x: x_ans || [1, 2, 3, 4],
    y: y_ans || [9, 10, 12, 13],
    type: 'scatter',
    mode: 'lines+markers',
    name: 'ans',
    text: y_ans.map((x, index) => index%2===0 ? "iteration "+(index/2 +1):"point "+(Math.floor(index/2)+1)),
    line: {
      color: 'red',
      dash: 'dot',
      width: 3 
    },
    marker: {
      size: 10, 
      color: 'green',
      symbol: 'circle'
    }
  };


  const layout = {
    title: 'find answer',
    showlegend: true,
    width: width,
    legend: {
      x: 0.1,
      y: 1.1
    },
    yaxis: {
      range:[Math.floor(Math.min(...y_ans))-1, Math.floor(Math.max(...y_ans))+1]
    },
    xaxis: { 
      range: [start, end] 
    }
  };

  const config = {
    displayModeBar: false,
    
  };

  return (
    <div>
      <Plot
        data={[func, ans]} layout={layout} config={config}/>
    </div>
  );
}


export default Graph;