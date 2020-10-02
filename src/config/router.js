import React from 'react'
import {
    BrowserRouter as Router, //alias (nickname)
    Switch,
    Route
} from "react-router-dom";
import Login from '../views/Login'
import Home from '../views/Home'
import Company from '../views/Company'
import ShowCompanyDetails from '../views/ShowCompanyDetails';
import Token from '../views/Token';


export default function MainRouter (){
    return(
        <Router>
            <div>
                <Switch>
                    <Route path='/' exact>
                        <Login/>
                    </Route>
                    <Route path='/home'>
                        <Home/>
                    </Route>
                    <Route path='/company'>
                        <Company/>
                    </Route>
                    <Route path='/showCompanyDetails/:companyId'>
                        <ShowCompanyDetails/>
                    </Route>
                    <Route path='/Token/:companyId'>
                        <Token/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}