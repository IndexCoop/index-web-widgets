export const getFullDayOfWeek = (date: Date) => {
  const day = date.getDay();
  switch (day) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return '';
  }
};

export const getFullMonth = (date: Date) => {
  const day = date.getMonth();
  switch (day) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
    default:
      return '';
  }
};

export const getDayOfMonth = (date: Date, includeSuffix = true) => {
  const day = date.getDate();

  if (includeSuffix) {
    switch (day) {
      case 1:
      case 21:
      case 31:
        return `${day}st`;
      case 2:
      case 22:
        return `${day}nd`;
      case 3:
      case 23:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  }

  return String(day);
};
