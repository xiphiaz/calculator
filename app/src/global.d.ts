//Import definitely typed definitions

///<reference path="../typings/tsd.d.ts" />
///<reference path="thirdPartyTypings.d.ts" />

declare namespace global {

    export interface IState extends ng.ui.IState {
        data?: {
            loggedIn?: boolean;
            title?: string;
            role?: string;
            icon?: string;
            sortAfter?: string;
            navigation?: boolean;
            navigationGroup?: string;
        },
        children?:IState[];
    }

    export interface IStateDefinition {
        name: string;
        options: IState;
    }

}