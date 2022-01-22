import {GlobalVariables} from "./global-variables";

export class UrlHelper {
    static getUrl(route:string){
        if (!route.startsWith('/')){
            route = '/' + route;
        }
        return GlobalVariables.applicationUrl + route; 
    };
}

