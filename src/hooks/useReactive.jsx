import { useMemo, useRef } from 'react';
import { useForceUpdate } from 'react-uni-comps';

const map = new WeakMap();

const getProxyObject = (obj, forceUpdate) => {
  if (map.has(obj)) {
    return map.get(obj);
  } else {
    const proxy = new Proxy(obj, {
      get: (target, prop, receiver) => {
        const rt = Reflect.get(target, prop, receiver);
        if (typeof rt === 'object' && rt) {
          return getProxyObject(rt, forceUpdate);
        }
        return rt;
      },
      set: (target, prop, value, receiver) => {
        let rt;
        if (typeof value === 'object' && value) {
          rt = Reflect.set(target, prop, getProxyObject(value, forceUpdate), receiver);
        } else {
          rt = Reflect.set(target, prop, value, receiver);
        }
        forceUpdate();
        return rt;
      },
      deleteProperty: (target, prop) => {
        const rt = Reflect.deleteProperty(target, prop);
        forceUpdate();
        return rt;
      }
    });
    map.set(obj, proxy);
    return proxy;
  }
};

export const useReactive = (initialValue) => {
  const forceUpdate = useForceUpdate();
  const initValueRef = useRef(initialValue);
  const valueProxy = useMemo(() => {
    if (typeof initValueRef.current === 'object' && initValueRef.current) {
      return getProxyObject(initValueRef.current, forceUpdate);
    } else {
      throw new Error('useReactive only support object');
    }
  }, []);

  return valueProxy;
};
