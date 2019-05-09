import React, { Component } from 'react';

import { SIGNUP, SIGNIN, changePage, MANAGECLASSROOM, MANAGETOUR, DASHBOARD, CREATETOUR } from '../reducers/nav';
import { connect } from 'react-redux';

import { Box, Button, Heading, Image, Layer, Paragraph } from 'grommet';
import { setTourPage, TOUR_HOME, TOUR_EDIT, TOUR_STEPS_EDIT, TOUR_CREATE } from '../reducers/tour';
import { resetStore } from '../store';
import { appBarTabsStyles } from '../constants/themes';

interface IState {
    showLogoutLayer: boolean
}

class AppBar extends Component<any, IState> {
    constructor(props) {
        super(props);
        this.state = { showLogoutLayer: false }
    }

    logOut() {
        let { changePage, resetStore } = this.props;

        let itemsToRemove = ["user", "page"];
        itemsToRemove.forEach((key) => { localStorage.removeItem(key); });
        this.setShow(false);
        resetStore();
        changePage(SIGNIN);
    }

    setShow(value: boolean) {
        this.setState({ ...this.state, showLogoutLayer: value })
    }

    render() {
        let { changePage, setTourPage, user, page, tourPage, editingTour } = this.props;

        let title = "";

        if (page == MANAGETOUR) {
            switch (tourPage) {
                case TOUR_EDIT:
                    title = editingTour ? editingTour.name : ""
                    break;
                case TOUR_STEPS_EDIT:
                    title = editingTour ? editingTour.name : ""
                    break;
                case TOUR_CREATE:
                    title = editingTour ? editingTour.name : ""
                    break;
            }
        } else if (page == DASHBOARD) {
            title = "Tableau de bord"
        }

        return (
            <Box
                tag='header'
                direction='row'
                align='center'
                justify='between'
                background='brandPink'
                pad={{ left: 'small', right: 'small', vertical: 'xsmall' }}
                elevation='small'
                style={{ zIndex: 1 }}
            >
                <Box direction="row">
                    {user.token && <Box onClick={() => { changePage(MANAGETOUR); setTourPage(TOUR_HOME) }}
                        style={{ height: 60, width: 60, cursor: "pointer" }}>
                        <Image
                            fit="contain"
                            src="/logo.png"
                        />
                    </Box>}
                    <Box direction="row" align="center">
                        <Heading margin={{ vertical: "none", horizontal: "medium" }} color='white' level="2">Lug</Heading>
                        <Heading margin='none' color='white' level='5'>
                            {/* > {page} */}
                        </Heading>
                    </Box>
                </Box>
                {user.firstName && (
                    <Heading margin='none' color='white' level='3'>
                        {title.length
                            ? title
                            : "Salut, " + user.firstName
                        }
                    </Heading>
                )}
                {user.token ?
                    <Box direction="row">
                        <Button onClick={() => changePage(DASHBOARD)} label="Bilan" style={appBarTabsStyles[String(page == DASHBOARD)]} />
                        <Button onClick={() => { changePage(MANAGETOUR); setTourPage(TOUR_HOME) }} label="Parcours" style={appBarTabsStyles[String(page == MANAGETOUR)]} />
                        <Button onClick={() => changePage(MANAGECLASSROOM)} label="Classes" style={appBarTabsStyles[String(page == MANAGECLASSROOM)]} />
                        <Button onClick={() => this.setShow(true)} label="Déconnexion" style={appBarTabsStyles["false"]} />
                    </Box>
                    :
                    <Box direction="row">
                        <Button onClick={() => changePage(SIGNUP)} label="Inscription" style={appBarTabsStyles[String(page == SIGNUP)]} />
                        <Button onClick={() => changePage(SIGNIN)} label="Connexion" style={appBarTabsStyles[String(page == SIGNIN)]} />
                    </Box>
                }
                {this.state.showLogoutLayer && (
                    <Layer
                        onEsc={() => this.setShow(false)}
                        onClickOutside={() => this.setShow(false)}
                    >
                        <Box pad="medium">
                            <Paragraph >
                                Voulez vous vraiment nous quitter ? 😢
                            </Paragraph>
                            <Box direction="row">
                                <Button onClick={() => this.setShow(false)} label="Rester avec nous ❤"
                                    margin="small" />
                                <Button onClick={this.logOut.bind(this)} label="Se déconnecter ☠"
                                    margin="small" primary style={{ color: "white" }} />
                            </Box>
                        </Box>
                    </Layer>
                )}
            </Box>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        page: state.root.nav.page,
        user: state.root.user.user,
        tourPage: state.root.tour.tourPage,
        editingTour: state.root.editTour.editingTour,
    }
}

const mapDispatchToProps = { changePage, setTourPage, resetStore }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppBar)

