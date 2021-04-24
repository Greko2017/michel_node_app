import React, {  useEffect, useState } from 'react';
import { connect } from 'react-redux'

import { editImportData } from '../redux';
export const VarianceQuater = (props) => {
    const [years, setYears] =useState([])
    const [selectedOptions,setSelectedOptions] =useState({month1:{},month2:{}})
    const [computedStaticDataTable, setComputedStaticDataTable]=useState({})
    const [bsCompareMonthsData, setBsCompareMonthsData] =useState({})
    const [plCompareMonthsData, setPlCompareMonthsData] =useState({})
    useEffect(() => {
        async function innerLoadData() {
            const {import_data} = props.import_data
            if (import_data.length ===0) {
                let tmp_tableData = localStorage.getItem('tableData') || '[]'
                let loaded_tableData = await JSON.parse(tmp_tableData)
                await props.editImportData(loaded_tableData)
                // console.log('inside result :>> ', loaded_tableData);
                await computeMonthsCompareData(loaded_tableData)
            }
          }
      
          innerLoadData()
          const {resultComputeCompareBS,resultComputeComparePL} = computeCompareQuater(selectedOptions)
          setBsCompareMonthsData(resultComputeCompareBS)
          setPlCompareMonthsData(resultComputeComparePL)
    }, [selectedOptions]);

    const convertQuaterLtrToNbrs=(letter)=>{
      return letter === 'Q1'?['01','02','03']:letter === 'Q2'?['04','05','06']:letter === 'Q3'?['07','08','09']:letter === 'Q4'?['10','11','12']:[]
    }

    const computeCompareQuater = (selectedOptions)=>{
      console.log('selectedOptions :>> ', selectedOptions, computedStaticDataTable);
      let month1 = convertQuaterLtrToNbrs(selectedOptions.month1.month)
      let month2 = convertQuaterLtrToNbrs(selectedOptions.month2.month)
      let year1 = selectedOptions.month1.year
      let year2 = selectedOptions.month2.year

      let balance_sheet_keys = []
      let p_and_l_keys = []
      if (computedStaticDataTable[year1] !== undefined){
        let tmp_balance_sheet_keys = Object.keys(computedStaticDataTable[year1]['balance_sheet'])
        // console.log('tmp_balance_sheet_keys :>> ', tmp_balance_sheet_keys);
        balance_sheet_keys = Object.keys(computedStaticDataTable[year2]['balance_sheet']).reduce((newArray, item,index) => {
                    if (index===0){newArray = [...tmp_balance_sheet_keys]}
                    // console.log('newArray :>> ', newArray);
                    if (newArray.includes(item)) {
                      return newArray
                    }else {
                      newArray.push(item);
                    }
                    return newArray;
      }, tmp_balance_sheet_keys || []) 
      
      let tmp_p_and_l_keys = Object.keys(computedStaticDataTable[year1]['p_and_l'])
      p_and_l_keys = Object.keys(computedStaticDataTable[year2]['p_and_l']).reduce((newArray, item) => {
                  if (newArray.includes(item)) {
                    return newArray;
                  }else {
                    newArray.push(item);
                  }
                  return newArray;
        }, tmp_p_and_l_keys ||[]) 
      }
      // console.log('balance_sheet_keys,p_and_l_keys :>> ', balance_sheet_keys,p_and_l_keys);

      let resultComputeCompareBS = balance_sheet_keys.filter(item=>!item.includes('total')).reduce((previousValue,currKey)=>{
        let tem_value = {...previousValue}
        tem_value[currKey]= tem_value[currKey] || {}
        tem_value[currKey]['month1'] = tem_value[currKey]['month1']  || {}
        
        computedStaticDataTable[year1]['balance_sheet'] = computedStaticDataTable[year1]['balance_sheet'] || {}
        computedStaticDataTable[year2]['balance_sheet'] = computedStaticDataTable[year2]['balance_sheet'] || {}
        tem_value[currKey]['month1']= month1.reduce((prev, currMont1)=>{
          // console.log('prev :>> ', prev);
          let currValue = computedStaticDataTable[year1]['balance_sheet'][currKey][currMont1] || 0
          let sum = prev+currValue
          // console.log('prev :>> ', prev);
          // console.log('sum :>> ', sum);
            return parseFloat(sum.toFixed(2))
        },0)

        tem_value[currKey]['month2']= month2.reduce((prev, currMont2)=>{
          let currValue = computedStaticDataTable[year1]['balance_sheet'][currKey][currMont2] || 0
          let sum = prev+currValue
          return parseFloat(sum.toFixed(2))
        },0)


        tem_value[currKey]['variance']= parseFloat((tem_value[currKey]['month1'] - tem_value[currKey]['month2']).toFixed(2))
        let percentage_variance = 0
        let sign = Math.sign(tem_value[currKey]['variance'])
        if (tem_value[currKey]['month2'] === 0 ){
          if (tem_value[currKey]['month1'] === 0 && tem_value[currKey]['month2'] === 0){
            percentage_variance = 0
          }else{
              if(sign===1 || sign===0){ 
                percentage_variance = 100
              }
              else{
                percentage_variance = -100
              }
          }
        } 
        else{
          percentage_variance = tem_value[currKey]['variance'] / tem_value[currKey]['month2']
        }
        tem_value[currKey]['percentage_variance'] = parseFloat(percentage_variance.toFixed(2))
        
        return tem_value
      },{})

      let resultComputeComparePL = p_and_l_keys.filter(item=>!item.includes('total')).reduce((previousValue,currKey)=>{
        let tem_value = {...previousValue}
        tem_value[currKey]= tem_value[currKey] || {}
        tem_value[currKey]['month1'] = tem_value[currKey]['month1']  || {}
        // console.log('currKey,month1,month2 :>> ', currKey,month1,month2);
        computedStaticDataTable[year1]['p_and_l'] = computedStaticDataTable[year1]['p_and_l'] || {}
        computedStaticDataTable[year2]['p_and_l'] = computedStaticDataTable[year2]['p_and_l'] || {}
        tem_value[currKey]['month1']= computedStaticDataTable[year1]['p_and_l'][currKey][month1] || 0
        tem_value[currKey]['month2']= computedStaticDataTable[year2]['p_and_l'][currKey][month2] || 0
        return tem_value
      },{})
      // console.log('resultComputeCompareBS,resultComputeComparePL :>> ', resultComputeCompareBS,resultComputeComparePL);
      setBsCompareMonthsData(resultComputeCompareBS)
      setPlCompareMonthsData(resultComputeComparePL)
      return {resultComputeCompareBS,resultComputeComparePL}
    }
    const  computeMonthsCompareData= async ( import_data)=>{
        // const {import_data} = props.import_data
        // console.log('import_data :>> ', import_data);
        let computedStaticDataTable = import_data instanceof Array && import_data.length > 0 ? [...import_data].reduce((previousValue, currentValue)=>{
          
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
        // console.log('computedStaticDataTable :>> ', computedStaticDataTable,Object.keys(computedStaticDataTable.new||{}));
        // let result = compute12monthData(computedStaticDataTable)
        
        let first_year = Object.keys(computedStaticDataTable.new)[0]
        // console.log('computedStaticDataTable :>> ', computedStaticDataTable);

        let years = Object.keys(computedStaticDataTable.new||{})
        setYears(years)

        // let result = await compute12monthData(computedStaticDataTable.new[first_year]['balance_sheet'])
        let final_result = years.reduce( async (prev, currYear)=>{
          	let temp_data = {...prev}
            temp_data[currYear]=temp_data[currYear]||{}
            temp_data[currYear]['balance_sheet'] = await compute12monthData(computedStaticDataTable.new[first_year]['balance_sheet'])
            temp_data[currYear]['p_and_l'] = await compute12monthData(computedStaticDataTable.new[first_year]['p_and_l'])
            return temp_data
        },{})
        // console.log('--- final_result :>> ', await final_result);
        setComputedStaticDataTable(await final_result)


    }
    
const compute12monthData =(origin_staticDataTable)=>{
    let _staticDataTable = {...origin_staticDataTable}
    console.log('_staticDataTable :>> ', _staticDataTable);
    let _staticDataTableKeys = Object.keys(_staticDataTable).filter(item=>item!=='total')
    let computedData = _staticDataTableKeys instanceof Array && _staticDataTableKeys.length > 0 ?[..._staticDataTableKeys].reduce((previousValue, current_key)=>{
          
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
    
    console.log('computedData :>> ', computedData);
    return computedData
  }

  const granTotal = (gran_total)=>{
    let _gran_total = 0
    for (let item in gran_total){
      gran_total = gran_total[item]
    }
    return parseFloat(_gran_total.toFixed(2))
  
}

  function handleChange(innerEvent){
    // async function innerHandleChange(innerEvent){

        let value = innerEvent.target.value.split(',')
        let e = document.getElementById(`year${parseInt(value[0])}`);
        let year= e.value;

        console.log('innerEvent :>> ', value[1], 'month :>> ',value[0], 'year :>> ',year);
        let newSelectedOptions ={...selectedOptions}
        if (value[0] ==='1'){
          newSelectedOptions['month1'] = {'month':value[1], 'year':year}
          if ( Object.values(newSelectedOptions['month2']).length <= 0 ){
            newSelectedOptions['month2'] = {'month':'Q1', 'year':year}
          }
          setSelectedOptions(newSelectedOptions)
        }
        if (value[0] ==='2'){
          newSelectedOptions['month2'] = {'month':value[1], 'year':year}
          if (Object.values(newSelectedOptions['month1']).length <= 0 ){
            newSelectedOptions['month1'] = {'month':'Q1', 'year':year}
          }
          setSelectedOptions(newSelectedOptions)
        }
        // computeCompareQuater(selectedOptions)
      // }
      // innerHandleChange(event)

        // computeMonthsCompareData(props.import_data)
    }
    const quatersDropDownValues = ['Q1','Q2','Q3','Q4']
    return (
        <div>
            <form className="form-inline">
                
                <div className="form-group">
                    <label htmlFor="month1">Month 1</label>
                    <select onChange={handleChange} className="form-control ml-2" id="month1" style={{minWidth:60}}>

                    {quatersDropDownValues.map((month,i)=>{
                        return (
                        <option value={`1,${month}`} key={i}>{month}</option>
                        )
                    })}
                    </select>

                    <select onChange={handleChange} className="form-control mr-5" id="year1" style={{minWidth:100}}>
                    {years.map((year,i)=>{
                        
                        return (
                        <option value={year} key={i}>{year}</option>
                        )
                    })}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="month2">Month 2</label>
                    <select onChange={handleChange} className="form-control ml-2" id="month2" style={{minWidth:60}}>
                    {quatersDropDownValues.map((month,i)=>{
                        
                        return (
                        <option value={`2,${month}`} key={i}>{month}</option>
                        )
                    })}
                    </select>

                    <select onChange={handleChange} className="form-control mr-3" id="year2" style={{minWidth:100}}>
                    {years.map((year,i)=>{
                        
                        return (
                        <option value={year} key={i}>{year}</option>
                        )
                    })}
                    </select>
                </div>
                
                {/* <button type="submit" className="btn btn-primary ml-2">Compute</button> */}
            </form>
            
        <table className="table table-bordered mt-5">
            <caption>Balance Sheet Difference</caption>
            <thead>
                <tr>
                <th scope="col" style={{borderRightColor:"#fff"}}>Balance Sheet</th>
                <th style={{borderRightColor:"#fff"}}></th>
                <th style={{borderRightColor:"#fff"}}></th>
                <th style={{borderRightColor:"#fff"}}></th>
                <th style={{borderRightColor:"#fff"}}></th>
                <th ></th>
                <th scope="col">{selectedOptions.month1.month || 'Q1'}</th>
                <th scope="col">{selectedOptions.month2.month || 'Q1'}</th>
                <th scope="col">variance</th>
                <th scope="col">variance %</th>
                </tr>
            </thead>
            <tbody>

                    
                {bsCompareMonthsData !== undefined && selectedOptions.month1.year !== undefined  && Object.keys(bsCompareMonthsData) instanceof Array ?
                (
                    Object.keys(bsCompareMonthsData).map((oneKey,i)=>{
                        if (oneKey.includes('total')){return;}
                        return (
                            <tr key={i}>
                                <th scope="row" colSpan="6">{oneKey.substring(4)}</th>
                                <td>{bsCompareMonthsData[oneKey]['month1'] || 0}</td>
                                <td>{bsCompareMonthsData[oneKey]['month2'] || 0}</td>
                                <td>{bsCompareMonthsData[oneKey]['variance']}</td>
                                <td>{bsCompareMonthsData[oneKey]['percentage_variance']}</td>
                            </tr>
                        )
                    })
                ):(null)
                }
                
            </tbody>
            </table>
        <br/>
            
        <table className="table table-bordered mt-5">
            <caption>P&L Difference</caption>
            <thead>
                <tr>
                <th scope="col" style={{borderRightColor:"#fff"}}>P&L</th>
                <th style={{borderRightColor:"#fff"}}></th>
                <th style={{borderRightColor:"#fff"}}></th>
                <th style={{borderRightColor:"#fff"}}></th>
                <th style={{borderRightColor:"#fff"}}></th>
                <th ></th>
                <th scope="col">{selectedOptions.month1.month || 'Q1'}</th>
                <th scope="col">{selectedOptions.month2.month || 'Q1'}</th>
                <th scope="col">variance</th>
                <th scope="col">variance %</th>
                </tr>
            </thead>
            <tbody>

                    
                {plCompareMonthsData !== undefined && selectedOptions.month1.year !== undefined  && Object.keys(plCompareMonthsData) instanceof Array ?
                (
                    Object.keys(plCompareMonthsData).map((oneKey,i)=>{
                        if (oneKey.includes('total')){return;}
                        return (
                            <tr key={i}>
                                <th scope="row" colSpan="6">{oneKey.substring(4)}</th>
                                <td>{plCompareMonthsData[oneKey]['month1'] || 0}</td>
                                <td>{plCompareMonthsData[oneKey]['month2'] || 0}</td>
                                <td>{bsCompareMonthsData[oneKey]['variance']}</td>
                                <td>{bsCompareMonthsData[oneKey]['variance_percentage']}</td>
                            </tr>
                        )
                    })
                ):(null)
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
      editImportData: (data) => dispatch(editImportData(data)),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(VarianceQuater)
