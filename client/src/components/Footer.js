import React, { Component } from 'react';

export default class Footer extends Component {

    render() {
        return (
            <div className="apex-gifs">
              <img src={this.props.giffy} alt=""/>
            </div>
        )
    }
}