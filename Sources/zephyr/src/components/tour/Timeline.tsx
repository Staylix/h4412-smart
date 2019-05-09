import React, { Component } from 'react';
import { Stack, Diagram, Box } from 'grommet';
import TimelineBox from './TimelineBox';
import { connect } from 'react-redux';
import HeadTimelineBox from './HeadTimelineBox';



class Timeline extends Component<any> {

    isFirst(stepId) {
        let { editingTour } = this.props;
        let index = editingTour.idsStep.findIndex((s) => s._id === stepId);
        return index === 0;
    }

    isLast(stepId) {
        let { editingTour } = this.props;
        let index = editingTour.idsStep.findIndex((s) => s._id === stepId);
        return index === editingTour.idsStep.length - 1;
    }

    render() {
        let { editingTour, anchor, poiOrStep } = this.props;
        const connections = [];
        let diagramItems = [];
        diagramItems.push(
            <HeadTimelineBox id="1" key="header"></HeadTimelineBox>
        )
        if (Object.getOwnPropertyNames(editingTour).length > 0) {
            diagramItems.push(...editingTour.idsStep.map((step, index) => {
                connections.push({
                    fromTarget: String(index + 1),
                    toTarget: String(index + 2),
                    type: 'rectilinear',
                    color: 'black',
                    anchor: anchor
                })
                return (
                    <TimelineBox
                        isLast={this.isLast(step._id)} isFirst={this.isFirst(step._id)}
                        id={String(index + 2)} key={step._id} step={step}
                        poiOrStep={poiOrStep}
                    />
                );
            }));
        }

        return (
            <Stack guidingChild={1}>
                <Diagram connections={connections} />
                <Box
                    direction="row"
                    alignContent="center"
                    justify="center"
                    wrap={true}>
                    {diagramItems}
                </Box>
            </Stack>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        editingTour: state.root.editTour.editingTour,
    }
}

const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Timeline)