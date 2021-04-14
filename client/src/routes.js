import React from "react";
import { Route, Switch } from "react-router-dom";
import FileUpload from "./components/FileUpload";
import Hoc from "./hoc/hoc";

const BaseRouter =()=> (
    <Hoc>
    <Switch>
        <Route exact path="/" component={FileUpload} />
    </Switch>
    </Hoc>
)
export default BaseRouter