import React, { Component } from 'react';
import { connect } from "react-redux";
import { Box } from 'grommet';

import { TOUR_HOME, TOUR_DISPLAY, TOUR_CREATE, TOUR_EDIT, TOUR_STEPS_EDIT } from '../reducers/tour';
import TourDisplay from './tour/TourDisplay';
import CreateTour from './tour/CreateTour';
import TourHome from './tour/TourHome';
import TourEdit from './tour/TourEdit';
import StepsEdit from './tour/StepsEdit';
import { params } from '../constants/themes';

class ManageTour extends Component<any, any> {

    render() {
        let { tourPage } = this.props;
        let tourPageComponent;
        switch (tourPage) {
            case TOUR_HOME: {
                tourPageComponent = <TourHome />
                break;
            }
            case TOUR_DISPLAY: {
                tourPageComponent = <TourDisplay />
                break;
            }
            case TOUR_CREATE: {
                tourPageComponent = <CreateTour />
                break;
            }
            case TOUR_EDIT: {
                tourPageComponent = <TourEdit />
                break;
            }
            case TOUR_STEPS_EDIT: {
                tourPageComponent = <StepsEdit />
                break;
            }
            default: {
                tourPageComponent = <div />
            }
        }
        return (
            <Box {...params.masterPage as any}>
                {tourPageComponent}
            </Box>
        )
    }
};

const mapStateToProps = (state: any) => {
    return {
        tourPage: state.root.tour.tourPage,
    }
}

const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageTour)