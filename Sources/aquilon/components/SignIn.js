import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, TextInput, Image, KeyboardAvoidingView, Button } from 'react-native'

import MyText from './MyText'
import { callSignIn } from '../api/user'
import { setUserState } from '../store/reducers/user'

class SignIn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            error: "",
        }
    }

    _signIn() {
        const user = {
            email: this.state.username,
            password: this.state.password,
        };
        let { setUserState } = this.props;

        callSignIn(user).then((response) => {
            this.setState({error: ""})
            setUserState({ ...response.data.user, token: response.data.token });
            this.props.navigation.navigate('TourList')
        }).catch((error) => {
            if (error === undefined || error.response === undefined) {
                this.setState({error: 'Une erreur est survenue.'})
                return;
            }
            if (error.response.status == 402) {
                this.setState({error: 'Votre mail est inconnu'})
            }
            else if (error.response.status == 403) {
                this.setState({error: 'Votre mot de passe est incorrect'})
            }
        });
    }

    _displayError() {
        if (this.state.error != "") {
            return (
                <View style={styles.errorView}>
                    <MyText style={styles.error}>{this.state.error}</MyText>
                </View>
            )
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.main} behavior="padding">
                <View style={styles.imageView}>
                    <Image source={require('../images/logo.png')} style={styles.image} />
                </View>
                {this._displayError()}
                <View style={styles.container}>
                    <TextInput
                        autoCorrect={false}
                        value={this.state.username}
                        style={styles.textInput}
                        placeholder="Mail"
                        onChangeText={(text) => this.setState({username: text})}
                    />
                    <TextInput
                        autoCorrect={false}
                        value={this.state.password}
                        style={styles.textInput}
                        placeholder="Mot de passe"
                        onChangeText={(text) => this.setState({password: text})}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.buttonView}>
                    <Button
                        color= '#F2696C'
                        title="Se connecter"
                        onPress={() => this._signIn()}
                    />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
    },
    imageView: {
        width: 350,
        flex: 1,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 4,
        marginTop: 20,
        marginBottom: 50,
        backgroundColor: "#F2F2F2",
        width: 350,
        maxHeight: 200,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    textInput: {
        textAlign: 'center',
        width: 200,
        borderBottomWidth: 1,
        borderColor: '#F2696C',

    },
    buttonView: {
        flex: 1.5
    },
    errorView: {
        flex: 1,
        maxHeight: 40,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 24,
        borderColor: '#F2696C',
        borderWidth: 2,
        marginTop: 20,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    error: {
        color: '#F2696C',
        fontWeight: 'bold'
    }
})

const mapStateToProps = (state) => {
    return {
        token: state.user.token,
    }
}

const mapDispatchToProps = { setUserState }


export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
