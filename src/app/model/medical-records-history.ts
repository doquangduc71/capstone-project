export class MedicalRecordsHistory {
    appointmentId:string;
    listMedicalrecords:Array<string>;
    constructor(id:string){
        this.appointmentId=id;
    }
}
