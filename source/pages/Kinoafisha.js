// Core
import React, { Component } from 'react';

// Helpers
import { getStyles } from '../helpers';

export class Kinoafisha extends Component {
    state = {
        selectedFilter: 'upcoming',
    };

    render() {
        const styles = getStyles(this.state);

        return (
            <>
                <div className = 'header'>
                    <div className = 'logo' />
                    <div className = 'filters'>
                        <div className = { styles.latestFilter }>
                            <span>Новинки 2018</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
