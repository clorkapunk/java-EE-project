import {makeAutoObservable} from "mobx";

export default class UserStore{
    constructor() {
        this._isAuth = false
        this._user = {}
        this._items = []
        makeAutoObservable(this)
    }

    setItems(items){
        this._items = items
    }

    get items(){
        return this._items
    }

    setIsAuth(bool){
        this._isAuth = bool
    }


    setUser(user){
        this._user = user
    }


    get isAuth(){
        return this._isAuth
    }

    get user() {
        return this._user
    }


}