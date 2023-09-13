import {emailRegex, phoneRegex, blankRegex} from "../appConstans/appConstans";

export const displayMonth = (month) => {
    switch (Number(month)){
        case 1:
            return "Styczeń"
        case 2:
            return "Luty"
        case 3:
            return "Marzec"
        case 4:
            return "Kwiecień"
        case 5:
            return "Maj"
        case 6:
            return "Czerwiec"
        case 7:
            return "Lipiec"
        case 8:
            return "Sierpień"
        case 9:
            return "Wrzesień"
        case 10:
            return "Październik"
        case 11:
            return "Listopad"
        case 12:
            return "Grudzień"
        default:
            return ;
    }

}

export const phoneOrEmptyCheck = (string) => {
    return string === "" || phoneRegex.test(string);
}
export const emailOrEmptyCheck = (string) => {
    return string === "" || emailRegex.test(string)
};

export const blankCheck = (string) => {
    return blankRegex.test(string);
}