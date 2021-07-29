export default {
    past: [],
    futrue: [],
    present: undefined,
    gotoState(i) {
        const index = i * 1;
        const allState = [...this.past, this.present, ...this.futrue];
        this.present = allState[index];
        this.past = allState.slice(0, index);
        this.futrue = allState.slice(index + 1, allState.length);
    },
    hasRecord(type) {// 查询是否有过去或者将来的状态
        return this[type].length > 0;
    },
    hasPresent() { // 查询是否有现在的状态
        return this.present !== undefined;
    },
    setPresent(state) {
        this.present = state;
    },
    movePresentToPast() {
        this.past.push(this.present);
    },
    push(currentState) { // 将状态都保存，并更新当前状态
        if (this.hasPresent()) {
            this.past.push(this.present);
        }
        this.setPresent(currentState);
    },
    getIndex() { // 获取当前状态index
        return this.past.length;
    },
    undo() { // 后退
        if (this.hasRecord('past')) {
            this.gotoState(this.getIndex() - 1);
        }
    },
    redo() { // 前进
        if (this.hasRecord('futrue')) {
            this.gotoState(this.getIndex() + 1);
        }
    },
};