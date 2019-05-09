import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, InfiniteScroll } from 'grommet';
import ReactLoading from 'react-loading';
import { PointOfInterest, POICategory } from '../../models/poi';
import POIListItem from './POIListItem';


class POIList extends Component<any> {

    getName(s: string): POICategory {
        switch (s) {
            // case "Logement":
            //     return POICategory.ACCOMODATION;
            // case "Restaurant":
            //     return POICategory.RESTAURANT;
            case "Musée":
                return POICategory.MUSEUM;
            case "Lieu":
                return POICategory.PLACE;
            case "Lieu de culte":
                return POICategory.CHURCH;
            case "Salle de spectacle":
                return POICategory.THEATRE;
        }
    }

    render() {
        let { PoIs, PoIType, isLoading } = this.props;
        var PoIFiltered = PoIs.filter(poi => (PoIType == "Type de POI") || (PoIType == "Tous") || this.getName(PoIType) == poi.category);

        return (
            <Box
                round="medium"
                overflow="auto"
                pad="xsmall"
            >
                {PoIFiltered.length !== 0 ?
                    <InfiniteScroll items={PoIFiltered} >
                        {(item: PointOfInterest) => (
                            <POIListItem key={item._id} poi={item} />
                        )}
                    </InfiniteScroll>
                    : isLoading ?
                        <Box align='center'>
                            <ReactLoading type={'spin'} color={'#F2696C'} height={'15%'} width={'15%'} />
                        </Box>
                        : <Box>Aucun point d'intérêt</Box>
                }
            </Box>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.root.user.user,
        isLoading: state.root.tour.poiIsLoading,
    }
}

const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(POIList)