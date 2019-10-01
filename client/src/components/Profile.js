import React, { Component } from 'react';

export default class Profile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          platform: this.platform,
          gamertag: this.gamertag,
          loading: true,
          error: null,
          profileData: null
        };
    }

    componentDidMount() {
        // Hide background image
        document.body.className = "body-bg-no-image";

        // Get user profile information
        fetch(`http://localhost:5000/api/v1/profile/${this.props.match.params.platform}/${this.props.match.params.gamertag}`)
        .then(res => res.json())
        .then(res => {
            console.log('success')
            this.setState({ 
            profileData: res.data.data,
            loading: false
            });
        })
        .catch(err => {
            console.log('failed');
            console.log(err);
        })
        console.log(this.state.profileData);
    }

    render() {
        return (
            <div>
                Profile
            </div>
        )
    }
}
