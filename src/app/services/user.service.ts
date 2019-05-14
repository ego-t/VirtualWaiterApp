import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { first } from 'rxjs/operators'
import { HttpHeaders } from '@angular/common/http';

interface user {
    username: string,
    uid: string
}

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

@Injectable()
export class UserService {
    private user: user

    constructor(private afAuth: AngularFireAuth) {}

    setUser(user: user) {
        this.user = user;
    }

    getUsername(): string{
        return this.user.username
    }
    
    getUID(): string {
        return this.user.uid
    }

    async isAuthenticated() {
		if(this.user) return true

		const user = await this.afAuth.authState.pipe(first()).toPromise()

		if(user) {
			this.setUser({
				username: user.email.split('@')[0],
				uid: user.uid
			})

			return true
		}
		return false
    }
    
}