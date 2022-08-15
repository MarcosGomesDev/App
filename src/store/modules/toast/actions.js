export function showToast(
    message,
    type = 'default',
    iconName = '',
    duration = 4000
) {
    return {
        type: '@toast/SHOW',
        payload: {type, message, iconName, duration},
    }
}

export function hideToast() {
    return {
        type: '@toast/HIDE'
    }
}