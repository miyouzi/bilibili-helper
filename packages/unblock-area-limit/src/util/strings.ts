export namespace Strings {
    export function multiply(str: string, multiplier: number) {
        let result = ''
        for (let i = 0; i < multiplier; i++) {
            result += str
        }
        return result
    }

    export function toSnakeCase(str: string) {
        return str.replace(/[A-Z]/g, (a) => `_${a.toLowerCase()}`).replace(/^_/, "")
    }
}