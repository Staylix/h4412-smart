// from https://gist.github.com/neilsarkar/c9b5fc7e67bbbe4c407eec17deb7311e
import React from 'react';
import { Text, StyleSheet } from 'react-native';

class AppText extends React.Component {
    constructor(props) {
        super(props)
        // Put your default font styles here. 
        this.style = styles.container; //[{fontFamily: 'Roboto', fontSize: 20}]; 
        if( props.style ) {
            if( Array.isArray(props.style) ) {
                this.style = this.style.concat(props.style)
            } else {
                this.style = {...this.style, ...props.style}
            }
        }
    }

    render() { return (
        <Text {...this.props} style={this.style}>
            {this.props.children}
        </Text>
    )}
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            fontFamily: 'Roboto',
            color: 'red',
            fontSize: 16
        }
    })


export default AppText
