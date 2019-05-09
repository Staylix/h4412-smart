import React, { Component } from 'react';
import { connect } from "react-redux";
import { Box, Form, FormField, Button, Text, Heading } from 'grommet';
import { Checkmark } from 'grommet-icons';
interface IState {
    edit: boolean,
    classroomName: string,
    id: string,
}

class FormClassName extends Component<any, IState> {
    constructor(props) {
        super(props);
        this.state = {
            edit: true,
            classroomName: "",
            id: "",
        };

    }

    handleSubmitClassName(value: any) {
        let { classNameError } = this.props;
        this.props.createClassroom(value);
        this.setState({ ...this.state, classroomName: classNameError ? value.name : "", edit: false });
    }

    handleChange(value: any) {
        this.setState({ ...this.state, classroomName: value });
    }

    render() {
        let displayForm;
        let { classroomName } = this.state;
        let { classNameError, currentClassroomId } = this.props;

        let animationName: any = {
            "type": "slideDown",
            "delay": 0,
            "duration": 200,
            "size": "large"
        }

        // TODO: fix ce truc incroyable !
        let classroomNameDisplay = classroomName.split('').map(
            (letter, index) => (
                <Box animation={animationName} key={index + letter}>
                    {letter === ' '
                        ? <Box style={{ height: "5px", width: "3px" }}></Box>
                        : <Heading margin='none' level="3">{letter}</Heading>
                    }
                </Box>
            )
        )

        if (!currentClassroomId || classNameError) {
            displayForm =
                <Form onSubmit={({ value }: any) => this.handleSubmitClassName(value)}
                    onChange={(event: any) => this.handleChange(event.target.value)}>

                    <Box direction="row" gap="small" margin='medium'>
                        {classroomName
                            ? classroomNameDisplay
                            : <Heading margin-bottom="medium" level="3" margin='none'>Créer une classe</Heading>
                        }
                    </Box>
                    <Box direction="row" gap="small">
                        <FormField
                            name="name"
                            label="Nom de la classe"
                            placeholder="exemple : 4B"
                        >
                        </FormField>
                        <Button
                            icon={<Checkmark color="white" size="small" />}
                            type="submit"
                            alignSelf="end"
                            primary
                            color="status-ok"
                        />
                    </Box>

                </Form>
        }
        return (
            <Box>{displayForm}</Box>
        )
    }

};

const mapStateToProps = (state: any) => {
    return {
        user: state.root.user.user,
        classNameError: state.root.classroom.classNameError,
        currentClassroomId: state.root.classroom.currentClassroomId,
    }
}

const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormClassName)