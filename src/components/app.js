import React from 'react';
import { Slider } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'redux';
import box_action_creator from '../actions/box_action_creator';
import time_action from '../actions/time_action';
// import box_selector,{recordArr,recordBeforeShape,recordShape,InitState,actions} from '../selectors/box_selector';
// import timetravel_reducer, { InitState } from '../reducers/timetravel_reducer'
import { boxInitialState } from '../reducers';
export const SHAPE_ARR = [
  [[[0, 1], [1, 1], [2, 1], [3, 1]], [[1, 0], [1, 1], [1, 2], [1, 3]]],//一
  [[[1, 0], [0, 1], [1, 1], [2, 1]], [[1, 0], [1, 1], [1, 2], [0, 1]], [[1, 2], [0, 1], [1, 1], [2, 1]], [[1, 0], [1, 1], [1, 2], [2, 1]]], // T
  [[[0, 0], [0, 1], [1, 1], [2, 1]], [[0, 2], [1, 0], [1, 1], [1, 2]], [[0, 1], [1, 1], [2, 1], [2, 2]], [[1, 0], [1, 1], [1, 2], [2, 0]]], //L
  [[[0, 1], [1, 1], [2, 1], [2, 0]], [[1, 0], [1, 1], [1, 2], [0, 0]], [[0, 0], [0, 1], [1, 0], [2, 0]], [[1, 0], [1, 1], [1, 2], [2, 2]]],  //L2
  [[[0, 0], [1, 0], [1, 1], [2, 1]], [[1, 2], [1, 1], [2, 0], [2, 1]]], //z
  [[[0, 1], [1, 1], [1, 0], [2, 0]], [[1, 0], [1, 1], [2, 1], [2, 2]]], //s
  [[[1, 1], [1, 2], [2, 1], [2, 2]]], //o
];
const SCORE_LIST = {
  1: 10,
  2: 30,
  3: 60,
  4: 100
}
const InitState = {
  timeNextType: 0,
  timeArr: [],
  timeType: 0,
}
const recordBeforeShape = (timeType) => ({
  type: 'recordBeforeShape',
  payload: { timeType },
})
const recordShape = (timeNextType) => ({
  type: 'recordShape',
  payload: { timeNextType },
})
const recordArr = (timeArr) => ({
  type: 'recordArr',
  payload: { timeArr },
})


