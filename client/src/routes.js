import React from "react";
import { Route, Switch } from "react-router-dom";
import CompareMonths from "./components/CompareMonths";
import FileUpload from "./components/FileUpload";
import TwelvesMonths from "./components/TwelvesMonths";
import VarianceQuater from "./components/VarianceQuater";
import Hoc from "./hoc/hoc";

const BaseRouter =()=> (
    <Hoc>
    <Switch>
        <Route exact path="/" component={FileUpload} />
        <Route exact path="/twelves_months" component={TwelvesMonths} />
        <Route exact path="/difference_month" component={CompareMonths} />
        <Route exact path="/variance_quater" component={VarianceQuater} />
    </Switch>
    </Hoc>
)
export default BaseRouter