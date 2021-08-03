const recordBeforeShape = 'recordBeforeShape';
const RECORDTOP = 'RECORDTOP';
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
    record,RECORD,
    // recordtop,RECORDTOP,
  };