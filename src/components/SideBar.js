import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'antd';
const {
    // Header,
    // Content,
    // Button,
    // Upload,
    Sider
} = Layout;



export class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        }
    }


    showMenu = () => {
        return (
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1">
                    <Icon type="file" />
                    {/* <span>File</span> */}
                  
                </Menu.Item>
            </Menu>

        );
    }
    showSideBar = () => {
        return (
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <div className="logo" />
                {this.showMenu()}
                {/* end menu */}
            </Sider>

        );
    }



    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        return (
            <>
                {this.showSideBar()}
            </>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)