// console.log(actions)
const aFuns = (actions) => {
  let comFuns = actions.map((action) => {
    switch (action.type) {
      case 'recordBeforeShape':
        return (state)=>{
            return { ...state, timeType: action.payload.timeType };
          }
      case 'recordShape':
        return (state)=>{
          return { ...state, timeNextType: action.payload.timeNextType };
        }
      case 'recordArr':
        return (state)=>{
          return { ...state, timeArr: action.payload.timeArr };
        }
      default:
        return null;
    }
  })
  let comresult = compose(...comFuns);
  return comresult(InitState);
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      nextArr: new Array(4).fill(new Array(4).fill(0)),
      squareArr: new Array(4).fill(new Array(4).fill(0)),
    };
  }
  storagearr = [];
  spaceCount = 0;
  collision = false;
  time = 0;
  timeline = [];
  index = 0;
  timearrline = [];
  timetypeline = [];
  isreverse = false;
  // previousClick = () => {
  //   clearInterval(this.time);
  //   if (this.index > 0) {
  //     this.index--;
  //     this.props.onrecord(Number(this.timeline.slice(0, this.index + 1).slice(this.index, this.index + 1)));
  //     this.props.onrecordtop(Number(this.timetypeline.slice(0, this.index + 1).slice(this.index, this.index + 1)), this.timearrline.slice(0, this.index + 1).slice(this.index, this.index + 1)[0]);
  //     this.setState({ arr: this.props.timeArr });
  //     this.createShape(this.props.timeType);
  //     this.createNext(this.props.timeNextType);
  //     // console.log(this.index)
  //   }
  //   else {
  //     this.isreverse = true;
  //     this.nextClick();
  //     return;
  //   }
  // }
  // nextClick = () => {
  //   if (this.index < this.timeline.length) {
  //     this.index++;
  //     this.props.onrecord(Number(this.timeline.slice(this.index, this.timeline.length).slice(0, 1)));
  //     this.props.onrecordtop(Number(this.timetypeline.slice(this.index, this.timeline.length).slice(0, 1)), this.timearrline.slice(this.index, this.timeline.length).slice(0, 1)[0]);
  //     this.setState({ arr: this.props.timeArr });
  //     this.createShape(this.props.timeType);
  //     this.createNext(this.props.timeNextType);
  //     // console.log(this.index)
  //   }
  //   else {
  //     this.isreverse = false;
  //     this.previousClick();
  //     this.setState({ arr: this.storagearr });
  //     return;
  //   }
  // }
  // reStart = () => {
  //   this.setState({ arr: this.props.timeArr });
  //   this.createShape(this.props.beforeType);
  //   this.createNext(this.props.type);
  //   this.time = setInterval(() => this.shapeDivDown(), 500);
  // }
  onKeyDown = (e) => {
    let { x, y } = this.props;
    let curx = x;
    let cury = y;
    switch (e.keyCode) {
      case 83:
        curx++;
        break;
      case 87:
        this.isRevolve();
        break;
      case 65:
        cury--;
        break;
      case 68:
        cury++;
        break;
      case 32:
        if (this.spaceCount === 0) {
          this.createShape(this.props.beforeType);
          this.createNext(this.props.type);
          this.time = setInterval(() => this.shapeDivDown(), 500);
          this.spaceCount++;
          // this.setState({ arr: this.storagearr });
        }
        else {
          this.spaceCount = 0;
          clearInterval(this.time);
        }
        break;
      default:
        break;
    }
    if (!this.isCollision(curx, cury)) {
      this.props.initKeyDown(curx, cury)
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }
  createShape(beforeType) {
    this.setState({
      squareArr: this.state.squareArr.map((itemRow, indexRow) =>
        itemRow.map((val, index) =>
          SHAPE_ARR[beforeType][0].some(([x, y]) => x === indexRow && y === index) ? 1 : 0
        )
      )
    })
  }

  // comready(state){
  //   box_selector()
  // }
  // comFuns(arrFuns){
  //   let cFuns = arrFuns.map()
  // }

  // arrFuns=(state)=>{
  //   return state + 2;
  // }


  shapeDivDown() {

    // this.arrFuns(InitState)
    // let reco = this.timeline.map(val=>compose(val)(1))
    let nextX = this.props.x + 1;
    let nextY = this.props.y;
    if (this.isCollision(nextX, nextY)) {
      
      
      // this.props.onrecordBeforeShape(this.props.beforeType);
      // this.props.onrecordShape(this.props.type);
      // this.props.onrecordArr(this.props.arr);
      // console.log(this.props.timeArr);
      // console.log(box_selector)
      // console.log()
      // this.index++;
      // this.timeline.push(Array(this.index).fill(this.f1));
      // let arrFuns=(state)=>{
      //   this.props.onrecordBeforeShape(this.props.beforeType);
      //   this.props.onrecordShape(this.props.type);
      //   this.props.onrecordArr(this.props.arr);
      //   return state;
      // }
      // this.timeline.push(this.arrFuns);
      // console.log(aFuns(actions))
      // console.log(this.timeline)

      // let recompose = compose(...this.timeline);
      // console.log(recompose(5));
      // console.log(this.timeline);
      // console.log(this.timeline.map((val,idx)=>val));
      // console.log(this.index);
      // console.log(this.timeline[this.index-1])
      // let recompose = compose(this.timeline[this.index-1])(boxInitialState);
      // console.log(recompose);
      let newarr = this.props.arr.map((itemRow, indexRow) => itemRow.map((item, index) => SHAPE_ARR[this.props.beforeType][this.props.collisionCount].some(([x, y]) => (x + this.props.x) === indexRow && (y + this.props.y) === index) ? 1 : item));
      this.props.onchangeArr(newarr);
      // console.log(this.props.arr)
      // console.log(this.props.arr)

      // const actions = [recordBeforeShape(this.props.beforeType)];
      const actions = [recordBeforeShape(this.props.beforeType), recordShape(this.props.type), recordArr(this.props.arr)];
      // console.log(actions);

      console.log(aFuns(actions))
      // console.log(InitState.timeType);
      // console.log()
      const FULL = this.props.arr.filter((val) => !val.every((value) => value === 1));
      const FULL_LENGTH = 20 - FULL.length;
      if (FULL_LENGTH > 0) {
        this.setState({ score: this.state.score + SCORE_LIST[FULL_LENGTH] })
      }

      this.props.onchangeArr(new Array(FULL_LENGTH).fill(new Array(10).fill(0)).concat(FULL));
      this.props.initKeyDown(-1, 3);
      this.props.changeBeforeType(this.props.type);
      this.createShape(this.props.beforeType);
      this.props.changeType(parseInt(Math.random() * SHAPE_ARR.length));
      this.createNext(this.props.type);
      this.props.changeCount(0);



    } else {
      this.props.initKeyDown(this.props.x + 1, this.props.y)
    }
    const GAME_OVER = this.props.arr[0].some((val) => val === 1);
    if (GAME_OVER) {
      alert("game over 得分为" + this.state.score);
      clearInterval(this.time);
    }
  }
  isCollision(x, y) {
    let collision = false;
    SHAPE_ARR[this.props.beforeType][this.props.collisionCount].forEach((value) => {
      let checkRow = x + value[0];
      let checkCol = y + value[1];
      if (checkCol < 0 || checkCol > 9 || checkRow > 19 || this.props.arr[checkRow][checkCol] === 1) {
        collision = true;
      }
    })
    return collision;
  }
  isRevolve() {
    this.props.changeCount(this.props.collisionCount + 1);
    if (this.props.collisionCount >= SHAPE_ARR[this.props.beforeType].length) {
      this.props.changeCount(0);
    }
    this.setState({
      squareArr: this.state.squareArr.map((itemRow, indexRow) =>
        itemRow.map((val, index) =>
          SHAPE_ARR[this.props.beforeType][this.props.collisionCount].some(([x, y]) => x === indexRow && y === index) ? 1 : 0
        )
      )
    });
  }
  createNext(type) {
    this.setState({
      nextArr: this.state.nextArr.map((itemRow, indexRow) =>
        itemRow.map((val, index) =>
          SHAPE_ARR[type][0].some(([x, y]) => x === indexRow && y === index) ? 1 : 0
        )
      )
    })
  }
  render() {
    let { x, y, arr } = this.props;
    // console.log(x,y)
    const BACK_COLOR = {
      0: "lightgrey",
      1: "red",
    };
    const SQUBACK_COLOR = {
      0: "none",
      1: "red",
    };
    const BORDER_COLOR = {
      0: "1px solid transparent",
      1: "1px solid white",
    };
    const style = {
      display: 'inline-block',
      height: 595,
      marginLeft: 290,
    };
    return (
      <div className='app flex flex-column h-full' style={{ background: 'linear-gradient(-10deg, #000000, #ffffff)', position: "relative" }}>
        <div style={{ display: 'flex', alignItems: 'inherit' }}>
          <div style={{ width: "300px", height: " 600px", border: "1px solid white", position: "absolute", top: "0px", left: "0px", display: "grid", gridTemplateColumns: "repeat(10,30px)", gridTemplateRows: "repeat(20,30px)" }}>
            {
              arr.map((rowItem, rowIndex) =>
                rowItem.map((item, index) => {
                  return <div
                    key={`${rowIndex} ${index}`}
                    style={{ background: BACK_COLOR[item], border: "1px solid white" }}
                  />
                }
                )
              )
            }
          </div>
          <div style={style}>
            <Slider className='Slider' vertical defaultValue={0} step={1} max={this.timeline.length} onChange={this.isreverse ? this.nextClick : this.previousClick} reverse={this.isreverse} />
          </div>
        </div>
        <div style={{ position: "absolute", top: x * 30 + 1, left: y * 30 + 1, display: "grid", gridTemplateColumns: "repeat(4,30px)", gridTemplateRows: "repeat(4,30px)" }}>
          {
            this.state.squareArr.map((rowItem, rowIndex) =>
              rowItem.map((item, index) => {
                return <div
                  key={`${rowIndex} ${index}`}
                  style={{ background: SQUBACK_COLOR[item], border: BORDER_COLOR[item] }}
                />
              }
              )
            )
          }
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "300px", height: "250px", border: "1px solid white" }}>
          <div style={{ color: "white" }}>
            <div>
              <div style={{ fontSize: "large", marginBottom: "5px" }}>俄罗斯方块</div>
                      下一块
                      <div style={{ width: "120px", height: "120px", display: "grid", gridTemplateColumns: "repeat(4,30px)", gridTemplateRows: "repeat(4,30px)" }}>
                {
                  this.state.nextArr.map((rowItem, rowIndex) =>
                    rowItem.map((item, index) => {
                      return <div
                        key={`${rowIndex} ${index}`}
                        style={{ background: BACK_COLOR[item], border: "1px solid white" }}
                      />
                    }
                    )
                  )
                }
              </div>
            </div>
            <span>得分：<span id="score" style={{ color: "red" }}>{this.state.score}</span> </span>
            <div>时间旅行
              <button style={{ background: 'red', width: '30px', height: '20px', border: '1px solid white', textAlign: 'center' }} onClick={this.previousClick}>{'<—'}</button>
              <button style={{ background: 'red', width: '30px', height: '20px', border: '1px solid white', textAlign: 'center' }} onClick={this.nextClick}>{'—>'}</button>
            </div>
            <button style={{ background: 'red', width: '100px', height: '20px', border: '1px solid white', textAlign: 'center' }} onClick={this.reStart}>restart in here</button>
          </div>
        </div>
      </div>
    );
  }
};
function mapStateToProps(state) {
  return {
    x: state.box.x,
    y: state.box.y,
    arr: state.box.arr,
    collisionCount: state.box.collisionCount,
    type: state.box.type,
    beforeType: state.box.beforeType,
    // timeNextType: state.time.timeNextType,
    // timeType: state.time.timeType,
    // timeArr: state.time.timeArr,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    divDown: () => dispatch(box_action_creator.divDown()),
    divInit: () => dispatch(box_action_creator.divInit()),
    initKeyDown: (x, y) => dispatch(box_action_creator.initKeyDown(x, y)),
    changeCount: (collisionCount) => dispatch(box_action_creator.changeCount(collisionCount)),
    changeType: (type) => dispatch(box_action_creator.changeType(type)),
    changeBeforeType: (pretype) => dispatch(box_action_creator.changeBeforeType(pretype)),
    onchangeArr: (arr) => dispatch(box_action_creator.changeArr(arr)),
    // onrecordBeforeShape: (timeType) => dispatch(time_action.recordBeforeShape(timeType)),
    // onrecordShape: (timeNextType) => dispatch(time_action.recordShape(timeNextType)),
    // onrecordArr: (timeArr) => dispatch(time_action.recordArr(timeArr)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);