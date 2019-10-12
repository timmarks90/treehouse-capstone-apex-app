import React, { Component } from 'react';
import './App.css';
import apiKey from './Config';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Search from './components/Search';
import Profile from './components/Profile';
import Footer from './components/Footer';

class App extends Component {

  constructor() {
    super();
    this.state = {
      loading: false,
      searchQuery: '',
      giffyURL: ''
    };
  }

  componentDidMount() {
    document.body.className = "body-bg-image";
    this.giffySearch('Apex');
  }
  
  // Giffy API call
  giffySearch = (query) => {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=1`)
    .then(res => res.json())
    .then(res => {
        console.log(res.data)
        this.setState({
            loading: false,
            giffyURL: res.data[0].images.original.url
        });
    })
    .catch( err => {
        console.log('There was an error fetching the data', err);
    });
  }
  
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" render={ props => 
              <React.Fragment>
                <Search history={props.history} />
                <Footer giffy={this.state.giffyURL} />
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
