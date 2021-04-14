import React, { Fragment, useEffect, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import TableList from './TableList';

const FileUpload = () => {

  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Met à jour le titre du document via l’API du navigateur
    // console.log(`In FileUpload`,tableData)
  });

  const onChange = e => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log('onSubmit :>> ', file);
    const formData = new FormData();
    formData.append('file', file);
    try {
       axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        }
      }).then(res =>{

        const { fileName, filePath,CsvDataList } = res.data;
        // console.log(`--- In FileUpload In CsvDataList:>>`,CsvDataList)
        CsvDataList.forEach((element) => {
          let tmp = {
            gl_date:element["Gl_Date"],
            abr:element['Abr'],
            parent_acc_nature_view:element['Parent Account for Nature View'],
            currency:element['Currency'],
            actual_amount:element['Actual\nAmount']
          }
          // console.log('tmp :>> ', tmp);
          
          setTableData(tableData => [...tableData,tmp])
        });
        setUploadedFile({ fileName, filePath });
  
        setMessage('File Uploaded');

      })

    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
    }


  };
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
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}

      {/* {tableData.length>=1?( */}
      <TableList tableData={tableData} />
      {/* ):(<h6>Please import a sheet</h6>)} */}
      
    </Fragment>
  );
};

export default FileUpload;
