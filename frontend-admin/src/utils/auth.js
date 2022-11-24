import CONSTANTS from '@/utils/constants'
import { nanoid } from 'nanoid'

/**
 * get token from local storage
 *
 */
export function getToken() {
    return localStorage.getItem(CONSTANTS.GC_AUTH_TOKEN)
}

/**
 * set token to local storage
 * @param {string} token
 */
export function setToken(token) {
    return localStorage.setItem(CONSTANTS.GC_AUTH_TOKEN, token)
}

// /**
//  * set token to local storage
//  * @param {string} token
//  */
// export function setS3(obj) {
//     return localStorage.setItem(CONSTANTS.GC_S3, JSON.stringify(obj))
// }

// export function getS3() {
//     return JSON.parse(localStorage.getItem(CONSTANTS.GC_S3))
// }

/**
 * get token from local storage
 *
 */
export function getDeviceId() {
    let x = localStorage.getItem(CONSTANTS.GC_DEVICE_ID)
    if (x) {
        return x
    } else {
        x = nanoid(50)
        localStorage.setItem(CONSTANTS.GC_DEVICE_ID, x)
        return x
    }
}

/**
 * remove token from Local Storage
 *
 */
export function removeToken() {
    localStorage.removeItem(CONSTANTS.GC_AUTH_TOKEN)
    localStorage.removeItem(CONSTANTS.GC_USER_ID)
    localStorage.removeItem(CONSTANTS.GC_S3)
}

/**
 * get ID user from local Storage
 */
export function getID() {
    return localStorage.getItem(CONSTANTS.GC_USER_ID)
}

/**
 * set token to local Storage
 * @param {String} id
 */
export function setID(id) {
    return localStorage.setItem(CONSTANTS.GC_USER_ID, id)
}

export function getSetting() {
    return JSON.parse(localStorage.getItem(CONSTANTS.GC_SETTING))
}

export function setSetting(data) {
    return localStorage.setItem(CONSTANTS.GC_SETTING, JSON.stringify(data))
}

export function getCMSTitle() {
    return JSON.parse(localStorage.getItem(CONSTANTS.GC_CMS))
}

export function setCMSTitle(data) {
    return localStorage.setItem(CONSTANTS.GC_CMS, JSON.stringify(data))
}
