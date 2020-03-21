export const useLanguage = () => {
        const userLang = navigator.language || navigator.userLanguage;
        const languageKey = userLang.match('de') ? 'de' : 'en';

        return [
                (texts => (texts[languageKey] || '---')),
                (date => date.toLocaleDateString(languageKey === 'de' ? 'de-De' : 'en-En')),
        ];
};