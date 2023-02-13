import { useState } from 'react';
import Graph from './Graph';
import Table from './Table'


function CustomInputs({ header, fields, calculate }) {
    const [values, setValues] = useState(fields);
    const [answer, setAnswer] = useState("");
    const [data, setData] = useState([]);
    const [error, setError] = useState([]);
  
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
      setError(outputs.error);
    }
  
    const for_map = ([field, placeholder], index) => {
      const type = typeof placeholder === "number" ? "number" : "text";
      return (
        <div className="col">
          <label className="form-label">{field}:</label>
          <input
            className="form-control "
            key={index}
            type={type}
            value={values[field]}
            onChange={handleChange(field)}
          />
        </div>
      );
    }
  
    return (
      <>
        <div className="container border-bottom border-end p-3 bg-light">
          <h1>{header}</h1>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3 mt-3">
              {Object.entries(fields).map(for_map)}
            </div>
            <button className="btn btn-primary" onClick={() => f()}>Calculate</button>
          </form>
        </div>
        <div className="container">
          <h4><br />Answer is {answer}</h4>
        </div>
        <Graph Data={error}/>
        <Table data={data} header={["XL", "XM", "XR"]}/>
      </>
    )
}


export default CustomInputs;