import React, {Component} from 'react'
import { connect } from 'react-redux'
import {getUser, addUser} from '../store/thunks'

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

    login = () => {
        this.props.getUser(this.state.user)
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
        getUser: (user) => dispatch(getUser(user))
    }
}

export default connect(null, mapDispatch)(Login)
