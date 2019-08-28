import React, { Component } from 'react'
import { Layout, Breadcrumb, Icon, Upload, Button, Card } from 'antd';

import ReactDataGrid from 'react-data-grid';
import { connect } from 'react-redux'
import * as actions from '../actions'
import { SideBar } from './SideBar';
import XLSX from 'xlsx';
const {
  Header,
  Content,
  // Button,
  // Upload,
  // // Footer, 
  // Sider
} = Layout;
// const { SubMenu } = Menu;



const columns = [
  { key: 'id', name: 'ID', resizable: true, width: 80 },
  { key: 'title', name: 'Title', editable: true, resizable: true },
  { key: 'count', name: 'Count', editable: true, resizable: true }
];

class MyLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {

      rows: [

      ]
    };
  }



  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {

    this.props.GridRowsUpdated({ fromRow, toRow, updated })
  };




  propsBtnUpLoad = {
    action: './',
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
        // var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
        // var data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
        // console.log('data :', data);
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
  btnUpLoad = (propsBtnUpLoad) => (
    <Upload {...propsBtnUpLoad}>
      <Button>
        <Icon type="upload" /> Upload
      </Button>
    </Upload>
  )
  showReactDataGrid = () => (
    <ReactDataGrid
      columns={columns}
      rowGetter={i => this.props.rows[i]}
      rowsCount={3}
      onGridRowsUpdated={this.onGridRowsUpdated}
      enableCellSelect={true}
    // minHeight={500}

    // maxWidth={900}
    />
  )
  render() {


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
                {this.btnUpLoad(this.propsBtnUpLoad)}
              </Card>

              <Card >
                <div className="mystyle">
                  {this.showReactDataGrid()}
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
  rows: state.rows
})

const mapDispatchToProps = dispatch => ({
  GridRowsUpdated: (cellInfo) => dispatch(actions.GridRowsUpdated(cellInfo))
})


export default connect(mapStateToProps, mapDispatchToProps)(MyLayout)