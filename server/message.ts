import {defaultLanguage} from "./config.ts";

type Language = 'en' | 'zh';
type MessageKey =
    | 'invalidCredentials'
    | 'usernameTaken'
    | 'accessDenied'
    | 'cannotTakeOwnEvent'
    | 'cannotCloseOthersEvent'
    | 'cannotReopenOthersEvent'
    | 'notImage'
    | 'cannotCancelTakeOpenEvent'
    | 'cannotCancelTakeClosedEvent'
    | 'cannotCancelTakeOthersEvent';

const messages = {
    en: {
        invalidCredentials: 'Invalid credentials',
        usernameTaken: 'Username already taken',
        accessDenied: 'Access denied',
        cannotTakeOwnEvent: 'Cannot take your own event',
        cannotCloseOthersEvent: 'Cannot close an event you did not create',
        cannotReopenOthersEvent: 'Cannot reopen an event you did not create',
        notImage: 'Uploaded file is not an image',
        cannotCancelTakeOpenEvent: 'Cannot cancel taking an open event',
        cannotCancelTakeClosedEvent: 'Cannot cancel taking a closed event',
        cannotCancelTakeOthersEvent: 'Cannot cancel taking a event taken by others'
    },
    zh: {
        invalidCredentials: '无效的凭据',
        usernameTaken: '用户名已被占用',
        accessDenied: '拒绝访问',
        cannotTakeOwnEvent: '无法承接自己的事件',
        cannotCloseOthersEvent: '无法关闭他人创建的事件',
        cannotReopenOthersEvent: '无法重新打开他人创建的事件',
        notImage: '上传的文件并非图片',
        cannotCancelTakeOpenEvent: '无法取消承接一个并未被承接的事件',
        cannotCancelTakeClosedEvent: '无法取消承接一个已被关闭的事件',
        cannotCancelTakeOthersEvent: '无法取消承接被他人承接的事件'
    }
}

export function getMessage(language: Language, key: MessageKey) {
    return messages[language]?.[key] || messages[defaultLanguage][key];
}
