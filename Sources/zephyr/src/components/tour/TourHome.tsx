import React, { Component, ReactElement } from 'react';
import { connect } from "react-redux";
import { Box, Button, Tabs, Tab, Heading } from 'grommet';

import TourList from './TourList';
import MyTourList from './MyTourList';
import { Add, Globe, Compass } from 'grommet-icons';
import { TOUR_CREATE, setTourPage } from '../../reducers/tour';
import { params } from '../../constants/themes';


class TourHome extends Component<any, any> {

    render() {
        let { setTourPage } = this.props;

        return (
            <Box {...params.page as any}>
                <Box {...params.head as any} justify="end">
                    <Box alignContent="end">
                        <Button
                            icon={<Add color="#F2696C" />}
                            onClick={() => setTourPage(TOUR_CREATE)}
                            label="Créer un parcours"
                            alignSelf="end"
                        />
                    </Box>
                </Box>
                <Tabs
                    flex-grow="true"
                    justify="center"
                    margin={{ vertical: "none", horizontal: "large" }}
                    // style={{ position: 'relative', top: "-30px" }}
                >
                    <Tab
                        title={<Box direction="row" align="center">
                            <Compass /><Heading margin='xsmall' level="3"> Mes parcours</Heading>
                        </Box> as any}
                    >
                        <MyTourList />
                    </Tab>
                    <Tab
                        title={<Box direction="row" align="center">
                            <Heading margin='xsmall' level="3">Découvrir </Heading><Globe />
                        </Box> as any}
                    >
                        <TourList />
                    </Tab>
                </Tabs>
            </Box>

        )
    }

};

const mapStateToProps = (state: any) => {
    return {
        user: state.root.user.user,
    }
}

const mapDispatchToProps = { setTourPage }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TourHome)