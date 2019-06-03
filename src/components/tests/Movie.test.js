import React from 'react';
import { shallow } from 'enzyme';
import Movie from '../Movie';


describe('<Movie />', () => {
    it('should render an <Movie> tag', () => {
        const movie = {
            id: 'test',
            images: [{ url: 'test_url' }]
        }
        const renderedComponent = shallow(<Movie data={movie} />);
        expect(renderedComponent.find('StyledComponent').length).toBe(1);
    });
});