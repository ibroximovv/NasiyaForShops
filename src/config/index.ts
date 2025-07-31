import * as dotenv from 'dotenv'
import { Logger } from '@nestjs/common'

dotenv.config()

export type ConfigType = {
    API_PORT: number
    DATABASE_URL: string
    ACCESS_TOKEN_KEY: string
    ACCESS_TOKEN_TIME: string
    REFRESH_TOKEN_KEY: string
    REFRESH_TOKEN_TIME: string
    FILE_PATH: string
    BASE_API: string
}

const requiredVariables = [
    'API_PORT',
    'DATABASE_URL',
    'ACCESS_TOKEN_KEY',
    'ACCESS_TOKEN_TIME',
    'REFRESH_TOKEN_KEY',
    'REFRESH_TOKEN_TIME',
    'FILE_PATH',
    'BASE_API'
]

const missingVariables = requiredVariables.filter((variable) => {
    const value = process.env[variable]
    return !value || value.trim() === ''
})

if (missingVariables.length > 0) {
    Logger.error(`Missing or empty required environment variables: ${missingVariables.join(', ')}`),
        process.exit(1)
}

export const config: ConfigType = {
    API_PORT: parseInt(process.env.API_PORT as string, 10),
    DATABASE_URL: process.env.DATABASE_URL as string,
    ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY as string,
    ACCESS_TOKEN_TIME: process.env.ACCESS_TOKEN_TIME as string,
    REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY as string,
    REFRESH_TOKEN_TIME: process.env.REFRESH_TOKEN_TIME as string,
    FILE_PATH: process.env.FILE_PATH as string,
    BASE_API: process.env.BASE_API as string,
}