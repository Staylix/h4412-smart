import React, { Component } from 'react';
import { Box, Button } from 'grommet';
import { connect } from 'react-redux';
import TourListItem from './TourListItem';
import POIMap from '../map/POIMap';
import { setTourPage, TOUR_HOME, TOUR_EDIT, TOUR_CREATE } from '../../reducers/tour';
import { FormPrevious, Duplicate } from 'grommet-icons';
import { setEditingTour, setIsEditing } from '../../reducers/editTour';

class TourDisplay extends Component<any, any> {

    forkTour() {
        let { tour, setTourPage, setEditingTour, setIsEditing } = this.props;

        let newTour = tour;
        delete newTour._id;
        newTour.name = tour.name + " (copie)";
        setIsEditing(true);
        setEditingTour(newTour);
        setTourPage(TOUR_CREATE)
    }

    render() {
        let { tour, setTourPage } = this.props;

        return (
            <Box direction="row">
                <Box>
                    <Button
                        icon={<FormPrevious color="#F2696C" />}
                        onClick={() => setTourPage(TOUR_HOME)}
                        label="Retour"
                        alignSelf="start"
                    />
                    <TourListItem
                        tour={tour}
                        my={true}
                    />
                    <Box>
                        <Button
                            alignSelf="center"
                            icon={<Duplicate color="#F2696C" />}
                            label="Créer un nouveau parcours à partir de celui-ci"
                            onClick={() => { this.forkTour() }}
                        />
                    </Box>
                </Box>
                <Box>
                    <POIMap tour={tour}></POIMap>
                </Box>
            </Box>
        )
    }
}
const mapStateToProps = (state: any) => {
    return {
        tour: state.root.tour.currentTour
    }
}

const mapDispatchToProps = { setTourPage, setEditingTour, setIsEditing }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TourDisplay)