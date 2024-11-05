import isPlainObject from 'lodash/isPlainObject';
import { useMemo, useRef } from 'react';
import { useForceUpdate } from 'react-uni-comps';

const isProxyObject = (obj) => {
  return isPlainObject(obj) || Array.isArray(obj);
};
const map = new WeakMap();

/**
 * @description Get proxy object
 * @param {object} obj object to get proxy
 * @param {function} forceUpdate force update function
 * @returns {object} proxy object
 */
const getProxyObject = (obj, forceUpdate) => {
  if (map.has(obj)) {
    return map.get(obj);
  } else {
    const proxy = new Proxy(obj, {
      get: (...args) => {
        const value = Reflect.get(...args);
        if (isProxyObject(value)) {
          return getProxyObject(value, forceUpdate);
        }
        return value;
      },
      set: (...args) => {
        let rt = Reflect.set(...args);
        forceUpdate();
        return rt;
      },
      deleteProperty: (...args) => {
        const rt = Reflect.deleteProperty(...args);
        forceUpdate();
        return rt;
      }
    });
    map.set(obj, proxy);
    return proxy;
  }
};

/**
 * @description useReactive hook, make an object reactive.
 * @param {object} initialValue initial value
 * @returns {object} proxy object
 */
const useReactive = (initialValue) => {
  const forceUpdate = useForceUpdate();
  const initValueRef = useRef(initialValue);
  const reactiveValue = useMemo(() => {
    if (isProxyObject(initValueRef.current)) {
      return getProxyObject(initValueRef.current, forceUpdate);
    } else {
      throw new Error('useReactive only support object');
    }
  }, []);

  return reactiveValue;
};

export default useReactive;
