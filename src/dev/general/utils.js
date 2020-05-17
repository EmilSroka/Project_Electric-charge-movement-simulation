export function deepCopy(type){
  if(!isObject(type)){
    return type;
  }

  const copy = new type.constructor();
  for(const [key, value] of Object.entries(type)){
    copy[key] = deepCopy(value);
  }

  return copy;
}

export function wait(ms){
  return new Promise((resolve) => {
    window.setTimeout(resolve,ms);
  });
}

export function isBetween(x, value1, value2){
  const [min, max] = [value1, value2].sort((a, b) => a - b);
  return x >= min && x <= max;
}

function isObject(value){
  return value && typeof value === 'object'
}
