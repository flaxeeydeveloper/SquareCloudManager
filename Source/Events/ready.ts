import ApplicationClient from '../Core/Classes/ApplicationClient'; /* Importing the Custom Logger */
import * as Logger from '../Core/Components/Logger'; /* Importing the ApplicationClient class */

export default class readyEvent {
    private ApplicationClient: ApplicationClient; /* Define what is the type of ApplicationClient */
    
    constructor(ApplicationClient: ApplicationClient) {
        this.ApplicationClient = ApplicationClient;
    };

    handleExecution() {
        console.log(`${Logger.time()} [${Logger.info(`INFO`)}] Event: SquareCloud (Application Manager) is ready to use.`)
        console.log(`${Logger.time()} [${Logger.warning("WARNING")}] It is important that you read this: https://github.com/flaxeeydeveloper/SquareCloudManager/blob/main/README.md`)
    };
};