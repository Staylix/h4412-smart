import React, { Component } from 'react';
import { connect } from "react-redux";
import { Box, Heading, Button, Select, TextArea, Form, FormField } from 'grommet';
import POIList from '../poi/POIList';
import { FormPrevious, Checkmark, CloudUpload } from 'grommet-icons';
import { setTourPage, TOUR_HOME, TOUR_CREATE, TOUR_EDIT } from '../../reducers/tour';
import { submitTour, editStep, setStepValue, setStepCommentValue, changeQuizzLoaded, resetEditingTour } from '../../reducers/editTour';
import { createTour } from '../../api/tour';
import { createStep, callEditStep } from '../../api/step';
import { ToastContainer, toast } from 'react-toastify';
import POIMap from '../map/POIMap';
import { PointOfInterest, IPointOfInterest } from '../../models/poi';
import { getPointOfInterest } from '../../api/poi';
import Timeline from './Timeline';
import QuizzCreate from './QuizzCreate';
import { Quizz } from '../../models/quizz';
import { IStep } from '../../models/step';
import { getQuizz, editQuizz } from '../../api/quizz';
import { flexStyle, params } from '../../constants/themes';

interface IStepsEditState {
}

class StepsEdit extends Component<any, IStepsEditState> {
    constructor(props) {
        super(props)
    }

    _shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    _editStep() {
        let { user, editStep, focusedStep } = this.props;

        // const goodAnswer = focusedStep.idQuizz.responses.response1;
        // let responses = [focusedStep.idQuizz.responses.response1, focusedStep.idQuizz.responses.response2, focusedStep.idQuizz.responses.response3, focusedStep.idQuizz.responses.response4]
        // responses = this._shuffle(responses)

        callEditStep(user.token, focusedStep)
            .then((response) => {
                console.log(response)
                editQuizz(user.token, focusedStep.idQuizz)
                    .then((res) => console.log(res))
            })
    }

    render() {
        let { setTourPage, editingTour, focusedStep, setStepCommentValue, resetEditingTour } = this.props;

        return (
            <Box {...params.page as any}>
                <Box {...params.head as any}>
                    <Box>
                        <Button
                            icon={<FormPrevious color="#F2696C" />}
                            onClick={() => setTourPage(TOUR_EDIT)}
                            label="Retour"
                            alignSelf="center"
                        />
                    </Box>
                    {focusedStep &&
                        <Box animation="slideLeft">
                            <Heading margin="none" level="3">
                                {focusedStep.idPoi.name}
                            </Heading>
                        </Box>
                    }
                    <Box>
                        <Button
                            icon={<Checkmark color="#F2696C" />}
                            onClick={() => { setTourPage(TOUR_HOME); resetEditingTour() }}
                            label="Terminer"
                            reverse
                            alignSelf="center"
                        />
                    </Box>
                </Box>

                <Box direction="row" pad="medium">
                    <Box align="center" style={{ height: '100%', width: '210px', overflowX: 'scroll' }} >
                        <Timeline anchor='vertical' poiOrStep='step' />
                    </Box>
                    <Box style={{ flex: 3, overflow: 'scroll' }} align="center">
                        {focusedStep ?
                            <Box background="white" round="medium" elevation="medium"
                                align="center"
                                width="large"
                                margin={{ horizontal: "medium", vertical: "small" }}
                                pad={{ horizontal: "medium", vertical: "small" }}
                            >
                                <Box width="large" height="medium">
                                    <Heading margin="small" level="4">Description de l'étape</Heading>
                                    <TextArea fill
                                        placeholder="Description de l'étape"
                                        value={focusedStep.comment}
                                        onChange={(event) => setStepCommentValue({ type: "comment", value: event.target.value })}
                                        style={{ background: "white" }}
                                    />
                                </Box>
                                <QuizzCreate />
                                <Box direction="row" justify="between"
                                    margin={{ horizontal: "medium", top: "none", bottom: "medium" }}>
                                    <Button
                                        icon={<CloudUpload color="#F2696C" />}
                                        onClick={() => this._editStep()}
                                        label="Enregistrer"
                                        reverse
                                        alignSelf="center"
                                    />
                                </Box>
                            </Box>
                            :
                            <Box background="white" round="small" margin="small" pad="small" align="center">
                                <Heading level="5">Sélectionnez une étape sur la gauche</Heading>
                            </Box>
                        }
                    </Box>
                </Box>
            </Box>

        )
    }



};

const mapStateToProps = (state) => {
    return {
        user: state.root.user.user,
        editingTour: state.root.editTour.editingTour,
        focusedStep: state.root.editTour.focusedStep
    }
}

const mapDispatchToProps = {
    setTourPage,
    submitTour,
    editStep,
    setStepValue,
    setStepCommentValue,
    changeQuizzLoaded,
    resetEditingTour
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StepsEdit)