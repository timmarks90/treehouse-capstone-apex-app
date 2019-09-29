import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Search from './components/Search';

class App extends Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      searchQuery: ''
    };
  }

  componentWillMount() {
    document.body.className = "body-bg-image";
  }

  // Run profile search
  search = (query) => {
    this.setState({loading: true});

    fetch(`{../routes/Profile}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ 
          loading: false,
          searchQuery: query
        });
      })
      .catch( err => {
        console.log('There was an error fetching the data', err);
      })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route path="/" render={ props => 
              <React.Fragment>
                <Search onSearch={this.search} history={props.history} />
              </React.Fragment>
            } />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
