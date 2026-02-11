"use client";
import { Mail, KeyRound } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { auth } from "@/utils/database/firebase";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";

interface IForm {
    email: string;
    password: string;
    confirmPassword: string;
}

export default function SignIn() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IForm>({
        mode: "onChange",
    });

    const onSubmit: SubmitHandler<IForm> = (data) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) =>
                sendEmailVerification(userCredential.user),
            )
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(
                    `Auth ends with error code: ${errorCode}: ${errorMessage}`,
                );
            });
    };

    const passwordWatch = watch("password");

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-1 my-auto bg-background/50 p-2 rounded-lg z-2"
        >
            <label htmlFor="emailInput" className="text-xs font-clash-regular">
                Email
            </label>
            <div className="flex relative items-center gap-2 p-2 ring-stone-500 ring-1 rounded-lg focus-within:ring-stone-300 transition-ring duration-300">
                <Mail />
                <input
                    type="text"
                    id="emailInput"
                    className="w-full h-full outline-0 font-clash-regular text-sm pl-2 border-l border-l-stone-500"
                    {...register("email", {
                        required: true,
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Invalid email address",
                        },
                    })}
                />
            </div>
            {errors.email && (
                <span className="text-red-400 font-medium text-xs">
                    {errors.email.message}
                </span>
            )}
            <label
                htmlFor="passwordInput"
                className="text-xs font-clash-regular mt-1"
            >
                Password
            </label>
            <div className="flex relative items-center gap-2 p-2 ring-stone-500 ring-1 rounded-lg focus-within:ring-stone-300 transition-ring duration-300">
                <KeyRound />
                <input
                    type="password"
                    id="passwordInput"
                    className="w-full h-full outline-0 font-clash-regular text-sm pl-2 border-l border-l-stone-500"
                    {...register("password", {
                        required: true,
                        minLength: 8,
                        validate: (value) => {
                            if (
                                !value.match(
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                )
                            ) {
                                return "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number";
                            }
                        },
                    })}
                />
            </div>
            {errors.password && (
                <span className="text-red-400 font-medium text-xs">
                    {errors.password.message}
                </span>
            )}
            <label
                htmlFor="passwordInput"
                className="text-xs font-clash-regular mt-1"
            >
                Confirm Password
            </label>
            <div className="flex relative items-center gap-2 p-2 ring-stone-500 ring-1 rounded-lg focus-within:ring-stone-300 transition-ring duration-300">
                <KeyRound />
                <input
                    type="password"
                    id="confirmPasswordInput"
                    className="w-full h-full outline-0 font-clash-regular text-sm pl-2 border-l border-l-stone-500"
                    {...register("confirmPassword", {
                        required: true,
                        validate: (value) => {
                            if (
                                value !== passwordWatch ||
                                value === "" ||
                                value === undefined
                            )
                                return "Passwords do not match";
                        },
                    })}
                />
            </div>
            {errors.confirmPassword && (
                <span className="text-red-400 font-medium text-xs">
                    {errors.confirmPassword.message}
                </span>
            )}
            <button
                type="submit"
                className="font-clash-regular text-sm mt-2 p-2 ring-indigo-500 ring-1 rounded-lg hover:ring-indigo-400 transition-ring duration-300"
            >
                Sign In
            </button>
        </form>
    );
}
