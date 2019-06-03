import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';
import {
  Img,
  P,
  Badge,
  Small,
  Hr
} from '@bootstrap-styled/v4';
import { mediaBreakpointDown } from '@bootstrap-styled/css-mixins/lib/breakpoints';

import MoviePlayer from './MoviePlayer';

// const MovieSelect = styled.div`
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   background-color: red;
// `;

const MovieWrapper = styled.div`
  width: 215px;
  height: 315px;
`;

const MovieImg = styled(Img)`
  min-height: 250px;
`;

class MovieUnstyled extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    className: PropTypes.string,
    updatePreviouslyWatchedList: PropTypes.func,
  };

  state = {
    movieOpen : false,
    movieBase64: null,
    movieHover: false,
  };

  componentWillMount() {
    let imageBase64;
    if(localStorage.getItem(this.props.data.id) === null) {
      fetch(`https://cors-anywhere.herokuapp.com/${this.props.data.images[0].url}`)
        .then(r => r.blob())
        .then(blob => new Promise((res,rej) => {
          let fl = new FileReader();
          fl.onload = e => res(e.target.result);
          fl.onerror=rej;
          fl.readAsDataURL(blob)
        }))
        .then(result => {
          imageBase64 = result.replace('data:text/html', 'data:image/jpeg');
          this.setState({
            movieBase64: imageBase64,
          });
          localStorage.setItem(this.props.data.id, imageBase64)
        })
    } else {
      this.setState({
        movieBase64: localStorage.getItem(this.props.data.id),
      })
    }
  }

  handleCloseVideo = () => {
    const { updatePreviouslyWatchedList, data } = this.props;
    this.setState({
      movieOpen: false
    });
    updatePreviouslyWatchedList && updatePreviouslyWatchedList(data)
  };

  handleOpenVideo = () => {
    this.setState({
      movieOpen: true
    })
  };

  handleOnMouseOver = () => {
    this.setState({
      movieHover: true,
    })
  }

  handleOnMouseLeave = () => {
    this.setState({
      movieHover: false,
    })
  }

  render() {
    const { data, className } = this.props;
    const { movieBase64, movieHover } = this.state;

    return (
      <Fragment>
        <MovieWrapper
          className={cn(className, 'movie-wrapper cursor-pointer')}
          onClick={this.handleOpenVideo}
          onMouseLeave={this.handleOnMouseLeave}
          onMouseOver={this.handleOnMouseOver}
        >
          <MovieImg
            src={movieBase64}
            alt={data.id}
            className="cursor-pointer movie-image"
          />
          {movieHover && (
            <div className="movie-description text-white">
              <P>{data.title}</P>
              <Small>{data.description}</Small>
              <Hr />
              <Small>Rating: {data.parentalRatings[0].rating}</Small>
              <Hr />
              {data.categories.map((category, index) =>
                <Badge
                  className="ml-1"
                  key={index}
                >
                  {category.title}
                </Badge>
              )}
            </div>
          )}
          <P className="text-white">{data.title}</P>
        </MovieWrapper>
        {this.state.movieOpen ? ReactDOM.createPortal(
          <MoviePlayer close={this.handleCloseVideo} movieContent={data.contents[0]} />,
          document.body
        ) : null}
      </Fragment>
    );
  }
}

const Movie = styled(MovieUnstyled)`
  ${props => `
    &.movie-wrapper {
      position: relative;
  
      .movie-description {
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    ${mediaBreakpointDown('sm', props.theme['$grid-breakpoints'], `
      &.movie-wrapper, .movie-image, .movie-description {
        max-width: 175px;
      }
    `)}
  `}
`;

export default Movie;