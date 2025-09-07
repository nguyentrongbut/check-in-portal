'use client';

import {useEffect} from "react";
import {UseFormReturn, FieldValues, Path} from "react-hook-form";

export function useScrollToFirstError<T extends FieldValues>(form: UseFormReturn<T>) {
    const {setFocus, formState} = form;

    useEffect(() => {
        const keys = Object.keys(formState.errors) as Path<T>[];
        if (keys.length > 0) {
            setFocus(keys[0]);
        }
    }, [formState.errors, setFocus])
}