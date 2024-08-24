import {defaultLanguage} from "./config.ts";

type Language = 'en' | 'zh';
type MessageKey =
    | 'accessDenied'
    | 'invalidCredentials'
    | 'usernameTaken'
    | 'notImage'
    | 'cannotSwitchToSameState'
    | 'cannotTakeSelfEvent'
    | 'cannotCloseOthersEvent'
    | 'cannotReleaseEventTakenByOther'
    | 'cannotCloseTakenEvent'
    | 'cannotReopenOthersEvent'
    | 'cannotTakeClosedEvent'
    | 'cannotEditOthersEvent'
;

const messages = {
    en: {
        'accessDenied': 'Access denied',
        'invalidCredentials': 'Invalid credentials',
        'usernameTaken': 'Username is already taken',
        'notImage': 'The uploaded file is not an image',
        'cannotSwitchToSameState': 'Cannot switch to the same state',
        'cannotTakeSelfEvent': 'Cannot take your own event',
        'cannotCloseOthersEvent': 'Cannot close an event created by another user',
        'cannotReleaseEventTakenByOther': 'Cannot release an event taken by another user',
        'cannotCloseTakenEvent': 'Cannot close an event that is currently taken',
        'cannotReopenOthersEvent': 'Cannot reopen an event created by another user',
        'cannotTakeClosedEvent': 'Cannot take a closed event',
        'cannotEditOthersEvent': 'Cannot edit an event created by another user',
    },
    zh: {
        'accessDenied': '访问被拒绝',
        'invalidCredentials': '无效的凭据',
        'usernameTaken': '用户名已被占用',
        'notImage': '上传的文件不是图片',
        'cannotSwitchToSameState': '不能切换到相同的状态',
        'cannotTakeSelfEvent': '不能接取自己的事件',
        'cannotCloseOthersEvent': '不能关闭他人创建的事件',
        'cannotReleaseEventTakenByOther': '不能释放他人接取的事件',
        'cannotCloseTakenEvent': '不能关闭正在进行的事件',
        'cannotReopenOthersEvent': '不能重新打开他人创建的事件',
        'cannotTakeClosedEvent': '不能接取已关闭的事件',
        'cannotEditOthersEvent': '不能编辑他人创建的事件',
    }
}

export function getMessage(language: Language, key: MessageKey) {
    return messages[language]?.[key] || messages[defaultLanguage][key];
}
