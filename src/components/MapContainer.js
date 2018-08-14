import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import Menu from './Menu';
import locations from '../Data/locations'


export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        locationImage: '',
        markerAnimation: 0,
    };

    onPinClick = (props, marker) => {
        this.setState({
            showingInfoWindow: true,
            activeMarker: marker,
            selectedPlace: props,
            locationImage: 'http://www.wallpaperama.com/post-images/forums/200903/07p-6606-loading-photo.gif',
            markerAnimation: 1,
            error: false
        });

        // const flickrKey = "7ef1ac0ab2778bc938233edba3b4ff9c";
        const googlePlacesKey = "AIzaSyBLD7sQ6PARsHM1iR-fz8AgujeV2d924Kk";
        // const secret = "19b4fb9bdb7a8ad7";

        fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${props.name}&inputtype=textquery&fields=photos,formatted_address,name,geometry&key=${googlePlacesKey}`

            // `https://api.flickr.com/services/rest/?method=flickr.photos.search&pages=1&per_page=1&extras=url_o&privacy_filter=1&api_key=${key}&format=json&nojsoncallback=1&text=${props.name}&extras=url_o`
        )
            .then(response => response.json())

            .then(photos => {
                console.log(photos);

                this.setState({
                    locationImage: `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photos.candidates[0].photos[0].photo_reference}&key=${googlePlacesKey}`
                    // `https://farm${photos.photos.photo[0].farm}.staticflickr.com/${photos.photos.photo[0].server}/${photos.photos.photo[0].id}_${secret}_o.png`
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({ error: true });
            })

    };

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null,
                markerAnimation: 0,
            })
        }
    };

    onInfoWindowClose = (props) => {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null,
            selectedPlace: null,
            markerAnimation: 0,
            locations: locations,
        });
    };

    render() {
        const style = {
            width: '100%',
            height: '70vh',
            position: 'relative'
        };

        return (

            <Map google={this.props.google}
                style={style}
                zoom={13}
                onClick={this.onMapClicked}
                initialCenter={{
                    lat: 54.5188898,
                    lng: 18.5305409
                }}
            >
                {/* <Menu
                    onListItemClick={this.onListItemClick}
                    name={this.locations.name}
                    key={this.location.venueId}
                /> */}
                {this.props.locations.map(location => (
                    <Marker
                        onClick={this.onPinClick}
                        title={location.name}
                        name={location.name}
                        position={location.location}
                        key={location.venueId} />
                ))}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.props.onInfoWindowClose}
                >
                    <div>
                        <img alt={this.state.selectedPlace.name} src={this.state.locationImage} width={300} height={200} />
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