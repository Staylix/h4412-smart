import React, { Component } from 'react';

import { connect } from 'react-redux';
import { DropButton, Box, Button } from 'grommet';
import { Add } from 'grommet-icons';
import { addTourToClass } from '../../api/classroom';
import { changePage } from '../../reducers/nav';


class TourListDropdown extends Component<any> {

    callAddTourToClass(idClassroom: string, idTour: string) {
        let { user } = this.props;

        addTourToClass(user.token, idClassroom, idTour)
            .then(this.props.getClassrooms())
            .catch((error) => console.log(error))
    }

    render() {
        let { tours, idClassroom, classTours } = this.props;
        var id: string[];
        id = classTours.map(tour => tour._id);
        var toursReduce = tours.filter(tour => !(id.indexOf(tour._id) > -1));

        let tourList = toursReduce.map((tour, index) => {
            return (
                <div key={index}>
                    <Button label={tour.name} icon={<Add />}
                        onClick={() => this.callAddTourToClass(idClassroom, tour._id)} />
                </div>
            )
        })
        var content = (tourList.length) ?
            <Box pad="small">
                {tourList}
            </Box>
            : <Box>Vous n'avez aucun parcours à ajouter </Box>

        return (
            <DropButton
                label="Assigner un parcours"
                margin="small"
                dropAlign={{ bottom: 'top', left: 'left' }}
                dropContent={content}
            />
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: state.root.user.user,
        myClassrooms: state.root.classroom.myClassrooms,
        currentClassroomId: state.root.classroom.currentClassroomId,
    }
}

const mapDispatchToProps = { changePage }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TourListDropdown)