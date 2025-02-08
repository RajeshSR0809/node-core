import { appendFile, open } from "node:fs/promises";






async function FSAppendFile() {
    console.time("Write Time");
    try {
        for (let a = 0; a < 1000000; a++) {
            await appendFile("./text.txt", `${a} `)
        }
        console.timeEnd("Write Time")
    } catch (error) {
        console.error(error)
    }
}

async function FileHandlerOpen() {
    console.time("writeMany");
    const fileHandle = await open("text.txt", "w");

    for (let i = 0; i < 1000000; i++) {
        await fileHandle.write(` ${i} `);
    }
    console.timeEnd("writeMany");
}


FileHandlerOpen();