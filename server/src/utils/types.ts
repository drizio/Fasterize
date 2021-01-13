export interface Result {
    plugged: boolean, 
    statusCode: number,
    fstrzFlags?: string[],
    cloudfrontStatus?: string,
    cloudfrontPOP?: string,
}

export interface FlagMap {
    [key: string]: string
}