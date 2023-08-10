declare global {

    namespace NodeJS {
        interface ProcessEnv {
            MYSQL_DB_HOST: string;
            MYSQL_DB_USER: string;
            MYSQL_DB_PASSWORD: string;
            MYSQL_DB_NAME: string;
            MYSQL_PORT: string;
        }
    }
}

export {};