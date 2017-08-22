import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class DataCard extends Component {
  render() {
    return (
      <div>
        <div>{this.props.logo}</div>
        <div>{this.props.title}</div>
      </div>
    );
  }
}

class ListContainer extends Component {
  render() {
    const elements = this.props.data.map(d => 
        <li key={d.id}>
          <DataCard logo={d.logo} title={d.title} />
        </li>
      )
    return (
      <ul>{elements}</ul>
    );
  }
}

class AddItem extends Component {
  render() {
    return (
      <div>
        <input type="text" />
        <button>add element</button>
      </div>
    );
  }
}

class App extends Component {
  render() {
    const dd = [
      {id: 1, title: 'one', logo: 'logoOne'},
      {id: 2, title: 'two', logo: 'logoTwo'}
    ];
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <AddItem />
        <ListContainer data={dd}></ListContainer>
      </div>
    );
  }
}

export default App;
