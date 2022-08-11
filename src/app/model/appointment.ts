import { MedicalRecord } from "./medical-record";
import { Prescription } from "./prescription";

export class Appointment {
        id:number;
        patientId: number;
        doctorId: number;
        patientPhone: String;
        doctorName: String
        patientName: String;
        prescriptionUrl: String;
        prescriptionTrace: String;
        medicalRecordTrace: String;
        medicalRecordUrl: String;
        time: Date
        startAt: string;
        endAt: string;
        paymentStatus: string;
        listSharedPrescription:Prescription[];
        listSharedMedicalRecord:MedicalRecord[];
        relativeName: string;
        appointmentStatus:string;
}
