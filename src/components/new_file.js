import React from 'react';
export default class App extends React.Component{
	constructor(props){
	    super(props);
	}
	  render(){
		return (
		  <div className='app flex flex-column h-full' style={{background: 'linear-gradient(-10deg, #000000, #ffffff)'}}>
				<div className='wai'style={{width: "300px",height:" 600px",border: "1px solid white"}}>
					<Initdiv callback = {this.callback}></Initdiv>
				</div>				
				
		  </div>
		);
		}
};
const keynum = {
			65:'a',
			68:'d',
			83:'s',
		}
const move = {
			'a':[0,-1],
			'd':[0,1],
			's':[1,0]
		}
const totalscore = {
			1:10,
			2:30,
			3:60,
			4:100,
		}
class Initdiv extends React.Component{
	constructor(props) {
	    super(props);
		this.state = {
			arr:[
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0,0],
			],
			initx:0,
			inity:4,
			before:[],
			nextshape:[[1,1],[1,2],[2,1],[2,2]],
			// nextshape:[[1,1],[1,2],[2,1],[2,2]],
			type:6,
			panding:false,
			overgame:false,
			nextarr:[
				[0,0,0,0],
				[0,0,0,0],
				[0,0,0,0],
				[0,0,0,0],
			],
			shapes:[
				[[0,-1],[0,0],[0,1],[0,2]],
				[[0,-1],[0,0],[0,1],[1,0]],
				[[0,-1],[0,0],[0,1],[1,-1]],
				[[0,-1],[0,0],[0,1],[1,1]],
				[[0,1],[0,0],[1,-1],[1,0]],
				[[0,-1],[0,0],[1,0],[1,1]],
				[[0,0],[0,1],[1,0],[1,1]],
				],
			score:0,
			
		}
	}
	onKeyDown = (e) => {
		let after = [];
		if(e.keyCode === 87){
			after = this.revolveShapes();
		}else{
			this.moveDiv(keynum[e.keyCode],after);
		}
		this.keyDownCollision(after);
	}
	moveDiv(dir,after){
		let shape = this.state.before;
		let x = this.state.initx;
		let y = this.state.inity;
		shape.forEach((val,index,curarr)=>{
				after[index] = [val[0] + move[dir][0],val[1] + move[dir][1]];
				this.setState({initx:x + move[dir][0],inity:y + move[dir][1]});
			}
		)
		
		this.setState({before:shape})
	}
	keyDownCollision(after){
		this.checkCollision(after);
		if(!this.state.panding){
			this.changeData(after);
		}
	}
	revolveShapes(){
		let aftershape = [];
		console.log(this.state.type);
		if(this.state.type === 6){
			aftershape = this.state.before;
		}else{
			this.state.before.forEach((val,index,curarr)=>{
				let row = val[0] - this.state.initx;
				let col = val[1] - this.state.inity;
				aftershape[index] = [val[0] + col - row , val[1] - col - row];
			});
		}
		return aftershape;
	}
	// componentWillMount(){
	// 	this.createRandom();
	// }
	componentDidMount() {
		// this.createRandom();
		
		this.initNextShape();
		this.initShape();
		document.addEventListener('keydown',this.onKeyDown)
		this.time = setInterval(() => this.divDown(),300)
	}
	createRandom(){
		let shape = this.state.shapes;
		let randomnum = parseInt(Math.random() * shape.length);
		// let randomnum = 6;
		this.setState({type:randomnum});
	}
	isOverGame(){
		let arr = this.state.arr;
		let overgame = arr[0].some((val)=>{
			return val === 2;
		})
		if(overgame){
			this.setState({overgame:true});
		}
	}
	creatShapes(){
		let shapes = this.state.shapes;
		let shape = [];
		shapes[this.state.type].forEach((val,index,curarr)=>{
			shape[index] = [val[0] + this.state.initx, val[1] + this.state.inity];
		})
		return shape;
	}
	createNextShapes(){
		let nextshape = [];
		this.state.shapes[this.state.type].forEach((val,index,curarr)=>{
			nextshape[index] = [val[0] + 1, val[1] + 1];
		})
		return nextshape;
	}
	checkCollision(after){
		this.setState({panding:false});
		after.forEach((val,index,curarr)=>{
			if(val[0] <= 19 ){
				var value = this.state.arr[val[0]][val[1]];
			}
			if(value === 2 || val[1] < 0 || val[1] > 9 || val[0] === 20){
				this.setState({panding:true})
			}
		})
	}
	divDown(){
		//over
		this.isOverGame();
		if(this.state.overgame){
			alert("game over");
			clearInterval(this.time);
		}
		let after = [];
		let arrlist = this.state.arr;
		// console.log(a);
		this.state.before.forEach((val,index,curarr)=>{
			after[index] = [val[0] + 1,val[1]];
			// console.log(index);
		});
		this.checkCollision(after);
		
		if(this.state.panding){
			this.state.before.forEach((val,index,curarr)=>{
				arrlist[val[0]][val[1]] = 2;
			})
			let a = arrlist.filter((val,index)=>!val.every((value)=>value === 2))
			var alen = 20 - a.length;
			
			let aa = [];
			if(alen > 0){
				for(let i = 0;i<alen;i++){
					aa[i] = [0,0,0,0,0,0,0,0,0,0];
				}
				// this.setState({score:this.state.score += totalscore[alen],arr:new Array(alen).fill(new Array(10).fill(0)).concat(a)});
				this.setState({score:this.state.score += totalscore[alen],arr:aa.concat(a)});
			}
			// if(alen > 0){
			// 	this.setState({score:this.state.score += totalscore[alen],arr:new Array(alen).fill(new Array(10).fill(0)).concat(a)});
			// }
			
			// this.setState({arr:new Array(alen).fill(new Array(10).fill(0)).concat(a),initx:0,inity:4,nextarr:new Array(4).fill(new Array(4).fill(0))});
			this.setState({initx:0,inity:4,nextarr:[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]});
			this.initShape();
			this.createRandom();
			this.initNextShape();
		}else{
			this.changeData(after);
			this.setState({initx:this.state.initx + 1});
		}
	}
	changeData(after){
		let arrlist = this.state.arr;
		this.state.before.forEach((val,index,curarr)=>{
			arrlist[val[0]][val[1]] = 0;
		});
		after.forEach((val,index,curarr)=>{
			arrlist[val[0]][val[1]] = 1;
		});
		this.setState({before:after,arr:arrlist});
	}
	initShape(){
		this.setState({before:this.creatShapes()})
		let arrlist = this.state.arr;
		this.state.before.forEach((val,index,curarr)=>{
			arrlist[val[0]][val[1]] = 1;
		})
		this.setState({arr:arrlist})
	}
	initNextShape(){
		this.setState({nextshape:this.createNextShapes()})
		let nextarrlist = this.state.nextarr;
		this.state.nextshape.forEach((val,index,curarr)=>{
			nextarrlist[val[0]][val[1]] = 1;
		})
		this.setState({nextarr:nextarrlist})
	}
	render(){
		return ( 
			<>
				{
					this.state.arr.map((rowItem, rowIndex) =>
						<div>
							{
								rowItem.map((item, index) =>
								{
									if(item === 0){
										return <div 
										key={`next ${rowIndex} ${index}`} 
										style={{background:"lightgrey",width:"28px",height:"28px",border:"1px solid white",float:"left"}}
									/>
									}else if(item === 1){
										return <div
											key={`next ${rowIndex} ${index}`} 
											style={{background:"red",width:"28px",height:"28px",border:"1px solid white",float:"left"}}
										/>
									}else if(item === 2){
										return <div
											key={`next ${rowIndex} ${index}`} 
											style={{background:"red",width:"28px",height:"28px",border:"1px solid white",float:"left"}}
										/>
									}
								}
								)
							}
						</div>
					)
				}
				<div className="left"style={{display: "flex",justifyContent: "center",alignItems: "center",width: "300px",height: "250px",border: "1px solid white"}}>
					<div style={{color:"white"}}>
						<div className="nei">
							<div style={{fontSize:"large",marginBottom:"5px"}}>俄罗斯方块</div>
								<div className="wainext"></div>
									下一块
								<div className="next" style={{width: "120px",height: "120px"}}>
									<>
										{
											this.state.nextarr.map((rowItem, rowIndex) =>
												<div>
													{
														rowItem.map((item, index) =>
															{
																if(item === 0){
																	return <div 
																	key={`next ${rowIndex} ${index}`} 
																	style={{background:"lightgrey",width:"28px",height:"28px",border:"1px solid white",float:"left"}}
																/>
																}else if(item === 1){
																	return <div
																		key={`next ${rowIndex} ${index}`} 
																		style={{background:"red",width:"28px",height:"28px",border:"1px solid white",float:"left"}}
																	/>
																}
															}
														)
													}
												</div>
											)
										}
									</>
								</div>
						</div>
							<p>得分：<span id="score" style={{color:"red"}}>{this.state.score}</span> </p>
							<p>游戏规则：<br /> W变形 A 左移 S 加速 D 右移</p>
					</div>
				</div>
			</>
		);
	}
}