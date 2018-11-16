import { withRouter } from "react-router-dom";
import Down from "../../../static/Qcard/down.png";
import Have from "../../../static/Qcard/have.png";
import None from "../../../static/Qcard/null.png";
import { withFrame } from "api";
import url from "url";
//import QueueAnim from "rc-queue-anim";
//import TweenOne from "rc-tween-one";
//import PropTypes from "prop-types";
import { ajax } from "api";
import {webview} from "api"
import SwiperCard from "../../page/SwipeCard/SwipeCard.jsx";
import { Modal, Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";

const alert = Modal.alert;
@withFrame
@withRouter
class CodeListItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { key } = this.props.Id;
    return (
      // <SwiperCard>
      //   <SwiperCard.Content>
          <div className="list">
            <div className="code_wrap" onClick={this.toLink.bind(this)}>
              <span className="code_pic">
                <img src={'http://'+this.props.Url} />
              </span>
              <div className="listRight">
                <p className="codeName">{this.props.Title}</p>
                <p className="codeNumber">
                  已关注
                  {this.props.Num || 0}人
                </p>
                <em className="State" style={this.ComputedStyle.a}>
                  <img src={Have} />
                </em>
                <em className="State0" style={this.ComputedStyle.b}>
                  <img src={None} />
                </em>
              </div>
            </div>
            <span className="downCode" onClick={this.toDown.bind(this)}>
              <img src={Down} />
            </span>
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
  onUpdata(){
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
  toLink() {
    //	console.log(this.props.ResultUrl)
    //window.location.href=this.props.ResultUrl
    this.props.history.push("/datailCode?Id=" + this.props.Id);
  }
  get computedUrl() {
    const { protocol } = url.parse(this.props.Url || "");
    //console.log(this.props.Url);
    let computedUrl = this.props.Url;
    if (protocol !== "http:") {
      return "http://" + computedUrl;
    } else {
      return computedUrl;
    }
  }
  toDown() {
    const { protocol } = url.parse(this.props.Url || "");
    let computedUrl = this.props.Url;
    if (protocol !== "http:") {
      computedUrl = "http://" + computedUrl;
    } else {
      return computedUrl;
    }
    console.log(computedUrl);
    webview.emit("downQr", computedUrl);
    if (process.env.NODE_ENV === "development"){
     if(window.WeixinJSBridge) {
       WeixinJSBridge.invoke("imagePreview", {
         current: computedUrl,
         urls: [computedUrl]
       });
     }else {
       this.props.parentWindow.emit("ShowImage", computedUrl);
      //  window.open(computedUrl);
     }
   } else {
      this.props.parentWindow.emit("ShowImage", computedUrl);
     // window.open(computedUrl);
     
    }
    
  }
  async componentDidMount() {
    if (window.addEventListener) {
      window.addEventListener("touchend", this.onTouchEnd);
      window.addEventListener("mouseup", this.onTouchEnd);
    } else {
      window.attachEvent("ontouchend", this.onTouchEnd);
      window.attachEvent("onmouseup", this.onTouchEnd);
    }
  }
  componentWillUnmount() {
    if (window.addEventListener) {
      window.removeEventListener("touchend", this.onTouchEnd);
      window.removeEventListener("mouseup", this.onTouchEnd);
    } else {
      window.detachEvent("onresize", this.onTouchEnd);
      window.detachEvent("onmouseup", this.onTouchEnd);
    }
  }
}

export default CodeListItem;
