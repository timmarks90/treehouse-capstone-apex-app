import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Profile.css';

export default class Profile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          platform: this.props.match.params.platform,
          gamertag: this.props.match.params.gamertag,
          loading: true,
          error: null,
          profileData: [],
          metaData: [],
          season3Wins: [],
          segment: []
        };
    }

    componentDidMount() {
        // Get user profile information
        fetch(`/api/v1/profile/${this.props.match.params.platform}/${this.props.match.params.gamertag}`)
        .then(res => res.json())
        .then(res => {
            console.log(res.data)
            this.setState({ 
                profileData: res.data.platformInfo,
                metaData: res.data.metadata,
                season3Wins: res.data.segments[0].stats.season3Wins,
                segment: res.data.segments[1].metadata,
                loading: false
            });
        })
        .catch(err => {
            this.setState({ 
                error: err
            });
        });
    }

    render() {
        let loading = this.state.loading;
        let error = this.state.error;
        let displaySeason3Wins = this.state.season3Wins;

        return (
            <div className="profile-container">
                <h1 className="gamertag">
                    <img src={this.state.profileData.avatarUrl} className="platform-avatar" alt=""/>
                    {loading && !error ? 'Loading profile...' : this.state.profileData.platformUserHandle}
                    {error ? 'Profile not found' : ''}
                </h1>
                <div className="grid">
                    <div>
                        <img src={this.state.segment.imageUrl} alt=""/>
                    </div>
                    <div style={{visibility: loading || error ? 'hidden' : 'visible' }}>
                        <ul>
                            <li>
                                <h4>Last Played Legend</h4>
                                <p>{this.state.metaData.activeLegendName}</p>
                            </li>
                            <li>
                                {displaySeason3Wins ? (
                                    <>
                                    <h4>Season 3 Wins</h4>
                                    <p>{this.state.season3Wins.displayValue}</p>
                                    <span>Percentile: {this.state.season3Wins.percentile}%</span>
                                    </>
                                ) : (
                                    <>
                                        <h4>Platform</h4>
                                        <p>{this.state.profileData.platformSlug}</p>
                                    </>
                                )}
                            </li>
                            <li>
                                <h4>Current Season</h4>
                                <p>{this.state.metaData.currentSeason}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <Link to="/" className="back">Go Back</Link>
            </div>
        );
    }
}
