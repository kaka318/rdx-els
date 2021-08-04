const RECORD_BEFORESHAPE = 'RECORD_BEFORESHAPE';
const RECORD_SHAPE = 'RECORD_SHAPE';
const RECORD_ARR = 'RECORD_ARR';
const recordBeforeShape = (timeType) => ({
  type:'recordBeforeShape',
  payload:{timeType},
})
const recordShape = (timeNextType) => ({
    type:'recordShape',
    payload:{timeNextType},
})
const recordArr = (timeArr) => ({
  type:'recordArr',
  payload:{timeArr},
})
export default{
    recordBeforeShape,RECORD_BEFORESHAPE,
    recordShape,RECORD_SHAPE,
    recordArr,RECORD_ARR,
    // recordtop,RECORDTOP,
  };