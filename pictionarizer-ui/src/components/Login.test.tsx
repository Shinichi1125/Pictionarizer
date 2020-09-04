import React from 'react';
import { mount } from 'enzyme';
import Login from './Login';
import { EASY_EMAIL_ADDRESS, EASY_PASSWORD } from '../Constants';
import UsersDataService from '../api/UsersDataService'; 
import LoginInfo from '../interfaces/LoginInfo.interface';
//import "./setUpTests";

const axios = require('axios');
jest.mock('axios');

describe('Login', () => {  
    const mockHistoryPush = jest.fn();

    const props: any = {
        history: {
          push: mockHistoryPush 
        },
      };
    const login = mount(<Login {...props}/>);

    const { location } = window;
    // delete window.location, and then replace the reload part with a mock object
    delete window.location;
    window.location = { 
        reload: jest.fn(),
    } as any;

 //   it('renders properly', () => {
 //       expect(login).toMatchSnapshot();
 //   })  

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

        afterEach(() => {
            window.location = location;    // window should regain the original state after the test  
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
            expect(window.location.reload).toHaveBeenCalled();    
        });
    }); 

    describe('when clicking `Log in` button with the correct email and password of the user Ismo', () => {
        beforeEach(() => {
            delete window.location;
            window.location = { 
                reload: jest.fn(),
            } as any;
            axios.get.mockResolvedValue({ data: {userId: 3} });
            login.find('.btn-primary').simulate('submit');
        });

        afterEach(() => {
            window.location = location;    // window should regain the original state after the test  
        });

        it('calls an axios get request and returns the ID number 3', async () => {
            let loginInput: LoginInfo;
            loginInput = {
                email: 'IsmoLeikola@gmail.com',
                password: 'testpassword'
            }
            //act(() => {
            //    // fire events that update state 
            //});
            const setLoginId = await UsersDataService.userLogin(loginInput);
            expect(setLoginId.data.userId).toEqual(3);  
            expect(props.history.push).toHaveBeenCalledWith('/'); 
            expect(window.location.reload).toHaveBeenCalled(); 
        });
    }); 
}); 