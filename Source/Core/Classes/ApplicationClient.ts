import { Client, ClientOptions } from 'discord.js';

export default class ApplicationClient extends Client {
    constructor(__clientOptions: ClientOptions) { super(__clientOptions) };
};