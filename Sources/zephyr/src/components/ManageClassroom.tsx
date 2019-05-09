import React, { Component } from 'react';
import { connect } from "react-redux";
import { Box, Heading, Button } from 'grommet';
import { Add } from 'grommet-icons';
import { changePage, CREATECLASSROOM } from '../reducers/nav';
import ClassroomList from './classroom/ClassroomList';
import { setCurrentClassroom, setError } from '../reducers/classroom';
import { params } from '../constants/themes';

class ManageClassroom extends Component<any> {

    render() {
        let { changePage, setCurrentClassroom, setError } = this.props;

        return (
            <Box {...params.masterPage as any}>
                <Box {...params.page as any}>
                    <Box {...params.head as any}>
                        <Box width="small"></Box>
                        <Box>
                            <Heading margin="none" level="3">Mes classes</Heading>
                        </Box>
                        <Box>
                            <Button
                                icon={<Add color="#F2696C" />}
                                onClick={() => {
                                    changePage(CREATECLASSROOM);
                                    setCurrentClassroom("");
                                    setError({ errorType: "userEmailError", errorContent: "" });
                                    setError({ errorType: "classNameError", errorContent: "" });
                                }}
                                label="Créer une classe"
                                alignSelf="end"
                            />
                        </Box>
                    </Box>
                    <Box margin={{horizontal: "large", top: "medium"}}>
                        <ClassroomList />
                    </Box>
                </Box>
            </Box>
        )
    }
};

const mapStateToProps = (state: any) => {
    return {
        user: state.root.user.user,
    }
}

const mapDispatchToProps = { changePage, setCurrentClassroom, setError }


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageClassroom)