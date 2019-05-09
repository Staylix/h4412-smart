import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Heading, Box } from 'grommet';

import { callGetMyToursAndSteps } from '../../api/tour';
import TourListItem from './TourListItem';
import { setMyTours } from '../../reducers/tour';

class MyTourList extends Component<any> {

    getMyTours() {
        let { user, setMyTours } = this.props;
        if (user.token) {
            callGetMyToursAndSteps(user.token)
                .then((response) => {
                    setMyTours(response.data.tours);
                }).catch((error) => {
                    console.log(error);
                });
        }
    }

    componentDidMount() {
        let { myTours } = this.props;
        if (Object.keys(myTours).length == 0)
            this.getMyTours();
    }

    render() {
        let { myTours } = this.props;

        let listTours = myTours.map((tour: any, index: number) =>
            <TourListItem
                key={index}
                tour={tour}
                my={true}
            />
        );

        return (
            <Box fill 
            style={{ overflowY: "auto" }}
            round="medium"
            >
                {listTours}
            </Box>
        )
    };
}


const mapStateToProps = (state: any) => {
    return {
        user: state.root.user.user,
        myTours: state.root.tour.myTours
    }
}

const mapDispatchToProps = { setMyTours }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyTourList)