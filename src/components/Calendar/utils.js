/**
 * @author FFET
 * @since 2021-01-22
 * @description calendar util
 */

/**
 * * 根据月份获取当月天数
 * @param {string} year 年份
 * @param {string} month 月份
 */
export function getMonthDays(year, month) {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    case 2:
      return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0) ? 29 : 28;
    default:
      break;
  }
}

/**
 * 构建日历数组
 * @param {*} date
 */
export function genereateCalendar(date = new Date(), firstWeek = 1) {
  date = new Date(date);
  // let tempDate = new Date();
  // const day = date.getDate();
  // // 当前时间
  // const tempYear = tempDate.getFullYear();
  // const tempMonth = tempDate.getMonth();
  // const tempDay = tempDate.getDate();
  // // 传入的时间
  const dataYear = date.getFullYear();
  const dateMonth = date.getMonth();
  let arr = [];

  // 这个月的第一天是周几 周一为一周的开始
  // weekday = new Date(date.setDate(1)).getDay();
  let weekday = (new Date(date.setDate(1)).getDay() + 7 - firstWeek) % 7;

  // 构建出数组
  arr = [];

  // 补全前面上个月天数
  // 上个月有多少天

  const preMonth = new Date(date.setMonth(date.getMonth() - 1));

  let preDays = getMonthDays(preMonth.getFullYear(), preMonth.getMonth() + 1);
  console.log("preDays", preDays);
  for (let i = 0; i < weekday; i++) {
    arr.unshift({ day: preDays - i });
  }

  // 这个月有多少天
  const monthDays = getMonthDays(dateMonth, date.getMonth() + 1);
  // 构建数据
  for (let i = 1; i <= monthDays; i++) {
    // vo
    const vo = {
      day: padzero(i),
      date: dataYear + "-" + (dateMonth + 1) + "-" + i,
      weekday: weekday,
      // today: i === tempDay,
      choose: false,
    };

    // 添加进数组
    arr.push(vo);

    weekday++;
    if (weekday == 7) {
      weekday = 0;
    }
  }

  // 补全下个月天数
  const lastDays = 7 - (arr.length % 7);
  for (let i = 1; i <= lastDays; i++) {
    arr.push({ day: padzero(i) });
  }

  return arr;
}

/**
 * 获取周几
 * @param {int} day 周几
 */
export function getWeekDay(day) {
  return "日|一|二|三|四|五|六".split("|")[day];
}

/**
 * 补全
 * @param {string} str 值
 * @param {string} pad 补全的值
 */
function padzero(str, pad = 0) {
  return str.toString().padStart(2, pad);
}
