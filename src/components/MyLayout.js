import React, { Component } from 'react'
import { Layout, Breadcrumb, Icon, Upload, Button, Card, Input } from 'antd';

import ReactDataGrid from 'react-data-grid';
import { connect } from 'react-redux'
import * as actions from '../actions'
import { SideBar } from './SideBar';
const {
  Header,
  Content,
  // Button,
  // Upload,
  // // Footer, 
  // Sider
} = Layout;
// const { SubMenu } = Menu;



class MyLayout extends Component {
  constructor(props) {
    super(props);
    // this.state = {

    //   fileName: '',
    //   rows: [

    //   ]
    // };
  }

// UNSAFE_componentWillReceiveProps()
static getDerivedStateFromProps(props,state){
console.log('props :', props);
console.log('state :', state);
}

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {

    this.props.GridRowsUpdated({ fromRow, toRow, updated })
  };




  propsBtnUpLoad = {
    // action: '',
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange({ file, fileList, event }) {
      if (file.status !== 'uploading') {
        console.log(file)

      }
    },
    defaultFileList: [
      {
        uid: '1',
        name: 'xxx.png',
        status: 'done',
        response: '...', // custom error message to show
        // url: 'http://www.baidu.com/xxx.png',
        url: './',
      }
    ]
  };

  onImportFile = (e) => {
    this.props.ImportFile(e)
  }


  inputFile = () => (
    <input type="file" onChange={this.onImportFile}></input>
  )



  btnUpLoad = (propsBtnUpLoad) => (
    <Upload {...propsBtnUpLoad}>
      <Button>
        <Icon type="upload" /> Upload
      </Button>
    </Upload>
  )
  showReactDataGrid = () => (
    <ReactDataGrid
      columns={this.props.dataTable.cols}
      rowGetter={i => this.props.dataTable.rows[i]}
      rowsCount={3}
      onGridRowsUpdated={this.onGridRowsUpdated}
      enableCellSelect={true}
    // minHeight={500}

    // maxWidth={900}
    />
  )
  render() {
    // console.log('this.props.rows[0] :', this.props.rows[0]);
    // console.log('this.props.rows[1] :', this.props.rows[1]);
    let rowsdata = new Array(this.props.dataTable)

    console.log('rowsdata  :', rowsdata);
    console.log('rowsdata.rows  :', rowsdata.rows);

    // console.log('typeod(rowdata)', typeof(rowdata))
    // for (const key in rowdata) {
    //   if (rowdata.hasOwnProperty(key)) {
    //     const element = rowdata[key];
    //     console.log('key :', key);

    //   }
    // }
    return (

      <Layout style={{ minHeight: '100vh' }}>

        <SideBar>
        </SideBar>
        {/* end sideBar */}

        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }} >
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Demo</Breadcrumb.Item>
              <Breadcrumb.Item>Data Grid Layout</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {/* data-grid-layout */}
              <Card style={{ margin: '5px 0' }}>
                {this.inputFile()}
                {this.btnUpLoad(this.propsBtnUpLoad)}
              </Card>

              <Card >
                <div className="mystyle">
                  {/* {this.showReactDataGrid()} */}
                </div>
              </Card>

            </div>
          </Content>
        </Layout>
      </Layout>

    )
  }
}

const mapStateToProps = (state) => ({
  dataTable: state.dataTable
})

const mapDispatchToProps = dispatch => ({
  GridRowsUpdated: cellInfo => dispatch(actions.GridRowsUpdated(cellInfo)),
  // ImportFile: event => dispatch(actions.ImportFile(event)),
  ImportFile: event => dispatch(actions.loadFile(event.target.files)),
  
})


export default connect(mapStateToProps, mapDispatchToProps)(MyLayout)