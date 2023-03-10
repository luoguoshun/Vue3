import moment from 'moment';

// 短时间
export const shortTime = function (value: moment.MomentInput): string {
  return moment(value).format('YYYY-MM-DD');
};

// 长时间
export const time = function (value: moment.MomentInput): string {
  return moment(value).format('YYYY-MM-DD HH:mm:ss');
};

//过滤秒
export const leaveTime = function (value: moment.MomentInput): string {
  return moment(value).format('YYYY-MM-DD HH:mm');
};

// 年月
export const monthTime = function (value: moment.MomentInput): string {
  return moment(value).format('YYYY-MM');
};

// 时分秒
export const secondsTime = function (value: moment.MomentInput): string {
  return moment(value).format('HH:mm:ss');
};

// 中国标准时间的转化
export const filterTime = (time: moment.MomentInput, type = 'short'): string => {
  if (type == 'short') {
    return moment(time).format('YYYY-MM-DD');
  } else {
    return moment(time).format('YYYY-MM-DD HH:mm:ss');
  }
};

export const startOfDate = function (d: moment.MomentInput, unitOfTime: moment.unitOfTime.Base = 'day'): moment.Moment {
  return moment(d).startOf(unitOfTime);
};

export const endOfDate = function (d: moment.MomentInput, unitOfTime: moment.unitOfTime.Base = 'day'): moment.Moment {
  return moment(d).endOf(unitOfTime);
};

// 当月第一天和最后一天   传入一个日期，返回数组['2019-12-01','2019-12-31']
export const lastDateofMonth = function (d: moment.MomentInput) {
  let firstDate = moment(d).startOf('month').format('YYYY-MM-DD');
  let endDate = moment(d).endOf('month').format('YYYY-MM-DD');
  let Datearr = [];
  Datearr.push(firstDate);
  Datearr.push(endDate);
  return Datearr;
};
/**
 * UTC时间格式转换成 YYYY-MM-DD HH:MM:SS 格式
 * @param timestamp 需要转换的时间字符串。例如: 2020-04-02T15:41:49.9867995
 * @param type 转换成的时间格式。例如 hour 就会返回 2020-04-02 15
 */
export const timeUTCToTime = (timestamp: { split: (arg0: string) => [any, any] }, type = 'day') => {
  let currentTime = '';
  // 不符合格式的时间参数就会返回原来的字符串
  if (timestamp.split('T').length !== 2) {
    return timestamp;
  }

  let [date, time] = timestamp.split('T');

  let dateReg =
    /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
  let timeReg = /([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])/;

  // 不符合格式的时间和日期就会返回 ""
  if (!dateReg.test(date) || !timeReg.test(time)) {
    return '';
  }

  let [y, mo, d] = date.split('-'); // 获取年、月、日
  let [h, mi, ts] = time.split(':'); // 获取时、分、秒加毫秒
  let [s, ms] = ts.split('.'); // 获取秒
  // 补零
  // y = zeroFill(y);
  // mo = zeroFill(mo);
  // d = zeroFill(d);
  // h = zeroFill(h);
  // mi = zeroFill(mi);
  // s = zeroFill(s);

  // 组合成所需字符串
  switch (type) {
    case 'year':
      currentTime = `${y}`;
      break;
    case 'month':
      currentTime = `${y}-${mo}`;
      break;
    case 'hour':
      currentTime = `${y}-${mo}-${d} ${h}`;
      break;
    case 'minute':
      currentTime = `${y}-${mo}-${d} ${h}:${mi}`;
      break;
    case 'second':
      currentTime = `${y}-${mo}-${d} ${h}:${mi}:${s}`;
      break;
    case 'milliSecond':
      currentTime = `${y}-${mo}-${d} ${h}:${mi}:${s}.${ms}`;
      break;
    default:
      currentTime = `${y}-${mo}-${d}`;
      break;
  }
  return currentTime;
};
