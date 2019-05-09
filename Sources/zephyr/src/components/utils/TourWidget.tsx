import React, { Component } from 'react';
import { Text, Box } from 'grommet';
import { connect } from 'react-redux';

class TourWidget extends Component<any> {

    render() {
        let { tour } = this.props

        return (
            <Box><Text>{tour.name}</Text></Box>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.root.user.user,
    }
}

const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TourWidget)