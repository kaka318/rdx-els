import '../reducers/boxDown_reducer'
createNext = () => {
    this.setState({nextArr:this.state.nextArr.map((itemRow, indexRow) =>
      itemRow.map((index) =>
        SHAPE_ARR[this.beforeType][0].some(([x, y]) => x === indexRow && y === index) ? 1 : 0
      )
    )})
}