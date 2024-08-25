import i18n from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import path from 'path';

i18n
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
        backend: {
            loadPath: path.join(__dirname, 'locales/{{lng}}/{{ns}}.json')
        },
        fallbackLng: 'en',
        preload: ['en', 'es'], // Add more languages as needed
        ns: ['translation'],
        defaultNS: 'translation',
        detection: {
            order: ['querystring', 'cookie'],
            caches: ['cookie']
        }
    });

export default i18n;