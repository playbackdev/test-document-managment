//Всякие полезные функции

//функция для создания вложенных объектов при получении из инпута name с точками
export function name2obj(obj, propsStr, value) {
    let propsArr = propsStr.split('.');
    function nest(obj, array, value, n) {
        if(n === array.length - 1) {
            obj[array[n]] = value;
            return;
        }
        if(!obj[array[n]]) obj[array[n]] = {};
        nest(obj[array[n]], array, value, n+1);
    }
    nest(obj, propsArr, value, 0);
    return obj;
}

//функция для перевода времени из timestamp в строку в формате, совместимом с input type=date (yyyy-mm-dd)
export function dateToFormStr(timestamp = 0) {
    let dateStr = '';
    const tmpDate = new Date(timestamp);
    let tmpDay = tmpDate.getDate();
    tmpDay = tmpDay < 10 ? '0' + tmpDay : tmpDay;
    let tmpMonth = tmpDate.getMonth() + 1;
    tmpMonth = tmpMonth < 10 ? '0' + tmpMonth : tmpMonth;
    dateStr = tmpDate.getFullYear() + '-' + tmpMonth + '-' + tmpDay;
    return dateStr;
}