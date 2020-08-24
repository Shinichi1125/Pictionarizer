import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';
import "./setUpTests";
import { Route } from 'react-router-dom';

describe('Login', () => {
    const login = shallow(<Route exact path="/login" component={Login}/>);

    it('renders properly', () => {
        expect(login).toMatchSnapshot();
    })

   /* it('initializes an email and a password in `state`', () => {
        expect(login.state().loginId).toEqual('0');
    });  */


}); 
