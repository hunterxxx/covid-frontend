import React, { useState, useEffect } from "react";

export const useLanguage = () => {
        const userLang = navigator.language || navigator.userLanguage;
        const languageKey = userLang.match('de') ? 'de' : 'en';

    return [
        (texts => (texts[languageKey] || '---')),
        (date => date.toLocaleDateString(languageKey === 'de' ? 'de-De' : 'en-En')),
    ];
};

export const useLocalStorage = (storageName) => {
    let initial
    try {
        initial = JSON.parse((localStorage.getItem(storageName) || []));
    } catch(e) {
        initial = [];
    }
    const [data, setData] = useState(initial);
    return [
        data,
        (x) => {
            localStorage.setItem(storageName, JSON.stringify(x))
            setData(x);
        },
    ];
};
