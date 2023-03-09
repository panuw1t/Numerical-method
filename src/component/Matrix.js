import { useState } from "react";


const Matrix= (props) => {
    const [dimension, setDimension] = useState(3);
    const [matrix, setMatrix] = useState(
        Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => ""))
    );
    const [vector, setVector] = useState(
        Array.from({ length:3},  () => "")
    );
    const [ans, setAns] = useState([]);

    const updateinputs = (e) =>{
        setDimension(e.target.value);
    }

    const f = () =>{
        setMatrix(
            Array.from({ length: dimension }, () => Array.from({ length: dimension }, () => ""))
        );        
        setVector(
            Array.from({ length: dimension},  () => "")
        );
        setAns([]);
    }

    const calculate = () => {
        const answer = props.calculate({matrix:matrix, vector:vector});
        setAns(answer);
    }

    const g = () => {
        setDimension(3);
        setMatrix(
            [[2, 1, 3],
            [1, -2, -1],
            [4, 1, 2]]
        );        
        setVector(
            [6, 1, 2]
        );
    }

    const handleChange = (e, i, j) => {
        const newValue = e.target.value;
        const updatedMatrix = [...matrix];
        updatedMatrix[i][j] = newValue;
        setMatrix(updatedMatrix);
    }

    const handleChangeVec = (e, i) => {
        const newValue = e.target.value;
        const updateVector = [...vector];
        updateVector[i] = newValue;
        setVector(updateVector);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <>
        <div className="container border-bottom border-end p-3 my-3 bg-light">
            <h1>{props.header}</h1>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3 mt-3">
                <label className="form-label" htmlFor='dimension'>Matrix dimension:</label>
                <div className="col-sm-2">
                    <input
                        className="form-control "
                        id='dimension'
                        type="number"
                        value={dimension}
                        onChange={updateinputs}
                    />
                </div>
                <button className="btn btn-primary btn-sm col-sm-1 mx-3" type='button' onClick={f}>Set matrix</button>
                <button className="btn btn-primary btn-sm col-sm-1 me-3" type='button' onClick={calculate}>calculate</button>
                <button className="btn btn-primary btn-sm col-sm-1 me-3" type='button' onClick={g}>sample</button>
                </div>
            </form>
            <h4><br />Answer is {ans.map((x) => x+" ")}</h4>
        </div>
        
        <div className='container'>
            <div className="d-flex flex-nowrap">
            <table className='table-borderless'>
                <tbody >
                    {matrix.map((row, i) => (
                        <tr key={"row"+i}>
                        {row.map((col, j) =>(
                            <td key={"col"+j}>
                            <label>
                            <input
                                type="number"
                                title={"input for "+i+","+j}
                                value={matrix[i][j]}
                                onChange={(e) => handleChange(e, i, j)}
                            />
                            </label>
                            </td>
                        ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <table className='table-borderless mx-5'>
                <tbody>
                {vector.map((row, i) => (
                    <tr key={"vector"+i}>
                    <td>
                        <label>
                        <input
                            className='ms-1'
                            title={'input for y'+(i+1)}
                            type="number"
                            value={vector[i]}
                            onChange={(e) => handleChangeVec(e, i)}
                        />
                        </label>
                    </td> 
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>      
        </>
    )
}

export default Matrix;