import {makeAutoObservable} from "mobx";

export default class UserStore{
    constructor() {
        this._isAuth = false
        this._user = {}
        this._doctorScheduleType = 'calendar'
        makeAutoObservable(this)
    }

    setDoctorScheduleType(title){
        this._doctorScheduleType = title
    }

    get doctorScheduleType(){
        return this._doctorScheduleType
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