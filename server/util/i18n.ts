import i18n from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import path from 'path';

i18n
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
        backend: {
            loadPath: path.join(__dirname, 'locales/{{lng}}.json')
        },
        fallbackLng: 'en',
        preload: ['en', 'zh'],
        defaultNS: 'translation',
        detection: {
            order: ['querystring', 'cookie'],
            caches: ['cookie']
        }
    });

export default i18n;