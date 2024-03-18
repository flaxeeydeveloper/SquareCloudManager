import ApplicationClient from '../Core/Classes/ApplicationClient'; /* Importing the Custom Logger */
import * as Logger from '../Core/Components/CustomLogger'; /* Importing the ApplicationClient class */
import { HandlerManager } from '../Core/Main';

export default class readyEvent {
    private ApplicationClient: ApplicationClient; /* Define what is the type of ApplicationClient */
    
    constructor(ApplicationClient: ApplicationClient) {
        this.ApplicationClient = ApplicationClient;
    };

    handleExecution() {
        console.log(`${Logger.time()} [${Logger.info(`INFO`)}] SquareCloudManager is ready to use. (${HandlerManager.commands.size} commands loaded)`)
    };
};