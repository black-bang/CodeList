import { withRouter } from "react-router-dom";
import { withFrame } from "api";
import url from "url";
import { ajax } from "api";
import { webview } from "api"
import SwiperCard from "../../../page/SwipeCard/SwipeCard.jsx";
import { Modal, Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";

const alert = Modal.alert;
@withFrame
@withRouter
class CodeRecordListItem extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            // <SwiperCard>
            //   <SwiperCard.Content>
            <div className="list">
                <div className="code_wrap">
                    <span className="code_pic">
                        <img src={ this.props.Picture} />
                    </span>
                    <div className="listRight">
                        <p className="codeName">{this.props.Name}</p>
                        <p className="codeNumber">
                           业务员:{this.props.employeeName}
                </p>
                        {/* <em className="State" style={this.ComputedStyle.a}>
                            <img src={Have} />
                        </em>
                        <em className="State0" style={this.ComputedStyle.b}>
                            <img src={None} />
                        </em> */}
                    </div>
                </div>
                {/* <span className="downCode" onClick={this.toDown.bind(this)}>
                    <img src={Down} />
                </span> */}
            </div>
            //   </SwiperCard.Content>
            //   <SwiperCard.ButtonGroup>
            //     {/* <SwiperCard.ButtonGroup.Item onClick={this.onUpdata.bind(this)}>
            //       {"修改"}
            //     </SwiperCard.ButtonGroup.Item> */}
            //     <SwiperCard.ButtonGroup.Item onClick={this.onDelete.bind(this)}>
            //       {"删除"}
            //     </SwiperCard.ButtonGroup.Item>
            //   </SwiperCard.ButtonGroup>
            // </SwiperCard>
        );
    }
    onUpdata() {
        this.props.history.push("/UpdataCode?Id=" + this.props.Id);
    }

    // onDelete = () => {
    //   alert("警告", "是否删除二维码!", [
    //     {
    //       text: "否",
    //       onPress: () => console.log("cancel"),
    //       style: "default"
    //     },
    //     {
    //       text: "是",
    //       onPress: () => {
    //         try {
    //           const result = ajax.post({
    //             url: "/api/Wx_QRCode/DeleteAsync/",
    //             data: { id: this.props.Id }
    //           });
    //           location.reload();
    //         } catch (error) {
    //           throw error;
    //         }
    //       }
    //     }
    //   ]);
    // };
    get ComputedStyle() {
        // const { State } = this.props;
        if (this.props.State == true) {
            return {
                a: { display: "block" },
                b: { display: "none" }
            };
        } else {
            return {
                a: { display: "none" },
                b: { display: "block" }
            };
        }
    }
    async componentDidMount() {
      
    }
}

export default CodeRecordListItem;
