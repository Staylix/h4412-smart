import React, { Component } from 'react';
import { connect } from "react-redux";
import { Box, DataTable, Meter, Heading, Select, Table, TableHeader, TableRow, TableCell, TableBody } from 'grommet';
import { getData } from '../api/user';
import { setData } from '../reducers/user';
import { params } from '../constants/themes';


class Dashboard extends Component<any> {

    componentDidMount() {
        let { user, setData } = this.props
        getData(user.token)
            .then((res) => {
                const data = res.data.stats

                const classrooms = Object.keys(data).map(
                    (classroom) => { return { name: data[classroom].name, id: classroom } }
                )

                setData({ type: "data", value: data })
                setData({ type: "classrooms", value: classrooms })
            })
    }

    render() {
        let { setData } = this.props;
        let { data, classrooms, classroom, tour } = this.props.dashboard;

        let tours = []
        if (Object.keys(classroom).length) {
            tours = Object.keys(data[classroom.id].tours).map(
                (tour) => { return { name: data[classroom.id].tours[tour].name, id: tour } }
            )
        }

        let columns = []
        let validations = []
        if (Object.keys(tour).length) {
            let steps = data[classroom.id].tours[tour.id].ordered.map(
                (step) => {
                    return {
                        key: step,
                        name: data[classroom.id].tours[tour.id].steps[step].name,
                        id: step
                    }
                }
            )

            let students = data[classroom.id].students.map(
                (student) => {
                    return { id: student._id, name: student.firstName + ' ' + student.lastName }
                }
            )

            columns = columns.concat(steps.map(
                (step) => {
                    return {
                        property: step.id,
                        header: <Heading level="5">{step.name}</Heading>,
                        render: datum => (
                            <Box fill pad="small" margin="none" background={datum[step.id]} key={step.id} />
                        ),
                    }
                })
            )

            validations = students.map(
                (student) => {
                    let row = {}
                    columns.forEach((column) => {
                        const answers = data[classroom.id].tours[tour.id].steps[column.property].answers
                        let color;
                        if (answers[student.id]) {
                            let answer = answers[student.id].answer;
                            color = answer.goodAnswer ? "accent-1" : "accent-2"//(answer.hasValidated ? "accent-2" : "status-unknown")
                        }
                        else color = "status-unknown"
                        row[column.property] = color
                    })
                    row["name"] = student.name
                    return row;
                }
            )

            columns = [{
                property: 'name',
                header: <Heading level="5">Nom de l'élève</Heading>,
            }].concat(columns)

        }


        return (
            <Box {...params.masterPage as any}>
                <Box {...params.page as any}>
                    <Box direction="row" justify="center" gap="medium" margin="small">
                        <Box gap="small">
                            <Box>
                                <Select
                                    options={classrooms}
                                    value={classroom}
                                    labelKey="name"
                                    placeholder="Choisissez une classe"
                                    onChange={({ option }) => {
                                        setData({ type: "tour", value: {} })
                                        setData({ type: "classroom", value: option })
                                    }}
                                />
                            </Box>
                            <Box>
                                <Select
                                    options={tours}
                                    value={tour}
                                    labelKey="name"
                                    placeholder="Choisissez un parcours"
                                    onChange={({ option }) => setData({ type: "tour", value: option })}
                                />
                            </Box>
                        </Box>
                        <Box>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableCell>Etape non réalisée</TableCell>
                                        <TableCell>Quizz raté (mais étape réalisée)</TableCell>
                                        <TableCell>Quizz réussi</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell ><Box fill background="status-unknown" pad="small" /></TableCell>
                                        <TableCell ><Box fill background="accent-2" pad="small" /></TableCell>
                                        <TableCell ><Box fill background="accent-1" pad="small" /></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Box>
                    {Object.keys(tour).length ?
                        <Box background="white" round="medium" pad="small" margin="small" elevation="medium"
                            overflow="auto">
                            <DataTable
                                columns={columns}
                                data={validations}
                                size="medium"
                            />
                        </Box>
                        : ""
                    }
                </Box>
            </Box>
        )
    }

};

const mapStateToProps = (state: any) => {
    return {
        user: state.root.user.user,
        dashboard: state.root.user.dashboard,
    }
}

const mapDispatchToProps = { setData }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)