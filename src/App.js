import React, { Component } from 'react';
import './App.css';
import MapContainer from './components/MapContainer'
import locations from './Data/locations'
import Menu from './components/Menu';
import Button from './components/Button';
// import Search from './components/Search';

class App extends Component {

    state = {
        error: false,
        locations: locations,
        photos: [],
        showingInfoWindow: false,
        markerAnimation: 0,
        menuActive: false,
        activeMarker: {},
    };
    // Added all markers to one array
    allMarkers = [];
    addMarker = marker => {
        if (marker) {
            this.allMarkers.push(marker);
        }
    };
    // This happens when info window is closed
    onInfoWindowClose = (props) => {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null,
            selectedPlace: null,
        });
    };
    // This happens when item on list is closed
    onListItemClick = (e) => {
        const click = this.allMarkers.filter(
            el => el.marker.name === e.target.textContent
        );
        this.setState({
            activeMarker: click[0].marker,
            showingInfoWindow: true,
            markerAnimation: 1,
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

    render() {
        const menuOpen = this.state.menuActive
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
                                onListItemClick={this.onListItemClick}
                            />
                        </div>
                    )}
                </header>
                <div className="map">
                    <MapContainer
                        google={window.google}
                        onPinClick={this.onPinClick}
                        onInfoWindowClose={this.onInfoWindowClose}
                        onMapClicked={this.onMapClicked}
                        appState={this.state}
                        marker={this.props.activeMarker}
                        locations={this.state.locations}
                        addMarker={this.addMarker}
                    />
                </div>
            </div>
        );
    }
}

// APIkey = AIzaSyDF1sMgvToCsxgaeFVp49tGp0_5jJv4jTU;
export default App;
