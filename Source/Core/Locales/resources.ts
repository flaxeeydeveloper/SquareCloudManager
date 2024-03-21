import { locales_path } from "../JSON/localesLoaderConfig.json"; /* Importing the path of locales */
import * as Logger from "../Components/Logger"; /* Importing the Custom Logger */
import { resolve, join } from "node:path"; /* Importing dependency necessary to resolve paths, and incrementing paths in others */
import { readdirSync } from "node:fs"; /* Importing dependency necessary to perform readings */


export function LocalesLoader() { 
    return new Promise((res, rej) => {
        const AllLocalesPath = resolve(locales_path); /* Set up the path properly */
        const localesFolders = readdirSync(AllLocalesPath).filter(file => !(file.endsWith(".js") || file.endsWith(".ts"))); /* Filter unwanted files */
        
        const resources = {}; /* Initialize the resources object */

        for(const locale of localesFolders) {
            const localePath = resolve(join(AllLocalesPath, locale)); /* Set up the path properly */
            const localeFiles = readdirSync(localePath); /* Read /Core/Locales/{locale} folder */

            resources[locale] = {}; /* Initialize the resources[locale] object for each locale */

            for(const file of localeFiles) {
                const rfile = resolve(localePath, file);
                resources[locale][file.split(".")[0]] = rfile;
            };

            console.info(`${Logger.time()} [${Logger.info("INFO")}] LocalesLoader: Loading locale '${locale}'.`); /* Notify in the console that the locale has been loaded */
        };
        res(resources);
    });
};
