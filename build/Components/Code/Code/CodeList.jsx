import { withRouter } from "react-router-dom";
import Down from "../../../static/下载.png";
import Have from "../../../static/有效.png";
import None from "../../../static/过期.png";
import { withFrame } from "api";
import url from "url";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import PropTypes from "prop-types";
import { ajax } from "api";
import CodeState from "./Code.mobx.js";
import { observer } from "mobx-react";

@withFrame
@withRouter
@observer
class CodeListItem extends React.Component{
    constructor(props) {
        super(props);
        this.store = new CodeState();
    }
    render() {
        <React.Fragment>
            <div></div>
            {this.store.List.map((item, index) => {
                const { Id } = item
                console.log(index)
                return(
                    <li key ={Id}>
                        {item.Id}
                    </li>
                )
            })}
        </React.Fragment>

    }
    async componentDidMount() {
        try {
            const result = await this.store.getCodeList();
        } catch (error) {
            throw error
        }
    }
}

export default CodeListItem
