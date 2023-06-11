import { StoreState } from "@/store";
import { useStore } from "vuex";
import { Context } from "../context";
import store from '@/store/index'

export function isAdmin(): boolean{
    //console.log((store.state.context as Context).currentUser?.role );
    if((store.state.context as Context).currentUser?.role == "ADM" || (store.state.context as Context).currentUser?.role == "SADM"){
        return true;
    }
    return false;
}

export function isLogged(): boolean{
    if((store.state.context as Context).currentUser){
        return true;
    }
    return false;
}