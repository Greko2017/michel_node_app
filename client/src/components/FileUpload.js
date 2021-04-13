
import React, { Component } from 'react'
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import TableList from './TableList'

class FileUpload extends Component {
  state = {
    file:'',
    filename:'Choose File',
    uploadedFile:{},
    message:'',
    uploadPercentage:0,
    tableData:[],
  }
  render() {
    const onChange = e => {
      this.setState({file: e.target.files[0]});
      this.setState({filename:e.target.files[0].name});
    };
    

  const onSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file);

    try {
       axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          this.setState({uploadPercentage:
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )});

          // Clear percentage
          setTimeout(() => this.setState({uploadPercentage:0}), 10000);
        }
      }).then(res =>{

        const { fileName, filePath,CsvDataList } = res.data;
        console.log(`--- In FileUpload In CsvDataList`,)
        CsvDataList.map((element) => {
          let tmp = {
            gl_date:element['"Gl_Date"'],
            abr:element['Abr'],
            parent_acc_nature_view:element['Parent Account for Nature View'],
            currency:element['Currency'],
            actual_amount:element['Actual\nAmount']
          }
          // console.log('tmp :>> ', tmp);

          this.setState({tableData:[...this.state.tableData, element]});
        });
        this.setState({uploadedFile:{ fileName:fileName, filePath:filePath}});
  
        this.setState({message:'File Uploaded'});

      })

    } catch (err) {
      if (err.response.status === 500) {
        this.setState({message:'There was a problem with the server'});
      } else {
        this.setState({message:err.response.data.msg});
      }
    }
  };
    return (
    <div>
      {this.state.message ? <Message msg={this.state.message} /> : null}
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {this.state.filename}
          </label>
        </div>

        <Progress percentage={this.state.uploadPercentage} />

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
      {this.state.uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{this.state.uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={this.state.uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}
      {/* {this.state.tableData.length>=1?( */}
      <TableList tableData={this.state.tableData} />
      {/* ):<h6>Please import a sheet</h6>} */}
      
    </div>
    )
  }
}

export default FileUpload;
