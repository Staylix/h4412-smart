import React from 'react';
import { connect } from 'react-redux'
import { View, Text, StyleSheet, ActivityIndicator, Modal, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import CheckBox from 'react-native-check-box'
import { Ionicons } from '@expo/vector-icons';

import MyText from './MyText'

import { isValidatedStep, answerQuizz } from '../api/tour'

import geolib from 'geolib'

class QuizzDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            completed: null,
            loc: false,
            locationUser: null,
            status: "",
            isLoading: false,
            selected: -1,
            quizzOpen: false,
        }
    }

    _displayCheckBox() {
        if (this.state.completed !== null) {
            return (
                <CheckBox
                    isChecked={this.state.completed}
                    onClick={() => null}
                />
            )
        }
        return (<ActivityIndicator />)
    }

    _displayModal() {
        if (this.state.status != "") {
            return (
                <Modal
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => {this.setState({ status: "" })}}
                    visible={this.state.status === "" ? false : true}
                >
                    <View style={{flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000080' }}>
                        <View style={styles.modal}>
                            <Text style={{flex: 1, fontSize: 24, color: 'white'}}>{this.state.status}</Text>
                            <TouchableNativeFeedback
                                onPress={() => {
                                    this.setState({ status: "" });
                                }} style={{flex: 1}}>
                                <View style={styles.okBtn}>
                                    <Text style={{fontSize: 40, color: 'white'}}>OK</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </Modal>
            )
        }
    }

    _validateQuizz() {
        let { userLocation } = this.props
        if (this.state.selected === -1) {
            this.setState({
                status: 'Merci de selectionner une réponse'
            });
            return
        }
        if (this.state.completed === true) {
            this.setState({
                status: "Vous avez déjà validé cette étape"
            });
            return
        }
        console.log(userLocation);
        if (!userLocation) {
            this.setState({
                status: "Vous êtes introuvable, activez le GPS si possible"
            })
            return
        }
        
        const dist = geolib.getDistance(this.props.step.idPoi.position, userLocation);
        if (dist > 100) {
            this.setState({
                status: "Veuillez vous rapprocher du lieu indiqué"
            })
            return;
        }
        answerQuizz(this.props.token, this.props.step._id, this.state.selected).then( () => {
            this.setState({
                status: "Vous avez marqué l'étape comme complétée"
            })
            this.props.toggleCheck()
        }
        )

    }

    _displayQuizz() {
        const quizz = this.props.step.idQuizz
        var answer = quizz.responses.map((response, index) => 
            <TouchableOpacity
                activeOpacity={0.9}
                key={index}
                style={styles.answerBtn}
                onPress={() => {
                    this.setState({ selected: index });
                }}>
                <View style={{backgroundColor: this.state.selected === index ? 'grey': '#f2696c', padding:10, borderRadius: 5, flex:1}}>
                    <MyText style={{color: 'white'}}>{response}</MyText>
                </View>
            </TouchableOpacity>
        )
        return (
            <View style={styles.quizz}>
                { this.props.step.idQuizz ? 
                    <TouchableOpacity 
                        activeOpacity={0.9}
                        style={styles.quizzBtn}
                        onPress={() => this.setState({ quizzOpen: !this.state.quizzOpen })}>
                        <View style={styles.showQuizz}>
                            <Ionicons name="md-list-box" size={36} color="#f2696c"/>
                            <Text style={{marginLeft: 5, fontSize: 20}}>{quizz.content}</Text>
                        </View>
                    </TouchableOpacity>
                :
                    <Text>Pas de quizz</Text>
                }

                {
                    this.state.quizzOpen ?
                        <React.Fragment>
                            <View style={styles.answerContainer}>
                                {answer}
                            </View>
                            <View style={styles.submitContainer}>
                                <TouchableOpacity
                                    style={styles.submitBtn}
                                    onPress={() => { this._validateQuizz() }}>
                                    <Text style={styles.submitTxt}>Valider</Text>
                                </TouchableOpacity>
                            </View>
                        </React.Fragment>
                    :
                        null
                }
            </View>
    )
    }

    _displayStep() {
        return (
        <View style={styles.main}>
            {this._displayModal()}
            {this._displayQuizz()}
        </View>
        )
    }

    componentDidMount() {
        isValidatedStep(this.props.token, this.props.step._id).then(
            (res) => {
                this.setState({
                    completed: res.data.validation
                })
            }
        )
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {this._displayStep()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center'
    },
    top: {
        flex: 1,
    },
    mapContainer: {
        flex: 2,
        overflow: 'hidden',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        marginRight: 10,
        marginLeft: 10,
    },
    quizz: {
        flex:1,
        margin: 5,
        padding:5,
        justifyContent: 'center',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        
        elevation: 4,
    },
    showQuizz: {
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
        color: 'black',
    },
    answerContainer: {
        flex: 3,
        flexDirection: 'column',
    },
    answerBtn: {
        flex: 1,
        alignSelf: 'stretch',
        padding: 5,
        // backgroundColor: '#f2696c',
    },
    submitContainer: {
        flex: 1,
        padding: 10,
    },
    submitBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2696c',
        borderRadius: 5,
    },
    submitTxt: {
        color: 'white',
        fontSize: 16
    },
    okBtn: { 
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
        padding: 5, 
        backgroundColor: 'grey',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },

    modal: {
        backgroundColor: '#f2696c',
        margin: 20,
        height: 300,
        borderRadius: 25,
        padding: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
})

const mapStateToProps = (state) => {
    return {
        token: state.user.user.token,
        userLocation: state.user.userLocation,
    }
}

const mapDispatchToProps = { isValidatedStep }

export default connect(mapStateToProps, mapDispatchToProps)(QuizzDetails)
