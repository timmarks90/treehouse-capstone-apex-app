import React, { Component } from 'react';

export default class Profile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          platform: this.platform,
          gamertag: this.gamertag,
          loading: true,
          error: null,
          profileData: {}
        };
    }

    componentDidMount() {
        // Hide background image
        document.body.className = "body-bg-no-image";

        // Get user profile information
        fetch(`/api/v1/profile/${this.props.match.params.platform}/${this.props.match.params.gamertag}`)
        .then(res => res.json())
        .then(res => {
            console.log('success')
            console.log(res)
            this.setState({ 
                profileData: res.data,
                loading: false
            });
            console.log(this.state.profileData)
        })
        .catch(err => {
            console.log('failed');
            this.setState({ 
                error: err
            })
        })
    }

    render() {
        return (
            <h3>
                Legend: {this.state.profileData}
            </h3>
        );
    }
}
