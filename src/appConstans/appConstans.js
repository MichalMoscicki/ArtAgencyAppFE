export const blankRegex = /^ *$/
export const phoneRegex = /^[\\+]?[(]?[0-9]{2}[)]?-?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$/
export const emailRegex =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
export const wrongEmailMessage = "Niepoprawny email";
export const wrongPhoneMessage = "Niepoprawny numer telefonu";
export  const isFieldEmptyNullOrUndefined = (objectField) => {
    return blankRegex.test(objectField) || objectField === null || objectField === undefined
}
export const getCurrentTimeAndDate = () => {
    return new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
}
export const SORT_DIR_ASC = "&sortDir=asc";
export const SORT_DIR_DESC = "&sortDir=desc";
export const SORT_BY_LASTNAME = "&sortBy=lastName";
export const SORT_BY_TITLE = "&sortBy=title";
export const SORT_BY_DATE = "&sortBy=start";