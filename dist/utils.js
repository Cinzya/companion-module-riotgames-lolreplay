"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertObjectValues = exports.convertString = exports.camelCaseToSnakeCase = exports.prettyfyStr = void 0;
function prettyfyStr(str) {
    return str
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/^./, str[0].toUpperCase());
}
exports.prettyfyStr = prettyfyStr;
function camelCaseToSnakeCase(str) {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}
exports.camelCaseToSnakeCase = camelCaseToSnakeCase;
function convertString(str) {
    // Check if the string is a boolean
    if (str.toLowerCase() === 'true')
        return true;
    if (str.toLowerCase() === 'false')
        return false;
    // Check if the string is a number
    const num = Number(str);
    if (!isNaN(num))
        return num;
    // If the string is not a boolean or a number, return it as is
    return str;
}
exports.convertString = convertString;
function convertObjectValues(obj) {
    const newObj = {};
    for (const key in obj) {
        newObj[key] = convertString(obj[key]);
    }
    return newObj;
}
exports.convertObjectValues = convertObjectValues;
