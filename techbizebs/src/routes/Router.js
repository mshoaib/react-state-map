import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link ,Redirect } from 'react-router-dom';
import Login from '../screens/Login';
import Igct from '../components/inv/icgt/icgtSearchPG';
import Igc from '../components/inv/icg/icgSearchPG';
import Ic from '../components/inv/ic/icSearchPG';
import Isc from '../components/inv/isc/iscSearchPG';
import Protected from '../ProtectedRoute';
import LandingPG from '../screens/LandingPG';





const NewRouter = () => {

    const v_auth = localStorage.getItem("auth");

    console.log(v_auth);

    return (
        <Router> 
            <div>
                 <Switch>
                    <Route exact path="/">
                    <Protected cmp={Login} />
                    </Route>

                    {/* <Redirect to ="/LandingPG">
                    <Protected cmp={LandingPG} />

                    </Redirect> */}

                    {/* <Route exact path="/igc" component={Igc} />
                    <Route exact path="/ic" component={Ic} />
                    <Route exact path="/isc" component={Isc} /> */}

                </Switch>
            </div>
        </Router>
    )


}

export default NewRouter;















// const Router = (props) => {

//     const vloginvalue = null;

//    // vloginvalue = props;
//     console.log("router props ",Login.props  )
//     return(
//     <BrowserRouter>
//     {/* <Header /> */}
//     <Switch>
//     <Route
//         exact
//         path='/'
//         component={Login}
//         props


//      />
//     </Switch>
//     </BrowserRouter>


// );

// }

// export default Router;
