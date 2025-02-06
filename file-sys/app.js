import { watch, open } from "node:fs/promises";
(async () => {
    const openFileHandelr = await open("./command.txt", "r")
    let aItr = watch("./command.txt");
    



    let isChangeEvent = (fileChangeInfo) => {
        return fileChangeInfo.eventType === "change";
    }

    for await (const event of aItr){
        if(isChangeEvent(event)){
            let stats = await openFileHandelr.stat();
            const { buffer } = await openFileHandelr.read(Buffer.alloc(stats.size), 0, stats.size, 0 );
            const command = buffer.toString("utf-8").trim();
        }
    }



})();
