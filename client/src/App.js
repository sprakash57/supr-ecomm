import React from 'react';
import './App.css'
import Login from './component/dashboard/login';
import AppHeader from './component/header';

class App extends React.Component {
  render() {
    return (
      <>
        <AppHeader />
        <Login />
      </>
    )
  }
}

export default App;
