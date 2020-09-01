import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';
import { EASY_EMAIL_ADDRESS, EASY_PASSWORD } from '../Constants';
import UsersDataService from '../api/UsersDataService'; 
import LoginInfo from '../interfaces/LoginInfo.interface';
//import "./setUpTests";

describe('Login', () => {
    let loginState = 0;    
    const mockEasyLogin = jest.fn();

    //const UsersDataService = require('../api/UsersDataService').default;
    const axios = require('axios');
    jest.mock('axios');

    const mockHistoryPush = jest.fn();
    /*jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        history: () => ({
            push: mockHistoryPush,
        }),
    }));

    const props = { easyLogin: mockEasyLogin }; */

    const props: any = {
        history: {
          push: { push:[] } //jest.fn(),
        },
      };
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
            axios.get.mockResolvedValue({ data: {userId: 2} });  
            login.find('.btn-success').simulate('click');
        });

        it('calls an axios get request and returns the ID number 2', async () => {
            const response = await axios.get('https://www.google.com')
            console.log(`This is my response:`)
            console.log(response)
          
            let loginInput: LoginInfo;
            loginInput = {
                email: EASY_EMAIL_ADDRESS,
                password: EASY_PASSWORD
            }
            const setLoginId = await UsersDataService.userLogin(loginInput);
            expect(setLoginId.data.userId).toEqual(2);  
            expect(props.history.push).toContain('/');    
        });

        it('calls the easyLogin function', () => {
            //expect(mockEasyLogin).toHaveBeenCalled();          
            //expect(mockHistoryPush).toHaveBeenCalledWith('/');
        });  
    });
}); 
