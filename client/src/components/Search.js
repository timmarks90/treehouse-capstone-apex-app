import React, { Component } from 'react';

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            platform: 'psn',
            gamertag: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Change state for platform selected and gamertag entered
    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]: value
        });
    }

    // Run search on submit of gamertag
    handleSubmit = e => {
        e.preventDefault();
        if (this.state.gamertag === '') {
            console.log('Please enter a gamertag');
        } else {
            this.props.history.push(`/profile/${this.state.platform}/${this.state.gamertag}`);
        }
    }

    render() {
        return (
            <section class="search">
                <h1>Look Up Player Stats</h1>
                <form className="search-form" onSubmit={ this.handleSubmit } >
                    <div class="form-group">
                        <label for="platform">Platform</label>
                        <select name="platform" id="platform" value={this.state.value} ref={ input => this.query = input } onChange={this.handleChange} >
                            <option value="psn">Playstation</option>
                            <option value="xbl">Xbox</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="gamertag">Gamertag</label>
                        <input type="text" value={this.state.value} onChange={this.handleChange} name="gamertag" id="gamertag" placeholder="Playstation ID, Xbox Live gamertag, or Origin ID" />
                    </div>
                    <div class="form-group">
                        <input type="submit" value="Submit" class="btn" />
                    </div>
                </form>
            </section>
        )
    }
}