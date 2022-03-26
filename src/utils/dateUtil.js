export const getFormattedDate = (date) => {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = '' + d.getFullYear();

    return [day, month, year].join('/');
}