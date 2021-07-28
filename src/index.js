// import React from 'react';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import App from './components/app';
// // import History from './components/History'
// import { reducers, initialState } from './reducers/index';
// const store = createStore(
//   reducers,
//   initialState,
//   moveShape
// );

// // const store = createStore(moveShape);
// ReactDOM.render((
//   <Provider store={store}>
//     <div className='w-full h-full'>
// 	  <App />
//     </div>
//   </Provider>
// ), document.getElementById('root'));
import React from 'react';
// import './app.css';
import store from './store/index';
import { actionCreator } from './actions/';
import ReactDOM from 'react-dom';
// import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
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

// const stateData = {
//   score: 0,
//   // nextArr: new Array(4).fill(new Array(4).fill(0)),
//   // arr: new Array(20).fill(new Array(10).fill(0)),
//   // squareArr: new Array(4).fill(new Array(4).fill(0)),
//   x: -1,
//   y: 3,
// }
// function moveShape(state = stateData, action) {
//   // const score = state.score;
//   // const nextArr = state.nextArr;
//   // const arr = state.arr;
//   // const squareArr = state.squareArr;
//   const x = state.x;
//   const y = state.y;
//   switch(action.type){
//     case 83:
//       return { x : x + 1 }
//     // case 84:
//     // //   this.collisionCount++;
//     // // if (this.collisionCount >= SHAPE_ARR[this.beforeType].length) {
//     // //   this.collisionCount = 0;
//     // // }
//     // // this.setState({
//     // //   squareArr: this.state.squareArr.map((itemRow, indexRow) =>
//     // //     itemRow.map((item, index) =>
//     // //       SHAPE_ARR[this.beforeType][this.collisionCount].some(([x, y]) => x === indexRow && y === index) ? 1 : 0
//     // //     )
//     // //   )
//     // // });
//     //   return{
//     //     squareArr:squareArr.map((itemRow, indexRow) =>
//     //     itemRow.map((index) =>
//     //       SHAPE_ARR[this.beforeType][this.collisionCount].some(([x, y]) => x === indexRow && y === index) ? 1 : 0
//     //     )
//     //   )
//     //   }
//     case 65:
//       return { y : y - 1 }
//     case 68:
//       return { y : y + 1 }
//     default:
//       return state;

//   } 
// }
// const moveLeft = {type:65};
// const moveRight = {type:68};
// const moveDown = {type:83};
// const isRevolve = {type:84};
// // const shapeDown = {type:'65'};
// // const moveLeft = {type:'65'};
function mapStateToProps(state) {
  return {
    x: state.box.x,
    y: state.box.y,
    nextArr:state.box.nextArr,
    squareArr:state.box.squareArr,
    arr:state.box.arr,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    onmoveDown: () => dispatch(actionCreator.moveDown()),
    onmoveLeft: () => dispatch(actionCreator.moveLeft()),
    onmoveRight: () => dispatch(actionCreator.moveRight()),
    onDown: () => dispatch(actionCreator.divDown()),
    onInitDown: () => dispatch(actionCreator.initDown()),
    onKeyDown: () => dispatch(actionCreator.initKeyDown())
    // onisRevolve:() => dispatch(isRevolve),
  }
}
// const store = createStore(moveShape);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      nextArr: new Array(4).fill(new Array(4).fill(0)),
      arr: new Array(20).fill(new Array(10).fill(0)),
      squareArr: new Array(4).fill(new Array(4).fill(0)),
      // x: -1,
      // y: 3,
    };
  }
  collisionCount = 0;
  spaceCount = 0;
  collision = false;
  type = 0;
  beforeType = 0;
  time = 0;
  onKeyDown = (e) => {
    switch (e.keyCode) {
      case 83:
        this.props.onmoveDown();
        break;
      case 87:
        this.isRevolve();
        break;
      case 65:
        this.props.onmoveLeft();
        break;
      case 68:
        this.props.onmoveRight();
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
    if (!this.isCollision(this.props.x, this.props.y)) {
      this.props.onKeyDown();
    }
  }
  componentDidMount() {
    this.type = parseInt(Math.random() * SHAPE_ARR.length);
    this.beforeType = parseInt(Math.random() * SHAPE_ARR.length);
    document.addEventListener('keydown', this.onKeyDown);
  }
  createShape() {
    this.props.onKeyDown();
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
      alert("game over 得分为" + this.props.score);
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
      this.props.onInitDown();
      this.beforeType = this.type;
      this.createShape();
      this.type = parseInt(Math.random() * SHAPE_ARR.length)
      this.createNext();
      this.collisionCount = 0;
    } else {
      this.props.onDown();
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
        <div style={{ position: "absolute", top: this.props.x * 30 + 1, left: this.props.y * 30 + 1, display: "grid", gridTemplateColumns: "repeat(4,30px)", gridTemplateRows: "repeat(4,30px)" }}>
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
// App.propTypes = {
//   x:PropTypes.number.isRequired,
//   y:PropTypes.number.isRequired,
//   score:PropTypes.number.isRequired,
//   squareArr:PropTypes.object.isRequired,
//   nextArr:PropTypes.object.isRequired,
//   arr:PropTypes.object.isRequired,
//   onmoveDown:PropTypes.func.isRequired,
//   onmoveLeft:PropTypes.func.isRequired,
//   onmoveRight:PropTypes.func.isRequired,
//   // onisRevolve:PropTypes.func.isRequired,
// }
const Tetris = connect(mapStateToProps, mapDispatchToProps)(App);
ReactDOM.render(
  <Provider store={store}>
    <Tetris />
  </Provider>,
  document.getElementById('root')
);
