import React, { Component } from 'react';
import { connect } from "react-redux";
import { Box, Form, FormField, Button, Image } from 'grommet';

import { setUserState } from '../reducers/user';
import { IUser, callSignUp } from '../api/user';
import { changePage, SIGNIN, setError } from '../reducers/nav';

interface IState {
    localFirstName: string,
    localLastName: string,
    usernameLocal: string;
}

class SignUp extends Component<any, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            localFirstName: "",
            localLastName: "",
            usernameLocal: ""
        }
    }

    signUp(user: IUser) {
        let { setUserState, changePage, setError } = this.props;

        callSignUp(user).then((response) => {
            // TODO setUserState(response.data);
            setError({ errorType: "signUpError", errorContent: "" });
            changePage(SIGNIN);
        }).catch((error) => {
            console.log(error);
            var doublon = "500";
            var errorInfo = error.message;
            var errorMessage;

            if (errorInfo.search(doublon) !== -1) {
                errorMessage = 'Votre mail est déjà utilisé';
            }
            setError({ errorType: "signUpError", errorContent: errorMessage });
        });
    }

    editUsername(target: any) {
        // console.log(target);
        // let newState: IState = this.state;
        // newState[target.name] = target.value
        // newState.usernameLocal = this.state.localFirstName[0].toLowerCase + this.state.localLastName.toLowerCase
        // this.setState({
        //     newState
        // })
    }

    render() {
        let { signUpError } = this.props;
        let { usernameLocal } = this.state;

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
                style={{ backgroundImage: "linear-gradient(to top left, #F2696C, #EFA059)" }}
            >
                <Box style={{ height: 140, width: 140 }} margin="small">
                    <Image
                        fit="contain"
                        src="/logo.png"
                    />
                </Box>
                <Form onSubmit={({ value }: any) => this.signUp(value)} style={{ color: "white" }}
                // onChange={(event: any) => this.editUsername(event.target)}
                >
                    {signUpError ?
                        <Box style={errorBoxStyle} id="error" border={{ color: "status-error" }} round>
                            {signUpError}
                        </Box>
                        : ''
                    }
                    <FormField name="firstName" label="Prénom" required={true} />
                    <FormField name="lastName" label="Nom" required={true} />
                    <FormField name="email" label="Mail" type="email" required={true} />
                    {/* <Heading level="6">{this.state.usernameLocal}</Heading> */}
                    <FormField type="password" name="password" label="Mot de passe" required={true} />
                    <Box align="center">
                        <Button type="submit" label="S'inscrire" style={buttonStyle} />
                    </Box>

                </Form>
            </Box>
        )
    }

};

const mapStateToProps = (state: any) => {
    return {
        signUpError: state.root.nav.signUpError,
    }
}

const mapDispatchToProps = { setUserState, changePage, setError }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp)