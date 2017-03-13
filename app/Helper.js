class Helper {
  
  constructor() {
  }

  static toHours(string) {
    return string.split(' ')[1];
  }

  static toCelcius(temp) {
    return (Math.round(temp-273.15)).toString();
  }
}

export default Helper;