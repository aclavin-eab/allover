import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default (props) => {
    return (
        <footer>
                <Link to="/"> Allover </Link> |
                <Link to="/locations"> Locations </Link> |
                Site by Andrew Clavin © 2018
        </footer>
    )
}
