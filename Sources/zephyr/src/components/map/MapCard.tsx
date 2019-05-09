import React, { Component, CSSProperties } from "react";
import { Box, Heading } from "grommet";

const styles = {
    div: {
        position: 'relative',
        bottom: 80,
        // left: 20,
        // right: 20,
        // height: 40,
        display: 'flex',
        flex: 1,
        // justifyContent: 'space-between',
        // alignItems: 'center',
    },
    box: {
        background: '#ffffffbb'

    }
} as {div: CSSProperties, box: CSSProperties};

export class MapCard extends Component<any> {
    render() {
        let { poi } = this.props

        return (
            <Box style={styles.div} direction="row" justify="center">
                <Box style={styles.box} pad='small' round='medium'>
                    <Heading level="4" margin='none'>{poi.name}</Heading>
                </Box>
            </Box>
        )

    }
}