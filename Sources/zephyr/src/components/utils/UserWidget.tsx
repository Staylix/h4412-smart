import React, { Component } from 'react';
import { Text, Box } from 'grommet';
import { callFindUserById } from '../../api/user';
import { connect } from 'react-redux';


class UserWidget extends Component<any> {
    // state = {
    //     user: null,
    // }

    componentDidMount() {
        // let { user, id } = this.props;
        // callFindUserById(user.token, id)
        //     .then((u) => {
        //         this.setState(prev => ({
        //             user: u.data    
        //         }));
        //     })
    }
    

    render () {
            let {user} = this.props;
        return (
            <Text>{user.lastName} {user.firstName}</Text>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // user: state.root.user.user,
    }
}

const mapDispatchToProps = {  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserWidget)