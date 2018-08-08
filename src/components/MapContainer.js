import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import locations from '../Data/locations'

export class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
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