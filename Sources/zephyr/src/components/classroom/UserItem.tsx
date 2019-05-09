import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Box, Text, Heading } from 'grommet';;

class UserItem extends Component<any> {

    render() {
        let { index } = this.props;
        return (
            <div>
                <Box key={index} direction="row" gap="small" pad={{ vertical: "none", horizontal: "medium" }}
                    margin={{ vertical: "none", horizontal: "small" }}
                >
                    <Box style={{ flex: 1 }}>
                        <Heading level="4" margin={{ vertical: "small" }}>{this.props.user.lastName}</Heading>
                    </Box>
                    <Box style={{ flex: 1 }}>
                        <Heading level="4" margin={{ vertical: "small" }}>{this.props.user.firstName}</Heading>
                    </Box>
                    <Box style={{ flex: 1 }}>
                        <Heading level="4" margin={{ vertical: "small" }}>{this.props.user.email}</Heading>
                    </Box>
                </Box>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {

    }
}

const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserItem)