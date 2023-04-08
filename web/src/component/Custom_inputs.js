import { useState } from 'react';
import Graph from './Graph';
import Table from './Table'
import axios from 'axios';


function CustomInputs({ header, fields, calculate, url, headTable }) {
    const [values, setValues] = useState(fields);
    const [answer, setAnswer] = useState("");
    const [data, setData] = useState([]);
    const [data_graph, setData_graph] = useState({
      a:[],
      error:[],
      f:(x) => x**2 - 7
    });
  
    const handleChange = (field) => (event) => {
      setValues({ ...values, [field]: event.target.value });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
    }
  
    const f = () =>{
      const outputs = calculate(values);
      setAnswer(outputs.ans);
      setData(outputs.data);
      setData_graph(outputs.data_graph);
      console.log(outputs.data);
    }
  
    const for_map = ([field, placeholder], index) => {
      const type = typeof placeholder === "number" ? "number" : "text";
      return (
        <div className="col" key={"div"+index}>
          <label className="form-label" key={"label"+index} htmlFor={field}>{field}:</label>
          <input
            className="form-control"
            id={field}
            key={index}
            type={type}
            value={values[field]}
            onChange={handleChange(field)}
          />
        </div>
      );
    }

    const get_sample = (x, number) =>{
      const url = x+number || "http://localhost:3001/sample/general/"+number ;
      axios.get(url)
        .then(res => {
          const sample = JSON.parse(res.data[0]["info"]);
          setValues(sample);
          const outputs = calculate(sample);
          setAnswer(outputs.ans);
          setData(outputs.data);
          setData_graph(outputs.data_graph);
        })
        .catch(error => {
          console.log(error);
        })
    }
  
    return (
      <>
        <div className="container border-bottom border-end p-3 bg-light">
          <h1>{header}</h1>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3 mt-3">
              {Object.entries(fields).map(for_map)}
            </div>
            <div>
              <button type='button' className="btn btn-primary me-3" onClick={() => f()} 
              title="calculate anwser from your input">
                Calculate
              </button>
              <button type='button' className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"
              title="dropdown to each sample input">
                Samples
              </button>
              <div className="dropdown-menu">
                <button type='button' className="dropdown-item" onClick={() => get_sample(url, 1)}
                title="get first sample input from server">
                  sample1
                </button>
                <button type='button' className="dropdown-item" onClick={() => get_sample(url, 2)}
                title="get second sample input from server">
                  sample2
                </button>
                <button type='button' className="dropdown-item" onClick={() => get_sample(url, 3)}
                title="get thrid sample input from server">
                  sample3
                </button>
              </div>
              <button type='button' className="btn btn-primary mx-3" onClick={() => {
                const url = "http://localhost:3001/protected";
                let token = localStorage.getItem('token'); 

                if (!token){
                  axios.get("http://localhost:3001/generate/doggie")
                    .then(res => {
                      localStorage.setItem('token', res.data);
                      console.log("token stored in local storage");
                      axios.get(url, {
                        headers: { Authorization: token}
                      })
                        .then(res => {
                          console.log(res.data);
                          console.log(token);
                        })
                        .catch(error => {
                          console.log(error);
                        })
                    })
                    .catch(err => console.log(err));
                }
                else{
                  axios.get(url, {
                    headers: { Authorization: token}
                  })
                    .then(res => {
                      console.log(res.data);
                      console.log(token);
                    })
                    .catch(error => {
                      console.log(error);
                    })
                }                                 
                
              }} 
              title="test api">
                test
              </button>
            </div>
          </form>
        </div>
        <div className="container">
          <h4><br />Answer is {answer}</h4>
        </div>
        <Graph Data={data_graph}/>
        <Table data={data} header={headTable || []}/>
      </>
    )
}


export default CustomInputs;