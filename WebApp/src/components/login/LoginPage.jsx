/**
 * Created by Wayuki on 09-Feb-17 0009.
 */
import React, {Component, PropTypes} from 'react';
import {Button} from 'reactstrap';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {firebaseConnect} from 'react-redux-firebase';

import {UserIsNotAuthenticated} from '../../auth/auth';

import * as loginActions from '../../actions/loginAction';

import TextInput from '../common/TextInput.jsx';

@firebaseConnect()
@connect(
    ({loginPage}) => ({
        ...loginPage,
    }),
    dispatch => ({
        actions: bindActionCreators(loginActions, dispatch),
    }),
)
@UserIsNotAuthenticated
class LoginPage extends Component {

    static propTypes = {
        credential: PropTypes.shape({
            email: PropTypes.string.isRequired,
            password: PropTypes.string.isRequired,
        }).isRequired,
        isLoggingIn: PropTypes.bool.isRequired,
        actions: PropTypes.shape({
            handleFormFieldChange: PropTypes.func.isRequired,
            handleLogin: PropTypes.func.isRequired,
        }).isRequired,
    };

    handleFormFieldChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        this.props.actions.handleFormFieldChange(key, value);
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.props.actions.handleLogin();
    };

    renderLoginButton = () => (
        this.props.isLoggingIn ? (
                <Button
                    className="mt-4 loading"
                    color="primary"
                    size="lg"
                    type="submit"
                    disabled
                >
                    Logging In...
                </Button>
            ) : (
                <Button
                    className="mt-4"
                    color="primary"
                    size="lg"
                    type="submit"
                >
                    Login
                </Button>
            )
    );

    render() {
        const {email, password} = this.props.credential;
        return (
            <div className="main-content">
                <form className="py-2" onSubmit={this.handleFormSubmit}>
                    <fieldset className="w-75 mx-auto">
                        <legend className="display-4 text-center mb-4">Login</legend>
                        <TextInput
                            containerClass="form-group"
                            label="Email Address"
                            type="email"
                            name="email"
                            id="user-email"
                            className="form-control"
                            placeholder="Please Enter Your Email Address. "
                            value={email}
                            onChange={this.handleFormFieldChange}
                            errorMsg=""
                        />
                        <TextInput
                            containerClass="form-group"
                            label="Password"
                            type="password"
                            name="password"
                            id="user-password"
                            className="form-control"
                            placeholder="Please Enter Your Password. "
                            value={password}
                            onChange={this.handleFormFieldChange}
                            errorMsg=""
                        />
                        <div className="btn-container text-center">
                            { this.renderLoginButton() }
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}

export default LoginPage;
