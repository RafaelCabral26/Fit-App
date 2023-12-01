export declare class AppError<T extends string> extends Error {
    statusCode: number;
    message: string;
    constructor(statusCode: number, message: string);
}
