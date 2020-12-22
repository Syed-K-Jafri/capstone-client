import {
    SIGN_IN,
    SIGN_OUT,
    SIDE_NAVIGATION,
    SET_ROUTE
} from './types/types';
import axios from 'axios';
import config from '../../config';

export const signIn = data => {
    return {
        type: SIGN_IN,
        payload: data,
    };  
};

export const setRoute = data => {
    return {
        type: SET_ROUTE,
        payload: data,
    };  
};

export const sideNavigation = data => {
    return {
        type: SIDE_NAVIGATION,
        payload: data,
    };
};

export const sideNavigationOnRefresh = () => {
    return dispatch => {
        return axios.get(`${config.prod}/api/category/list`)
            .then(res => {
                let sideNav = [{ id: 'navigation', title: 'Categories', type: 'group', icon: 'icon-navigation', children: [ ] }];
                let children = [{ id: 'dashboard', title: 'Dashboard', type: 'item', url: '/dashboard', icon: 'feather icon-home' }];
                res.data.data.forEach(elem => {
                    children.push({ id: `${elem.id}`, title: `${elem.title}`, type: 'item', url: `/project?project=${elem.id}`, icon: 'feather icon-box' });
                });
                sideNav[0].children = children;
                dispatch({type: SIDE_NAVIGATION,payload:sideNav});
            })
            .catch(err => {
                console.log('Error refresh page: ', err);
                dispatch(sideNavigation([]));
            });
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}