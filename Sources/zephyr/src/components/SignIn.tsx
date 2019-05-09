import React, { Component } from 'react';
import { connect } from "react-redux";
import { Box, Form, FormField, Button, Image } from 'grommet';

import { setUserState } from '../reducers/user';
import { IUser, callSignIn } from '../api/user';
import { changePage, setError, MANAGETOUR } from '../reducers/nav';

class SignIn extends Component<any> {

    signIn(user: IUser) {
        let { setUserState, changePage, setError } = this.props;

        callSignIn(user).then((response) => {
            setUserState({ ...response.data.user, token: response.data.token });
            setError({ errorType: "signInError", errorContent: "" });
            changePage(MANAGETOUR);
        }).catch((error) => {
            console.log(error);
            var errorInfo = error.message;
            var password = "403";
            var mail = "402";
            var errorMessage;

            if (errorInfo.search(password) !== -1) {
                errorMessage = 'Votre mot de passe est incorrect';
            }
            if (errorInfo.search(mail) !== -1) {
                errorMessage = 'Votre mail est inconnu';
            }

            setError({ errorType: "signInError", errorContent: errorMessage });
        });
    }

    render() {
        let { signInError } = this.props;
        var errorBoxStyle = {
            color: "#FF4040",
            fontSize: "18px",
            margin: "12px",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "10px",
            paddingBottom: "10px"
        };

        var buttonStyle = {
            color: "#F2696C",
            backgroundColor: 'white',
        }

        return (
            <Box
                direction='column'
                align='center'
                justify='between'
                pad='medium'
                style={{ backgroundImage: "linear-gradient(to bottom right, #F2696C, #EFA059)" }}
            >
                <Box style={{ height: 140, width: 140 }} margin="medium">
                    <Image
                        fit="contain"
                        src="/logo.png"
                    />
                </Box>
                <Form onSubmit={({ value }: any) => this.signIn(value)} style={{ color: "white" }} >
                    {signInError ?
                        <Box
                            id="error" style={errorBoxStyle} border={{ color: "status-error" }} round>
                            {signInError}
                        </Box>
                        : ''
                    }
                    <FormField name="email" label="Mail" required={true} />
                    <FormField type="password" name="password" label="Mot de passe" required={true} />
                    <Box align="center">
                        <Button type="submit" label="Se connecter" style={buttonStyle} />
                    </Box>

                </Form>
            </Box>
        )
    }

};

const mapStateToProps = (state: any) => {
    return {
        signInError: state.root.nav.signInError,
    }
}

const mapDispatchToProps = { setUserState, changePage, setError }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn)