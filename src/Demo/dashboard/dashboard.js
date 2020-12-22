import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import 'react-table/react-table.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Loader from '../../App/layout/Loader';
import axios from 'axios';
import config from '../../config';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/userActions';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
			isValid: {
                value: false,
                text: '',
                name: ''   
            },
        }
    }

    componentDidMount = async () => {
        
        this.setState({ isLoading: true });
        
        try {
            const res = await axios.get(`${config.prod}/api/category/list`);
            let sideNav = [
                {
                    id: 'navigation',
                    title: 'Categories',
                    type: 'group',
                    icon: 'icon-navigation',
                    children: [ ]
                }
            ];
            let children = [{
                id: 'dashboard',
                title: 'Dashboard',
                type: 'item',
                url: '/dashboard',
                icon: 'feather icon-home',
            }];

            res.data.data.forEach(elem => {
                children.push(
                    {
                        id: `${elem.id}`,
                        title: `${elem.title}`,
                        type: 'item',
                        url: `/project/${elem.id}`,
                        icon: 'feather icon-box',
                    }
                );
            });

            sideNav[0].children = children;
            this.props.sideNavigation(sideNav);
            this.setState({ isLoading: false, isValid: { value: false, text: '', name: '' }});
        } catch (err) {
            console.log('Error: ', err);
            this.setState({ isLoading: false, isValid: { value: true, text: 'Internal Server Error. Try again by Reload.', name: 'server_error' } });
            this.createNotification('error', 'Internal Server Error');
        }
    }
    
    createNotification = (type, value) => {
        switch (type) {
            case 'info':
                NotificationManager.info(value,'', 5000);
                break;
            case 'success':
                NotificationManager.success(value, '', 5000);
                break;
            case 'warning':
                NotificationManager.warning(value, '', 5000);
                break;
            case 'error':
                NotificationManager.error(value, '', 5000);
                break;
            default: break;
        }
    };

    render() {
        return (
            <Aux>
                { this.state.isLoading && <Loader /> }
				<Row>
                    <NotificationContainer/>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        { !this.state.isLoading && this.state.isValid.value ? 
                                            <h5 className="text-center" style={{ color: 'red' }}>{this.state.isValid.text}</h5>
                                            :
                                            <h5 className="text-center">Select a Category to view it's questions.</h5>
                                        }
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}


export default connect(null, actions)(Dashboard);
