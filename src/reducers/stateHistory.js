export default {
    past:[],
    future:[],
    present:undefined,
    gotoState(i){
        const index = i * 1;
        const allState = [...this.past,this.present,...this.future];
        this.present = allState[index];
        this.past = allState.slice(0,index);
        this.future = allState.slice(index + 1,allState.length);
    }
}