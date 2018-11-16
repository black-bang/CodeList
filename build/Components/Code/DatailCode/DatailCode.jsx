import "../Code.scss";
import { Link } from "react-router-dom";
import { ajax } from "api";
import DatailCodeState from "./DatailCode_mobx";
import DatailCodeItem from "./DatailCodeitem.jsx";
import url from "url";
import { Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
import { withFrame } from "api";
import { webview } from "api"
import { withRouter } from 'react-router'

@withFrame
@withRouter
class DatailCode extends React.Component {
  render() {
    let { selected } = this.state;
    return (
      <div className="datail_box">
        <div className="add_content">
          <li>
            <div className="list_L">{"标题"}</div>
            <div className="list_R">{this.state.data.Title}</div>
          </li>
          <li>
            <div className="list_L">{"地址"}</div>
            <div className="list_R">{this.state.data.Address}</div>
          </li>
          <li>
            <div className="list_L">{"归属员工"}</div>
            <div className="list_R">
              {this.state.dataList}
            </div>
          </li>
          <li>
            <div className="list_L">{"生成类型"}</div>
            <div className="list_R">
              <p className="end">
                <input type="radio" name="time" id="" disabled ref="end" />
                30天
              </p>
              <p className="always">
                <input type="radio" name="time" id="" disabled ref="always" />
                永久
              </p>
            </div>
          </li>
          <li>
            <div className="list_L">{"二维码类型"}</div>
            <div className="list_R">
              {this.state.CodeType}
            </div>
          </li>
          <li>
            <div className="list_L">{"过期时间"}</div>
            <div className="list_R">
              {this.state.data.ExpiryDate}
              <span style={this.ComputedStyle}>{"无"}</span>
            </div>
          </li>
          <li>
            <div className="list_L">{"扫码人数"}</div>
            <div className="list_R" onClick={this.toCodeRecord.bind(this)}>
              {this.state.data.Num || '0'}
              <div className="btn" />
            </div>
          </li>
        </div>
        <div className="codeDatail">
          <button onClick={this.showCode.bind(this)}>下载二维码</button>
       
        </div>
      </div>
    );
  }
  constructor(props) {
    super(props);
    this.query = url.parse(this.props.location.search, true)["query"];
    this.state = {
      defaultChecked: false,
      data: [],
      CodeType: "",
      dataList: ""
    };
  }
  toCodeRecord(){
    this.props.history.push("/CodeRecord?Id=" + this.query['Id'] + '&Address=' + this.state.data.Address);
  }
  showCode() {
               // console.log(this.state.CodeType);
               // console.log(this.state.data.Url)
               const { protocol } = url.parse(this.state.data.Url || "");
               let computenUrl = this.state.data.Url;
               if (protocol !== "http:") {
                 computenUrl = "http://" + computenUrl;
               } else {
                 return computenUrl;
               }
               console.log(computenUrl);
               webview.emit("downQr",computenUrl);
               if (process.env.NODE_ENV === "development"){
                  if(window.WeixinJSBridge) {
                    WeixinJSBridge.invoke("imagePreview", {
                      current: computenUrl,
                      urls: [computenUrl]
                    });
                  }
                  else {
                    this.props.parentWindow.emit("ShowImage", computenUrl);
                    //window.open(computenUrl);
                  }
                } else {
                    this.props.parentWindow.emit("ShowImage", computenUrl);
                     //window.open(computenUrl);
                  }
             }
  get ComputedStyle() {
    if (!this.state.data.ExpiryDate) {
      return { display: "block" };
    } else {
      return { display: "block" };
    }
  }
  async componentDidMount() {
    document.title = "二维码详情"
    try {
      Toast.loading("Loading...", 30, () => { });
      const result = await ajax.get({
        url: "/api/User_Account_QRCode/ModelAsync",
        data: { id: this.query.Id }
      });
      Toast.hide();
      this.setState({ data: result });
      //  console.log(result);
      //   localStorage.setItem('employeeId', result.Employee_Id)
      // console.log(this.state.data.ExpiryDate);
      const CodeType = this.state.data.CodeType;
      // 二维码类型
      if (CodeType == 1) {
        this.setState({ CodeType: "扫码领券" });
      }
      if (CodeType == 2) {
        this.setState({ CodeType: "扫码完善信息" });
      }
      if (CodeType == 3) {
        this.setState({ CodeType: "扫码领取红包" });
      }
      if (CodeType == 4) {
        this.setState({ CodeType: "其他业务场景" });
      }
      if (CodeType == 5) {
        this.setState({ CodeType: "无，仅仅扫码关注" });
      }
      // 二维码时间
      if (this.state.data.ExpiryDate) {
        this.refs.end.checked = true;
      } else {
        this.refs.always.checked = true;
        console.log(this.state.data);
      }
    } catch (error) {
      throw error;
    }
    // 获取员工名字
    try {
      const result = await ajax.get({
        url: "/api/User_Account/GetEmployeInfoAsync/",
        data: {
          EmployeeId: this.state.data.Employee_Id
        }
      });

      this.setState({ dataList: result.AccountName });
    } catch (error) {
      throw error;
    }
  }
}
export default DatailCode;
