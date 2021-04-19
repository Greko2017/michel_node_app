import React, { Fragment, useEffect, useState } from 'react';
import Message from './Message';
import { connect } from 'react-redux'

 const TwelvesMonths =(props)=> {
    // const [tableData, setTableData] = useState([]);
    const [staticDataTable, setStaticDataTable] =useState({})
    useEffect(() => {
        // Met à jour le titre du document via l’API du navigateur
  const {import_data} = props.import_data
        console.log(`In TwelvesMonths import_data :>>`,import_data)
        // let tmp_tableData = localStorage.getItem('tableData')
        // if (tmp_tableData!==null){
        //   loadData(tmp_tableData)
        // }
        computeDate()
      }, []);
      
  const loadData = (_tableData) =>{
    // let tmp_tableData = JSON.parse(_tableData)
    // setTableData(tmp_tableData)
  }

const computeDate = ()=> {
  const {import_data} = props.import_data

    let _staticDataTable = import_data instanceof Array && import_data.length > 0 ? [...import_data].reduce((previousValue, currentValue)=>{
      // console.log('-- previousValue, currentValue :>> ', previousValue, currentValue);
        let key = currentValue.parent_acc_nature_view

        let tmp_value ={}

        if (key in previousValue){
          if (currentValue.gl_date in previousValue[key]){
            tmp_value[key][currentValue.gl_date] = currentValue
          }else{
            tmp_value[key][currentValue.gl_date] ={}
            tmp_value[key][currentValue.gl_date] = currentValue
          }
        }else{

          tmp_value[key] ={}
          tmp_value[key][currentValue.gl_date] ={}
          tmp_value[key][currentValue.gl_date] = currentValue
        }
        console.log('tmp_value :>> ', tmp_value);
        return {...previousValue, key:tmp_value[key]}
    },{}):[]
    // console.log('_staticDataTable :>> ', _staticDataTable);
    setStaticDataTable(_staticDataTable)

}
console.log('staticDataTable :>> ', staticDataTable);
    return (
        <div>
            <h3>12 Months</h3>
          <table className="table">
            <caption>Exported File Data</caption>
            <thead>
              <tr>
                <th scope="col">Balance Sheet</th>
                <th scope="col">Jan</th>
                <th scope="col">Feb</th>
                <th scope="col">Mar</th>
                <th scope="col">Apr</th>
                <th scope="col">May</th>
                <th scope="col">Jun</th>
                <th scope="col">Jul</th>
                <th scope="col">Aug</th>
                <th scope="col">Sep</th>
                <th scope="col">Oct</th>
                <th scope="col">Nov</th>
                <th scope="col">Dec</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {/* {tableData.map((row,index) => (
                  <tr>
                      <th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th>
                  </tr>
              ))} */}
              {
              Object.keys(staticDataTable).map((oneKey,i)=>{
                return (
                  <tr key={i}>
                      <th>{oneKey}</th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th>
                  </tr>
                  )
              })
            }
            </tbody>
          </table>

        </div>
    )
}

const mapStateToProps = (state) => {
  return {
    import_data: state.import_data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TwelvesMonths)