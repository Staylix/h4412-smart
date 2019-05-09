import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation'

import SignIn from '../components/SignIn'
import TourList from '../components/TourList'
import TourDetails from '../components/TourDetails'
import StepDetails from '../components/StepDetails'
import QuizzDetails from '../components/QuizzDetails'

const style = {
    headerStyle: {
        backgroundColor: '#F2696C',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    },
}

const TourStackNavigator = createStackNavigator(
    {
        TourList: {
            screen: TourList,
            navigationOptions: {
                title: 'Liste des parcours'
            }
        },
        TourDetails: {
            screen: TourDetails,
            navigationOptions: {
                title: 'Détails du parcours'
            }
        },
        StepDetails: {
            screen: StepDetails,
            navigationOptions: {
                title: 'Détails de l\'étape'
            }
        },
        QuizzDetails: {
            screen: QuizzDetails,
            navigationOptions: {
                title: 'Validation de l\'étape'
            }
        },
    },
    {
        initialRouteName: "TourList",
        defaultNavigationOptions: style,

    }
)

const SignInNavigator = createStackNavigator(
    {
        SignIn: {
            screen: SignIn,
            navigationOptions: {
                title: 'Connexion'
            }
        }
    },
    {
        defaultNavigationOptions: style,
    }
)


export default createAppContainer(
    createSwitchNavigator(
        {
            SignIn: SignInNavigator,
            App: TourStackNavigator
        },
        {
            initialRouteName: 'SignIn',
        }
    )
)
