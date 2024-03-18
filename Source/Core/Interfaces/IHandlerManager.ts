/* Exporting interface of what the HandlerManager configuration file should look like  */
export default interface IHandlerManager {
    commands_path: string | "./Source/Commands", /* If the value does not exist, "./Source/Commands" is the default */
    events_path: string | "./Source/Events", /* If the value does not exist, "./Source/Events" is the default */
    registerSlashCommandsAfter: number | 1000 /* Delay for registering SlashCommands (in milliseconds) */
}