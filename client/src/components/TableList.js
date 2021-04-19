import React, { Component } from 'react'

  

class TableList extends Component {

    state = {
      filteredInfo: null,
      sortedInfo: null,
    };

    componentDidMount(){
        console.log('In componentDidMount this.props :>> ', this.props);
    }
    

    render() {
    const { tableData }=this.props

        return (
          <div className='row mt-5'>
          
          <table className="table">
            <caption>Exported File Data</caption>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">GL Date</th>
                <th scope="col">Abr</th>
                <th scope="col">Parent Account for Nature View</th>
                <th scope="col">Actual Amount</th>
                <th scope="col">Currency</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row,index) => (
                <tr key={index}>
                    <th scope="row">{index}</th>
                    <th>{row.gl_date}</th>
                    <th>{row.abr}</th>
                    <th>{row.parent_acc_nature_view}</th>
                    <th>{row.actual_amount}</th>
                    <th>{row.currency}</th>
                </tr>
              ))}
            </tbody>
          </table>
        
          </div>
        )
    }
}

export default TableList