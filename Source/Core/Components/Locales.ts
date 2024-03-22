/**
    There are no comments here as it is not necessary to modify, it is already prepared for the bot structure.
    If you are changing it, I think you have an idea of ​​what you are doing.
    I am not responsible for errors if this file is modified.
*/

import Resources from "../Interfaces/ResourcesInterface";
import { LocalesLoader } from "../Locales/resources";
import i18next from "i18next";

(async() => { 
    const resources: Resources = await LocalesLoader();
    
    i18next.init({
        fallbackLng: 'en_US',
        defaultNS: 'command',
        interpolation: { escapeValue: true },
        resources
    });

})();

export default i18next;