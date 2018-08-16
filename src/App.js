import React, { Component } from 'react';
import './App.css';
import MapContainer from './components/MapContainer'
import locations from './Data/locations'
import Menu from './components/Menu';
import Button from './components/Button';
import Search from './components/Search';

class App extends Component {

    state = {
        error: false,
        filteredLocations: [],
        locations: locations,
        photos: [],
        searchQuery: "",
        activeMarker: {},
        showingInfoWindow: false,
        markerAnimation: 0,
        menuActive: false,
    };

    allMarkers = [];
    addMarker = marker => {
        if (marker) {
            this.allMarkers.push(marker);
        }
    };

    onListItemClick = (e, marker) => {
        this.setState({
            activeMarker: marker,
            showingInfoWindow: true,
            markerAnimation: 1,
        });
    };

    onInfoWindowClose = (props) => {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null,
            selectedPlace: null,
        });
    };

    onSearchCategory = e => {
        const query = e.target.value;
        const filteredLocations = this.state.locations.filter(el =>
            el.category.toLowerCase().includes(query.toLowerCase()) ||
            el.category[0]
                .toLowerCase()
                .includes(query.toLowerCase())
        );
        this.setState({
            searchQuery: query,
            filteredLocations: filteredLocations,
            showingInfoWindow: false,
            markerAnimation: 0
        });
    };

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

    render() {
        const menuOpen = this.state.menuActive

        return (
            <div className="App">

                <header className="App-header">
                    <h1 className="App-title">Neighborhood Map</h1>
                    <Button
                        toggleMenu={this.toggleMenu}
                    />
                    {menuOpen && (
                        <div>
                            <Search
                                searchCategory={this.onSearchCategory}
                                searchQuery={this.state.searchQuery}
                            />
                            <Menu
                                className="menu"
                                onListItemClick={this.onListItemClick}
                            />
                        </div>
                    )}
                </header>
                <div className="map" role="application">
                    <MapContainer
                        google={window.google}
                        onPinClick={this.onPinClick}
                        onInfoWindowClose={this.onInfoWindowClose}
                        onMapClicked={this.onMapClicked}
                        appState={this.state}
                        marker={this.props.activeMarker}
                        locations={this.state.locations}
                    />
                </div>

            </div>
        );
    }
}

// APIkey = AIzaSyDF1sMgvToCsxgaeFVp49tGp0_5jJv4jTU;
export default App;