import 'dotenv/config';
import { getPlayerList, restartPlayer } from "./api";
import { Player } from './models/playerInfo';


async function main() {
    try {
        var playerList: Player[] = await getPlayerList();
        await restartPlayer(playerList.map(player => player.playerId));
    } catch (err) {
        console.log(err)
    }
}

main();