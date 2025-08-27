import path from "path";
import fs from "fs";

export function readData(filepath: string, key: string): Promise<any> {
    const dataFilePath = path.join(filepath);  //__dirname, '../../.auth/data.json'
    const rawData = fs.readFileSync(dataFilePath, 'utf-8');
    const Data = JSON.parse(rawData);
    const requiredValue = Data[key];
    return requiredValue;

}