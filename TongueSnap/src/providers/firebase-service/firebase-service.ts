import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';

@Injectable()
export class FirebaseService {
  constructor(private afd: AngularFireDatabase,
    private afAuth: AngularFireAuth) {

  }

  getListOfUsers() {
    return this.afd.list('/users').valueChanges();
  }

  createUser(user) {
    return this.afd.list('/users').push(user);
  }

  createUserAuth(user) {
    return this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(user.email, user.password);
  }

  userLogin(user) {
    return this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(user.email, user.password);
  }

  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        return result;
      }
    }
    catch (e) {
      console.error(e);
    }
  }
}
