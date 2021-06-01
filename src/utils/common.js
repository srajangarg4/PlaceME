export const bloodGroups = [
  { text: 'A+', value: 'A+' },
  { text: 'A-', value: 'A-' },
  { text: 'B+', value: 'B+' },
  { text: 'B-', value: 'B-' },
  { text: 'O+', value: 'O+' },
  { text: 'O-', value: 'O-' },
  { text: 'AB+', value: 'AB+' },
  { text: 'AB-', value: 'AB-' },
];
export const resolveDate = (date) => new Date(date?.toDate());

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
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + seperator + x] = flatObject[x];
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
