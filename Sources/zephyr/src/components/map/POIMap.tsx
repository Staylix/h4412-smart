import React, { Component } from "react";

import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import { connect } from "react-redux";
import { Box } from "grommet";
import { MapCard } from "./MapCard";
import { onPOIFocus } from "../../reducers/editTour";

const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1Ijoic3RheWxpeCIsImEiOiJjam9qcWRydHowMXRhM3Fsb2hmMWVuMnBoIn0.4oCDLlBRIqkWVZH6W_Pbjw"
});

// Define layout to use in Layer component
const poiLayoutLayer = { 'icon-image': 'poiIcon', "icon-size": 0.16 };
// Create an image for the Layer
const poiImage = new Image();
poiImage.src = '/poiIcon.svg';
const poiImages: any = ['poiIcon', poiImage];

// Define layout to use in Layer component
const stepLayoutLayer = { 'icon-image': 'stepIcon', "icon-size": 0.32 };
// Create an image for the Layer
const stepImage = new Image();
stepImage.src = '/stepIcon.svg';
const stepImages: any = ['stepIcon', stepImage];

interface IPOIMap {
    hoveredPoI: any,
    center: [number, number],
}

const styles = {
    focusedPopup: {
        borderRadius: 8,
        backgroundColor: '#ffffff44',
    },
    hoveredPopup: {
        borderRadius: 8,
        backgroundColor: '#ffffff',
    }
}

class POIMap extends Component<any, IPOIMap> {
    constructor(props) {
        super(props)
        this.state = {
            hoveredPoI: null,
            center: [4.836324, 45.764052],
        }
    }


    onToggleHover(cursor: string, poi: any, { map }: { map: any }) {
        map.getCanvas().style.cursor = cursor;
        this.setState({
            hoveredPoI: poi
        })
    }

    render() {
        let { tour, PoIs, onPOIFocus, focusedPoI, center, zoom, isEditing } = this.props;
        let { hoveredPoI } = this.state
        let steps = tour.idsStep;

        let listOfStepFeatures = steps.map((step: any, index: number) =>
            <Feature
                onMouseEnter={this.onToggleHover.bind(this, 'pointer', step.idPoi)}
                onMouseLeave={this.onToggleHover.bind(this, '', null)}
                coordinates={[step.idPoi.position.longitude, step.idPoi.position.latitude]}
                key={index}
                onClick={() => onPOIFocus(JSON.parse(JSON.stringify(step.idPoi)))}
            />
        );
        let listOfPoiFeatures;
        if (PoIs) {
            listOfPoiFeatures = PoIs.map((poi: any, index: number) =>
                <Feature
                    onMouseEnter={this.onToggleHover.bind(this, 'pointer', poi)}
                    onMouseLeave={this.onToggleHover.bind(this, '', null)}
                    coordinates={[poi.position.longitude, poi.position.latitude]}
                    key={index}
                    onClick={() => onPOIFocus(JSON.parse(JSON.stringify(poi)))}
                />
            );
        }

        return (
            <Box style={{ position: 'absolute', top: '0px', left: '0px' }} round="medium">
                <Map
                    style="mapbox://styles/mapbox/streets-v9"
                    containerStyle={{
                        height: "100vh",
                        width: isEditing ? "130vw" : "100vw"
                    }}
                    center={center}
                >
                    {!PoIs &&
                        <Layer
                            layout={stepLayoutLayer}
                            images={stepImages}
                            type="symbol"
                            id="stepLayer"
                        >
                            {listOfStepFeatures}
                        </Layer>
                    }
                    {PoIs &&
                        <Layer
                            layout={poiLayoutLayer}
                            images={poiImages}
                            type="symbol"
                            id="poiLayer"
                        >
                            {listOfPoiFeatures}
                        </Layer>
                    }
                    {PoIs &&
                        <Layer
                            layout={stepLayoutLayer}
                            images={stepImages}
                            type="symbol"
                            id="stepLayer"
                        >
                            {listOfStepFeatures}
                        </Layer>
                    }
                    {hoveredPoI && (
                        <Popup key={'hovered' + hoveredPoI._id}
                            coordinates={[hoveredPoI.position.longitude, hoveredPoI.position.latitude]}
                        >
                            <div style={styles.hoveredPopup}>
                                <div>{hoveredPoI.name}</div>
                            </div>
                        </Popup>
                    )}
                    {focusedPoI && (
                        <Popup key={'focused' + focusedPoI._id}
                            coordinates={[focusedPoI.position.longitude, focusedPoI.position.latitude]}

                        >
                            <div style={styles.focusedPopup}>
                                <div>{focusedPoI.name}</div>
                            </div>
                        </Popup>
                    )}
                </Map>
                {focusedPoI &&
                    <MapCard poi={focusedPoI}></MapCard>
                }
            </Box>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        focusedPoI: state.root.editTour.focusedPoI,
        center: state.root.editTour.center,
        zoom: state.root.editTour.zoom,
        isEditing: state.root.editTour.isEditing,
    }
}

const mapDispatchToProps = {
    onPOIFocus,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(POIMap)