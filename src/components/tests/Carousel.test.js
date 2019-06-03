import React from 'react';
import { shallow } from 'enzyme';
import Carousel from '../Carousel';


describe('<Carousel />', () => {
    it('should render an <Carousel> tag', () => {
        const renderedComponent = shallow(<Carousel />);
        expect(renderedComponent.find('ContextConsumer').length).toBe(1);
    });
});