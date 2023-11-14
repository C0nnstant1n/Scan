export default function validateInn(inn: string) {
  let result = false;
  inn = inn.replace(/\D/g, "");

  let error = {
    code: 0,
    message: "ok",
  };
  if (typeof inn !== "string") {
    inn = "";
  }
  if (!inn.length) {
    error.code = 1;
    error.message = "ИНН пуст";
  } else if (/[^0-9]/.test(inn)) {
    error.code = 2;
    error.message = "ИНН может состоять только из цифр";
  } else if ([10].indexOf(inn.length) === -1) {
    error.code = 3;
    error.message = "для компаний, ИНН состоит из 10 цифр";
    // } else if ([10, 12].indexOf(inn.length) === -1) {
    //     error.code = 3;
    //     error.message = "ИНН может состоять только из 10 или 12 цифр";
  } else {
    var checkDigit = function (inn: string, coefficients: number[]) {
      var n = 0;
      for (var i in coefficients) {
        n += coefficients[i] * Number(inn[i]);
      }
      return (n % 11) % 10;
    };
    switch (inn.length) {
      case 10:
        var n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
        if (n10 === parseInt(inn[9])) {
          result = true;
        }
        break;
      case 12:
        var n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
        var n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
        if (n11 === parseInt(inn[10]) && n12 === parseInt(inn[11])) {
          result = true;
        }
        break;
    }
    if (!result) {
      error.code = 4;
      error.message = "ИНН неверен, неверное контрольное число";
    }
  }
  return error;
}
