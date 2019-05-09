import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MANAGETOUR, SIGNUP, SIGNIN, changePage, CREATETOUR, MANAGECLASSROOM, CREATECLASSROOM, NEWPOI, DASHBOARD } from '../reducers/nav';
import SignUp from './SignUp';
import SignIn from './SignIn';
import AppBar from './AppBar';
import CreateTour from './tour/CreateTour';
import ManageClassroom from './ManageClassroom';
import CreateClassroom from './classroom/CreateClassroom';
import { Box, Grid } from 'grommet';
import { setUserState } from '../reducers/user';
import ManageTour from './ManageTour';
import NewPOI from './poi/NewPOI';
import Dashboard from './Dashboard';

class Page extends Component<any> {
    constructor(props: any) {
        super(props);
        this.hydrateStateWithLocalStorage();
    }

    hydrateStateWithLocalStorage() {
        let { setUserState, changePage } = this.props;
        let user
        if (localStorage.hasOwnProperty('user')) {
            const userString: string = localStorage.getItem('user') as string;
            user = JSON.parse(userString);
            if (Object.keys(user).length !== 0) {
                setUserState(user);
                changePage(localStorage.getItem('page'));
            }
            if (!user.token) {
                changePage(SIGNIN);
            }
        } else {
            changePage(SIGNIN);
        }

        // add event listener to save state to localStorage
        // when user leaves/refreshes the page
        window.addEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );
    }
    saveStateToLocalStorage() {
        let { user, page } = this.props;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('page', page);
    }

    componentWillUnmount() {
        window.removeEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );
        // saves if component has a chance to unmount
        this.saveStateToLocalStorage();
    }

    render() {
        let { page } = this.props;
        let pageComponent;

        switch (page) {
            case DASHBOARD: {
                pageComponent = <Dashboard />
                break;
            }
            case MANAGETOUR: {
                pageComponent = <ManageTour />
                break;
            }
            case SIGNUP: {
                pageComponent = <SignUp />
                break;
            }
            case SIGNIN: {
                pageComponent = <SignIn />
                break;
            }
            case MANAGECLASSROOM: {
                pageComponent = <ManageClassroom />
                break;
            }
            case CREATECLASSROOM: {
                pageComponent = <CreateClassroom />
                break;
            }
            case NEWPOI: {
                pageComponent = <NewPOI />
                break;
            }
            default: {
                pageComponent = <p>Page inconnue <span>🤔</span></p>
            }
        }

        let animationHeader: any = {
            "type": "slideDown",
            "delay": 0,
            "duration": 800,
            "size": "xlarge"
        }
        let animationMain: any = {
            "type": "fadeIn",
            "delay": 0,
            "duration": 1800,
            "size": "xlarge"
        }

        return (
            <Grid
                rows={['auto', 'auto']}
                columns={['auto', 'auto']}
                areas={[
                    { name: 'header', start: [0, 0], end: [1, 0] },
                    { name: 'main', start: [0, 1], end: [1, 1] },
                ]}
                // style={{ backgroundImage: "linear-gradient(to bottom right, #F2696C, #EFA059)" }}
            >
                <Box gridArea="header" animation={animationHeader}>
                    <AppBar />
                </Box>
                <Box gridArea="main" background="#ffffff" 
                    // margin={{ horizontal: "medium", vertical: "medium" }}
                    // elevation="medium" 
                    // round="medium"
                    overflow={{ "vertical": "auto", "horizontal": "hidden" }}
                    animation={animationMain}
                // style={{ maxHeight: "100%" }} TODO
                >
                    {pageComponent}
                </Box>
            </Grid>
        )
    }
}


const mapStateToProps = (state: any) => {
    return {
        page: state.root.nav.page,
        user: state.root.user.user,
    }
}

const mapDispatchToProps = { setUserState, changePage }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Page)