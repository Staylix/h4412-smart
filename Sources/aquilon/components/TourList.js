import React from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import { connect } from 'react-redux'

import TourItem from './TourItem'
import { getTours } from '../api/tour'
import { toursHeadListLoaded } from '../store/reducers/tour';


class TourList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            error: false,
        }
    }

    _loadTours() {
        this.setState({isLoading: true})
        getTours(this.props.token)
            .then((res) => {
                var tourTemp = [];
                res.data.user.idsClassroom.forEach(
                    (class_) => class_.idsTour.forEach(
                        (tour_) => {
                            tour_.classRoom = class_.name
                            tourTemp.push(tour_)
                        }
                    )
                )
                this.props.toursHeadListLoaded(tourTemp);
                this.setState({
                    isLoading: false,
                })
            })
            .catch((err) => {
                console.log("TourList Error" + err);
                this.setState({
                    isLoading: false,
                    error: true
                })
            });
    }

    _displayError() {
        if (this.state.error) {
            return (
                <View style={styles.main}>
                    <Text>ERROR</Text>
                </View>
            )
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _displayDetail = (tour) => {
        this.props.navigation.navigate("TourDetails", { item: tour })
    }

    componentDidMount() {
        this._loadTours()
    }

    onRefresh () {
        this._loadTours()
    }

    render() {
        let tours = this.props.tours.length !== 0 ?
            <FlatList
                data={this.props.tours}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({item}) => <TourItem item={item} displayDetails={this._displayDetail} />}
                numColumns={1}
                contentContainerStyle={styles.flatlist}
                refreshControl={
                    <RefreshControl
                      refreshing={this.state.isLoading}
                      onRefresh={() => this.onRefresh()}
                    />
                }
            />
            :
            <Text style={styles.empty}>Pas de parcours disponible :(</Text>

        return (
            <View style={styles.main}>
                {this._displayError()}
                {this._displayLoading()}
                {tours}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
    },
    flatlist: {
        backgroundColor: "#F2F2F2",
        borderRadius: 24,
        paddingTop: 18,
        margin: 10,
        marginBottom: 10,
    },
    empty: {
        marginTop: 50,
        fontSize: 18,
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const mapStateToProps = (state) => {
    return {
        tours: state.tour.tours,
        token: state.user.user.token,
    }
}

const mapDispatchToProps = { toursHeadListLoaded }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TourList)
