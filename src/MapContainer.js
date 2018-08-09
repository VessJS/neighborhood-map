import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import locations from '../Data/locations'

export class MapContainer extends Component {

    render() {
        const style = {
            width: '90%',
            height: '90%',
            margin: 'auto',
        };

        return (
            <Map google={this.props.google}
                 style={style}
                 className={'map'}
                 zoom={12}
                 onClick={this.onMapClicked}
                 initialCenter={{
                     lat: 54.5188898,
                     lng: 18.5305409
                 }}
            >

                <Marker onClick={this.props.onPinClick}
                        name={'Gdynia'}/>
                <Marker
                    onClick={this.onPinClick}
                    title={locations[0].name}
                    name={locations[0].name}
                    position={locations[0].location}/>
                <Marker
                    onClick={this.onPinClick}
                    title={locations[1].name}
                    name={locations[1].name}
                    position={locations[1].location}/>
                <Marker
                    onClick={this.onPinClick}
                    title={locations[2].name}
                    name={locations[2].name}
                    position={locations[2].location}/>
                <Marker
                    onClick={this.onPinClick}
                    title={locations[3].name}
                    name={locations[3].name}
                    position={locations[3].location}/>
                <Marker
                    onClick={this.onPinClick}
                    title={locations[4].name}
                    name={locations[4].name}
                    position={locations[4].location}/>

                <InfoWindow
                    marker={this.props.activeMarker}
                    visible={this.props.showingInfoWindow}
                    onClose={this.props.onInfoWindowClose}
                >
                    <div>
                        <h1>{this.props.activeMarker}</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyDF1sMgvToCsxgaeFVp49tGp0_5jJv4jTU")
})(MapContainer)