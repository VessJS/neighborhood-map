import React, { Component } from 'react';
import './MapContainer.css';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import locations from '../Data/locations';


export class MapContainer extends Component {
    state = {
        activeMarker: {},
        selectedPlace: {},
        locationImage: '',
        markerAnimation: 0,
        error: false,
    };
     // Added all markers to one array
    allMarkers = [];
    addMarker = marker => {
        if (marker) {
            this.allMarkers.push(marker);
        }
    };
    // This happens when item on list is clicked
    onListItemClick = (e, props) => {
        const clickId = e.currentTarget.dataset.indexNumber;
        const click = this.allMarkers.filter(
            el => el.marker.id === clickId
        );
        this.setState({
            activeMarker: click[0].marker,
            showingInfoWindow: true,
            markerAnimation: 1,
        });
    };

    onPinClick = (props, marker) => {
        this.setState({
            showingInfoWindow: true,
            activeMarker: marker,
            selectedPlace: props,
            locationImage: 'http://www.wallpaperama.com/post-images/forums/200903/07p-6606-loading-photo.gif',
            markerAnimation: 1,
            error: false,
            markerIcon: '',
        });

        const flickrKey = "7ef1ac0ab2778bc938233edba3b4ff9c";
        // const googlePlacesKey = "AIzaSyBLD7sQ6PARsHM1iR-fz8AgujeV2d924Kk";
        // const secret = "19b4fb9bdb7a8ad7";

        fetch(
            // `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${props.name}&inputtype=textquery&fields=photos,formatted_address,name,geometry&key=${googlePlacesKey}`

            `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrKey}&tags=${props.name}&pages=1&per_page=10&extras=url_o&format=json&nojsoncallback=1`
        )
            .then(response => response.json())
            .then(photos => {
                console.log(photos);
                this.setState({
                    locationImage:
                        // `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photos.candidates[0].photos[0].photo_reference}&key=${googlePlacesKey}`
                        `https://farm${photos.photos.photo[1].farm}.staticflickr.com/${photos.photos.photo[1].server}/${photos.photos.photo[1].id}_${photos.photos.photo[1].secret}.jpg`
                });
            })
            .catch(error => {
                console.log(error);
                alert(error);
                this.setState({
                    error: true
                });
            })
        window.gm_authFailure = () => this.setState({ error: true });
        if (window.google === undefined) {
            this.setState({ error: true });
        }
    };

    onMarkerAnimation = () => {
        if (this.state.markerAnimation === 1) {
            this.setState({
                markerIcon: '../icon/blue_icon.png',
            })
        }
        else {
            this.setState({
                markerIcon: '',
            })
        }
    }

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
        // Styling added to Map
        const style = {
            width: '100%',
            height: '70vh',
            position: 'relative'
        };
        return (
            <Map
                className="map-container"
                google={this.props.google}
                style={style}
                zoom={13}
                onClick={this.onMapClicked}
                onListItemClick={this.props.onListItemClick}
                initialCenter={{
                    lat: 54.5188898,
                    lng: 18.5305409
                }}
            >
                {this.props.locations.map(location => (
                    <Marker
                        onClick={this.onPinClick}
                        title={location.name}
                        name={location.name}
                        position={location.location}
                        key={location.venueId}
                        ref={this.props.addMarker}
                    />
                ))}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.props.onInfoWindowClose}
                    onListItemClick={this.props.onListItemClick}
                >
                    <div className="info-window">
                        <img alt={this.state.selectedPlace.name} src={this.state.locationImage} width={300} height={200} />
                        <h1>{this.state.selectedPlace.name}</h1>
                        <h5>Images are fetched from Flickr</h5>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyDF1sMgvToCsxgaeFVp49tGp0_5jJv4jTU")
})(MapContainer)