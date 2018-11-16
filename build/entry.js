import { WithLogin, StartToRedner } from "api";
// 二维码列表
import Code from "./Components/Code/Code/Code.jsx";
import AddCode from "./Components/Code/AddCode/AddCode.jsx";
import DatailCode from "./Components/Code/DatailCode/DatailCode.jsx";
import UpdataCode from "./Components/Code/UpdataCode/UpdataCode.jsx";
import CodeRecord from "./Components/Code/CodeRecord/CodeRecord.jsx";


import { HashRouter, Route, Switch, Redirect } from "react-router-dom"; 
import { configure } from "mobx"
configure({ enforceActions: "always" });

const target = document.getElementById("AppView");
StartToRedner(function() {
  ReactDOM.render(<WithLogin>
      <HashRouter>
        <Switch>
          <Route path="/" exact render={() => <Redirect to={"/Code"} />} />
          <Route path="/Code" component={Code} />
          <Route path="/AddCode" component={AddCode} />
          <Route path="/DatailCode" component={DatailCode} />
          <Route path="/UpdataCode" component={UpdataCode} />
          <Route path="/CodeRecord" component={CodeRecord} /> 
         
        </Switch>
      </HashRouter>
    </WithLogin>, target);
});
