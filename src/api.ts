import { createHash } from "crypto";

const API_URL = process.env.API_URL
const API_KEY = process.env.API_KEY
const API_SECRET = process.env.API_SECRET

export async function getPlayerList(): Promise<void> {
    let currentTime = getCurrentTime();
    let nonce = "someRandomNonce"
    let checkSum: string = generateCheckSum(currentTime, nonce);
    let requestUrl: string = `${API_URL}/v2/player/list?count=20&start=0&name`
    console.log(requestUrl);
    console.log(checkSum);

    const response = await fetch(requestUrl, {
        method: 'GET',
        headers: {
            'AppKey': API_KEY!,
            'Nonce': nonce,
            'CurTime': currentTime.toString(),
            'CheckSum': checkSum
        },
    });

}

function generateCheckSum(currentTime: string, nonce: string,): string {
    let date: Date = new Date();
    let nonHashedCheckSum: string = `${API_SECRET}${nonce}${currentTime}`
    console.log(nonHashedCheckSum);
    console.log(currentTime);

    return createHash('sha256').update(nonHashedCheckSum).digest('hex');
}

function getCurrentTime(): string {
    return Math.floor(Date.now() / 1000).toString();
}

