export function threeDigitNumberFormat(number) {
    let num = number.toString()
    while (num.length < 3) num = '0' + num
    return num
}