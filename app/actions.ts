"use server";
import { adminAuth } from "@/lib/firebaseAdmin";

export interface IUserRecord {
    uid: string;
    email: string | undefined;
    displayName: string | undefined;
    photoURL: string | undefined;
    emailVerified: boolean;
    phoneNumber: string | undefined;
}

export async function getUserCredits(uid: string) {
    const userRecord = await adminAuth.getUser(uid);

    return {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        photoURL: userRecord.photoURL,
        emailVerified: userRecord.emailVerified,
        phoneNumber: userRecord.phoneNumber,
    } as IUserRecord;
}
