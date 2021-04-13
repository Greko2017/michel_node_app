import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

  

class TableList extends Component {

    state = {
      filteredInfo: null,
      sortedInfo: null,
    };

    componentDidMount(){
        console.log('this.props :>> ', this.props);
    }
    

    render() {
    const { tableData }=this.props

        return (
            <TableContainer component={Paper}>
              <Table style={{minWidth: 650,}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>GL Date</TableCell>
                    <TableCell align="right">Abr</TableCell>
                    <TableCell align="right">Parent Account for Nature View</TableCell>
                    <TableCell align="right">Currency</TableCell>
                    <TableCell align="right">Actual Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.gl_date}</TableCell>
                      <TableCell align="right">{row.abr}</TableCell>
                      <TableCell align="right">{row.parent_acc_nature_view}</TableCell>
                      <TableCell align="right">{row.currency}</TableCell>
                      <TableCell align="right">{row.actual_amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        )
    }
}

export default TableList