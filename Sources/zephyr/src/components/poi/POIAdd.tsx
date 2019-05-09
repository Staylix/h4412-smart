import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'grommet';
import { Add } from 'grommet-icons';
import { addStep } from '../../reducers/editTour';



class POIAdd extends Component<any> {

    render() {
        let { addStep, poi } = this.props;
        return (
            <Button
                margin="small"
                onClick={() => { addStep(JSON.parse(JSON.stringify(poi))) }}>
                <Add />
            </Button>
        )
    }
}
const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = { addStep }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(POIAdd)