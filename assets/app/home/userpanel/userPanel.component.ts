/**
 * Created by munk on 10-08-16.
 */
import {Component, OnInit} from "@angular/core";
import {JwtHelper} from "angular2-jwt";
import {PatchUser} from "./patchUser";
import {HomeService} from "../home.service";

@Component({
    selector: 'userPanel-component',
    template: require("./userPanel.component.html"),
    providers: [
        JwtHelper]
})

export class UserPanelComponent implements OnInit {

    patchUser = new PatchUser('','','','','','');
    emailInUse = false;
    pwChangeFail = false;
    passwordMatching = true;
    retypedPassword = '';

    filesToUpload: Array<File>;

    constructor(private jwtHelper: JwtHelper,
                public homeService: HomeService){
        this.filesToUpload = [];
    }

    upload(){
    }


    updateUserDetails(userPatch: PatchUser){
        if(userPatch.email.length < 5){
            return;
        }


        if(this.retypedPassword !== this.patchUser.newPassword){
            return this.passwordMatching = false;
        }
        this.passwordMatching = true;

        if(userPatch.currentPassword && userPatch.newPassword){
            this.homeService.patchUserPassword(userPatch.email,
            userPatch.currentPassword, userPatch.newPassword)
                .subscribe(res => {
                    console.log("Response of change pw is ", res.ok);
                    if(res.ok){
                        this.pwChangeFail = false;
                    } else {
                        this.pwChangeFail = true;
                    }
                });
        }

        if(userPatch.name || userPatch.phoneNumber || userPatch.picture){
            this.homeService.patchUserDetails(userPatch.email,
                userPatch.name, userPatch.phoneNumber, userPatch.picture)
                .subscribe(res => {
                    console.log(res);
                }, err => {
                    console.log(err);
                });
        }
    }

    ngOnInit() {
        const token = localStorage.getItem("token");
        this.patchUser.email = this.jwtHelper.decodeToken(token).email;
    }
}
