/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import type * as Yup from "yup";
import {
	type FieldValues,
	type Resolver,
	type UseFormProps,
	type UseFormReturn,
	useForm,
} from "react-hook-form";

/* @param schema  Schema được tạo bằng Yup
 * @returns  Return về các giá trị giống như useForm
 */
export function useFormWithYupSchema<T extends FieldValues = any>(
	schema: any,
	useFormProps?: UseFormProps<Yup.Asserts<any>> & {
		defaultValues: T;
	}
): UseFormReturn<Yup.Asserts<any>> {
	return useForm<T>({
		mode: "onBlur",
		...useFormProps,
		resolver: yupResolver<T>(schema) as unknown as Resolver<T, any>,
	});
}
