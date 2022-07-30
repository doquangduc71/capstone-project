import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { async } from '@firebase/util';
import { getStorage, ref, listAll } from "firebase/storage";



@Component({
  selector: 'app-medical-records-history',
  templateUrl: './medical-records-history.component.html',
  styleUrls: ['./medical-records-history.component.css']
})
export class MedicalRecordsHistoryComponent implements OnInit {

  constructor(private storage: AngularFireStorage) { }
  filelist: Array<{ id: string, listHistory: string[] }> = [];

  storage2 = getStorage();
  listRef = ref(this.storage2, '/medical_records');

  async ngOnInit() {
    await listAll(this.listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
        this.filelist.push({ id: folderRef.name, listHistory: [] });
        });

      }).catch((error) => {
        console.log(error)
      });
        this.filelist.forEach( item => {

       const path = `/medical_records/${item.id}/`;
       this.storage.ref(path).listAll().subscribe(  (data) => {

         for (let i = 0; i < data.items.length; i++) {
          let name =  data.items[i].name;
          let newref =  this.storage.ref(path + data.items[i].name) ;
          let url =   newref.getDownloadURL().subscribe(   (data) => {
              item.listHistory.push(data);
          });
          let time =  newref.getMetadata().subscribe( (data)=>{
             console.log(data.timeCreated);
          });

        }

      });

    });
    console.log(this.filelist);




  }

}
