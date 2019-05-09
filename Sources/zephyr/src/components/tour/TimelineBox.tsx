import React, { Component } from 'react';
import { Box, Button } from 'grommet';
import { connect } from 'react-redux';
import { FormPrevious, Trash, FormNext } from 'grommet-icons';
import { shiftStepLeft, shiftStepRight, removeStep, onPOIFocus, onStepFocus } from '../../reducers/editTour';

class TimelineBox extends Component<any> {

    shiftLeft() {
        let { shiftStepLeft } = this.props;
        shiftStepLeft(this.props.step);
    }

    shiftRight() {
        let { shiftStepRight } = this.props;
        shiftStepRight(this.props.step);
    }

    remove() {
        let { removeStep } = this.props;
        removeStep(this.props.step);
    }

    render() {
        let { step, onPOIFocus, onStepFocus, poiOrStep, focusedStep } = this.props

        const boxStyle = {
            height: '120px',
            width: '170px',
            fontSize: '16px',
            color: "white",
            cursor: "pointer",
            backgroundColor: "#F2696C",
            border: "2px solide white",
        }
        const boxStyleFocused = {
            height: '120px',
            width: '170px',
            fontSize: '16px',
            color: "#F2696C",
            cursor: "pointer",
            backgroundColor: "white",
            border: "2px solide #F2696C",
        }

        let style;
        let color;
        if (poiOrStep === "step" && focusedStep && focusedStep._id === step._id) {
            color = "#F2696C";
            style = boxStyleFocused;
        } else {
            style = boxStyle;
            color = "white";
        }

        return (
            <Box
                onClick={() => { if (poiOrStep == 'poi') onPOIFocus(JSON.parse(JSON.stringify(step.idPoi))); else onStepFocus(step); }}
                style={style}
                id={this.props.id}
                direction="column"
                align="center"
                justify="between"
                pad="small"
                background="brandPink"
                round="small"
                margin="small"
                elevation="medium"
            >
                <Box>{step.idPoi.name}</Box>
                <Box
                    direction="row"
                    justify="between">
                    {!this.props.isFirst &&
                        <Button
                            icon={<FormPrevious color={color} />}
                            onClick={() => this.shiftLeft()}></Button>
                    }
                    <Button
                        icon={<Trash color={color} />}
                        onClick={() => this.remove()}
                    ></Button>
                    {!this.props.isLast &&
                        <Button
                            icon={<FormNext color={color} />}
                            onClick={() => this.shiftRight()}
                        ></Button>
                    }
                </Box>
            </Box>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        focusedStep: state.root.editTour.focusedStep
    }
}

const mapDispatchToProps = {
    shiftStepLeft,
    shiftStepRight,
    removeStep,
    onPOIFocus,
    onStepFocus,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimelineBox)