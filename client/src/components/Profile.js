import React, { Component } from 'react';

export default class Profile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          platform: this.platform,
          gamertag: this.gamertag,
          loading: true,
          error: null,
          profileData: []
        };
    }

    componentDidMount() {
        // Hide background image
        document.body.className = "body-bg-no-image";

        // Get user profile information
        fetch(`/api/v1/profile/${this.props.match.params.platform}/${this.props.match.params.gamertag}`)
        .then(res => res.json())
        .then(res => {
            console.log(res.data)
            this.setState({ 
                profileData: [res.data],
                loading: false
            });
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
            <div className="container">
                {console.log(this.state.profileData)} {/*Shows data in console */}
                {console.log(this.state.profileData.platformInfo.platformUserHandle)} {/* Triggers error "Cannot read property 'platformUserHandle" */}
                
                {/* Get user profile name */}
                {this.state.profileData.map((profile, index) => (
                    <h2 key="index">Username: {profile.platformInfo.platformUserHandle}</h2>
                ))}
            </div>
        );
    }
}
