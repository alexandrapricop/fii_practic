import React from 'react';
import { Plugins } from '@capacitor/core';

import ReactMapGL, { Layer, Source } from 'react-map-gl';
import axios from 'axios';

import Restaurant from '../../../components/restaurant';

import {
    MAPBOX_API_TOKEN,
    RESTAURANTS_API_ENDPOINT
} from '../../../utils/constants';

import {
    clusterCountLayer,
    clusterLayer,
    unclusteredPointLayer
} from './layers';

const { Geolocation } = Plugins;

class Map extends React.Component {
    state = {
        viewport: {
            zoom: 8,
            bearing: 0,
            pitch: 0
        },
        restaurants: []
    };

    _sourceRef = React.createRef();

    onViewportChange = viewport => this.setState({ viewport });

    onMapPress = event => {
        const features = event.features;
        if (
            !features.length ||
            event.target.classList.toString().indexOf('overlays') === -1
        ) {
            return;
        }

        const isClustered = event.features[0].layer.id === 'clusters';

        if (isClustered) {
            this.onClusteredPointClick(event);
        } else {
            this.onUnclusteredPointClick(event);
        }
    };

    onClusteredPointClick = event => {
        const feature = event.features[0];
        const clusterId = feature.properties.cluster_id;

        const mapboxSource = this._sourceRef.current.getSource();

        mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) {
                return;
            }

            this.onViewportChange({
                ...this.state.viewport,
                longitude: feature.geometry.coordinates[0],
                latitude: feature.geometry.coordinates[1],
                zoom,
                transitionDuration: 500
            });
        });
    };

    onUnclusteredPointClick = event => {
        const { id } = event.features[0].properties;
        const restaurant = this.state.restaurants.find(
            restaurant => restaurant.id === id
        );
        this.setState({
            selectedRestaurant: restaurant
        });
    };

    componentDidMount() {
        Geolocation.getCurrentPosition().then((position, error) => {
            if (error) {
                console.log(error);
            }
            this.setState({
                viewport: {
                    ...this.state.viewport,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
            });
        });

        axios
            .get(RESTAURANTS_API_ENDPOINT)
            .then(response => {
                this.setState({
                    restaurants: response.data.results.items
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentWillUnmount() {
        Geolocation.clearWatch({ id: this.watchId });
    }

    mapRestaurants = restaurants => ({
        type: 'FeatureCollection',
        crs: {
            type: 'name',
            properties: {
                name: 'urn:ogc:def:crs:OGC:1.3:CRS84'
            }
        },
        features: restaurants.map(restaurant => ({
            type: 'Feature',
            properties: {
                ...restaurant,
                icon: 'restaurant'
            },
            geometry: {
                type: 'Point',
                coordinates: restaurant.position.reverse()
            }
        }))
    });

    render() {
        const { viewport, restaurants, selectedRestaurant } = this.state;
        return (
            <>

                <ReactMapGL
                    {...viewport}
                    width="100vw"
                    height="100vh"
                    mapStyle="mapbox://styles/mapbox/dark-v9"
                    mapboxApiAccessToken={MAPBOX_API_TOKEN}
                    dragPan={!selectedRestaurant}
                    scrollZoom={!selectedRestaurant}
                    doubleClickZoom={!selectedRestaurant}
                    maxZoom={18}
                    minZoom={6}
                    interactiveLayerIds={[
                        clusterLayer.id,
                        unclusteredPointLayer.id
                    ]}
                    onViewportChange={this.onViewportChange}
                    onClick={this.onMapPress}
                >
                    {restaurants && (
                        <Source
                            type="geojson"
                            data={this.mapRestaurants(restaurants)}
                            cluster={true}
                            clusterMaxZoom={16}
                            clusterRadius={50}
                            ref={this._sourceRef}
                        >
                            <Layer {...clusterLayer} />
                            <Layer {...clusterCountLayer} />
                            <Layer {...unclusteredPointLayer} />
                        </Source>
                    )}
                    <Restaurant
                        onClosePress={() =>
                            this.setState({
                                selectedRestaurant: null
                            })
                        }
                        restaurant={selectedRestaurant}
                    />
                </ReactMapGL>
            </>
        );
    }
}

export default Map;
