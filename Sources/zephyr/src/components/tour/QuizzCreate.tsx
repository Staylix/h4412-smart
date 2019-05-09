import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, FormField, Select, TextInput, Heading } from 'grommet';
import { setQuizzValue, setQuizzResponseValue, setStepValue, changeQuizzLoaded, changeFocusedStepChanging } from '../../reducers/editTour';
import { getQuizz } from '../../api/quizz';
import ReactLoading from 'react-loading';
import { flexStyle } from '../../constants/themes';


class QuizzCreate extends Component<any> {

    onStepFocusedChange() {
        let { user, focusedStep, setStepValue, changeQuizzLoaded, changeFocusedStepChanging } = this.props

        if (focusedStep) {
            if (typeof focusedStep.idQuizz == "string") {
                getQuizz(user.token, focusedStep.idQuizz)
                    .then((res) => {
                        setStepValue({ type: 'idQuizz', step: focusedStep, value: res.data })
                        changeQuizzLoaded(true)
                    })
            } else {
                changeQuizzLoaded(true)
            }
        }
    }

    render() {
        let { setQuizzValue, focusedStep, setQuizzResponseValue, quizzLoaded, focusedStepChanging, changeFocusedStepChanging } = this.props

        if (focusedStepChanging) {
            this.onStepFocusedChange()
            changeFocusedStepChanging(false);
        }

        return (
            <Box style={{ height: '76vh', width: '100%' }}
                direction="column"
                align="center"
                margin={{ top: "medium" }}
            >
                <Box>
                    <Heading margin="none" level="4">Question de validation</Heading>
                </Box>
                {
                    quizzLoaded ?
                        <Box
                            direction="column"
                            alignContent="start"
                            justify="start"
                        >
                            <Box margin={{ vertical: "small", horizontal: "small" }}>
                                <TextInput name="content" placeholder="Question" style={{ background: "white" }}
                                    value={focusedStep.idQuizz.content} onChange={(event) => setQuizzValue({ type: "content", value: event.target.value })}
                                />
                                <Box direction="row">
                                    <Box style={flexStyle}>
                                        <Box background="status-ok" pad="small">
                                            <TextInput name="response1" placeholder="Bonne réponse" style={{ background: "white", color: 'black' }}
                                                value={focusedStep.idQuizz.responses[0]} onChange={(event) => setQuizzResponseValue({ index: 0, value: event.target.value })}
                                            />
                                        </Box>
                                        <Box background="status-error" pad="small">
                                            <TextInput name="response2" placeholder="Mauvaise réponse" style={{ background: "white", color: 'black' }}
                                                value={focusedStep.idQuizz.responses[1]} onChange={(event) => setQuizzResponseValue({ index: 1, value: event.target.value })}
                                            />
                                        </Box>
                                    </Box>
                                    <Box style={flexStyle}>
                                        <Box background="status-error" pad="small">
                                            <TextInput name="response3" placeholder="Mauvaise réponse" style={{ background: "white", color: 'black' }}
                                                value={focusedStep.idQuizz.responses[2]} onChange={(event) => setQuizzResponseValue({ index: 2, value: event.target.value })}
                                            />
                                        </Box>
                                        <Box background="status-error" pad="small">
                                            <TextInput name="response4" placeholder="Mauvaise réponse" style={{ background: "white", color: 'black' }}
                                                value={focusedStep.idQuizz.responses[3]} onChange={(event) => setQuizzResponseValue({ index: 3, value: event.target.value })}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                                {/* <FormField
                                    label="Bonne réponse"
                                    name="answer"
                                    htmlFor="answerFormId"
                                >
                                    <Select
                                        options={['1', '2', '3', '4']}
                                        placeholder="Indiquez la bonne réponse"
                                        onChange={(value) => { (document.getElementById("answerFormId") as HTMLInputElement).value = value }}
                                        dropAlign={{ bottom: "top" }}
                                    />
                                </FormField> */}

                            </Box>
                        </Box>
                        :
                        <Box align='center'>
                            <ReactLoading type={'spin'} color={'#F2696C'} height={'15%'} width={'15%'} />
                        </Box>
                }
            </Box>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.root.user.user,
        focusedStep: state.root.editTour.focusedStep,
        quizzLoaded: state.root.editTour.quizzLoaded,
        focusedStepChanging: state.root.editTour.focusedStepChanging,
    }
}

const mapDispatchToProps = { setQuizzValue, setQuizzResponseValue, setStepValue, changeQuizzLoaded, changeFocusedStepChanging }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuizzCreate)