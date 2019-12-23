
export const calculatePercentage = (fullTimeSpan: number, partialTimeSpan: number) => {
  const percentageValue = partialTimeSpan / fullTimeSpan * 100;
  if (percentageValue > 100) return 100;
  if (percentageValue < 0) return 0;
  return percentageValue;
};

const getMinutesString = (minutes: number) => (minutes === 1 ? 'minute' : 'minutes');
const getHoursString = (hours: number) => (hours === 1 ? 'hour' : 'hours');

export const formatDistanceCustom = (first: Date, second: Date) => {
  const difference = new Date(Math.abs(first.getTime() - second.getTime()));

  const minutes = difference.getUTCMinutes();

  const hours = difference.getUTCHours();

  // if (hours === 0 && minutes === 0) {
  //   return 'now';
  // }
  if (hours === 0) {
    return `${minutes} ${getMinutesString(minutes)}`;
  }
  if (minutes === 0) {
    return `${hours} ${getHoursString(hours)}`;
  }
  return `${hours} ${getHoursString(hours)} and ${minutes} ${getMinutesString(minutes)}`;
  // return `${Math.abs(duration.hours())} hours and ${Math.abs(duration.minutes())} minutes`;
};
export const formatDistanceWithPrefix = (first: Date, second: Date, withPredicate = false) => {
  const future = second > first;

  const distance = formatDistanceCustom(first, second);
  if (future) {
    return `${withPredicate ? 'is ' : ''}in ${distance}`;
  }

  return `${withPredicate ? 'was ' : ''}${distance} ago`;
};
