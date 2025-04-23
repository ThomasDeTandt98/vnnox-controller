import 'dotenv/config';
import { getPlayerList } from "./api";


async function main() {
    try {
        await getPlayerList();
    } catch (err) {
        console.log(err)
    }
}

main();