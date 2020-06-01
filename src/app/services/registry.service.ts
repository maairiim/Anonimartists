import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Registry } from '../models/resgistry.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistryService {

  private dbPath = 'registry';
  private registryCollection: AngularFirestoreCollection<Registry>;
  public registry: Observable<Registry[]>;

  constructor(private angularFirestore: AngularFirestore, private authService: AuthService) {
    this.registryCollection = this.angularFirestore.collection<Registry>(this.dbPath, ref => ref.orderBy('createdAt', 'desc'));
    this.registry = this.registryCollection.valueChanges();
  }

  public getRegistry(id: string) {
    let registry: Observable<Registry>;
    registry = this.angularFirestore.doc<Registry>(`/${this.dbPath}/${id}`).valueChanges();
    // console.log('Se obtuvo: ' + post);
    return registry;
  }

  public addRegistry(registry: Registry) {
    let registryFull;

    const newId = this.angularFirestore.createId();
    this.authService.currentUser.subscribe(

      userCurrent => {
        registryFull = {
          ...registry,
          id: newId,
          displayName: userCurrent.displayName,
          createdAt: Date.now(),
        };

      });
    // console.log(post);
    return this.angularFirestore.doc(`/${this.dbPath}/${newId}`).set(registryFull);
  }

  public updateRegistry(registry: Registry) {
    let registryFull: Registry;

    this.authService.currentUser.subscribe(
      userCurrent => {
        registryFull = {
          ...registry,
          displayName: userCurrent.displayName,
          createdAt: Date.now(),

        };
      });
    return this.angularFirestore.doc<Registry>(`/${this.dbPath}/${registry.id}`).update(registryFull);
  }

  public deleteRegistry(registry: Registry) {
    return this.angularFirestore.doc<Registry>(`/${this.dbPath}/${registry.id}`).delete();
  }


}
