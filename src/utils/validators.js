export const isValidObjField = (obj) => {
    return Object.values(obj).every(value => value.trim())
}

export const updateError = (error, stateUpdater) => {
    stateUpdater(error)
    setTimeout(() => {
        stateUpdater('')
    }, 2500)
}

export const isValidEmail = (value) => {
    const regx = /^([A-Za-z0-9_\~\.])+\@([A-Za-z0-9_\~\.])+\.([A-Za-z]{2,4})$/
    return regx.test(value)
}

function maskCurrency(value) {
    value = value.replace(/\D/, "");
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
    return value;
}

export {maskCurrency}