import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import MyText from './MyText'

class TourItem extends React.Component {

    render() {
        const item = this.props.item;
        return (
            <TouchableOpacity 
                style={styles.main}
                onPress={() => this.props.displayDetails(this.props.item)}
            >
                <View style={styles.text}>
                    <View style={styles.nameView}>
                        <MyText numberOfLines={1} style={styles.name}>{item.name}</MyText>
                    </View>
                    <View style={styles.descView}>
                        <MyText numberOfLines={4} style={styles.desc}>{item.description}
                        </MyText>
                    </View>
                </View>
                <View style={styles.authorView}>
                    <MyText style={styles.author}>Par {item.idAuthor.firstName} {item.idAuthor.lastName}</MyText>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flexDirection: 'column',
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 10,
        padding: 6,
        marginRight: 18,
        marginLeft: 18,
        marginBottom: 18,
        height: Dimensions.get('window').height / 5,
        width: Dimensions.get('window').width - 18*2 - 10*2, // (marginItem+marginFlatList) * 2
        backgroundColor: '#FFFFFF',
    },
    text: {
        flex: 5,
    },
    nameView: {
        flex: 1.2,
        alignItems: 'flex-start',
        borderBottomWidth: 2,
        borderColor: '#F2696C',
        paddingBottom: 2,
    },
    name: {
        color: 'grey',
        fontSize: 18,
        fontWeight: 'bold'
    },
    descView :{
        flex: 4,
    },
    desc: {
        color: 'grey',
        fontSize: 16,
        fontFamily: 'Roboto',
    },
    authorView: {
        flex: 1,
    },
    author : {
        textAlign: 'right',
        fontSize: 14,
        color: 'grey'
    },
    image: {
        width: 50,
        height: 50
    }
})

export default TourItem
