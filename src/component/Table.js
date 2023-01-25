function Table(props){
    if (props.data.length === 0){
      return(
        <>
        </>
      )
    }
    return(
      <div class="container">
        <table class="table table-bordered table-sm">
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
      <tr>
        <td>{props.id+1}</td>
        {props.arr.map((x) => <td>{x}</td>)}
      </tr>
    )
}

export default Table;