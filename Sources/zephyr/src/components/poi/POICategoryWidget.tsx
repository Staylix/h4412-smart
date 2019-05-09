import React, { Component } from 'react';
import { Box, Text } from 'grommet';
import { POICategory } from '../../models/poi'
import { connect } from 'react-redux';
import { Cafeteria, Home, Attraction, UserPolice, Sign, Group, Location } from 'grommet-icons';


interface IPOICategoryProps {
    category: POICategory
}

class POICategoryWidget extends Component<IPOICategoryProps, any> {

    render() {

        let icon = this.getIcon(this.props.category);
        let name = this.getName(this.props.category);

        return (
            <Box
                direction="row"
                justify="end"
                align="center">
                <Box pad="small">{icon}</Box>
                <Text>{name}</Text>
            </Box>
        ) 
    }

    getIcon(cat: POICategory) {
        switch(cat) {
            // case POICategory.ACCOMODATION:
            //     return (<Home />);
            // case POICategory.RESTAURANT:
            //     return (<Cafeteria/>);
            case POICategory.MUSEUM:
                return (<Attraction/>);
            case POICategory.PLACE:
                return (<Location/>);
            case POICategory.CHURCH:
                return (<Group/>);
            case POICategory.THEATRE:
                return (<Sign/>);

        }
    }

    getName(cat: POICategory) {
        switch(cat) {
            // case POICategory.ACCOMODATION:
            //     return "Logement";
            // case POICategory.RESTAURANT:
            //     return "Restaurant";
            case POICategory.MUSEUM:
                return "Musée";
            case POICategory.PLACE:
                return "Lieu";
            case POICategory.CHURCH:
                return "Lieu de culte";
            case POICategory.THEATRE:
                return "Salle de spectacle";

        }
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(POICategoryWidget)