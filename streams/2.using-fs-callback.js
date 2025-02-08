import { writeSync, open } from "node:fs"

(async () => {
    console.time("writeMany");
    open("test.txt", "w", (err, fd) => {
        for (let i = 0; i < 1000000; i++) {
            const buff = Buffer.from(` ${i} `, "utf-8");
            writeSync(fd, buff);
        }

        console.timeEnd("writeMany");
    });
})();