/* eslint-disable import/prefer-default-export */

import moment from 'moment';

export const greetings = () => {
    const currentHour = moment().format('HH');

    if (currentHour >= 2 && currentHour < 12) {
        return 'Selamat pagi';
    }
    if (currentHour >= 12 && currentHour < 15) {
        return 'Selamat siang';
    }
    if (currentHour >= 15 && currentHour < 20) {
        return 'Selamat sore';
    }
    if (currentHour >= 20 && currentHour < 3) {
        return 'Selamat malam';
    }

    return 'Halo';
};
