import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../Loader';


describe('<Loader />', () => {
    it('should render an <Loader> tag', () => {
        const renderedComponent = shallow(<Loader />);
        expect(renderedComponent.find('Styled(FontAwesomeIcon)').length).toBe(1);
    });
});