import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Search from './components/Search';
import Profile from './components/Profile';

class App extends Component {

  constructor() {
    super();
    this.state = {
      loading: false,
      searchQuery: ''
    };
  }

  componentDidMount() {
    document.body.className = "body-bg-image";
  }
  
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" render={ props => 
              <React.Fragment>
                <Search history={props.history} />
              </React.Fragment>
          } />
          <Route path="/profile/:platform/:gamertag" render={ ({ props, match }) => 
              <React.Fragment>
                <Profile match={match} />
              </React.Fragment>
          } />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
