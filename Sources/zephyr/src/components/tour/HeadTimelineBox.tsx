import React, { Component } from 'react';
import { Box } from 'grommet';
import { connect } from 'react-redux';

interface IHeadTimelineBoxProps {
    id: string,
}

class HeadTimelineBox extends Component<IHeadTimelineBoxProps, any> {
    render() {
        const boxStyle = {
            height: '80px',
            width: '80px',
            fontSize: '20px',
            color: "white"
        }

        return (
            <Box style={boxStyle}
                id={this.props.id}
                align="center"
                justify="center"
                pad="large"
                background="brandPink"
                round="xlarge"
                margin="small"
                elevation="medium"
            >
                Début
            </Box>
        )
    }
}

const mapStateToProps = (state: object) => {
    return {
    }
}

const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeadTimelineBox)