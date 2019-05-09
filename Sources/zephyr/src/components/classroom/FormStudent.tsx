import React, { Component } from 'react';
import { connect } from "react-redux";
import { Box, Form, FormField, Button } from 'grommet';
import { Checkmark } from 'grommet-icons';


class FormStudent extends Component<any, any> {
    constructor(props) {
        super(props);
    }

    handleSubmitStudent(value: any) {
        this.props.addUserToClassroom(value);
    }

    render() {
        return (
            <div>
                <Form name="UserForm" onSubmit={({ value }: any) => { this.handleSubmitStudent(value); }} id="formStudent">
                    <Box direction="row" gap="small" pad={{ vertical: "small", right: "small", left: "medium" }} >
                        <Box style={{ flex: 1 }}>
                            <FormField
                                name="lastName"
                                label="Nom"
                                placeholder="Malek"
                                required={true}
                            >
                            </FormField>
                        </Box>
                        <Box style={{ flex: 1 }}>
                            <FormField
                                name="firstName"
                                label="Prénom"
                                placeholder="Rami"
                                required={true}
                            >
                            </FormField>
                        </Box>
                        <Box style={{ flex: 1 }}>
                            <FormField
                                name="email"
                                label="Email"
                                type="email"
                                placeholder="rami.malek@aedi.if"
                                required={true}
                            >
                            </FormField>
                        </Box>
                        <Button
                            icon={<Checkmark color="white" size="small" />}
                            type="submit"
                            alignSelf="end"
                            primary
                            color="status-ok"
                        />
                    </Box>
                </Form>
            </div>
        )
    }
};

const mapStateToProps = (state: any) => {
    return {
        user: state.root.user.user,
    }
}

const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormStudent)