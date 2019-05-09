import React from 'react';
import { connect } from 'react-redux'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import CheckBox from 'react-native-check-box'
import { MapView, Location, Permissions } from 'expo';
import { isValidatedStep } from '../api/tour'

import { setUserLocation } from '../store/reducers/user';

import QuizzDetails from './QuizzDetails';

const TranslatePOICategory = {
    0: "Musée",
    1: "Lieu",
    2: "Théatre",
    3: "Lieu de culte",
}

class StepDetails extends React.Component {

    constructor(props) {
        super(props)
        this.step = this.props.navigation.getParam('item');
        this.props.navigation.addListener('didFocus', () =>
            isValidatedStep(this.props.token, this.step._id).then(
                (res) => {
                    this.setState({
                        completed: res.data.validation
                    })
                }
            )
        )
        this.state = {
            completed: null,
            isLoading: false,
            quizzOpen: false,
        }
    }

    _displayCheckBox() {
        if (this.state.completed !== null) {
            return (
                <CheckBox
                    isChecked={this.state.completed}
                    onClick={() => undefined}
                />
            )
        }
        return (<ActivityIndicator />)
    }

    _displayQuizz = () => {
        this.setState({
            quizzOpen: !this.state.quizzOpen
        });
    }

    _toggleCheck = () => {
        this.setState({
            completed:true
        })
    }

    _displayStep() {
        var step = this.step
        let Marker = MapView.Marker
        let latitude = parseFloat(step.idPoi.position.latitude)
        let longitude = parseFloat(step.idPoi.position.longitude)
        return (
            <View style={styles.main}>
                <View style={styles.top}>
                    <View style={styles.header}>
                        <Text style={styles.name}>{step.idPoi.name}</Text>
                        <Text style={styles.category}>{TranslatePOICategory[step.idPoi.category]}</Text>
                    </View>
                    <View style={styles.desc}>
                        <Text style={styles.text}>{step.comment}</Text>
                    </View>
                </View>
                {
                    step.idQuizz.content.length !== 0 ?
                    <View style={styles.quizz}>
                        <QuizzDetails userLoc={this.state.userLoc} step={step} toggleCheck={this._toggleCheck}></QuizzDetails>
                    </View>
                    :
                    <View><Text>Pas de questions içi</Text></View>
                }

                {this._displayCheckBox()}
                <View style={styles.mapContainer}>
                    <MapView style={styles.map}
                        initialRegion=
                        {{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.0222,
                            longitudeDelta: 0.0222,
                        }}
                        showsUserLocation={true}
                    >
                        <Marker
                            coordinate={{ latitude: latitude, longitude: longitude }}
                            title={step.idPoi.name}
                            description={step.comment}
                        />
                    </MapView>
                </View>
            </View>
        )
    }

    getName(cat) {
        switch(cat) {
            case POICategory.MUSEUM:
                return "Musée";
            case POICategory.PLACE:
                return "Lieu";
            case POICategory.CHURCH:
                return "Lieu de culte";
            case POICategory.THEATRE:
                return "Salle de spectacle";
        }
    }

    render() {
        return (
            <React.Fragment>
                {this._displayStep()}
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    top: {
        flex: 1,
        margin: 5,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        
        elevation: 4,
        flexDirection: 'column',
    },
    desc: {
        flex: 1,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    name: {
        fontSize: 26,
        fontWeight: '700',
    },
    category: {
        fontSize: 20,
    },
    text: {
        padding: 10,
        fontSize: 18,
    },
    mapContainer: {
        flex: 1,
        overflow: 'hidden',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        marginRight: 10,
        marginLeft: 10,
    },
    map: {
        flex: 1,
        margin: 0,
        padding: 0,
    },
    quizz: {
        flex: 3,
    }
})

const mapStateToProps = (state) => {
    return {
        token: state.user.user.token,
        userLocation: state.user.userLocation,
    }
}

const mapDispatchToProps = { 
}
export default connect(mapStateToProps, mapDispatchToProps)(StepDetails)
