import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { shallow } from 'enzyme';

const app = shallow(<App/>);

it('renders correctly', () => {
  expect(app).toMatchSnapshot();
});


/*
test('renders learn react link', () => {
  const { getByText } = render(<BrowserRouter><App /></BrowserRouter>);
  const linkElement = getByText(/words/i);
  expect(linkElement).toBeInTheDocument();
});
*/
