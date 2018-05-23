import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default (props) => {
    return (
        <div>
            <nav>
                <Link to="/"> Allover </Link>
                <Link to="/artwork"> Art </Link>
                <Link to="/artists"> Artists </Link>
            </nav>
        </div>
    )
}
