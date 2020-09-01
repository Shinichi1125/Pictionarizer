import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';
import { EASY_EMAIL_ADDRESS, EASY_PASSWORD } from '../Constants';
import UsersDataService from '../api/UsersDataService'; 
import LoginInfo from '../interfaces/LoginInfo.interface';
//import "./setUpTests";

const axios = require('axios');
jest.mock('axios');

describe('Login', () => {  
    const mockHistoryPush = jest.fn();
    const mockLocationReload = jest.fn();

    const props: any = {
        history: {
          push: mockHistoryPush //jest.fn(),
        },
        location: {
          reload: mockLocationReload
        }
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
            let loginInput: LoginInfo;
            loginInput = {
                email: EASY_EMAIL_ADDRESS,
                password: EASY_PASSWORD
            }
            const setLoginId = await UsersDataService.userLogin(loginInput);
            expect(setLoginId.data.userId).toEqual(2);  
            expect(props.history.push).toHaveBeenCalledWith('/'); 
            expect(props.location.reload).toHaveBeenCalled();  
            //expect(window.location.reload).toHaveBeenCalled(); 
        });

        it('calls the easyLogin function', () => {
            //expect(mockEasyLogin).toHaveBeenCalled();          
            //expect(mockHistoryPush).toHaveBeenCalledWith('/');
        });  
    });
}); 