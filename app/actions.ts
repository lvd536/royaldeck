"use server";
import { adminAuth } from "@/lib/firebaseAdmin";
import { IUserRecord } from "@/types/interfaces";

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
