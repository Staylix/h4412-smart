import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Box } from 'grommet';
import ClassroomListItem from './ClassroomListItem';
import { callGetClassroom } from '../../api/classroom';
import { initMyClassrooms } from '../../reducers/classroom';


class ClassroomList extends Component<any, any> {

    getClassrooms() {
        let { user, initMyClassrooms } = this.props;
        callGetClassroom(user.token).then((response) => {
            initMyClassrooms(response.data.classrooms);
        }).catch((error) => {
            console.log(error);
        });
    }

    componentDidMount() {
        this.getClassrooms();
    }

    render() {
        let { myClassrooms } = this.props;
        let listClassrooms = myClassrooms.map((classroom: any, index: number) =>
            <ClassroomListItem
                key={index + classroom.name}
                classroom={classroom}
                getClassrooms={this.getClassrooms.bind(this)}
            />
        )

        return (
            <Box align="center" pad="medium" gap="small"
                style={{ overflowY: "auto" }}
            >
                {listClassrooms}
            </Box>
        )
    }
};

const mapStateToProps = (state: any) => {
    return {
        user: state.root.user.user,
        myClassrooms: state.root.classroom.myClassrooms,
    }
}

const mapDispatchToProps = { initMyClassrooms }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClassroomList)