import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import Loader from './App/layout/Loader';
import * as actions from './store/actions/userActions';
import config from './config';
import routes from './routes';

export default function (ComposedComponent) {

  class Authentication extends Component {
    state = {
      valid: false
    }
    
    componentDidMount = async () => {
      const { history } = this.props;
      let local = localStorage.getItem('capstone-token');
      if (local) {
        axios.post(`${config.prod}/api/validate/token`, { token: local })
          .then(async ({ data }) => {
            await this.props.setRoute(true);
            await this.props.signIn(data.data);
            await this.props.sideNavigationOnRefresh();
            if (this.props.location.pathname === '/not-found' || !routes.some(x => x.path === this.props.location.pathname && x.role === data.data.role)) {
              history.push({pathname: '/not-found', state: { link: '/dashboard' } });
            }
            this.setState({ valid: true });
          })
          .catch(async error => {
            localStorage.removeItem('capstone-token');
            await this.props.setRoute(false);
            history.push('/login');
          });
      } else {
        history.push('/login');
      }
    }

    render() {
      let local = localStorage.getItem('capstone-token');
      if (local) {
        if (this.state.valid) {
          return <ComposedComponent {...this.props} />;
        } else {
          return <Loader />
        }
      }
      else {
        return <Redirect to="/login" />
      };
    }
  }
  
  return connect(null, actions)(Authentication);
}
