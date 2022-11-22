export const getMonth = (date: Date): string => {
    let fixed = new Date(date);
    return getMonthName(fixed.getMonth() + 1).slice(0, 5) + '.';
  }

export const getDayOfTheWeekForDate = (date: Date): string => {
    let fixed = new Date(date);
    return getDayOfTheWeek(fixed.getDay()).slice(0, 3) + '.';
  }

export const getDayOfTheMonth = (date: Date) => {
    let fixed = new Date(date);
    return fixed.getDate() < 10 ? `0${fixed.getDate().toString()}` : fixed.getDate().toString();
  }

function getDayOfTheWeek(dayOfTheWeek: number) {
    switch (dayOfTheWeek) {
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
      case 7:
        return 'Sunday';
      default:
        return "";
    }
  }

function getMonthName(monthNumber: number) {
    switch (monthNumber) {
      case 1:
        return "January";
      case 2:
        return "Feabruary";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "";
    }
  }
