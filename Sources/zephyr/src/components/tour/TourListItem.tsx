import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Box, Heading, Paragraph, Meter, Stack, Button } from 'grommet';
import { setCurrentTour, setTourPage, TOUR_DISPLAY, TOUR_EDIT, setMyTours, TOUR_CREATE } from '../../reducers/tour';
import { Edit, Trash } from 'grommet-icons';
import { setEditingTour, setIsEditing } from '../../reducers/editTour';
import { callDeleteTourById, callGetMyToursAndSteps } from '../../api/tour';

class ToursListItem extends Component<any> {
    constructor(props) {
        super(props);
        this.openTour = this.openTour.bind(this);
    }

    openTour() {
        let { setCurrentTour, setTourPage, tour } = this.props;
        setCurrentTour(tour);
        setTourPage(TOUR_DISPLAY);
    }

    deleteTour() {
        let { tour, user, setMyTours } = this.props;
        callDeleteTourById(user.token, tour._id).then((response) => {
            callGetMyToursAndSteps(user.token)
                .then((response) => {
                    setMyTours(response.data.tours);
                }).catch((error) => {
                    console.log(error);
                });
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        let { tour, my, setEditingTour, setTourPage, setIsEditing } = this.props;

        let nbCompletedSteps: number = Math.round(Math.random() * 10 * 10) / 10 // TODO tour.nbCompletedSteps;
        let nbSteps: number = 10 // TODO tour.nbSteps;
        let progress = nbCompletedSteps / nbSteps * 100;
        let colorMeter;
        if (progress > 66) colorMeter = "brandBlue";
        else if (progress > 33) colorMeter = "brandOrange";
        else colorMeter = "brandPink";
        let label = String(nbCompletedSteps + " / " + nbSteps);

        return (
            <div style={{ display: "block" }}>
                <Box direction='row' margin="small" round="medium" alignContent="center" justify="between"
                    background="white"
                    elevation="medium"
                    pad={{ vertical: "medium", horizontal: "large" }}
                    style={{ cursor: "pointer" }}
                    onClick={() => { setIsEditing(false); setEditingTour(tour); setTourPage(TOUR_EDIT) }}
                >
                    <Box>
                        <Heading level="3">{tour.name}</Heading>
                        <Paragraph>{tour.description}</Paragraph>
                    </Box>
                    {my ?
                        <Box direction="row">
                            <Box direction="row" pad="small" alignContent="end" align="center">
                                <Button
                                    icon={<Edit />}
                                    color="white"
                                    onClick={() => { setIsEditing(true); setEditingTour(tour); setTourPage(TOUR_CREATE) }}
                                ></Button>
                                <Button
                                    icon={<Trash />}
                                    color="white"
                                    onClick={() => this.deleteTour()}
                                ></Button>
                            </Box>
                            {/* <Box >
                                <Stack anchor="center">
                                    <Meter
                                        round={true}
                                        type="circle"
                                        size="small"
                                        thickness="medium"
                                        values={[{ value: progress, label: label, color: colorMeter }]}
                                    >
                                    </Meter>
                                    <Box direction="row" align="center" pad={{ bottom: "xsmall" }}>
                                        <Heading level="3" margin="small">
                                            {nbCompletedSteps}
                                        </Heading>
                                        <Heading level="5" >
                                            {"/ " + nbSteps}
                                        </Heading>
                                    </Box>
                                </Stack>
                            </Box> */}
                        </Box>
                        :
                        <Box>
                            <Heading level="4">
                                <span style={{ color: "#aaaaaa" }}>Par : </span>{tour.idAuthor.firstName + " " + tour.idAuthor.lastName}
                            </Heading>
                        </Box>
                    }
                </Box>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: state.root.user.user,
    }
}

const mapDispatchToProps = { setCurrentTour, setTourPage, setEditingTour, setMyTours, setIsEditing }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ToursListItem)