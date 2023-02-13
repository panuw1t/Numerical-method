import { useState } from 'react';

function CramerRule(){    
    return (
      <>
        <div className="container border-bottom border-end p-3 bg-light">
          <h1>Cramer's rule</h1>
        </div>
        <Matrix />
      </> 
    )
}

const Matrix= () => {
  const [dimension, setDimension] = useState(3);
  const [n, setN] = useState(3);
  const [matrix, setMatrix] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);

  const updateinputs = (e) =>{
    setN(e.target.value);
  }

  const f = () =>{
    setDimension(n);
    const c = Number(n)
    const newMatrix = Array(c).fill(0).map(
      () => Array(c).fill(0)
    );
    setMatrix(newMatrix);
  }

  const handleChange = (e, i, j) => {
    const updatedMatrix = [...matrix];
    updatedMatrix[i][j] = Number(e.target.value);
    setMatrix(updatedMatrix);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <>
      <div className="container-fluid">
        <form onSubmit={handleSubmit}>
            <div className="row mb-3 mt-3">
              <label className="form-label" >Matrix dimension:</label>
              <div className="col-sm-2">
                  <input
                    className="form-control"
                    type="number"
                    value={n}
                    onChange={updateinputs}
                  />
              </div>
              <button className="btn btn-primary btn-sm col-sm-1" onClick={f}>Set matrix</button>
            </div>
        </form>
        { dimension > 1 &&
          <table>
            <tbody>
              {matrix.map((row, i) => (
                <tr key={i}>
                  {row.map((col, j) =>(
                    <td key={j}>
                      <input 
                        type="number"
                        onChange={(e) => handleChange(e, i, j)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        }
        {matrix.map((row, i) => <p key={i}>{row}</p>)}
      </div>
    </>
  )

}

export default CramerRule;