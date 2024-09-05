const globalVariables: { [key: string]: any } = {};

export async function getGlobalVariable(key: string) {
    return globalVariables[key];
}

export async function destroyGlobalVariable(key: string) {
    delete globalVariables[key];
}

export async function setGlobalVariableWithExpiry(key: string, value: any, expiry: number) {
    globalVariables[key] = value;
    setTimeout(() => {
        delete globalVariables[key];
    }, expiry);
}