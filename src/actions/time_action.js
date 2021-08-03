const RECORD = 'RECORD';
const RECORDTOP = 'RECORDTOP';
const record = (timeType,timeNextType,timeArr) => ({
  type:'record',
  payload:{timeType,timeNextType,timeArr},
})
// const recordtop = (timeType,timeNextType,timeArr) => ({
//     type:'recordtop',
//     payload:{timeType},
// })
export default{
    record,RECORD,
    // recordtop,RECORDTOP,
  };