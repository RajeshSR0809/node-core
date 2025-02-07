import { watch, open, unlink, rename, appendFile } from "node:fs/promises";



(async () => {
    const COMMANDS = {
        CREATE_A_FILE: "create a file",
        DELETE_A_FILE: "delete a file",
        RENAME_A_FILE: "rename the file",
        ADD_TO_FILE: "add to the"

    }
    
    const openFileHandelr = await open("./command.txt", "r");
    let aItr = watch("./command.txt");


    let isChangeEvent = (fileChangeInfo) => {
        return fileChangeInfo.eventType === "change";
    }


    let createFile = async (command) => {
        let filePath = command.substring(COMMANDS.CREATE_A_FILE.length + 1);
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

    let deleteFile = async (command) => {
        try {
            let filePath = command.substring(COMMANDS.DELETE_A_FILE.length + 1);
            await unlink(filePath)
        } catch (error) {
            console.error(`${filePath}, delete`)            
        }

    }

    let renameFile = async (command) => {
        try {
            let idx = command.indexOf(" to ");
            let oldFilePath = command.substring(COMMANDS.RENAME_A_FILE.length + 1, idx );
            let newFilePath = command.substring(idx + 4 );
            await rename(oldFilePath, newFilePath)
        } catch (error) {
            console.error(error);            
        }
    }

    let addToFile = async (command) => {
        try {
            let idx = command.indexOf(" this content: ");
            let filePath = command.substring(COMMANDS.ADD_TO_FILE.length + 1, idx)
            let content = command.substring(idx + 15);
    
            console.log(filePath, content)
            await appendFile(filePath, Buffer.from(content), { "encoding": "utf-8" })
                
        } catch (error) {
            console.error(error);
        }
    }


    openFileHandelr.on("change", async () => {
        let stats = await openFileHandelr.stat();
        const { buffer } = await openFileHandelr.read(Buffer.alloc(stats.size), 0, stats.size, 0 );
        const command = buffer.toString("utf-8").trim();

        if(command.includes(COMMANDS.CREATE_A_FILE)){
            createFile(command);
        }
        else if(command.includes(COMMANDS.DELETE_A_FILE)){
            deleteFile(command)
        }
        else if(command.includes(COMMANDS.RENAME_A_FILE)){
            renameFile(command);
        }
        else if(command.includes(COMMANDS.ADD_TO_FILE)){
            addToFile(command)
        }
    });



    for await (const event of aItr){
        if(isChangeEvent(event)){
            openFileHandelr.emit("change")
        }
    }



})();
