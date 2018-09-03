import React, {Component} from 'react'
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
            [event.target.name]: event.target.value
        })
    }

    login = () => {
        getUser(this.state.user)
    }

    signup = () => {
        addUser(this.state.user)
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

export default Login
