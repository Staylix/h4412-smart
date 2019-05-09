import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Box, FormField, Heading, Select } from 'grommet';
import { POICategory } from '../../models/poi';
import { addPointOfInterest } from '../../api/poi';
import { setTourPage } from '../../reducers/tour';
import { changePage, MANAGETOUR } from '../../reducers/nav';

interface IState {
    category: string,
}

class NewPOI extends Component<any, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            category: "Catégorie"
        }

    }

    getName(s: string): POICategory {
        switch (s) {
            // case "Logement":
            //     return POICategory.ACCOMODATION;
            // case "Restaurant":
            //     return POICategory.RESTAURANT;
            case "Musée":
                return POICategory.MUSEUM;
            case "Lieu":
                return POICategory.PLACE;
            case "Lieu de culte":
                return POICategory.CHURCH;
            case "Salle de spectacle":
                return POICategory.THEATRE;
        }
    }

    handleOnSubmit(value: any) {

        let { user, changePage } = this.props;
        let { category } = this.state;
        var categoryToSend;
        if (category == "Catégorie") {
            categoryToSend = "Lieu";
        } else {
            categoryToSend = category;
        }
        categoryToSend = this.getName(categoryToSend)
        addPointOfInterest(user.token, value, categoryToSend).catch((error) => {
            console.log(error);
        });
        changePage(MANAGETOUR);
    }


    render() {
        let { category } = this.state;
        let { changePage } = this.props;
        var regLat = new RegExp("^(\\+|-)?(?:90(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,6})?))");
        var regLong = new RegExp("^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,6})?))");

        var buttonStyle = {
            color: "#F2696C",
            backgroundColor: 'white',
        }

        return (
            <Box
                direction='column'
                align='center'
                justify='between'
                pad="medium"
            >
                <Form onSubmit={({ value }: any) => this.handleOnSubmit(value)}>
                    <Heading level="3" alignSelf="center" margin="none">Création d'un point d'intérêt</Heading>
                    <Box direction="row" gap="medium">
                        <Box direction='column' align='center'>
                            <FormField name="name" label="Nom" required={true} />
                            <FormField name="siteURL" label="Site internet" type="url" placeholder="http://" />
                            <FormField name="imageURL" label="Image" type="url" placeholder="http://" />

                        </Box>
                        <Box direction='column' align='center'>
                            <FormField name="latitude" label="Latitude" required={true}
                                validate={{
                                    regexp: regLat,
                                    message: "Veuillez entrer une latitude correcte"
                                }}
                            />
                            <FormField name="longitude" label="Longitude" required={true}
                                validate={{
                                    regexp: regLong,
                                    message: "Veuillez entrer une longitude correcte"
                                }}
                            />
                            <Select
                                options={[
                                    // 'Logement',
                                    // 'Restaurant',
                                    'Musée',
                                    'Lieu',
                                    'Lieu de culte',
                                    'Salle de spectacle']}
                                value={category}
                                onChange={({ option }) => this.setState({ category: option })}
                            />

                        </Box>
                    </Box>
                    <Box align="center" direction="row" justify="around">
                        <Box pad="small">
                            <Button onClick={() => changePage(MANAGETOUR)} label="Annuler" style={buttonStyle} />
                        </Box>
                        <Box pad="small">
                            <Button type="submit" label="Créer" style={buttonStyle} />
                        </Box>
                    </Box>
                </Form>
            </Box >

        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.root.user.user,
    }
}

const mapDispatchToProps = { setTourPage, changePage }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewPOI)