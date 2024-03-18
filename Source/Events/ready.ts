import ApplicationClient from '../Core/Classes/ApplicationClient'; /* Importing the Custom Logger */
import * as Logger from '../Core/Components/CustomLogger'; /* Importing the ApplicationClient class */

export default class readyEvent {
    private ApplicationClient: ApplicationClient; /* Define what is the type of ApplicationClient */
    
    constructor(ApplicationClient: ApplicationClient) {
        this.ApplicationClient = ApplicationClient;
    };

    handleExecution() {
        console.log(`${Logger.time()} [${Logger.info(`INFO`)}] The Application Manager (BOT) is ready to use.`)
    };
};