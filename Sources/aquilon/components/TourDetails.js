import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'

import Carousel from 'react-native-snap-carousel'
import { MapView, Permissions, Location } from 'expo';

import { setUserLocation } from '../store/reducers/user';

import StepItem from './StepItem'


class TourDetails extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            step: this.props.navigation.getParam('item').idsStep[0],
            loc: false,
            steps: this.props.navigation.getParam('item').idsStep,
        }
        this.markers = this.props.navigation.getParam('item').idsStep;
        this.map = undefined
    }

    _displayDetail = (step) => {
        this.props.navigation.navigate("StepDetails", { item: step })
    }

    async _onSnap(index, item) {
        await this.setState({
            step: this.props.navigation.getParam('item').idsStep[index]
        });

        this.map.getNode().animateToRegion({
            latitude: parseFloat(this.state.step.idPoi.position.latitude),
            longitude: parseFloat(this.state.step.idPoi.position.longitude),
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0222,
        }, 500)
    }

    _displayTour() {
        var tour = this.props.navigation.getParam('item');
        let itemWidth = Dimensions.get('window').width - 18*2 - 10*2
        let latitude = parseFloat(this.state.step.idPoi.position.latitude)
        let longitude = parseFloat(this.state.step.idPoi.position.longitude)
        return (
            <React.Fragment>
                <View style={styles.header}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.tourName}>{tour.name}</Text>
                        <Text style={styles.author}>{tour.idAuthor.firstName} {tour.idAuthor.lastName}</Text>
                    </View>
                </View>
                <View style={styles.main}>
                    <View style={styles.mapContainer}>
                        <MapView.Animated style={styles.map}
                            initialRegion=
                            {{
                                latitude: latitude,
                                longitude: longitude,
                                latitudeDelta: 0.0222,
                                longitudeDelta: 0.0222,
                            }}
                            ref={map => {this.map = map}}
                            loadingEnabled={true}
                            showsUserLocation={true}
                        > 
                            {this.markers.map(m => (
                                <MapView.Marker
                                    coordinate={{latitude: parseFloat(m.idPoi.position.latitude),
                                        longitude: parseFloat(m.idPoi.position.longitude)}}
                                    title={m.idPoi.name}
                                    description={m.comment}
                                    key={m._id}
                                />
                            ))}
                        </MapView.Animated>
                    </View>
                </View>
                <View style={styles.carousel}>
                    <Carousel
                        data={this.state.steps}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => <StepItem item={item} displayDetails={this._displayDetail} />}
                        itemWidth={itemWidth}
                        sliderWidth={itemWidth+28*2}
                        onSnapToItem={(index, marker) => this._onSnap(index, marker)}
                    />
                </View>
            </React.Fragment>
        )
    }

    componentWillMount() {
        this._getLocationAsync()
    }

    _getLocationAsync = async () => {
        let { setUserLocation } = this.props;
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            console.log('Refus de permission');
        }
    
        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        setUserLocation(location.coords);
    };

    render() {
        console.log("rendering tour details")
        return (
            <View style={styles.main}>
                {this._displayTour()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    header: {
        position: 'absolute',
        top: 5,
        left: 5,
        width: Dimensions.get('window').width - 5,
        height: 40,
        zIndex: 100,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5
    },
    flatlist: {
        flex: 1,
        borderRadius: 24,
        paddingTop: 18,
        margin: 10,
        marginBottom: 10,
    },
    carousel: {
        position: 'absolute',
        bottom: 10,
    },
    map: {
        flex: 1,
        margin: 0,
        padding: 0,
    },
    mapContainer: {
        flex: 1,
        overflow: 'hidden',
    },
    tourName: {
        fontSize: 24,
        fontWeight: '800',
        color: '#F2696C',
    },
    author: {
        fontSize: 12,
        fontWeight: '800',
        color: '#F2696C',
    }
})

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = { setUserLocation }

export default connect(mapStateToProps, mapDispatchToProps)(TourDetails)

