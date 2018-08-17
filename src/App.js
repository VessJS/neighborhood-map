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
                                // onListItemClick={this.onListItemClick}
                            />
                        </div>
                    )}
                </header>
                <div className="map">
                    <MapContainer
                        google={window.google}
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
