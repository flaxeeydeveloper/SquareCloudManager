/**
    There are no comments here as it is not necessary to modify, it is already prepared for the bot structure.
<<<<<<< HEAD
    If you are changing it, I think you have an idea of ​​what you are doing.
    I am not responsible for errors if this file is modified.
*/


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