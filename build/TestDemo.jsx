import {signout,ajax} from "api"


class TestDemo extends React.Component {
	render(){
		return (
		<div>
			<button onClick={this.handleClick}>{"退出登录"}</button>
			{this.state.data.map((ListItem,index)=>{
				return (
				<div key={index}>
					{ListItem["ChatName"]}
				</div>)
			})}
		</div>	
	)}
	constructor(props){
	  	super(props);
	  	this.state={data:[]};
	}
	async componentDidMount(){
		try{
			const result=await ajax.get({
				url:"/api/Wl_Chat_Info/ListAsync/",
				data:{pagenum:0,pagesize:40}
			})
			console.log(result);
			this.setState({data:result["data"]})
		}catch(error){
			throw error
		}
	}
	handleClick=()=>{
		signout()
	}
}
export default TestDemo