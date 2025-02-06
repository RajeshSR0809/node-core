import { watch, open } from "node:fs/promises";



(async () => {
    const COMMANDS = {
        CREATE_A_FILE: "create a file",
    }
    
    const openFileHandelr = await open("./command.txt", "r");
    let aItr = watch("./command.txt");


    let isChangeEvent = (fileChangeInfo) => {
        return fileChangeInfo.eventType === "change";
    }


    let createFile = async (command) => {
        let filePath = command.substring(COMMANDS.CREATE_A_FILE.length + 1);
        console.log(filePath);
        let doesExists
        try {
            doesExists = await open(filePath, "r")
            doesExists ? doesExists.close() : (null);
        } catch (error) {
            doesExists ? doesExists.close() : (null);
            let newFile = await open(filePath, "w")
            newFile.close();
        }
    }


    openFileHandelr.on("change", async () => {
        let stats = await openFileHandelr.stat();
        const { buffer } = await openFileHandelr.read(Buffer.alloc(stats.size), 0, stats.size, 0 );
        const command = buffer.toString("utf-8").trim();

        if(command.includes(COMMANDS.CREATE_A_FILE)){
            createFile(command);
        }
    });



    for await (const event of aItr){
        if(isChangeEvent(event)){
            openFileHandelr.emit("change")
        }
    }



})();
