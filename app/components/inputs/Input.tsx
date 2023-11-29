"use client"

import clsx from "clsx";
import {FieldValues, FieldError, UseFormRegister} from "react-hook-form";
import {FcGoogle} from "react-icons/fc";
import {BsGithub} from "react-icons/bs";

interface InputProps {
    label: string;
    id: string;
    type?: string;
    errors?: FieldError;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
                                         label,
                                         id,
                                         type,
                                         errors,
                                         required,
                                         register,
                                         disabled
                                     }) => {
    return (
        <div>
            hhhh
        </div>
    );
};

export default Input;