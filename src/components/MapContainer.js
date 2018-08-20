import React, { Component } from 'react';
import './MapContainer.css';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeMarker: {},
            selectedPlace: {},
            locationImage: '',
            error: false,
        };
        this.locations = props.locations;
        props.onCreate(this)
    }
    // This happens when item on list is clicked
    onListItemClick = (e, props) => {
        this.resetActiveMarker();

        const clickId = e.currentTarget.venueId;
        const click = this.allMarkers.filter(
            el => el.marker.id === clickId
        );
        this.setState({
            activeMarker: click[0].marker,
            showingInfoWindow: true,
        });
    };

    openInfoWindow = (query) => {
        let marker = this.refs[query];
        if (marker) {
            this.onPinClick(marker.props, marker.marker);
        }
    };

    filterMarkers = (id) => {
        for (let i in this.refs) {
            if (this.refs.hasOwnProperty(i)) {
                let marker = this.refs[i].marker;
                if (i.toLowerCase().indexOf(id.toLowerCase()) !== -1) {
                    marker.setVisible(true);
                } else {
                    marker.setVisible(false);
                }
            }
        }
    };

    onPinClick = (props, marker) => {

        this.resetActiveMarker();

        this.setState({
            showingInfoWindow: true,
            activeMarker: marker,
            selectedPlace: props,
            locationImage: 'http://www.wallpaperama.com/post-images/forums/200903/07p-6606-loading-photo.gif',
            error: false
        });

        marker.setAnimation(this.props.google.maps.Animation.BOUNCE);

        const flickrKey = "7ef1ac0ab2778bc938233edba3b4ff9c";
    
        fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrKey}&tags=${props.name}&pages=1&per_page=10&extras=url_o&format=json&nojsoncallback=1`)
            .then(response => response.json())
            .then(photos => {
                console.log(photos);
                this.setState({
                    locationImage:
                        `https://farm${photos.photos.photo[1].farm}.staticflickr.com/${photos.photos.photo[1].server}/${photos.photos.photo[1].id}_${photos.photos.photo[1].secret}.jpg`
                });
            })
            .catch(error => {
                console.log(error);
                alert("We're sorry. Application can't load image correctly.");
                this.setState({
                    error: true
                });
            })
        window.gm_authFailure = () => this.setState({ error: true });
        if (window.google === undefined) {
            this.setState({ error: true });
        }
    };

    resetActiveMarker = () => {
        if (this.state.activeMarker && this.state.activeMarker.setAnimation) {
            this.state.activeMarker.setAnimation(null);
        }
    };

    onMapClicked = (props) => {

        this.resetActiveMarker();

        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    onInfoWindowClose = (props) => {

        this.resetActiveMarker();

        this.setState({
            showingInfoWindow: false,
            activeMarker: null,
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
                onListItemClick={this.onListItemClick.bind(this)}
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
                        ref={location.name}
                        onListItemClick={this.onListItemClick.bind(this)}
                        icon={this.state.markerIcon}
                    />
                ))}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onInfoWindowClose.bind(this)}
                    onListItemClick={this.props.onListItemClick}
                >
                    <div className="info-window">
                        <img alt={this.state.selectedPlace.name} src={this.state.locationImage} width={300} height={200} />
                        <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
                            {this.state.selectedPlace.name}
                        </div>
                        <h5>Images are fetched from Flickr</h5>
                    </div>
                </InfoWindow>
            </Map>
        );
    }

}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyDF1sMgvToCsxgaeFVp49tGp0_5jJv4jTU"),
    instance: this
})(MapContainer)