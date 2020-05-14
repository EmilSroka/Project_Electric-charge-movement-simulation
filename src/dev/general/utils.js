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

function isObject(value){
  return value && typeof value === 'object'
}