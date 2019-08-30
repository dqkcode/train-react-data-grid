import React, { Component, useState } from 'react'
import { Layout, Breadcrumb, Icon, Upload, Button, Card, Input } from 'antd';
import ReactDataGrid from 'react-data-grid';
import { connect } from 'react-redux'
import * as actions from '../actions'
import { SideBar } from './SideBar';
import { Toolbar, Data, Filters, Editors, Formatters,ToolsPanel,Menu } from "react-data-grid-addons";
import GridTable from './Table'
const { DropDownEditor,SimpleTextEditor,ContainerEditorWrapper } = Editors;
const { DropDownFormatter } = Formatters
const {AdvancedToolbar} = ToolsPanel
const {MenuItem} = Menu
const {
  Header,
  Content,
} = Layout;
// const selectors = Data.Selectors;


class MyLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {}
    };
  }


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

    this.props.getTableData(e.target.files[0])

  }


  inputFile = () => (
    <input type="file" onChange={this.onImportFile}></input>
  )

 onGridRowsUpdated = ({ fromRow, toRow, updated }) => {

    this.props.GridRowsUpdated({ fromRow, toRow, updated })
  };

  btnUpLoad = (propsBtnUpLoad) => (
    <Upload {...propsBtnUpLoad}>
      <Button>
        <Icon type="upload" /> Upload
      </Button>
    </Upload>
  )

  removeItemsSelected = ()=>{
        
  }
  render() {

    console.log('Menu :', Menu);
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
                {/* {this.btnUpLoad(this.propsBtnUpLoad)} */}
              </Card>

              <Card >
                <div className="mystyle">
                  {/* {this.showReactDataGrid()} */}
                  <GridTable/>
                </div>
                <Button type="primary" icon="delete" onClick={this.removeItemsSelected}>
                Remove
            </Button>
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
  getTableData: event => dispatch(actions.getTableDataAction(event))
  // getTableData: status => dispatch(actions.actionCreator(status))

})


export default connect(mapStateToProps, mapDispatchToProps)(MyLayout)