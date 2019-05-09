import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native'
import MyText from './MyText'
import CheckBox from 'react-native-check-box';
import { isValidatedStep } from '../api/tour';

class StepItem extends React.Component {
    
    render() {
        var item = this.props.item
        return (
            <TouchableOpacity 
                activeOpacity={0.9}
                style={styles.main}
                onPress={() => this.props.displayDetails(item)}
            >
                <View style={styles.text}>
                    <View style={styles.nameView}>
                        <MyText numberOfLines={1} style={styles.name}>{item.idPoi.name}</MyText>
                    </View>
                    <View style={styles.descView}>
                        <MyText numberOfLines={4} style={styles.desc}>{item.comment}</MyText>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.user.user.token,
    }
}

const mapDispatchToProps = { }

const styles = StyleSheet.create({
    main: {
        flexDirection: 'column',
        borderRadius: 10,
        padding: 6,
        height: Dimensions.get('window').height / 5,
        width: Dimensions.get('window').width - 18*2 - 10*2, // (marginItem+marginFlatList) * 2
        backgroundColor: '#F2696C',
    },
    text: {
        flex: 5,
    },
    nameView: {
        flex: 1.2,
        alignItems: 'flex-start',
        borderBottomWidth: 2,
        borderColor: 'white',
        color: 'white',
        paddingBottom: 2,
    },
    name: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    descView :{
        flex: 4,
    },
    desc: {
        color: '#E0E0E0',
        fontSize: 16,
        fontFamily: 'Roboto',
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StepItem)

