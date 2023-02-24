function Table(props){
    if (props.data.length === 0){
      return(
        <>
        </>
      )
    }
    return(
      <div className="container">
        <table className="table table-bordered table-sm">
          <thead>
            <tr>
              <th>iteration</th>
              {props.header.map((x, index) => <th key={index}>{x}</th>)}
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
        {props.arr.map((x) => <td key={x}>{x}</td>)}
      </tr>
    )
}

export default Table;