import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';
import { storage } from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable()
export class FirebaseService {
  constructor(
    private afd: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private camera: Camera) {

  }
  pushMessageToConversation(key, msg) {
    return this.afd.list('/conversations/' + key + '/messages').push(msg);

  }
  createConversation(key, cnv) {
    //return this.afd.list('/snaps').push(snap);
    return this.afd.object(`/conversations/${key}`).set(cnv);
  }

  getConversationsByKey(key) {
    return this.afd.list('conversations', ref => ref.orderByChild('key').equalTo(key)).valueChanges();
  }

  getConversationsByUserId(userId) {
    //return this.afd.list('conversations', ref => ref.orderByChild('senderId').equalTo(userId)).valueChanges();
    return this.afd.list('conversations', ref => ref.orderByChild('senderId').equalTo(userId)).snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
  }
  getConversationsByUserIdAndType(type, userId) {
    console.log("fdsdf" + type);
    //return this.afd.list('conversations', ref => ref.orderByChild('senderId').equalTo(userId)).valueChanges();
    return this.afd.list('conversations', ref => ref.orderByChild(type).equalTo(userId)).snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
  }
  getListOfSnapsByPractetionerId(userId) {
    return this.afd.list('snaps', ref => ref.orderByChild("practitioners").equalTo("-L9QCGuVqTgh_o7pJS-y")).valueChanges();

  }

  getListOfSnapsByPatientId(userId) {
    return this.afd.list('snaps', ref => ref.orderByChild('patientId').equalTo(userId)).valueChanges();
  }

  createSnap(key, snap) {
    //return this.afd.list('/snaps').push(snap);
    return this.afd.object(`/snaps/${key}`).set(snap);
  }
  pushPractitionerToSnap(key, practitioner) {
    return this.afd.list('/snaps/' + key + '/practitioners').push(practitioner);
    //return this.afd.object('/snaps/' + key + `/practitioners/${practitioner.key}`).set(practitioner);
  }
  pushCommentToSnap(key, comment) {
    //return this.afd.object('/snaps/' + key + `/commments/${userId}`).set(comment);
    return this.afd.list('/snaps/' + key + '/comments').push(comment);
    //return this.afd.object('/snaps/' + key + `/practitioners/${practitioner.key}`).set(practitioner);
  }

  fingUsersByType(type) {
    return this.afd.list('users', ref => ref.orderByChild('type').equalTo(type)).snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
  }

  findUserByEmail(email) {
    //return this.afd.list('/users', ref => ref.orderByChild('email').equalTo(email)).valueChanges();
    return this.afd.list('users', ref => ref.orderByChild('email').equalTo(email)).snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
  }

  findUserByKey(key) {
    return this.afd.object(`users/${key}`).valueChanges();
  }

  uploadImage(imageUrl, imageRef) {
    return imageRef.putString(imageUrl, storage.StringFormat.DATA_URL);
  }

  getImageUrl(imageRef) {
    return imageRef.getDownloadURL();
  }

  getListOfUsers() {
    return this.afd.list('/users').valueChanges();
  }

  getListOfSnaps() {
    return this.afd.list('/snaps').snapshotChanges().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    });
  }

  createUser(user) {
    return this.afd.list('/users').push(user);
  }

  currentUser() {
    return this.afAuth.auth.currentUser;
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
