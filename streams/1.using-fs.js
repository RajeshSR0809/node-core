import { appendFile } from "node:fs/promises";



console.time("Write Time");

try {
    for (let a = 0; a < 10000; a++) {
        await appendFile("./text.txt", `${a} `)
    }
    console.timeEnd("Write Time")
} catch (error) {
    console.error(error)
}
