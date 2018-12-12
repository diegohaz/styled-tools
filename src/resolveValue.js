// @flow

const resolveValue = (value: any, props: Object) => {
  if (typeof value === "function") {
    return resolveValue(value(props), props);
  }
  return value;
};

export default resolveValue;
