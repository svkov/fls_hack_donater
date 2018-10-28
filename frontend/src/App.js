import React, { Component } from "react";
import "./App.css";
import { Layout, Menu, Breadcrumb, Icon, Avatar, Card } from "antd";
import { API } from "./Api";
import {Link, BrowserRouter, Router} from "react-router-dom"
// costum
import ProjectCard from "./ProjectCard";
import ProjectPage from "./ProjectPage";
const { Header, Content, Footer, Sider } = Layout;

const SubMenu = Menu.SubMenu;
class App extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  constructor(props) {
    super(props);

    this.state = {
      hits: []
    };

  }

  componentDidMount() {

    console.log('did mount', API);
    fetch(API.PROJECTS)
      .then(response => response.json())
      .then(response => this.setState({ hits: response.list }));
  };

  render() {
    const { hits } = this.state;
    return (
      <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="0">
              <span>Logo</span>
            </Menu.Item>
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Categories</span>
            </Menu.Item>

            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="3">Your projects</Menu.Item>
              <Menu.Item key="4">Your Donation</Menu.Item>
              <Menu.Item key="5">Logout</Menu.Item>
            </SubMenu>
            <Menu.Item key="6">
              <Icon type="logout" />
              <span>Logout</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: "10px 30px" }}>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              {hits.map(hit => (
                
                <Link to="/project_page"><ProjectCard title={hit.title} sum={hit.sum} /></Link>
                
              ))}

              {/* {hits.map(h => (
                <p>{h.title}</p>
              ))} */}
              <Route path="/project_page" component={ProjectPage} />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Desing by Lazy Nerds</Footer>
        </Layout>
      </Layout>
    </Router>
    );
  }
}
export default App;
