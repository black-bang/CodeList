import "../Code.scss";
import { ajax } from "api";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import CodeState from "./Code.mobx.js";
import CodeListItem from "./CodeListItem.jsx";
import url from "url";
import QueueAnim from "rc-queue-anim";
//import TweenOne from "rc-tween-one";
import PropTypes from "prop-types";
import { Modal, Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";

const alert = Modal.alert;
@observer
class Code extends React.Component {
  constructor(props) {
    super(props);
    this.query = url.parse(this.props.location.search, true)["query"];
    //this.state = {show: true};
    this.store = new CodeState();

  }
  render() {
    return (
      <div className="box">
        <div className="top">
          <div className="top_text">
            <div className="header_title">{"二维码"}</div>
            <span>
              <Link to="/addCode">{"+"}</Link>
            </span>
          </div>
        </div>
        <div className="content">  
            {this.store.List.map((item, index) => {
              const { Id } = item;
            // console.log(index);
              return <CodeListItem {...item}
                       key={index}   
              >
              </CodeListItem>;
            })}           
        </div>
      </div>
    );
  }
  async componentDidMount() {
    document.title ="二维码"
    Toast.loading("Loading...", 30, () => { });
  try {
      localStorage.setItem("employeeId", this.query.employeeId);
      //console.log(this.query.employeeId);
      const result = await this.store.getCodeList();
      const listLength=await this.store.List.length;
        Toast.hide();
      if (listLength>0) {
       // console.log("有列表");
      } else {
       // console.log("无列表");
        setTimeout(() => {
          alert("  您还没有二维码", "是否立即添加", [
            {
              text: "稍后",
              onPress: () => console.log("cancel"),
              style: "default"
            },
            {
              text: "是",
              onPress: () => this.props.history.push("/addCode")
            }
          ]);
        }, 900);
      }
    } catch (error) {
    if (error =='抱歉,服务器开小差了'){
        Toast.loading(error, 30, () => { });
        setTimeout(()=>{
          Toast.hide();
        },1500)
      }else{
      throw error;
      }
    }
  }


}

export default Code;
