import { use, useEffect, useState } from "react";

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

//定义一个钩子，用于在组件挂载时执行一个回调函数
export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = (value, wait) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  //每次在value变化时，设置一个计时器，在wait时间后执行setDebouncedValue更新状态
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, wait);
    //每次在上一个useEffect执行完毕后，清除计时器
    return () => clearTimeout(timeout);
  }, [value, wait]);
  return debouncedValue;
};
