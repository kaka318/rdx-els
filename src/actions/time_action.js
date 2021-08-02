const RECORD = 'RECORD';
const RECORDTOP = 'RECORDTOP';
const record = (timeNextType) => ({
  type:'record',
  payload:{timeNextType},
})
const recordtop = (timeType,timeArr) => ({
    type:'recordtop',
    payload:{timeType,timeArr}
})
export default{
    record,RECORD,
    recordtop,RECORDTOP,
  };