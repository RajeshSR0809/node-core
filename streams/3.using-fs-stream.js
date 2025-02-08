import { open } from "node:fs/promises";

(async () => {
  console.time("writeMany");
  const fileHandle = await open("test.txt", "w");

  const stream = fileHandle.createWriteStream();

  for (let i = 0; i < 1000000; i++) {
    const buff = Buffer.from(` ${i} `, "utf-8");
    stream.write(buff);
  }
  console.timeEnd("writeMany");
})();