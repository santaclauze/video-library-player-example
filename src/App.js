import React from 'react';

import {
  Hr,
  H2,
} from '@bootstrap-styled/v4';

import Header from './components/Header';
import Carousel from './components/Carousel';
import Loader from './components/Loader';
import Container from './components/Container';
import Movie from './components/Movie';

export default class App extends React.Component {

  state = {
    data: null,
    previouslyWatchedMovieIds: [],
    isLoading: false,
  };

  componentWillMount() {
    this.fetchData()
    this.updateFromLocalStorage()
  }

  handleRefreshClick = () => {
    this.fetchData()
  }

  fetchData = () => {
    this.setState({
      isLoading: true,
    });
    fetch('https://demo2697834.mockable.io/movies')
        .then(res => res.json())
        .then(body => this.saveData(body))
        .catch(error => console.error(error));
  };

  saveData = (data) => {
    this.setState({
      data: data,
      isLoading: false,
    });
  };

  updateFromLocalStorage = () => {
    const locallyStoredPreviouslyWatchedMovies = localStorage.getItem('previouslyWatched');
    if (locallyStoredPreviouslyWatchedMovies !== null && locallyStoredPreviouslyWatchedMovies.split(',').length > 0) {
      this.setState({
        previouslyWatchedMovieIds: locallyStoredPreviouslyWatchedMovies.split(',')
      })
    }
  }

  getPreviouslyWatchedMovies = (movies) => {
    const { previouslyWatchedMovieIds } = this.state;
    const previouslyWatchedMovies = [];
    previouslyWatchedMovieIds.map(watchedMovieId =>
        movies.map(movie => { if(watchedMovieId === movie.id) {
          previouslyWatchedMovies.push(movie)
        }})
    )
    return previouslyWatchedMovies;
  };

  handleUpdatePreviouslyWatched = (movie) => {
    const previouslyWatchedMovieIds = this.state.previouslyWatchedMovieIds;
    switch(previouslyWatchedMovieIds.length) {
      case 0:
        previouslyWatchedMovieIds.push(movie.id);
        this.setState({
          previouslyWatchedMovieIds: previouslyWatchedMovieIds
        });
        localStorage.setItem('previouslyWatched', previouslyWatchedMovieIds);
        break;
      case 1:
        if(movie.id !== previouslyWatchedMovieIds[0]) {
          previouslyWatchedMovieIds.unshift(movie.id);
          this.setState({
            previouslyWatchedMovieIds: previouslyWatchedMovieIds
          });
          localStorage.setItem('previouslyWatched', previouslyWatchedMovieIds);
        }
        break;
      default:
        const movieNeverWatched = previouslyWatchedMovieIds.find(previouslyWatchedMovie => movie.id === previouslyWatchedMovie)
        if(movieNeverWatched === undefined) {
          previouslyWatchedMovieIds.unshift(movie.id);
          this.setState({
            previouslyWatchedMovieIds: previouslyWatchedMovieIds
          });
          localStorage.setItem('previouslyWatched', previouslyWatchedMovieIds)
        } else {
          previouslyWatchedMovieIds.map((previouslyWatchedMovie, index) => {
            if (movie.id === previouslyWatchedMovie) {
              previouslyWatchedMovieIds.splice(index, index+1);
              previouslyWatchedMovieIds.unshift(movie.id);
              this.setState({
                previouslyWatchedMovieIds: previouslyWatchedMovieIds
              });
              localStorage.setItem('previouslyWatched', previouslyWatchedMovieIds)
            }
          })
        }
    }
  };

  render() {
    const { data, isLoading } = this.state;
    return (
      <div className="App">
        <Header onRefreshClick={this.handleRefreshClick} isLoading={isLoading} />
        {isLoading ?
          <div className="d-flex align-items-center justify-content-around">
            <Loader/>
          </div>
          :
          <Container>
            <div className="d-none d-sm-block">
              <H2>Featured Movies</H2>
              <Carousel movies={data && data.entries} updatePreviouslyWatchedList={this.handleUpdatePreviouslyWatched}/>
              <Hr className="my-5" />
              <H2>Previously Watched Movies</H2>
              <Carousel movies={this.getPreviouslyWatchedMovies(data && data.entries)} updatePreviouslyWatchedList={this.handleUpdatePreviouslyWatched} />
            </div>
            <div className="d-sm-none">
              <H2>Featured Movies</H2>
              <div className="d-flex flex-wrap justify-content-around">
                {data.entries.map((movie, index) => <Movie data={movie} key={index} mobile updatePreviouslyWatchedList={this.handleUpdatePreviouslyWatched} />)}
              </div>
            </div>
          </Container>
        }
      </div>
    );
  }
}
