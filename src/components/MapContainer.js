import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import locations from '../Data/locations'

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        error: false,
        locations: [],
        filteredLocations: [],
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
                `https://api.flickr.com/services/rest/?method=flickr.photos.search&page=1&api_key=${key}&format=json&nojsoncallback=1&text=${item}&extras=url_o`
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
        const style = {
            width: '70%',
            height: '80%'
        }
        return (
            <Map google={this.props.google}
                style={style}
                zoom={12}
                onClick={this.onMapClicked}
                initialCenter={{
                    lat: 54.5188898,
                    lng: 18.5305409
                }}>

                <Marker onClick={this.onPinClick}
                    name={'Current location'} />
                <Marker
                    onClick={this.onPinClick}
                    name={'Current location'}
                    title={locations[0].name}
                    name={locations[0].name}
                    position={locations[0].location} />
                <Marker
                    onClick={this.onPinClick}
                    name={'Current location'}
                    onClick={this.onPinClick}
                    name={'Current location'}
                    title={locations[1].name}
                    name={locations[1].name}
                    position={locations[1].location} />
                <Marker
                    onClick={this.onPinClick}
                    name={'Current location'}
                    title={locations[2].name}
                    name={locations[2].name}
                    position={locations[2].location} />
                <Marker
                    onClick={this.onPinClick}
                    name={'Current location'}
                    title={locations[3].name}
                    name={locations[3].name}
                    position={locations[3].location} />
                <Marker
                    onClick={this.onPinClick}
                    name={'Current location'}
                    title={locations[4].name}
                    name={locations[4].name}
                    position={locations[4].location} />

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyDF1sMgvToCsxgaeFVp49tGp0_5jJv4jTU")
})(MapContainer)