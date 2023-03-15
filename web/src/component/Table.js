function Table(props){
    if (props.data.length === 0){
      return(
        <>
        </>
      )
    }
    return(
      <div className="container">
        <table className="table table-bordered table-hover table-sm">
          <thead >
            <tr>
              <th>iteration</th>
              {props.header.map((x, index) => <th key={index+x}>{x}</th>)}
            </tr>
          </thead>
          <tbody>
            {props.data.map((value, index) => <TableRow key={index} arr={value} id={index} />)}
          </tbody>
        </table>
      </div>
    )
}

function TableRow(props){
    return (
      <tr key={"tr"+props.id+1}>
        <td key={"td"+props.id+1}>{props.id+1}</td>
        {props.arr.map((x) => <td key={x}>{(Math.trunc(x*10000)/10000).toFixed(4)}</td>)}
      </tr>
    )
}

export default Table;