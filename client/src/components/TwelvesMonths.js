import React, {  useEffect, useState } from 'react';
// import Message from './Message';
import { connect } from 'react-redux'
import { editImportData } from '../redux';

 const TwelvesMonths =(props)=> {
    // const [tableData, setTableData] = useState([]);
    const [bsStaticDataTable, setBsStaticDataTable] =useState({})
    const [plStaticDataTable, setPlStaticDataTable] =useState({})
    const [yearToCompute,setYearToCompute] =useState(false)
    const [computedStaticDataTable, setComputedStaticDataTable]=useState({})
    useEffect(() => {
      var currentYear= new Date().getFullYear(); 
      setYearToCompute(currentYear)
        // Met à jour le titre du document via l’API du navigateur
        const {import_data} = props.import_data
        let tmp_tableData = localStorage.getItem('tableData')
        // console.log(`In FileUpload props:>>`,props,tmp_tableData)
        if (tmp_tableData!==null){
          loadData(tmp_tableData)
        }
        // console.log(`In TwelvesMonths import_data :>>`,props,import_data)
        computeDate()
      }, []);
    
      const loadData = (_tableData) =>{
        // console.log('In loadData :>> ', _tableData);
        let tmp_tableData = JSON.parse(_tableData)
        props.editImportData(tmp_tableData)
    }

const computeDate = ()=> {
  const {import_data} = props.import_data

    let computedStaticDataTable = import_data instanceof Array && import_data.length > 0 ? [...import_data].reduce((previousValue, currentValue)=>{
      
      // console.log('previousValue, currentValue :>> ', previousValue, currentValue);
      let tmp_total_amount = parseFloat(currentValue.actual_amount.replace(',', '.').replace(' ', ''))
      let key = currentValue.parent_acc_nature_view
      
      let tmp_value = {...previousValue.old}
      let new_tmp_value = {...previousValue.new}
        
        if (previousValue.hasOwnProperty(key) ){
          
          if (previousValue[key].hasOwnProperty(currentValue.gl_date.substring(0,7))){
            
              if (tmp_value[key][currentValue.gl_date.substring(0,7)][currentValue.gl_date] === undefined){
                tmp_value[key][currentValue.gl_date.substring(0,7)][currentValue.gl_date]=[]
              }
              tmp_value[key][currentValue.gl_date.substring(0,7)][currentValue.gl_date].push(currentValue)
            
          }else{
            tmp_value[key][currentValue.gl_date.substring(0,7)] ={}
            if (tmp_value[key][currentValue.gl_date.substring(0,7)][currentValue.gl_date] === undefined){
              tmp_value[key][currentValue.gl_date.substring(0,7)][currentValue.gl_date]=[]
            }
            tmp_value[key][currentValue.gl_date.substring(0,7)][currentValue.gl_date] = []
            tmp_value[key][currentValue.gl_date.substring(0,7)][currentValue.gl_date].push(currentValue)
          }
        }else{

          tmp_value[key] ={}
          tmp_value[key]['total'] = tmp_total_amount
          tmp_value[key][currentValue.gl_date.substring(0,7)] ={}
          tmp_value[key][currentValue.gl_date.substring(0,7)][currentValue.gl_date] =[]
          tmp_value[key][currentValue.gl_date.substring(0,7)][currentValue.gl_date].push(currentValue)
        }

        new_tmp_value[currentValue.gl_date.substring(0,4)] = new_tmp_value[currentValue.gl_date.substring(0,4)] || {}
        
        if ( key.substring(0,3) >=0 && key.substring(0,3) <= 300) {
          new_tmp_value[currentValue.gl_date.substring(0,4)]['balance_sheet'] = new_tmp_value[currentValue.gl_date.substring(0,4)]['balance_sheet'] || {}
        
          new_tmp_value[currentValue.gl_date.substring(0,4)]['balance_sheet'][key] = new_tmp_value[currentValue.gl_date.substring(0,4)]['balance_sheet'][key] || {}
          new_tmp_value[currentValue.gl_date.substring(0,4)]['balance_sheet'][key][currentValue.gl_date.substring(0,7)] = new_tmp_value[currentValue.gl_date.substring(0,4)]['balance_sheet'][key][currentValue.gl_date.substring(0,7)]===undefined?{}:new_tmp_value[currentValue.gl_date.substring(0,4)]['balance_sheet'][key][currentValue.gl_date.substring(0,7)]
          new_tmp_value[currentValue.gl_date.substring(0,4)]['balance_sheet'][key][currentValue.gl_date.substring(0,7)][currentValue.gl_date] = new_tmp_value[currentValue.gl_date.substring(0,4)]['balance_sheet'][key][currentValue.gl_date.substring(0,7)][currentValue.gl_date]===undefined?[]:new_tmp_value[currentValue.gl_date.substring(0,4)]['balance_sheet'][key][currentValue.gl_date.substring(0,7)][currentValue.gl_date]
        
          new_tmp_value[currentValue.gl_date.substring(0,4)]['balance_sheet'][key][currentValue.gl_date.substring(0,7)][currentValue.gl_date] = new_tmp_value[currentValue.gl_date.substring(0,4)]['balance_sheet'][key][currentValue.gl_date.substring(0,7)][currentValue.gl_date] || []
        
          new_tmp_value[currentValue.gl_date.substring(0,4)]['balance_sheet'][key][currentValue.gl_date.substring(0,7)][currentValue.gl_date].push(currentValue)

        }
        if (key.substring(0,3) >=301 && key.substring(0,3) <= 1000) {
          
          new_tmp_value[currentValue.gl_date.substring(0,4)]['p_and_l'] = new_tmp_value[currentValue.gl_date.substring(0,4)]['p_and_l']===undefined?{}:new_tmp_value[currentValue.gl_date.substring(0,4)]['p_and_l']
          new_tmp_value[currentValue.gl_date.substring(0,4)]['p_and_l'][key] = new_tmp_value[currentValue.gl_date.substring(0,4)]['p_and_l'][key]===undefined?{}:new_tmp_value[currentValue.gl_date.substring(0,4)]['p_and_l'][key]
          new_tmp_value[currentValue.gl_date.substring(0,4)]['p_and_l'][key][currentValue.gl_date.substring(0,7)] = new_tmp_value[currentValue.gl_date.substring(0,4)]['p_and_l'][key][currentValue.gl_date.substring(0,7)]===undefined?{}:new_tmp_value[currentValue.gl_date.substring(0,4)]['p_and_l'][key][currentValue.gl_date.substring(0,7)]
          new_tmp_value[currentValue.gl_date.substring(0,4)]['p_and_l'][key][currentValue.gl_date.substring(0,7)][currentValue.gl_date] = new_tmp_value[currentValue.gl_date.substring(0,4)]['p_and_l'][key][currentValue.gl_date.substring(0,7)][currentValue.gl_date]===undefined?[]:new_tmp_value[currentValue.gl_date.substring(0,4)]['p_and_l'][key][currentValue.gl_date.substring(0,7)][currentValue.gl_date]
          
          new_tmp_value[currentValue.gl_date.substring(0,4)]['p_and_l'][key][currentValue.gl_date.substring(0,7)][currentValue.gl_date] = new_tmp_value[currentValue.gl_date.substring(0,4)]['p_and_l'][key][currentValue.gl_date.substring(0,7)][currentValue.gl_date] || []
        
          new_tmp_value[currentValue.gl_date.substring(0,4)]['p_and_l'][key][currentValue.gl_date.substring(0,7)][currentValue.gl_date].push(currentValue)
        }
  
        
        
      return {new:new_tmp_value, old:tmp_value}
    },{ old:{},new:{} }):{ old:{},new:{} }
    setYearToCompute(Object.keys(computedStaticDataTable.new)[0])
    setComputedStaticDataTable(computedStaticDataTable)
    console.log('computedStaticDataTable :>> ', computedStaticDataTable,yearToCompute);
    console.log('computedStaticDataTable.new['+yearToCompute+'] :>> ', computedStaticDataTable.new[yearToCompute]);
    if (computedStaticDataTable.new[yearToCompute] !== undefined){
      console.log('computedStaticDataTable.new['+yearToCompute+']["balance_sheet"] :>> ', computedStaticDataTable.new[yearToCompute]['balance_sheet']);

      setBsStaticDataTable(compute12monthData(computedStaticDataTable.new[yearToCompute]['balance_sheet']||{}))
      setPlStaticDataTable(compute12monthData(computedStaticDataTable.new[yearToCompute]['p_and_l']||{}))
    }
}

const getMonthKeyFromMonth=(month)=>{
  let month_key_query = month.substring(5,7)
  let result =  month_key_query==='01'?'jan':month_key_query==='02'?'feb':month_key_query==='03'?'mar':month_key_query==='04'?'apr':month_key_query==='05'?'mai':month_key_query==='06'?'jun':month_key_query==='07'?'jul':month_key_query==='08'?'aug':month_key_query==='09'?'sep':month_key_query==='10'?'oct':month_key_query==='11'?'nov':month_key_query==='12'?'dec':''
  return result
}

const compute12monthData =(_staticDataTable)=>{
  console.log('_staticDataTable :>> ', _staticDataTable);
  let _staticDataTableKeys = Object.keys(_staticDataTable).filter(item=>item!=='total')
  let computedData = _staticDataTableKeys instanceof Array && _staticDataTableKeys.length > 0 ?_staticDataTableKeys.reduce((previousValue, current_key)=>{
        
        let tmp_value = {...previousValue}

        for (let month in _staticDataTable[current_key]) {
          if (month ==='total'){continue;}
          let month_value = 0
          for (let day in _staticDataTable[current_key][month]){
            // console.log('month, day :>> ', month, day);
            if (month !==day.substring(0,7)){continue}
            let date_value = _staticDataTable[current_key][month][day]
            let date_total_amount = date_value.reduce((prev, curr)=>{
              curr.actual_amount = curr.actual_amount ==="" ?"0":curr.actual_amount
              return parseFloat(curr.actual_amount.replace(',', '.').replace(' ', '')) + prev
            },0)

            month_value = month_value + date_total_amount

          }

          let month_key = month.substring(5,7) //getMonthKeyFromMonth(month)
          if (tmp_value[current_key] === undefined){
            tmp_value[current_key] = {'total':0}
          }
          if (tmp_value[current_key][month_key] === undefined){
            tmp_value[current_key][month_key] = {}
          }
          tmp_value[current_key][month_key] =  parseFloat(month_value.toFixed(2)) 
          tmp_value[current_key]['total'] =  parseFloat((tmp_value[current_key]['total'] + parseFloat(month_value.toFixed(2)) ).toFixed(2))

          if (tmp_value['total'] === undefined){
            tmp_value['total'] = {'01':0,'02':0,'03':0,'04':0,'05':0,'06':0,'07':0,'08':0,'09':0,'10':0,'11':0,'12':0,}
          }
          if (tmp_value['total'][month_key] === undefined){
            tmp_value['total'][month_key] = 0
          }
          
          tmp_value['total']['01'] = month_key ==='01' ?parseFloat((tmp_value['total']['01'] + parseFloat(month_value.toFixed(2))).toFixed(2)):tmp_value['total']['01']
          tmp_value['total']['02'] = month_key ==='02' ?parseFloat((tmp_value['total']['02'] + parseFloat(month_value.toFixed(2))).toFixed(2)):tmp_value['total']['02']
          tmp_value['total']['03'] = month_key ==='03' ?parseFloat((tmp_value['total']['03'] + parseFloat(month_value.toFixed(2))).toFixed(2)):tmp_value['total']['03']
          tmp_value['total']['04'] = month_key ==='04' ?parseFloat((tmp_value['total']['04'] + parseFloat(month_value.toFixed(2))).toFixed(2)):tmp_value['total']['04']
          tmp_value['total']['05'] = month_key ==='05' ?parseFloat((tmp_value['total']['05'] + parseFloat(month_value.toFixed(2))).toFixed(2)):tmp_value['total']['05']
          tmp_value['total']['06'] = month_key ==='06' ?parseFloat((tmp_value['total']['06'] + parseFloat(month_value.toFixed(2))).toFixed(2)):tmp_value['total']['06']
          tmp_value['total']['07'] = month_key ==='07' ?parseFloat((tmp_value['total']['07'] + parseFloat(month_value.toFixed(2))).toFixed(2)):tmp_value['total']['07']
          tmp_value['total']['08'] = month_key ==='08' ?parseFloat((tmp_value['total']['08'] + parseFloat(month_value.toFixed(2))).toFixed(2)):tmp_value['total']['08']
          tmp_value['total']['09'] = month_key ==='09' ?parseFloat((tmp_value['total']['09'] + parseFloat(month_value.toFixed(2))).toFixed(2)):tmp_value['total']['09']
          tmp_value['total']['10'] = month_key ==='10' ?parseFloat((tmp_value['total']['10'] + parseFloat(month_value.toFixed(2))).toFixed(2)):tmp_value['total']['10']
          tmp_value['gran-total'] = granTotal(tmp_value['gran-total'])
        }
        return tmp_value

  },{}):{}
  
  return computedData
}
const renderBsData = (year)=>{
  
  if (computedStaticDataTable.new[year] !== undefined){
    setBsStaticDataTable(compute12monthData(computedStaticDataTable.new[year]['balance_sheet']||{}))
    setPlStaticDataTable(compute12monthData(computedStaticDataTable.new[year]['p_and_l']||{}))
  }

  return yearToCompute
}
const handleYearChanged=(year)=>{
  if (computedStaticDataTable.new[year] !== undefined){
    setBsStaticDataTable(compute12monthData(computedStaticDataTable.new[year]['balance_sheet']||{}))
    setPlStaticDataTable(compute12monthData(computedStaticDataTable.new[year]['p_and_l']||{}))
  }
}
const granTotal = (gran_total)=>{
    let _gran_total = 0
    for (let item in gran_total){
      gran_total = gran_total[item]
    }
    return parseFloat(_gran_total.toFixed(2))
  
}
console.log('bsStaticDataTable :>> ', bsStaticDataTable);
    return (
      <div>
      
      {yearToCompute !== false?(
        
          <div>      
          <div className="row justify-content-between">        
              <div>
                <h3>12 Months {()=>renderBsData(yearToCompute)}</h3>
              </div>
                
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle btn-sm" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Select year 
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                    {Object.keys(computedStaticDataTable.new||{}).map((year,i)=>(
                       <button className="dropdown-item" onClick={()=>{handleYearChanged(year)}} key={i} type="button">{year}</button>
                    ))}
              </div>
            </div>

          </div>
          
          <table className="table table-bordered table-sm">
            <caption>Imported BS&L Data</caption>
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
              {
              Object.keys(bsStaticDataTable).map((oneKey,i)=>{
                if (oneKey.includes('total')){return}
                return (
                  <tr key={i}>
                      <th>{oneKey}</th><th>{bsStaticDataTable[oneKey]['01']||0}</th><th>{bsStaticDataTable[oneKey]['02']||0}</th><th>{bsStaticDataTable[oneKey]['03']||0}</th><th>{bsStaticDataTable[oneKey]['04']||0}</th><th>{bsStaticDataTable[oneKey]['05']||0}</th><th>{bsStaticDataTable[oneKey]['06']||0}</th><th>{bsStaticDataTable[oneKey]['07']||0}</th><th>{bsStaticDataTable[oneKey]['08']||0}</th><th>{bsStaticDataTable[oneKey]['09']||0}</th><th>{bsStaticDataTable[oneKey]['10']||0}</th><th>{bsStaticDataTable[oneKey]['11']||0}</th><th>{bsStaticDataTable[oneKey]['02']||0}</th><th>{bsStaticDataTable[oneKey]['total']}</th>
                  </tr>
                  )
              })
            }
            {bsStaticDataTable['total'] !==undefined ?(
              <tr className="thead-light" key={'BS total'}>
                  <th>{'Total'}</th><th>{bsStaticDataTable['total']['01']||0}</th><th>{bsStaticDataTable['total']['02']||0}</th><th>{bsStaticDataTable['total']['03']||0}</th><th>{bsStaticDataTable['total']['04']||0}</th><th>{bsStaticDataTable['total']['05']||0}</th><th>{bsStaticDataTable['total']['06']||0}</th><th>{bsStaticDataTable['total']['07']||0}</th><th>{bsStaticDataTable['total']['08']||0}</th><th>{bsStaticDataTable['total']['09']||0}</th><th>{bsStaticDataTable['total']['10']||0}</th><th>{bsStaticDataTable['total']['11']||0}</th><th>{bsStaticDataTable['total']['02']||0}</th><th>{bsStaticDataTable['total']['gran-total']}</th>
              </tr>
            ):(<></>)
              }
            </tbody>
          </table>

          

          <table className="table table-bordered table-sm">
            <caption>Imported P&L Data</caption>
            <thead>
              <tr>
                <th scope="col">P&L</th>
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
              {
              Object.keys(plStaticDataTable).map((oneKey,i)=>{
                if (oneKey.includes('total')){return}
                return (
                  <tr key={i}>
                      <th>{oneKey}</th><th>{plStaticDataTable[oneKey]['01']||0}</th><th>{plStaticDataTable[oneKey]['02']||0}</th><th>{plStaticDataTable[oneKey]['03']||0}</th><th>{plStaticDataTable[oneKey]['04']||0}</th><th>{plStaticDataTable[oneKey]['05']||0}</th><th>{plStaticDataTable[oneKey]['06']||0}</th><th>{plStaticDataTable[oneKey]['07']||0}</th><th>{plStaticDataTable[oneKey]['08']||0}</th><th>{plStaticDataTable[oneKey]['09']||0}</th><th>{plStaticDataTable[oneKey]['10']||0}</th><th>{plStaticDataTable[oneKey]['11']||0}</th><th>{plStaticDataTable[oneKey]['02']||0}</th><th>{plStaticDataTable[oneKey]['total']}</th>
                  </tr>
                  )
              })
            }
            {plStaticDataTable['total'] !==undefined ?(
              <tr key={'BS total'}>
                  <th>{'Total'}</th><th>{plStaticDataTable['total']['01']||0}</th><th>{plStaticDataTable['total']['02']||0}</th><th>{plStaticDataTable['total']['03']||0}</th><th>{plStaticDataTable['total']['04']||0}</th><th>{plStaticDataTable['total']['05']||0}</th><th>{plStaticDataTable['total']['06']||0}</th><th>{plStaticDataTable['total']['07']||0}</th><th>{plStaticDataTable['total']['08']||0}</th><th>{plStaticDataTable['total']['09']||0}</th><th>{plStaticDataTable['total']['10']||0}</th><th>{plStaticDataTable['total']['11']||0}</th><th>{plStaticDataTable['total']['02']||0}</th><th>{plStaticDataTable['total']['gran-total']}</th>
              </tr>
            ):(<></>)
              }
            </tbody>
          </table>

          </div>
          ):(<h6>No Data</h6>)}

        </div>
    )
}

const mapStateToProps = (state) => {
  // console.log('state :>> ', state);
  return {
    import_data: state.import_data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editImportData: (data) => dispatch(editImportData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TwelvesMonths)