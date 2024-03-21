import { PrismaClient } from "@prisma/client"; /* Importing PRISMA */
import * as Logger from './Logger'; /* Importing the logger */
const prisma = new PrismaClient(); 

async function connect() { await prisma.$connect() };
connect().then(() => { 
    console.info(`${Logger.time()} [${Logger.info("INFO")}] Prisma: Successfully connected with database.`);
}).catch((e) => {
    console.error(`${Logger.time()} [${Logger.error("ERROR")}] Prisma: Couldn't connect to database.`);
    process.exit(1);
});

export default prisma;