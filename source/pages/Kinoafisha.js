// Core
import React, { Component } from 'react';
import cx from 'classnames';

// Helpers
import { getStyles } from '../helpers';

// Api
import { api } from '../API';

export class Kinoafisha extends Component {
    state = {
        selectedFilter: 'upcoming',
        selectedMovie:  '',
        sortCriteria:   '',
        movies:         [],
    };

    componentDidMount() {
        this._getMoviesByFilter(this.state.selectedFilter);
    }

    _getMoviesByFilter = async (nextFilter) => {
        const movies = await api.getMovies(nextFilter);

        this.setState({
            movies,
        });
    };

    _selectFilter = (event) => {
        const nextFilter = event.currentTarget.dataset.name;

        this.setState({
            selectedFilter: nextFilter,
        });

        this._getMoviesByFilter(nextFilter);
    };

    _selectMovie = (movieId) => {
        return () => {
            this.setState({
                selectedMovie: movieId,
            });
        };
    };

    _sortMovie = () => {
        const { sortCriteria } = this.state;
        if (!sortCriteria) {
            this.setState({
                sortCriteria: 'desc',
            });
        } else {
            this.setState({
                sortCriteria: '',
            });
        }
    }


    render() {
        const styles = getStyles(this.state);
        const {movies, selectedMovie, sortCriteria} = this.state;

        const moviesJSX = movies.sort(
            (a, b) => sortCriteria ? b.release - a.release : a.release - b.release,
        ).map((movie) => {
            const posterStyle = cx('poster', {
                selectedPoster: movie.id === selectedMovie,
            });

            return (
                <div
                    className = 'movie'
                    key = { movie.id }
                    onClick = { this._selectMovie(movie.id) }>
                    <div className = { posterStyle }>
                        <span className = 'genre'>{movie.genre}</span>
                        <img src = { movie.poster } />
                        <span className = 'rating'>{movie.rating}</span>
                    </div>
                    <span className = 'title'>{movie.title}</span>
                </div>
            );
        });

        return (
            <>
                <div className = 'header'>
                    <div className = 'logo' />
                    <div className = 'filters'>
                        <div
                            className = { styles.latestFilter }
                            data-name = 'latest'
                            onClick = { this._selectFilter }>
                            <span>Новинки 2018</span>
                        </div>
                        <div
                            className = { styles.upcomingFilter }
                            data-name = 'upcoming'
                            onClick = { this._selectFilter }>
                            <span>Скоро в кинотеатрах</span>
                        </div>
                        <div
                            className = { styles.popularFilter }
                            data-name = 'popular'
                            onClick = { this._selectFilter }>
                            <span>В топ-чартах</span>
                        </div>
                    </div>
                </div>
                <div className = 'sorting'>
                    <button
                        className = { styles.sortButton }
                        onClick = { this._sortMovie }>
                        по новизне
                    </button>
                </div>
                <div className = 'content'>{moviesJSX}</div>
                <div className = 'footer'>
                    <a href = 'mailto:team@lectrum.io'>team@lectrum.io</a>
                    <span>2018 © Все права защищены. Разработано с любовью
                        <a
                            href = 'https://lectrum.io/intensive/react'
                            rel = 'noreferrer noopener'
                            target = '_blank'>
                        в Лектруме
                        </a>
                    </span>
                    <div className = 'social'>
                        <a
                            className = 'facebook'
                            href = 'https://www.facebook.com/lectrum/'
                            rel = 'noreferrer noopener'
                            target = '_blank'
                        />
                        <a
                            className = 'telegram'
                            href = 'https://t.me/lectrum'
                            rel = 'noreferrer noopener'
                            target = '_blank'
                        />
                    </div>
                </div>
            </>
        );
    }
}
