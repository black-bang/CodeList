import "./CodeRecord.scss";
import { ajax } from "api";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import CodeRecordListItem from "./CodeRecordListItem/CodeRecordListItem.jsx";
import url from "url";
import CodeRecordState from "./CodeRecord.mobx.js";
import { Modal, Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
import ScrollView from '../../page/ScrollView/ScrollView.jsx'

const alert = Modal.alert;
@observer
class CodeRecord extends React.Component {
    constructor(props) {
        super(props);
        this.query = url.parse(this.props.location.search, true)["query"];
        //this.state = {show: true};
        this.store = new CodeRecordState(this.query);

    }
    render() {
        return (
            <div className="Recordbox">
                <ScrollView store={this.store.ScrollViewState}>
                    {this.store.ScrollViewState.dataList.map((item, index) => {
                            return <CodeRecordListItem {...item} key={index}/>
                        })}
                </ScrollView>>
                </div>
        );
    }


    async componentDidMount() {
        document.title = this.query['Address']
        try {
            const result = await this.store.getCodeRecorList()
        } catch (error) {
            throw error;
        }
    }


}

export default CodeRecord;
