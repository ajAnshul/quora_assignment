import React from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import QuestionList from './components/QuestionList';


const Routing = ({props}) => {
    return(
        <Router>
            <Route path="/" component={QuestionList} />
        </Router>
    )
}


export default Routing;