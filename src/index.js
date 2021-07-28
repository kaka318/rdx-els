import React from 'react';
import store from './store/index';
import { actionCreator } from './actions/';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import box_action_creator from './actions/box_action_creator'
// import store from'./store/index';
import PropTypes from 'prop-types';
const SHAPE_ARR = [
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
// function mapStateToProps(state) {
//   return {
//     x: state.box.x,
//     y: state.box.y,
//   }
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     // onmoveDown: () => dispatch(actionCreator.moveDown()),
//     // onmoveLeft: () => dispatch(actionCreator.moveLeft()),
//     // onmoveRight: () => dispatch(actionCreator.moveRight()),
//     onDown: () => dispatch(actionCreator.divDown()),
//     onInitDown: () => dispatch(actionCreator.initDown()),
//     onKeyDown: () => dispatch(actionCreator.initKeyDown())
//   }
// }
class App extends React.Component {
  constructor(props) {
    super(props);
    store.subscribe(()=>{
      this.setState({})
    })
    this.state = {
      score: 0,
      nextArr: new Array(4).fill(new Array(4).fill(0)),
      arr: new Array(20).fill(new Array(10).fill(0)),
      squareArr: new Array(4).fill(new Array(4).fill(0)),
    };
  }
  collisionCount = 0;
  spaceCount = 0;
  collision = false;
  type = 0;
  beforeType = 0;
  time = 0;
  onKeyDown = (e) => {
    let {x,y} = store.getState();
    let curx = x;
    let cury = y;
    switch (e.keyCode) {
      case 83:
        // this.props.onmoveDown();
        curx++;
        break;
      case 87:
        this.isRevolve();
        break;
      case 65:
        cury--;
        // this.props.onmoveLeft();
        break;
      case 68:
        cury++;
        // this.props.onmoveRight();
        break;
      case 32:
        if (this.spaceCount === 0) {
          this.createShape();
          this.createNext();
          this.time = setInterval(() => this.shapeDivDown(), 500);
          this.spaceCount++;
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
      box_action_creator.initKeyDown(curx,cury)
    }
  }
  componentDidMount() {
    this.type = parseInt(Math.random() * SHAPE_ARR.length);
    this.beforeType = parseInt(Math.random() * SHAPE_ARR.length);
    document.addEventListener('keydown', this.onKeyDown);
  }
  createShape() {
    this.setState({
      squareArr: this.state.squareArr.map((itemRow, indexRow) =>
        itemRow.map((val,index) =>
          SHAPE_ARR[this.beforeType][0].some(([x, y]) => x === indexRow && y === index) ? 1 : 0
        )
      )
    })
  }
  shapeDivDown() {
    const GAME_OVER = this.state.arr[0].some((val) => val === 1);
    if (GAME_OVER) {
      alert("game over 得分为" + this.state.score);
      clearInterval(this.time);
    }
    let nextX = this.props.x + 1;
    let nextY = this.props.y;
    if (this.isCollision(nextX, nextY)) {
      this.setState({
        arr: this.state.arr.map((itemRow, indexRow) =>
          itemRow.map((item, index) =>
            SHAPE_ARR[this.beforeType][this.collisionCount].some(([x, y]) => (x + this.props.x) === indexRow && (y + this.props.y) === index) ? 1 : item
          )
        )
      });
      const FULL = this.state.arr.filter((val) => !val.every((value) => value === 1));
      const FULL_LENGTH = 20 - FULL.length;
      if (FULL_LENGTH > 0) {
        this.setState({ score: this.state.score + SCORE_LIST[FULL_LENGTH] })
      }
      this.setState({ arr: new Array(FULL_LENGTH).fill(new Array(10).fill(0)).concat(FULL) });
      box_action_creator.initDown();
      this.beforeType = this.type;
      this.createShape();
      this.type = parseInt(Math.random() * SHAPE_ARR.length)
      this.createNext();
      this.collisionCount = 0;
    } else {
      box_action_creator.divDown();
    }
  }
  isCollision(x, y) {
    let collision = false;
    SHAPE_ARR[this.beforeType][this.collisionCount].forEach((value) => {
      let checkRow = x + value[0];
      let checkCol = y + value[1];
      if (checkCol < 0 || checkCol > 9 || checkRow > 19 || this.state.arr[checkRow][checkCol] === 1) {
        collision = true;
      }
    })
    return collision;
  }
  isRevolve() {
    this.collisionCount++;
    if (this.collisionCount >= SHAPE_ARR[this.beforeType].length) {
      this.collisionCount = 0;
    }
    this.setState({
      squareArr: this.state.squareArr.map((itemRow, indexRow) =>
        itemRow.map((val,index) =>
          SHAPE_ARR[this.beforeType][this.collisionCount].some(([x, y]) => x === indexRow && y === index) ? 1 : 0
        )
      )
    });
  }
  createNext() {
    this.setState({
      nextArr: this.state.nextArr.map((itemRow, indexRow) =>
        itemRow.map((val,index) =>
          SHAPE_ARR[this.type][0].some(([x, y]) => x === indexRow && y === index) ? 1 : 0
        )
      )
    })
  }
  render() {
    
    let {x,y} = store.getState();
    console.log(store.getState());
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
    return (
      <div className='app flex flex-column h-full' style={{ background: 'linear-gradient(-10deg, #000000, #ffffff)', position: "relative" }}>

        <div style={{ width: "300px", height: " 600px", border: "1px solid white", position: "absolute", top: "0px", left: "0px", display: "grid", gridTemplateColumns: "repeat(10,30px)", gridTemplateRows: "repeat(20,30px)" }}>
          {
            this.state.arr.map((rowItem, rowIndex) =>
              rowItem.map((item, index) => {
                return <div
                  key={`${rowIndex} ${index}`}
                  style={{ background: BACK_COLOR[item], border: "1px solid white" }}
                />
              }
              )
            )
          },
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
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "300px", height: "250px", border: "1px solid white", marginTop: "600px" }}>
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
            {/* <span>游戏规则：<br /> W变形 A 左移 S 加速 D 右移</span> */}
            <div>时间旅行
              <button>⬅</button>
              <button>➡</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
// const Tetris = connect(mapStateToProps, mapDispatchToProps)(App);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
