
class UpdataCodeItem extends React.PureComponent {
  render() {
    return (
      <div>
        <div className="list">
          <div className="list_L">{"标题"}</div>
                <div className="list_R">{this.props.Title}</div>
        </div>
        <div className="list">
          <div className="list_L">{"地址"}</div>
          <div className="list_R">{"地址"}</div>
        </div>
        <div className="list">
          <div className="list_L">{"归属员工"}</div>
          <div className="list_R">
            {"归属员工"}
            <div className="btn" />
          </div>
        </div>
        <div className="list">
          <div className="list_L">{"生成类型"}</div>
          <div className="list_R">
            <p className="end">
              <input type="radio" name="time" id="" defaultChecked disabled />
              30天
            </p>
            <p className="always">
              <input type="radio" name="time" id="" disabled />
              永久
            </p>
          </div>
        </div>
        <div className="list">
          <div className="list_L">{"二维码类型"}</div>
          <div className="list_R">
            {"扫码领券"}
            <div className="btn" />
          </div>
        </div>
        <div className="list">
          <div className="list_L">{"过期时间"}</div>
          <div className="list_R">{"2018-09-09"}</div>
        </div>
      </div>
    );
  }
  async componentDidMount() {
    console.log("111111");
  }
}

export default UpdataCodeItem;
