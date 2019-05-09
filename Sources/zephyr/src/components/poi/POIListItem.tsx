import React, { Component } from 'react';
import { Box, Text, Heading } from 'grommet';
import { connect } from 'react-redux';
import { PointOfInterest } from '../../models/poi';
import POICategoryWidget from './POICategoryWidget';
import POIAdd from './POIAdd'
import { onPOIFocus } from '../../reducers/editTour';

interface POIListItemProps {
    poi: PointOfInterest,
    key: string,
    onPOIFocus: any
}

class POIListItem extends Component<any, any> {

    render() {
        let { poi, onPOIFocus } = this.props

        return (
            <Box
                elevation="small"
                onClick={() => onPOIFocus(JSON.parse(JSON.stringify(poi)))}
                pad={{ horizontal: "small", vertical: "xsmall" }}
                margin="xsmall"
                round="small"
                direction="row"
                background="white"
                flex={false}
                justify="between"
                style={{ cursor: "pointer" }}
            >
                <Box
                    direction="row"
                    justify="between"
                    flex="grow"
                    pad="none"
                    margin="none"
                    style={{ flex: 8 }}>
                    <Box justify="center" margin="none" pad="none"><Text margin="none">{poi.name}</Text></Box>
                    <Box justify="center" margin="none" direction="column">
                        <POICategoryWidget category={poi.category} />
                    </Box>
                </Box>
                <Box style={{ flex: 1 }}
                    align="center"
                    justify="center"
                >
                    <POIAdd poi={poi} />
                </Box>
            </Box>
        )
    }
}
const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = { onPOIFocus }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(POIListItem)