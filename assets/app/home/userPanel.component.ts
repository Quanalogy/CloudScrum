/**
 * Created by munk on 10-08-16.
 */
import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {JwtHelper} from "angular2-jwt";
import {PatchUser} from "./patchUser";
import {HomeService} from "./home.service";

@Component({
    selector: 'userPanel-component',
    template: require("./userPanel.component.html"),
    directives: [ROUTER_DIRECTIVES],
    providers: [
        /*HomeService,
        AuthHttp,
        AuthConfig,
        UserService,*/
        JwtHelper]
})

export class UserPanelComponent implements OnInit {

    patchUser = new PatchUser('','','','','','');
    emailInUse = false;
    pwChangeFail = false;
    passwordMatching = true;
    retypedPassword = '';

    constructor(private jwtHelper: JwtHelper,
                public homeService: HomeService){

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
    }

    ngOnInit() {
        const token = localStorage.getItem("token");
        this.patchUser.email = this.jwtHelper.decodeToken(token).email;
    }
}
