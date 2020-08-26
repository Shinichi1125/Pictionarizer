import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';
//import "./setUpTests";
//import { Route } from 'react-router-dom';

describe('Login', () => {
    let loginState = 0; 
    const mockEasyLogin = jest.fn();
    const props = { easyLogin: mockEasyLogin };
    const login = shallow(<Login {...props}/>);

    it('renders properly', () => {
        expect(login).toMatchSnapshot();
    })

    it('initializes an email and a password in `state`', () => {
        expect(login.state()).toEqual({
            loginId: '0',
            loginData: {
              email: '',
              password: ''
            }
          });
    });  

    describe('when clicking the `Easy Log in` button', () => {
        beforeEach(() => {
            login.find('.btn-success').simulate('click');
        });

        it('calls the easyLogin function', () => {
            expect(mockEasyLogin).toHaveBeenCalled();
        });  
    });

}); 
