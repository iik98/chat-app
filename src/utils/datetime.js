import parse from 'date-fns/parse';
import formatISO from 'date-fns/formatISO';
import format from 'date-fns/format';
import formatRelative from 'date-fns/formatRelative';
import parseISO from 'date-fns/parseISO';
import isToday from 'date-fns/isToday';
import isYesterday from 'date-fns/isYesterday';

export const unixToIsoDate = (unix) => {

    return formatISO(parse(unix, 'T', new Date()), { representation: 'date' })
}

export const unixToTime = (unix) => {
    return format(parse(unix, 'T', new Date()), 'HH:mm')
}


export const unixToNow = (unix) => {
    if (!unix)
        return '';
    try {

        return formatRelative(parse(unix, 'T', new Date()), new Date())
    } catch (e) {
        return ''
    }
}

export const isoToRelative = (iso) => {
    const date = parseISO(iso);

    if (isToday(date)) {
        return 'Today'
    } else if (isYesterday(date)) {
        return 'Yesterday'
    } else {

        return format(date, 'MMMM dd, yyyy')

    }

}


export const secondsToTime = (secs) => {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
    return obj;
};