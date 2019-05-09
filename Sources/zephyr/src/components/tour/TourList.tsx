import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Heading, Box } from 'grommet';

import { callGetTours } from '../../api/tour';
import TourListItem from './TourListItem';

interface IState {
    tours: [],
}
class TourList extends Component<any, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            tours: [],
        }
    }

    getTours() {
        let { user } = this.props;
        callGetTours(user.token).then((response) => {
            this.setState({
                tours: response.data.tours
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    componentDidMount() {
        this.getTours();
    }

    render() {
        const { tours } = this.state;

        let listTours = this.state.tours.map((tour: any, index: number) =>
            <TourListItem
                key={index}
                tour={tour}
                my={false}
            />
        );

        return (
            <Box fill
                style={{ overflowY: "auto" }}
            >
                {listTours}
            </Box>
        )
    };
}


const mapStateToProps = (state: any) => {
    return {
        user: state.root.user.user,
    }
}

const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TourList)