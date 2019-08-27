import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import ReactDataGrid from 'react-data-grid';
import { connect } from 'react-redux'
import * as actions from './../actions'
const {
  Header,
  Content,
  // Footer, 
  Sider
} = Layout;
// const { SubMenu } = Menu;



const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title', editable: true },
  { key: 'count', name: 'Count', editable: true }
];

// const rows = [
//   { id: 0, title: 'row1', count: 20 },
//   { id: 1, title: 'row2', count: 40 },
//   { id: 2, title: 'row3', count: 60 }];

 class MyLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      rows: [
        // { id: 0, title: 'row1', count: 20 },
        // { id: 1, title: 'row2', count: 40 },
        // { id: 2, title: 'row3', count: 60 }
      ]
    };
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };


  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    
    this.props.GridRowsUpdated({ fromRow, toRow, updated })
  };
  render() {

    const showReactDataGrid = () => (
      <ReactDataGrid
        columns={columns}
        rowGetter={i => this.props.rows[i]}
        rowsCount={3}
        onGridRowsUpdated={this.onGridRowsUpdated}
        enableCellSelect={true}
      />
    )
    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="9">
                <Icon type="file" />
                <span>File</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Demo</Breadcrumb.Item>
                <Breadcrumb.Item>Data Grid Layout</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                {/* data-grid-layout */}

                {showReactDataGrid()}


              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
    rows:state.rows
})

const mapDispatchToProps =dispatch=> ({
  GridRowsUpdated:(cellInfo)=>dispatch(actions.GridRowsUpdated(cellInfo))
})


export default connect(mapStateToProps, mapDispatchToProps)(MyLayout)