export const isFalsy = (value) => (value === 0 ? false : !value);
export const cleanObject = (obj) => {
  //Object.assign({}, obj);
  //浅拷贝obj，避免直接修改传入的参数
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    //检查并删除假值，如 null, undefined, '', false, NaN，使用isFalsy函数排除为0的情况
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
