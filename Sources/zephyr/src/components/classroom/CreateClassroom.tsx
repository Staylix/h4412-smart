import React, { Component } from 'react';
import { connect } from "react-redux";
import { Box, Heading, Button } from 'grommet';
import { callCreateClassroom, IClassroom, callAddUserToClassroom, callGetClassroom } from '../../api/classroom';
import FormClassName from './FormClassName';
import { addClassroom, setCurrentClassroom, addStudentToClassroom, initMyClassrooms } from '../../reducers/classroom';
import FormStudent from './FormStudent';
import { IUser, callFindUserById } from '../../api/user';
import { setError } from '../../reducers/classroom';
import UserItem from './UserItem';
import { changePage, MANAGECLASSROOM } from '../../reducers/nav';
import { params } from '../../constants/themes';

class CreateClassroom extends Component<any> {

    constructor(props) {
        super(props);
        this.createClassroom = this.createClassroom.bind(this);
        this.addUserToClassroom = this.addUserToClassroom.bind(this);
    }

    createClassroom(classroom: IClassroom) {
        let { user, addClassroom, setCurrentClassroom, setError, myClassrooms, currentClassroomId } = this.props;
        callCreateClassroom(classroom, user.token).then((response) => {
            addClassroom(response.data.classroom);
            // console.log(myClassrooms);
            // console.log(currentClassroomId);  
            setCurrentClassroom(response.data.classroom._id);
            // console.log(currentClassroomId);            
            setError({ errorType: "classNameError", errorContent: "" });
        }).catch((error) => {
            setError({ errorType: "classNameError", errorContent: "Cette classe existe déjà !" });
        });
    }

    addUserToClassroom(student: IUser) {
        let { user, setError, currentClassroomId, addStudentToClassroom, initMyClassrooms, myClassrooms} = this.props;
        // console.log(myClassrooms);
        // console.log(currentClassroomId);
        callAddUserToClassroom(currentClassroomId, student, user.token).then((response) => {
            setError({ errorType: "userEmailError", errorContent: "" });
            // return callFindUserById(user.token, response.data.updated._id);
            // return response.data.updated;
        }).then((res) => {
            // console.log("res",res);
            // console.log(student);
            // addStudentToClassroom(res); TODO: Pas propre
            callGetClassroom(user.token).then((response) => {
                initMyClassrooms(response.data.classrooms);
            }).catch((error) => {
                console.log(error);
            });
        })
            .catch((error) => {
                console.log(error);
                setError({ errorType: "userEmailError", errorContent: "Cet élève est déjà présent dans la classe !" });
            });
    }

    render() {

        let buttonSyle = {
            backgroundColor: "#F2696C",
            color: "white"
        }

        let { changePage, userEmailError, classNameError, currentClassroomId, myClassrooms, setCurrentClassroom, setError } = this.props;
        let studentForm;
        let studentList;
        let classroom = myClassrooms.find((c) => c._id === currentClassroomId);
        let displayButton;
        let displayName;
        if (classroom) {

            studentList = classroom.idsUser.map((user: any, index: number) =>
                <UserItem
                    key={index}
                    user={user}
                />
            )

            displayButton =
                <Button
                    alignSelf="center"
                    label="Terminer"
                    style={buttonSyle}
                    onClick={() => {
                        setCurrentClassroom("");
                        setError({ errorType: "userEmailError", errorContent: "" });
                        setError({ errorType: "classNameError", errorContent: "" });
                        changePage(MANAGECLASSROOM);
                    }}
                >

                </Button>

            displayName =
                <Heading margin="none" level="3">{classroom.name}</Heading>
        }

        var errorBoxStyle = {
            color: "#FF4040",
            fontSize: "18px",
            margin: "12px",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "10px",
            paddingBottom: "10px"
        };
        if (currentClassroomId != "") {
            studentForm = <FormStudent addUserToClassroom={this.addUserToClassroom} />
        }
        return (
            <Box {...params.masterPage as any}>
                <Box {...params.page as any} align="center">

                    {classNameError &&
                        <Box
                            id="error" style={errorBoxStyle} border={{ color: "status-error" }} round>
                            {classNameError}
                        </Box>
                    }
                    <Box>
                        {displayName}
                    </Box>
                    <Box direction='column' pad={{ bottom: "small" }}>
                        <FormClassName createClassroom={this.createClassroom} />
                    </Box>
                    <Box>
                        {userEmailError &&
                            <Box
                                id="error" style={errorBoxStyle} border={{ color: "status-error" }} round>
                                {userEmailError}
                            </Box>
                        }
                        <Box background="white" round="medium"
                            elevation="medium"
                        >
                            <Box
                                style={{ width: '100%', overflowY: "scroll" }}
                            >
                                {studentList}
                            </Box>
                            <div>
                                <Box background="light-4" round="medium">
                                    {studentForm}
                                </Box>
                            </div>
                        </Box>
                        <div>
                            <Box pad="small">
                                {displayButton}
                            </Box>
                        </div>
                    </Box>
                </Box>
            </Box >
        )
    }

};

const mapStateToProps = (state: any) => {
    return {
        user: state.root.user.user,
        myClassrooms: state.root.classroom.myClassrooms,
        currentClassroomId: state.root.classroom.currentClassroomId,
        userEmailError: state.root.classroom.userEmailError,
        classNameError: state.root.classroom.classNameError
    }
}

const mapDispatchToProps = { initMyClassrooms, addClassroom, setCurrentClassroom, setError, addStudentToClassroom, changePage }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateClassroom)

