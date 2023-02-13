import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";


function Graph(props){
    if(props.Data.length < 1){
      return (<></>)
    }
    const labels = props.Data.map((value, index) => index);
    const data = {
      labels: labels,
      datasets: [
        {
          label: "error",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: props.Data,
        },
      ],
    };
    const options = {
      scales: {
        y:
          {
            type: 'logarithmic',
            position: 'left',
          },
      },
    };
  
    return (
      <div className="container" style={{margin:"20px"}}>
        <div style={{width:600, marginLeft:"auto", marginRight:"auto"}}>
          <Line data={data} options={options}/>
        </div>
      </div>
    )
}

export default Graph;