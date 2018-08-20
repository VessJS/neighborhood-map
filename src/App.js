import React, { Component } from 'react';
import './App.css';
import MapContainer from './components/MapContainer'
import locations from './Data/locations'
import Menu from './components/Menu';
import Button from './components/Button';

class App extends Component {

    state = {
        error: false,
        locations: locations,
        photos: [],
        showingInfoWindow: false,
        markerAnimation: 0,
        menuActive: false,
        activeMarker: {},
        mapFailed: false,
    };

    componentDidMount() {
        // Google API failed to load
        window.gm_authFailure = () => this.setState({
            mapFailed: true
        });
    }
    // This happens when info window is closed
    onInfoWindowClose = (props) => {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null,
            selectedPlace: null,
        });
    };
    // This opens list item
    toggleMenu = () => {
        if (this.state.menuActive) {
            this.setState({
                menuActive: false
            });
        } else {
            this.setState({
                menuActive: true
            });
        }
    };

    onMapContainerCreate(target) {
        this.mapContainer = target;
    }
    onSearchQuery(query) {
        this.mapContainer.filterMarkers(query);
    };

    onListItemClick(value) {
        this.mapContainer.openInfoWindow(value);
    };

    render() {
        const mapLoaded = !this.state.mapFailed
        const menuOpen = this.state.menuActive;
        return (
            <div className="App" role="application">
                <header className="App-header" role="banner">
                    <h1 className="App-title">Neighborhood Map</h1>
                    <Button
                        toggleMenu={this.toggleMenu}
                    />
                    {menuOpen && (
                        <div>
                            <Menu
                                className="menu"
                                searchQuery={this.onSearchQuery.bind(this)}
                                onListItemClick={this.onListItemClick.bind(this)}
                            />
                        </div>
                    )}
                </header>
                <div className="map">
                    {mapLoaded ? (
                        <MapContainer
                            google={window.google}
                            appState={this.state}
                            marker={this.props.activeMarker}
                            locations={this.state.locations}
                            onCreate={this.onMapContainerCreate.bind(this)}
                        />
                    ) : (
                            <div>
                                <h3>We're sorry. We can't load this map</h3>
                                <img src="https://s3.envato.com/files/232572468/01_preview.__large_preview.jpg" alt="code 404 cat" />
                            </div>
                        )}
                </div>
            </div>
        );
    }
}

export default App;
