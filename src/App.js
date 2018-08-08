import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapContainer from './components/MapContainer'
import locations from './Data/locations'


class App extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    error: false,
    locations: [],
    filteredLocations: [],
    query: '',
    selectLocationId: '',
    locations: locations,
  };

  onPinClick = (props, marker, e) =>
    this.setState({
      showingInfoWindow: true,
      activeMarker: marker,
      selectedPlace: props,
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      })
    }
  };

  componentDidMount() {
    const key = "7ef1ac0ab2778bc938233edba3b4ff9c";
    const secret = "19b4fb9bdb7a8ad7";
    const text = ["ORP%20B%C5%81YSKAWICA", "Pierożek%20Pierogarnia", "Aquarium", "Dom%20Marynarza", "Barracuda"]

    for (var item of text) {
      fetch(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&pages=1&per_page=10&api_key=${key}&format=json&nojsoncallback=1&text=${item}&extras=url_o`
        //    `https://api.foursquare.com/v2/venues/explore?ll=52.2246756,21.0122287&categoryId=4bf58dd8d48988d142941735&checkin=intent&radius=6000&limit=50&client_id=${key}&client_secret=${secret}&v=20180726`
      )

        .then(response => response.json())
        .then(res => {
          const result = res.response;

          this.setState({
            locations: result,
            filteredLocations: result
          });
        })
        .catch(error => {
          console.log(error);
          this.setState({ error: true });
        });

      // HANDLE ERRORS
      window.gm_authFailure = () => this.setState({ error: true });
      if (window.google === undefined) {
        this.setState({ error: true });
      }
    }
  }

  render() {
    let locations = this.state.locations;

    return (
      <div className="App">
        <header className="App-header">
         {/* <Button/> */}
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
