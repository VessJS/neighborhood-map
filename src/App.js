import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapContainer from './components/MapContainer'
import locations from './Data/locations'


class App extends Component {
  state = {
    query: '',
    selectLocationId: '',
    locations: locations,
  };

  render() {
    let locations = this.state.locations;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <div className="map" role="application">
            <MapContainer
              google={window.google}
              addMarker={this.locations}
              onPinClick={this.onPinClick}
              onInfoWindowClose={this.onInfoWindowClose}
              onMapClick={this.onMapClick}
              appState={this.state}
            />

          </div>
        </p>
      </div>
    );
  }
}
// APIkey = AIzaSyDF1sMgvToCsxgaeFVp49tGp0_5jJv4jTU;
export default App;
