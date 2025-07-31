import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, unlink, writeFile } from 'fs';
import { extname, join, resolve } from 'path';
import { config } from 'src/config';
import { v4 } from 'uuid';

@Injectable()
export class FileService {
    private readonly base_url = config.BASE_API;
    async createFile(file: Express.Multer.File | any) {
        try {
            const ext = extname(file.originalname)
            const fileName = `${file.originalname.split('.')[0]}__${v4()}${ext.toLowerCase()}`;
            const filePath = resolve(__dirname, '..', '..', '..', '..', 'base');
            if (!existsSync(filePath)) {
                mkdirSync(filePath, { recursive: true })
            }
            await new Promise<void>((resolve, reject) => {
                writeFile(join(filePath, fileName), file.buffer, (err) => {
                    if (err) reject(err);
                    resolve();
                });
            });
            return `${this.base_url}/${fileName}`;
        } catch (error) {
            throw new BadRequestException(`Error on creating file: ${error}`)
        }
    }

    async deleteFile(fileName: string): Promise<void> {
        try {
            const prefix = this.base_url;
            const file = fileName.replace(prefix, '');
            const filePath = resolve(
                __dirname,
                '..',
                '..',
                '..',
                '..',
                'base',
                file,
            );
            if (!existsSync(filePath)) {
                throw new BadRequestException(`File does not exist: ${fileName}`);
            }
            await new Promise<void>((resolve, reject) => {
                unlink(filePath, (err) => {
                    if (err) reject(err);
                    resolve();
                });
            });
        } catch (error) {
            throw new BadRequestException(`Error on deleting file: ${error}`);
        }
    }

    async existFile(fileName: any) {
        const file = fileName.replace(this.base_url, '');
        const filePath = resolve(__dirname, '..', '..', '..', '..', 'base', file);
        if (existsSync(filePath)) {
            return true;
        } else {
            return false;
        }
    }
}
