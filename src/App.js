import React, { Component } from 'react';
import './App.css';
import MapContainer from './components/MapContainer'
import locations from './Data/locations'
import Menu from './components/Menu';

class App extends Component {

    state = {
        error: false,
        filteredLocations: [],
        query: '',
        selectLocationId: '',
        locations: locations,
        photos: [],
        activeMarker: {},
        showingInfoWindow: false,
        markerAnimation: 0,
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

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {/* <menuButton/> */}
                    <h1 className="App-title">Neighborhood Map</h1>
                </header>
                <p className="App-intro">
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
                </p>
            </div>
        );
    }
}

// APIkey = AIzaSyDF1sMgvToCsxgaeFVp49tGp0_5jJv4jTU;
export default App;
