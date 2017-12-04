import React from 'react';
import logosrc from './logo.jpg';
import './logo.css';

class Logo extends React.Component {
    render() {
        return (
            <div className="logo-container">
                <img src={logosrc} alt="logo"/>
            </div>
        )
    }
}

export default Logo;