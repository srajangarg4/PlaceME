import { isObject } from 'placeme-services/lib/utils';

export const getFormattedDate = (format, dateInput) => {
  let formattedDate = format;
  const date = new Date(dateInput);

  const currentYear = date.getFullYear();
  const currentDate = date.getDate();
  const currentMonth = date.getMonth();
  formattedDate = formattedDate.replace(
    'dd',
    currentDate <= 9 ? `0${currentDate}` : `${currentDate}`,
  );
  formattedDate = formattedDate.replace(
    'mm',
    currentMonth <= 9 ? `0${currentMonth}` : `${currentMonth}`,
  );
  formattedDate = formattedDate.replace('yyyy', `${currentYear}`);
  return formattedDate;
};

export const flattenObject = (ob, seperator = '_') => {
  var toReturn = {};

  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if (typeof ob[i] == 'object' && ob[i] !== null) {
      if (ob[i] instanceof Date) {
        toReturn[i] = ob[i];
      } else {
        var flatObject = flattenObject(ob[i]);
        for (var x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;

          toReturn[i + seperator + x] = flatObject[x];
        }
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};

export const unflatten = (obj = {}, seperator = '_') => {
  const result = {};
  let temp, substrings, property, i;
  for (property in obj) {
    substrings = property.split(seperator);
    temp = result;
    for (i = 0; i < substrings.length - 1; i++) {
      if (!(substrings[i] in temp)) {
        if (isFinite(substrings[i + 1])) {
          temp[substrings[i]] = [];
        } else {
          temp[substrings[i]] = {};
        }
      }
      temp = temp[substrings[i]];
    }
    temp[substrings[substrings.length - 1]] = obj[property];
  }
  return result;
};

const areEqualFields = (first, second, key, ignoreKeys = []) => {
  const areBothEmpty = !first[key] && !second[key];
  const areBothEqual = first[key] === second[key];
  const shouldIgnore = ignoreKeys.includes(key);
  return (areBothEmpty || areBothEqual) && !shouldIgnore;
};

export const areEqualObjects = (
  firstObj = {},
  secondObj = {},
  ignoreKeys = [],
) => {
  const keysInFirstObj = Object.keys(firstObj);
  const keysInSecondObj = Object.keys(secondObj);

  const keys =
    keysInFirstObj.length > keysInSecondObj.length
      ? keysInFirstObj
      : keysInSecondObj;

  for (var key of keys) {
    if (!areEqualFields(firstObj, secondObj, key, ignoreKeys)) {
      return false;
    }
  }
  return true;
};

export const getDifference = (baseObj, targetObj) => {
  if (!baseObj || !targetObj) {
    if (!baseObj) {
      return targetObj;
    }
    return null;
  }

  const result = {};
  const keys = Object.keys(targetObj);

  for (const key of keys) {
    const baseValue = baseObj[key];
    const targetValue = targetObj[key];

    if (isObject(baseValue) && isObject(targetValue)) {
      if (baseValue instanceof Date || targetValue instanceof Date) {
        if (baseValue?.toDateString() !== targetValue?.toDateString()) {
          result[key] = targetValue;
        }
      } else {
        const innerDifference = getDifference(baseValue, targetValue);
        if (innerDifference !== null) {
          result[key] = innerDifference;
        }
      }
    } else if (baseValue !== targetValue) {
      result[key] = targetValue;
    }
  }
  return Object.keys(result).length === 0 ? null : result;
};

export const reduceToLevel = (obj = {}, level = 0) => {
  const depth = {};

  (function getDepth(prefix, obj) {
    if (!obj) {
      return 0;
    }
    if (typeof obj === 'object') {
      let maxDepth = Number.MIN_VALUE;

      Object.keys(obj).forEach((key) => {
        const depth = 1 + getDepth(`${prefix} ${key}`, obj[key]);
        maxDepth = Math.max(depth, maxDepth);
      });
      depth[prefix] = maxDepth;

      return maxDepth;
    } else {
      depth[prefix] = 0;
      return 0;
    }
  })('', obj);
  const reducedObj = {};
  (function reduce(obj, prefix) {
    if (!obj) {
      return;
    }
    if (typeof obj === 'object') {
      Object.keys(obj).forEach((key) => {
        if (depth[`${prefix} ${key}`] > level) {
          reduce(obj[key], `${prefix} ${key}`);
        } else {
          reducedObj[key] = obj[key];
        }
      });
    } else {
      reducedObj[prefix] = obj;
    }
  })(obj, '');
  return reducedObj;
};

export const resolveSalary = ({ min = 0, max = 0 } = {}) =>
  `${resolveAmount(min)}${max ? ` - ${resolveAmount(max)} LPA` : ''}`;

const resolveAmount = (amount = 0) => `${Math.round(amount / 100000)}`;
