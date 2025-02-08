import { open } from "node:fs/promises";

(async () => {
    console.time("writeMany");
    const fileHandle = await open("test.txt", "w");

    const stream = fileHandle.createWriteStream();

    console.log(stream.writableHighWaterMark);



    let i = 0;
    const numberOfWrites = 1000000;
    const writeMany = () => {
        while (i < numberOfWrites) {
            const buff = Buffer.from(` ${i} `, "utf-8");
            if (i === numberOfWrites - 1) {
                return stream.end(buff);
            }
            if (!stream.write(buff)) break;
            i++;
        }
    };

    writeMany();

    // resume our loop once our stream's internal buffer is emptied
    stream.on("drain", () => {
        writeMany();
    });

    stream.on("finish", () => {
        console.timeEnd("writeMany");
        fileHandle.close();
    });
})();