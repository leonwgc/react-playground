import fetch from 'xhr-fetch-lib';

/**
 * The base ajax request
 * @param method
 * @param url
 * @param data
 * @param headers
 * @returns Promise<Object>
 */
export default function req(method, url, data, headers) {
    return fetch({
        method,
        url,
        data,
        headers: {Source: 'front-end', platform: 'Click', ...headers}
    });
}
/**
 * Ajax get
 *
 * @param {*} url
 * @param {*} data
 * @param {*} headers
 * @returns Promise<Object>
 */
export const get = (url, data?, headers?) => {
    return req('get', url, data, headers);
};

/**
 * Ajax post
 *
 * @param {*} url
 * @param {*} data
 * @param {*} headers
 * @returns Promise<Object>
 */
export const post = (url, data?, headers?) => {
    return req('post', url, data, headers);
};

/**
 * Ajax put
 *
 * @param {*} url
 * @param {*} data
 * @param {*} headers
 * @returns Promise<Object>
 */
export const put = (url, data?, headers?) => {
    return req('put', url, data, headers);
};

/**
 * Ajax delete
 *
 * @param {*} url
 * @param {*} data
 * @param {*} headers
 * @returns Promise<Object>
 */
export const del = (url, data?, headers?) => {
    return req('delete', url, data, headers);
};

/**
 * Ajax get a blob rseponse
 * @param url
 * @param method
 * @param data
 * @returns
 */
export const blob = (url, method, data = null) => {
    return fetch({
        url,
        method,
        data,
        xhrSetting: {responseType: 'blob'},
        responseParser: xhr => xhr.response
    });
};
