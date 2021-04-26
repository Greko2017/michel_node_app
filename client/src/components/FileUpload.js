import React, { Fragment, useEffect, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
// import axios from 'axios';
import TableList from './TableList';

import { connect } from 'react-redux'
import { editImportData, importData } from '../redux';

const FileUpload = (props) => {

  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  // const [hasFinished,setHasFinished]= useState(false);
  // const [tableData, setTableData] = useState([]);
  
  // const [gl_date_key, setGlDateKey] = useState('');
  // const [actual_amount_key, setActualAmountKey] = useState('');

  useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
    let tmp_tableData = localStorage.getItem('tableData')
    // console.log(`In FileUpload props:>>`,props,tmp_tableData)
    if (tmp_tableData!==null){
      loadData(tmp_tableData)
    }
  }, []);

  const loadData = (_tableData) =>{
    // console.log('In loadData :>> ', _tableData);
    let tmp_tableData = JSON.parse(_tableData)
    props.editImportData(tmp_tableData)
}

  const onChange = e => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = e => {
    e.preventDefault();
    // console.log('onSubmit :>> ', file);
    const formData = new FormData();
    formData.append('file', file);
    // console.log('onSubmit :>> ', formData);
    try {
      props.importData(formData)
      //  axios.post('/upload', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   },
      //   onUploadProgress: progressEvent => {
      //     setUploadPercentage(
      //       parseInt(
      //         Math.round((progressEvent.loaded * 100) / progressEvent.total)
      //       )
      //     );
      //     // Clear percentage
      //     setTimeout(() => setUploadPercentage(0), 10000);
      //   }
      // }).then(res =>{

      //   const { fileName, filePath,CsvDataList,gl_date_key,actual_amount_key } = res.data;
      //   // console.log(`--- In FileUpload In CsvDataList:>>`,gl_date_key,actual_amount_key)
        
      //   CsvDataList.forEach((element) => {
      //     let tmp = {
      //       gl_date:element[gl_date_key],
      //       abr:element['Abr'],
      //       parent_acc_nature_view:element['Parent Account for Nature View'],
      //       currency:element['Currency'],
      //       actual_amount:element[actual_amount_key]
      //     }
      //     // console.log('tmp :>> ', tmp);

      //     setTableData(tableData => [...tableData,tmp])
      //   });
      //   setUploadedFile({ fileName, filePath });
      //   setHasFinished(true)
      //   setGlDateKey(gl_date_key)
      //   setActualAmountKey(actual_amount_key)
      //   setMessage('File Uploaded');
      // })

    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }


  };
  const {fileName,filePath,import_data} = props.import_data
  if (import_data.length >=1) {
    localStorage.setItem('tableData',JSON.stringify(import_data.slice(0,56111)))
  }
  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{fileName}</h3>
            <img style={{ width: '100%' }} src={filePath} alt='' />
          </div>
        </div>
      ) : null}

      {/* {tableData.length>=1?( */}
      <TableList tableData={import_data} />
      {/* ):(<h6>Please import a sheet</h6>)} */}
      
    </Fragment>
  );
};


const mapStateToProps = (state) => {
  return {
    import_data: state.import_data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    importData: (formData) => dispatch(importData(formData)),
    editImportData: (data) => dispatch(editImportData(data)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload)