import React, { Component } from 'react';
import { connect } from "react-redux";
import { Box, Heading, Button, Select, TextInput } from 'grommet';
import POIList from '../poi/POIList';
import { FormPrevious, Checkmark, Add, FormNext, Trash, Edit } from 'grommet-icons';
import { setTourPage, TOUR_CREATE, TOUR_STEPS_EDIT, setPoiIsLoading, addTour, TOUR_HOME, setMyTours } from '../../reducers/tour';
import { submitTour, setValue, setEditingTour, setIsEditing, resetEditingTour } from '../../reducers/editTour';
import { createTour, getTourById, callDeleteTourById, callGetMyToursAndSteps } from '../../api/tour';
import { createStep } from '../../api/step';
import { ToastContainer, toast } from 'react-toastify';
import POIMap from '../map/POIMap';
import { PointOfInterest } from '../../models/poi';
import { getPointOfInterest, getSomePointOfInterest } from '../../api/poi';
import Timeline from './Timeline';
import { changePage, NEWPOI } from '../../reducers/nav';
import { flexStyle, params } from '../../constants/themes';

interface IPOIListState {
    PoIs: PointOfInterest[];
    PoITypeSelected: string,
    PoITypes: string[],
}

class TourEdit extends Component<any, IPOIListState> {
    public readonly state: IPOIListState = {
        PoIs: [],
        PoITypeSelected: "Type de POI",
        PoITypes: ["Tous",
            //  "Logement", 
            // "Restaurant",
            "Musée",
            "Lieu", "Lieu de culte", "Salle de spectacle"],
    }

    componentDidMount() {
        let { user, setPoiIsLoading } = this.props;
        setPoiIsLoading(true);

        getPointOfInterest(user.token)
            .then((pois) => {
                this.setState({
                    PoIs: pois,
                });
                setPoiIsLoading(false);
            })
    }

    callgetSomePointOfInterest(keyword: string) {
        let { user, setPoiIsLoading } = this.props;
        setPoiIsLoading(true);
        if (keyword) {
            getSomePointOfInterest(user.token, keyword)
                .then((pois) => {
                    this.setState({
                        PoIs: pois,
                    });
                    setPoiIsLoading(false);
                })
        } else {
            getPointOfInterest(user.token)
                .then((pois) => {
                    this.setState({
                        PoIs: pois,
                    });
                    setPoiIsLoading(false);
                })
        }
    }

    submitTour() {
        let { user, editingTour, setTourPage, addTour, setEditingTour, myTours, setMyTours } = this.props;
        console.log("editingTour 1: ", editingTour)
        //create steps, createTour with steps,
        let stepCreate = []
        for (let step of editingTour.idsStep) {
            stepCreate.push(createStep(user.token, step));
        }
        Promise.all(stepCreate).then((steps) => {
            let stepsId = steps.map((s) => s.data.step._id);
            console.log("editingTour 2: ", editingTour)
            return createTour(user.token, {
                ...editingTour,
                idsStep: stepsId,
            });
        }).then((res) => {
            console.log("editingTour 3: ", editingTour)
            return getTourById(user.token, res.data.tour._id)
        }).then((res) => {
            console.log("editingTour 4: ", res.data.tourWithStep)
            addTour(res.data.tourWithStep);
            // let indexTour = myTours.indexOf((t) => t._id == res.data.tourWithStep._id);
            // console.log(indexTour != -1)
            // console.log(indexTour)
            // if (indexTour != -1) {
            //     myTours[indexTour] = res.data.tourWithStep;
            // } else {
            //     myTours.push(res.data.tourWithStep);
            // }
            // console.log(myTours)
            // setMyTours(myTours)
            setEditingTour(res.data.tourWithStep);
            setTourPage(TOUR_STEPS_EDIT);
        })
    }

    deleteTour() {
        let { editingTour, user, setMyTours, setTourPage } = this.props;
        callDeleteTourById(user.token, editingTour._id).then((response) => {
            callGetMyToursAndSteps(user.token)
                .then((response) => {
                    setMyTours(response.data.tours);
                    setTourPage(TOUR_HOME)
                }).catch((error) => {
                    console.log(error);
                });
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        let { setTourPage, editingTour, changePage, keyword, isEditing, setIsEditing, resetEditingTour } = this.props;
        let { PoITypes, PoITypeSelected } = this.state;

        console.log("editingTour 0: ", editingTour)


        return (
            <Box {...params.page as any}>
                <POIMap
                    tour={editingTour} PoIs={isEditing ? this.state.PoIs : null}
                />
                <Box direction="column" justify="between" style={{ height: '100vh' }}>
                    <Box background="white" pad={{ top: 'small', horizontal: 'small' }} round="medium" style={{ zIndex: 5 }}
                    >
                        {isEditing ?
                            <Box {...params.head as any}>
                                <Box>
                                    <Button
                                        icon={<FormPrevious color="#F2696C" />}
                                        onClick={() => setTourPage(TOUR_CREATE)}
                                        label="Informations générales"
                                        style={{ backgroundColor: "white" }}
                                    />
                                </Box>
                                <Box>
                                    <Button
                                        icon={<Add color="#F2696C" />}
                                        onClick={() => changePage(NEWPOI)}
                                        label="Ajouter un POI"
                                        style={{ backgroundColor: "white" }}
                                    />
                                </Box>
                                <Box>
                                    <Button
                                        onClick={() => this.submitTour()}
                                        icon={<FormNext color="#F2696C" />}
                                        reverse={true}
                                        label="Détail des étapes"
                                        style={{ backgroundColor: "white" }}
                                    />
                                </Box>
                            </Box>
                            :
                            <Box {...params.head as any}>
                                <Box>
                                    <Button
                                        icon={<FormPrevious color="#F2696C" />}
                                        onClick={() => { setTourPage(TOUR_HOME); resetEditingTour(); }}
                                        label="Retour"
                                        style={{ backgroundColor: "white" }}
                                    />
                                </Box>
                                <Box>
                                    <Button
                                        icon={<Edit color="#F2696C" />}
                                        onClick={() => setIsEditing(true)}
                                        label="Modifier le parcours"
                                        style={{ backgroundColor: "white" }}
                                    />
                                </Box>
                                <Box>
                                    <Button
                                        onClick={() => this.deleteTour()}
                                        icon={<Trash color="#F2696C" />}
                                        label="Supprimer"
                                        style={{ backgroundColor: "white" }}
                                    />
                                </Box>
                            </Box>
                        }
                    </Box>
                    {isEditing &&
                        <Box background="white" style={{ height: '40vh', width: '35vw', zIndex: 5 }} alignContent="start"
                            round="medium">
                            <Box pad={{ top: 'small', bottom: 'small', horizontal: 'small' }}
                                direction="row" elevation="small" round="medium"
                            >
                                <Box style={{ flex: 2 }}>
                                    <Select
                                        options={PoITypes}
                                        value={PoITypeSelected}
                                        onChange={({ option }) => this.setState({ ...this.state, PoITypeSelected: option })}
                                    />
                                </Box>
                                <Box style={{ flex: 3 }}>
                                    <TextInput
                                        placeholder="Recherche"
                                        value={keyword}
                                        onChange={event => this.callgetSomePointOfInterest(event.target.value)}
                                    />
                                </Box>
                            </Box>
                            <Box style={flexStyle}>
                                <POIList PoIs={this.state.PoIs} PoIType={this.state.PoITypeSelected} />
                            </Box>
                        </Box>
                    }
                    <Box style={{ zIndex: 5 }}
                    >
                        <Box style={{ height: 140, overflowX: "auto", overflowY: "auto" }}>
                            <Timeline anchor='center' poiOrStep='poi' />
                        </Box>
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
        isEditing: state.root.editTour.isEditing,
        myTours: state.root.tour.myTours,
    }
}

const mapDispatchToProps = {
    setTourPage,
    submitTour,
    setValue,
    changePage,
    setEditingTour,
    setPoiIsLoading,
    addTour,
    setIsEditing,
    resetEditingTour,
    setMyTours,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TourEdit)