import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {readUser, addUser} from '../store/thunks'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
            },
        }
    }

    updateField = (event) => {
        this.setState({
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        })
    }

    login = async () => {
        await this.props.readUser(this.state.user)
        this.props.history.push('/')
    }

    signup = () => {
        this.props.addUser(this.state.user)
    }

    render() {
        return (
            <div className="piece">
                LOGIN PAGE
                <input type="text" name="email" value={this.state.user.email} onChange={this.updateField}/>
                <input type="text" name="password" value={this.state.user.password} onChange={this.updateField}/>
                <button onClick={this.login}>Login</button>
                <button onClick={this.signup}>Signup</button>
            </div>
        )
    }
}

const mapDispatch = dispatch => {
    return {
        addUser: (user) => dispatch(addUser(user)),
        readUser: (user) => dispatch(readUser(user))
    }
}

export default connect(null, mapDispatch)(Login)
