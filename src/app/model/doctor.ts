import { DoctorAchievement } from "./doctor-achievement";
import { DoctorExperience } from "./doctor-experience";
import { Specialty } from "./specialty";

export class Doctor {
    position: string;
    fullName: string;
    specialty:string;
    appointmentDoneCount: number;
    patientCount: number;
    listSpecialty: Specialty[]
    listAchievement: DoctorAchievement[];
    listExperience: DoctorExperience[];
    jobPlace: string;
    gender: number;
    dob: Date;
    email: string;
    imageUrl: string;
    phone: string;
    rating: number;
    id: number;
    signature: string;
    isActive:number;
    certificate:string;
    identificationFront:string;
    identificationBack:string;
    expireDateCertificate:Date;

}
