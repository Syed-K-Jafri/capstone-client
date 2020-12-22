import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {

    render() {
        const { state } = this.props.location;
        return (
            <div>
                <h1>404 - Not Found!</h1>
                <Link to={state && state.link ? `${state.link}` : `/`}>Dashboard</Link>
            </div>
        )
    }
}

export default NotFound;