namespace global {

    export declare class Error {
        public name:string;
        public message:string;
        public stack:string;

        constructor(message?:string);
    }

    export class CoreException extends Error {

        constructor(public message:string) {
            super(message);
            this.name = 'CoreException';
            this.message = message;
            this.stack = (<any>new Error()).stack;
        }

        public toString() {
            return this.name + ': ' + this.message;
        }
    }

    export interface IBrowserStackApiMap {
        [port:number]:string;
    }

    export class Environment {

        public static browserStackApiMap:IBrowserStackApiMap = {
            3000: 'http://local.example.com/api',
            3002: 'http://staging.example.com/api',
        };

        public static isLocalhost():boolean {

            return /^localhost(:\d+)?$/.test(window.location.host);
        }

        public static isBrowserStack():boolean {

            let browserStackPortMatcher = _.keys(Environment.browserStackApiMap).join('|');

            return new RegExp(`^.*:${browserStackPortMatcher}+$`).test(window.location.host);
        }

        public static getApiUrl():string {

            if (Environment.isBrowserStack()) {
                return Environment.getBrowserStackUrl();
            }

            return '/api';
        }

        private static getBrowserStackUrl():string {
            return Environment.browserStackApiMap[window.location.port];
        }
    }

}