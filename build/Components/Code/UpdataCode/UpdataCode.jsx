import "../Code.scss";
import { Link } from "react-router-dom";
import { ajax } from "api";
import UpdataCodeState from "./UpdataCode_mobx";
import UpdataCodeItem from "./UpdataCodeitem.jsx";
import url from "url";
import Input from '../../page/BaseIput.jsx';
import BasePicker from "../../page/BasePicker.jsx";
import { Modal, Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";

const alert = Modal.alert;

//import img from "../wx.jpg";
class UpdataCode extends React.Component {
  render() {
    let { selected } = this.state;
    return <div className="Updata_box">
        <div className="top">
          <div className="top_text">
            <div className="header_title">{"修改二维码"}</div>
            <span onClick={this.save.bind(this)}>{"保存"}</span>
          </div>
        </div>
        <div className="add_content">
          <li>
            <div className="list_L">{"标题"}</div>
            <div className="list_R">{this.state.data.Title}</div>
          </li>
          <li>
            <div className="list_L">{"地址"}</div>
            <div className="list_R">
              {" "}
              <Input type="text" placeholder="请输入地址" onChange={this.Address.bind(this)} />
            </div>
          </li>
          <li>
            <div className="list_L">{"归属员工"}</div>
            <div className="list_R">
              <BasePicker data={this.state.empolyList} onChange={data => {
                  //localStorage.setItem(("employee_Id", data.keyvalue));
              this.setState({ empolyId: data.keyvalue });
                }} />
              <div className="btn" />
            </div>
          </li>
          <li>
            <div className="list_L">{"时间类型"}</div>
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
            <BasePicker
              data={BasePicker.type.kind()}
              onChange={data => {
                console.log(data.keyvalue);
                this.setState({ CodeType: data.keyvalue });
              }}
            />
              <div className="btn" />
            </div>
          </li>
          <li>
            <div className="list_L">{"过期时间"}</div>
            <div className="list_R">
              {this.state.data.ExpiryDate}
              <span style={this.ComputedStyle}>{"无"}</span>
            </div>
          </li>
        </div>
      </div>;
  }
  constructor(props) {
    super(props);
    this.query=url.parse(this.props.location.search,true)["query"]
    this.state = {
      defaultChecked: false,
      data: [],
      Address: "",
      CodeType: "",
      dataList:"",
      empolyList:[],
      empolyId:'',
      Title:""
    };
  }
  Title(e, value) {
    this.setState({ Title: value });
  }

  Address(e, value) {
    this.setState({ Address: value });
  }
  showCode() {
   // console.log(this.state.CodeType);
    if (window.WeixinJSBridge) {
      WeixinJSBridge.invoke("imagePreview", {
        current: "http://" + this.state.data.Url,
        urls: ["http://" + this.state.data.Url]
      });
    }
  }
  get ComputedStyle() {
    if (!this.state.data.ExpiryDate) {
      return { display: "block" };
    } else {
      return { display: "block" };
    }
  }
 async save(){
    // 修改二维码信息接口
   let obj = Object.assign({}, this.state);
    if (!obj.CodeType || !obj.empolyId || !obj.Address){
      alert("提示", "有选项未发生改变,是否继续保存!", [
        {
          text: "否",
          onPress: () => console.log("cancel"),
          style: "default"
        },
        {
          text: "是",
          onPress: () => {
            this.props.history.push("/Code");
            this.setState({ Id: this.query.Id });
            try {
              const result = ajax.post({
                url: "/api/Wx_QRCode/UpdateAsync/",
                data: {
                  Id: this.query.Id,
                  Title: obj.data.Title,
                  employee_Id: obj.empolyId,
                  Address: obj.Address,
                  codeType: obj.data.CodeType,
                  url: obj.data.Url
                }
              });
              this.setState({ ...obj });
              localStorage.setItem("employeeId", this.state.empolyId);
              this.setState({ dataList: result.AccountName });
              // this.props.history.replace("/Code?employeeId=" + localStorage.employeeId);
            } catch (error) {
              if (error == '值“undefined”对于 CodeType 无效。') {
                Toast.info('二维码类型未选择', 1.2)
              }
              //alert(error)
              Toast.info(error, 1.2)
            }
          }
        }
      ]);

    // 默认地址
   if (!obj.Address) {
     obj.Address = obj.data.Address;
     console.log(obj.Address);
    }
   else {

   }
    // 员工Id
    if (!obj.empolyId) {
      obj.empolyId = obj.data.Employee_Id;
      console.log(obj.empolyId);
    }
    else {
    }
    // 二维码类型
   if (!obj.CodeType) {
     obj.CodeType = obj.data.CodeType;
     console.log(obj.CodeType);
   } else{
   }
    }
   if (obj.CodeType.length > 0 && obj.empolyId.length > 0 && obj.Address.length > 0){
     alert("提示", "修改完成,是否保存?", [
       {
         text: "否",
         onPress: () => console.log("cancel"),
         style: "default"
       },
       {
         text: "是",
          onPress: () => {
           this.props.history.push("/Code");
           this.setState({ Id: this.query.Id });
           try {
             const result =  ajax.post({
               url: "/api/Wx_QRCode/UpdateAsync/",
               data: {
                 Id: this.query.Id,
                 Title: obj.data.Title,
                 employee_Id: obj.empolyId,
                 Address: obj.Address,
                 codeType: obj.data.CodeType,
                 url: obj.data.Url
               }
             });
             this.setState({ ...obj });
             localStorage.setItem("employeeId", this.state.empolyId);
             this.setState({ dataList: result.AccountName });
             // this.props.history.replace("/Code?employeeId=" + localStorage.employeeId);
           } catch (error) {
             if (error == '值“undefined”对于 CodeType 无效。') {
               Toast.info('二维码类型未选择', 1.2)
             }
             //alert(error)
             Toast.info(error, 1.2)
           }
         }
       }
     ]);
}
  }
  async componentDidMount() {
    console.log(this.state.Id);
    Toast.loading('Loading...', 30, () => {
    });
    setTimeout(() => {
      Toast.hide();
    }, 800);
    //获取二维码Title 及 用户Id
    try {
      const result = await ajax.get({
        url: "/api/Wx_QRCode/ModelAsync/",
        data: { id: this.query.Id }
      });
      this.setState({ data: result });
      sessionStorage.setItem("defaultAddress", result.Address);
      sessionStorage.setItem("defaultEmployeeId", result.Employee_Id);
      sessionStorage.setItem("defaultCodeType", result.CodeType);
      document.title = result.Title
     console.log(result);
     // console.log(this.state.data.ExpiryDate);
      // const CodeType = this.state.data.CodeType;
      // // 二维码类型
      // if (CodeType == 1) {
      //   this.setState({ CodeType: "扫码领券" });
      // }
      // if (CodeType == 2) {
      //   this.setState({ CodeType: "扫码完善信息" });
      // }
      // if (CodeType == 3) {
      //   this.setState({ CodeType: "扫码领取红包" });
      // }
      // if (CodeType == 4) {
      //   this.setState({ CodeType: "其他业务场景" });
      // }
      // if (CodeType == 5) {
      //   this.setState({ CodeType: "无，仅仅扫码关注" });
      // }
     // 二维码时间
      if (this.state.data.ExpiryDate) {
        this.refs.end.checked = true;
      } else {
        this.refs.always.checked = true;
      }
    } catch (error) {
      console.log(error);
    }
  


  //获取员工列表
    try {
      const result = await ajax.get({
        url: "/api/User_Account/GetLowerEmployeeListAsync/",
        data: {
          departure: true
        }
      });
      const formatData = result.data.map(Item => {
        return {
          value: String(Item["EmployeeId"]),
          label: Item["AccountName"]
        };
      });

      this.setState({ empolyList: formatData });
      // console.log(this.state.dataList);
    } catch (error) {
      console.log(error);
    }
  }

  
}
export default UpdataCode;
