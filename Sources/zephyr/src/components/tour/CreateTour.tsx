import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextInput, Box, Button, Heading, Text, Calendar, TextArea, Form, FormField, DropButton } from 'grommet';
import { setValue, setIsEditing } from '../../reducers/editTour';
import { setTourPage, TOUR_HOME, TOUR_EDIT } from '../../reducers/tour';
import { FormNext, FormPrevious, FormDown } from 'grommet-icons';
import { flexStyle, params } from '../../constants/themes';

class CreateTour extends Component<any> {
    state = { date: undefined, open: undefined };

    onClose = () => {
        this.setState({ open: false });
        setTimeout(() => this.setState({ open: undefined }), 1);
    };

    onSelect = date => this.setState({ date, open: false });

    render() {
        let { setValue, editingTour, setTourPage, setIsEditing } = this.props;
        const { date, open } = this.state;

        let animationName: any = {
            "type": "slideDown",
            "delay": 0,
            "duration": 200,
            "size": "large"
        }
        let nameDisplay = editingTour.name.split('').map(
            (letter, index) =>
                <Box animation={animationName} key={index}>
                    {letter == ' ' ?
                        <Box style={{ height: "18px", width: "18px" }}></Box>
                        :
                        <Heading margin='none' level="3">{letter}</Heading>
                    }
                </Box>
        )

        return (
            <Box  {...params.page as any}>
                <Form onSubmit={() => { setIsEditing(true); setTourPage(TOUR_EDIT) }} >
                    <Box {...params.head as any} >
                        <Box>
                            <Button
                                icon={<FormPrevious color="#F2696C" />}
                                onClick={() => setTourPage(TOUR_HOME)}
                                label="Annuler"
                                alignSelf="center"
                            />
                        </Box>
                        <Box direction="row">
                            {nameDisplay.length > 0
                                ? nameDisplay
                                : <Heading margin="none" level="3">Création d'un parcours</Heading>
                            }
                        </Box>
                        <Box>
                            <Button
                                type="submit"
                                icon={<FormNext color="#F2696C" />}
                                reverse={true}
                                label="Etapes"
                                alignSelf="center"
                            />
                        </Box>
                    </Box>
                    <Box
                        direction="row"
                        align="center"
                        alignContent="start"
                        justify="start"
                        margin={{ vertical: "small", top: "small", bottom: "none" }}
                    >

                        <Box style={flexStyle} margin={{ vertical: "small", horizontal: "small" }} pad="medium" gap="medium">
                            <FormField>
                                <TextInput
                                    required={true}
                                    placeholder="Nom du parcours"
                                    value={editingTour.name}
                                    style={{ background: "white" }}
                                    onChange={event => setValue({ type: "name", value: event.target.value })}
                                />
                            </FormField>
                            <FormField>
                                <TextArea
                                    required={true}
                                    placeholder="Description du parcours"
                                    value={editingTour.description}
                                    onChange={event => setValue({ type: "description", value: event.target.value })}
                                />
                            </FormField>
                        </Box>
                        <Box style={flexStyle}>
                            <Box
                            >
                                <DropButton
                                    open={open}
                                    onClose={() => this.setState({ open: false })}
                                    onOpen={() => this.setState({ open: true })}
                                    dropContent={<Calendar date={date} onSelect={this.onSelect} />}
                                >
                                    <Box direction="row" gap="medium" align="center" pad="small">
                                        <Text>
                                            {date ? new Date(date).toLocaleDateString() : "Date limite de validation"}
                                        </Text>
                                        <FormDown color="brand" />
                                    </Box>
                                </DropButton>
                            </Box>
                        </Box>
                    </Box>
                </Form>
            </Box>
        );
    }


}

const mapStateToProps = (state) => {
    return {
        editingTour: state.root.editTour.editingTour,
    }
}

const mapDispatchToProps = {
    setValue,
    setTourPage,
    setIsEditing,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateTour)