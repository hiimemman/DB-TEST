import moment from 'moment'

export function GetCurrentDateSTR() : string{

    const DateNow = moment();

    return DateNow.format('MM/DD/YYYY HH:mm')

}

export function GetCurrentDate() : moment.Moment{

    return moment();

}