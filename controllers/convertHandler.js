function numberStringSplitter(input) {
  let numberMatches = input.match(/[\d./]+/g) || ["1"];
  let stringMatches = input.match(/[a-zA-z]+/g);

  return [numberMatches[0], stringMatches[0]];
}

function checkDiv(input) {
  let numbers = input.split("/");
  return numbers.length > 2 ? false : numbers;
}

function ConvertHandler() {
  this.getNum = function (input) {
    let number = numberStringSplitter(input)[0];
    let numbers = checkDiv(number);

    if (!numbers) {
      return undefined;
    } else {
      let numerator = numbers[0];
      let denominator = numbers[1] || "1";

      let result = parseFloat(numerator) / parseFloat(denominator);
      return result;
    }
  };

  this.getUnit = function (input) {
    let string = numberStringSplitter(input)[1];
    let result = string.toLowerCase();

    switch (result) {
      case "km":
        return "km";
      case "gal":
        return "gal";
      case "lbs":
        return "lbs";
      case "mi":
        return "mi";
      case "l":
        return "L";
      case "kg":
        return "kg";
      default:
        return undefined;
    }
  };

  this.getReturnUnit = function (initUnit) {
    let result = initUnit.toLowerCase();

    switch (result) {
      case "km":
        return "mi";
      case "gal":
        return "L";
      case "lbs":
        return "kg";
      case "mi":
        return "km";
      case "l":
        return "gal";
      case "kg":
        return "lbs";
      default:
        return undefined;
    }
  };

  this.spellOutUnit = function (unit) {
    let result = unit.toLowerCase();

    switch (result) {
      case "km":
        return "kilometers";
      case "gal":
        return "gallons";
      case "lbs":
        return "pounds";
      case "mi":
        return "miles";
      case "l":
        return "liters";
      case "kg":
        return "kilograms";
      default:
        return "unknown unit";
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit.toLowerCase()) {
      case "km":
        result = initNum / miToKm;
        break;
      case "gal":
        result = initNum * galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      default:
        result = undefined;
    }

    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

    return result;
  };
}

module.exports = ConvertHandler;
