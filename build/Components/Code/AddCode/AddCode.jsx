import "../Code.scss";
import { Link } from "react-router-dom";
import { ajax } from "api";
import AddCodeState from "./AddCode_mobx";
import AddCodeItem from "./AddCodeitem.jsx";
import BasePicker from "../../page/BasePicker.jsx";
import { values } from "mobx";
import Input from "../../page/BaseIput.jsx";
import { withRouter } from "react-router-dom";
import { Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
import ButtonPromise from '../../page/ButtonPromise/ButtonPromise/ButtonPromise.jsx'



@withRouter
class AddCode extends React.Component {
  render() {
    return <div className="addCode_box">
        <div className="top">
          <div className="top_text">
            <div className="header_title">{"添加二维码"}</div>
           <ButtonPromise className='submit'
            ref='saveBtn'
            onClick={this.save.bind(this)}
            theme={ButtonPromise.style.typeSave()}
              style={this.ComputedStyle}
            
          >
            {"保存"}
          </ButtonPromise>
          </div>
        </div>
        <div className="add_content">
          <li>
            <div className="list_L">{"标题"}</div>
            <div className="list_R">
              <Input type="text" placeholder="请输入标题" onChange={this.Title.bind(this)} />
            </div>
          </li>
          <li>
            <div className="list_L">{"地址"}</div>
            <div className="list_R">
              <Input type="text" placeholder="请输入地址" onChange={this.Address.bind(this)} />
            </div>
          </li>
          <li>
            <div className="list_L">{"归属员工"}</div>
            <div className="list_R">
              <BasePicker data={this.state.dataList} onChange={data => {
                  this.setState({ Id: data.keyvalue });
                  console.log(data.keyvalue);
                }} />

              <div className="btn" />
            </div>
          </li>
          <li>
            <div className="list_L">{"生成类型"}</div>
            <div className="list_R">
              <p className="end">
                <input type="radio" name="time" id="" defaultChecked ref="end" />
                30天
              </p>
              <p className="always">
                <input type="radio" name="time" id="" ref="always" />
                永久
              </p>
            </div>
          </li>
          <li>
            <div className="list_L">{"二维码类型"}</div>
            <div className="list_R">
              <BasePicker data={BasePicker.type.kind()} onChange={data => {
                  this.setState({ codeType: data.keyvalue });
                }} />
              <div className="btn" />
            </div>
          </li>
        </div>
      </div>;
  }
  constructor(props) {
    super(props);
    this.isMount=true;
    this.state = {
      Title: "",
      Address: "",
      Id: "",
      dateType: "",
      codeType: "",
      dataList: [],
      flag:true,
      waiting: false
    };
  }
  Title(e, value) {
    this.setState({ Title: value });
  }
  Address(e, value) {
    this.setState({ Address: value });
  }
  componentWillUnmount(){
    this.isMount=false
  }
  get ComputedStyle() {
    if (this.state.Title.length > 0) {
      return {
        color: '#04c419'
      };
    }else{
      return{
        color: '#aaa'
      }
    }
  }
  get canSubmit(){

  }
  async save() {
    if (this.state.flag == false) {
      return false
    }
    console.log(this.state.flag);
    let obj = Object.assign({}, this.state);
    try {
      if (this.refs.end.checked) {
        obj.dateType = 1;
      }
      if (this.refs.always.checked) {
        obj.dateType = 0;
        console.log(obj.dateType);
      }
      if (!obj.codeType) {
        Toast.info("二维码类型未选择", 1.5);
      }
      if (!obj.Id) {
        Toast.info("归属员工未选择", 1.5);
      }
      if (!obj.Title) {
        Toast.info("标题不能为空", 1.5);
      }
      this.setState({ ...obj });
      this.setState({ flag: false })
      if (obj.Id && obj.codeType) {
        const result = await ajax.post({
          url: "/api/User_Account_QRCode/AddAsync/",
          data: {
            title: obj.Title,
            address: obj.Address,
            employee_Id: obj.Id,
            dateType: obj.dateType,
            codeType: obj.codeType
          }
        });
        Toast.info("保存成功", 2);
          this.props.history.replace("/Code");
      }
      if(this.isMount){
        this.setState({ flag: true })
      }
      
    } catch (error) {
      if (this.isMount) {
        this.setState({ flag: true });
      }
      
      if (this.state.flag == false) {
        return false
      }
      throw error;
  }
  }
  async componentDidMount() {
    document.title = "添加二维码";
    //  console.log(document.title)
    Toast.loading("Loading...", 30, () => {});
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
      Toast.hide();
      this.setState({ dataList: formatData });
      // console.log(this.state.dataList);
    } catch (error) {
      throw error;
    }
  }
  //  componentWillUpdate(nextProps,nextState){
  //    console.log(nextProps, nextState)
  //  }
}
export default AddCode;
