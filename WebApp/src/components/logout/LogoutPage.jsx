/**
 * Created by Wayuki on 10-Feb-17 0010.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {routerActions} from 'react-router-redux';
import {firebaseConnect} from 'react-redux-firebase';

import * as appActions from '../../actions/appAction';

@firebaseConnect()
@connect(
    () => ({}),
    dispatch => ({
        routerActions: bindActionCreators(routerActions, dispatch),
        appActions: bindActionCreators(appActions, dispatch),
    }),
)
class LogoutPage extends Component {

    static propTypes = {
        firebase: PropTypes.shape({
            logout: PropTypes.func.isRequired,
        }).isRequired,
        appActions: PropTypes.shape({
            setNotification: PropTypes.func.isRequired,
        }).isRequired,
        routerActions: PropTypes.shape({
            replace: PropTypes.func.isRequired,
            goBack: PropTypes.func.isRequired,
        }).isRequired,
    };

    componentWillMount() {
        if (this.props.firebase.auth().currentUser) {
            this.props.firebase.logout()
                .then(() => {
                    this.setState({
                        called: true,
                    }, () => {
                        this.props.appActions.setNotification('success', 'Logged Out.');
                        this.props.routerActions.replace('/');
                    });
                })
                .catch((err) => {
                    this.setState({
                        called: true,
                    }, () => {
                        this.props.appActions.setNotification('error', err.message);
                        this.props.routerActions.replace('/');
                    });
                });
        } else {
            this.props.routerActions.replace('/');
        }
    }

    render() {
        return null;
    }
}

export default LogoutPage;
