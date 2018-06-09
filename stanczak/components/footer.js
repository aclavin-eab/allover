import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default (props) => {
    let pageTop = '100%';
    if(document.documentElement.scrollHeight > document.documentElement.clientHeight){
        pageTop = document.documentElement.scrollHeight + 'px'
    } else {
        pageTop = '100%'
    }
    return (
        <footer style={{top: `${pageTop}`}}>
                <Link to="/"> Allover </Link> |
                <Link to="/locations"> Locations </Link> |
                Site by Andrew Clavin © 2018
        </footer>
    )
}
