const messages = {
    en: {
        invalidCredentials: 'Invalid credentials',
        usernameTaken: 'Username already taken',
        accessDenied: 'Access denied',
        cannotTakeOwnEvent: 'Cannot take your own event',
        cannotCloseOthersEvent: 'Cannot close an event you did not create',
        cannotReopenOthersEvent: 'Cannot reopen an event you did not create',
        notImage: 'Uploaded file is not an image',
    },
    zh: {
        invalidCredentials: '无效的凭据',
        usernameTaken: '用户名已被占用',
        accessDenied: '拒绝访问',
        cannotTakeOwnEvent: '无法承接自己的事件',
        cannotCloseOthersEvent: '无法关闭他人创建的事件',
        cannotReopenOthersEvent: '无法重新打开他人创建的事件',
        notImage: '上传的文件并非图片',
    }
}

export function getMessage(
    language: 'en' | 'zh',
    key: 'invalidCredentials' | 'usernameTaken' | 'accessDenied' | 'cannotTakeOwnEvent' | 'cannotCloseOthersEvent' | 'cannotReopenOthersEvent' | 'notImage') {
    return messages[language]?.[key] || messages['en'][key];
}
