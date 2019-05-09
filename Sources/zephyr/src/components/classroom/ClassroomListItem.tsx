import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Box, Heading, Text, Collapsible, Button } from 'grommet';
import { Baby, Navigate, Trash, Edit } from 'grommet-icons';
import UserWidget from '../utils/UserWidget';
import TourWidget from '../utils/TourWidget';
import TourListDropdown from './TourListDropdown';
import { changePage, CREATECLASSROOM } from '../../reducers/nav';
import { setCurrentClassroom, deleteClassroom } from '../../reducers/classroom';
import { callDeleteClassroom } from '../../api/classroom';

class ClassroomListItem extends Component<any> {
    state = {
        open: false,
    }

    deleteClassroom() {
        let { user, classroom, deleteClassroom } = this.props;
        callDeleteClassroom(user.token, classroom._id).then((response) => {
            deleteClassroom(classroom._id);
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        let { tours, classroom, setCurrentClassroom, changePage } = this.props;

        const { open } = this.state;
        return (
            <div>
                <Box direction="column"
                    elevation="medium"
                    pad={{ vertical: "none", horizontal: "medium" }}
                    round="small"
                    background="white"
                >
                    <Box
                        style={{ cursor: "pointer" }}
                        onClick={() => this.setState({ open: !open })}
                        direction="row"
                        justify="between"
                        align="center"
                        width="large"
                    >
                        <Box>
                            <Heading level="3">{classroom.name}</Heading>
                        </Box>
                        {!open &&
                            <Box direction="row" pad="small" align="center">
                                <Box direction="row" pad="small" align="center"><Baby /> <Box pad="xsmall">{classroom.idsUser.length}</Box> </Box>
                                <Box direction="row" pad="small" align="center"><Navigate /> <Box pad="xsmall">{classroom.idsTour.length}</Box></Box>
                            </Box>
                        }
                        <Box direction="row" pad="small" align="center">
                            <Button
                                icon={<Edit />}
                                color="white"
                                onClick={() => { setCurrentClassroom(classroom._id); changePage(CREATECLASSROOM) }}
                            />
                            <Button
                                icon={<Trash />}
                                color="white"
                                onClick={() => this.deleteClassroom()}
                            />
                        </Box>
                    </Box>
                    <Collapsible open={open} >
                        <Box
                            justify="around"
                            align="start"
                            round="small"
                            direction="row"
                        >
                            <Box justify="start">
                                <Box alignSelf="start" direction="row">
                                    <Baby /><Heading margin='xsmall' level='5'>Elèves</Heading>
                                </Box>
                                <Box align="center" margin={{ bottom: '10px' }}>
                                    {
                                        classroom.idsUser.length ?
                                            classroom.idsUser.map((u, index) => (
                                                <UserWidget key={index + u} user={u}></UserWidget>
                                            ))
                                            :
                                            <Box><Text>Aucun élève</Text></Box>
                                    }
                                </Box>
                            </Box>
                            <Box>
                                <Box alignSelf="start" direction="row">
                                    <Navigate /><Heading margin='xsmall' level='5'>Parcours</Heading>
                                </Box>
                                <Box align="center" margin={{ bottom: '10px' }}>
                                    {
                                        classroom.idsTour.length ?
                                            classroom.idsTour.map((u, index) => (
                                                <TourWidget key={index + u} tour={tours.find((tour) => tour._id == u._id)}></TourWidget>
                                            ))
                                            :
                                            <Box><Text>Aucun parcours</Text></Box>
                                    }
                                    <TourListDropdown tours={tours} classTours={classroom.idsTour} idClassroom={classroom._id}
                                        getClassrooms={this.props.getClassrooms} />
                                </Box>
                            </Box>
                        </Box>
                    </Collapsible>
                </Box>
            </div>
        )
    }
};

const mapStateToProps = (state: any) => {
    return {
        user: state.root.user.user,
        tours: state.root.tour.myTours
    }
}

const mapDispatchToProps = { setCurrentClassroom, changePage, deleteClassroom }


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClassroomListItem)