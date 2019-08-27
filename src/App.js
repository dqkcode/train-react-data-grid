import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import { DatePicker } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
// import 'antd/dist/antd.less'; // or ''
import Layout from './components/MyLayout'


function showLayout() {
  return (
    <>
      <Layout>
      
      </Layout>
    </>
  );
}
function App() {
  return (
    <div className="App">
      {
        showLayout()
      }
    </div>
  );
}

export default App;
