import React from "react";
import { Route, Switch } from "react-router-dom";
import FileUpload from "./components/FileUpload";
import TwelvesMonths from "./components/TwelvesMonths";
import Hoc from "./hoc/hoc";

const BaseRouter =()=> (
    <Hoc>
    <Switch>
        <Route exact path="/" component={FileUpload} />
        <Route exact path="/twelves_months" component={TwelvesMonths} />
    </Switch>
    </Hoc>
)
export default BaseRouter