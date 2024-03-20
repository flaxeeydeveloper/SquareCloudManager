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