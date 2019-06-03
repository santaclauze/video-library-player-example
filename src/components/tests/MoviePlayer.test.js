import React from 'react';
import { shallow } from 'enzyme';
import MoviePlayer from '../MoviePlayer';


describe('<MoviePlayer />', () => {
    it('should render an <MoviePlayer> tag', () => {
        const movieContent = {
            format: 'test_format',
            url: 'test_url'
        }
        const renderedComponent = shallow(<MoviePlayer movieContent={movieContent} />);
        expect(renderedComponent.find('ContextConsumer').length).toBe(1);
    });
});