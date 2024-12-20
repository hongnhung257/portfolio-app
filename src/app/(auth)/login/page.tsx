"use client";

import { FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";

import { CInputValidation } from "@/components/form-control/input-validation";
import { CButton } from "@/components/ui/button";
import { useFormWithYupSchema } from "@/hooks/useFormWithYupSchema";
import { loginSchema } from "@/lib/validation/loginSchema";
import authApiRequest from "@/apiRequest/auth";
import { AuthenSchema, useLogin } from "@/app/(auth)/login/api/login.api";
import { tokenUser } from "@/config/axios.config";

interface ILogin {
	username: string;
	password: string;
}

function Login() {
	const loginAction = useLogin();
	const nav = useRouter();
	const methods = useFormWithYupSchema<ILogin>(loginSchema, {
		defaultValues: {
			username: "nhinth@liftsoft.vn",
			password: "Lp123456",
		},
	});

	const { handleSubmit } = methods;

	const loginHandler = (data: AuthenSchema) => {
		const loginParams = {
			username: data.username.trim(),
			password: data.password.trim(),
		};
		loginAction.mutate(loginParams, {
			onSuccess(dataRes) {
				if (dataRes.isFlag) {
					console.log("success");
					authApiRequest.setToken(dataRes).then(() => {
						tokenUser.value = dataRes.data.token;
						nav.push("/dashboard");
					});
				}
			},
		});
	};

	return (
		<div className="w-[500px] mx-auto flex justify-center items-center h-screen">
			<FormProvider {...methods}>
				<form
					onSubmit={handleSubmit(loginHandler)}
					className="w-[500px] border rounded-sm p-4 bg-gray-100 shadow-md"
				>
					<h6 className="font-semibold text-lg ">Đăng nhập</h6>
					<CInputValidation
						name="username"
						label="User Name"
						className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-blue-500"
					/>
					<CInputValidation
						name="password"
						label="Password"
						type="password"
						className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-blue-500"
					/>
					{loginAction.data?.msg && (
						<p className="text-pink-700 text-xs ">Login fail</p>
					)}
					<CButton
						className="w-full mt-4 py-2 text-white rounded-md transition duration-300"
						color="primary"
						type="submit"
						size="lg"
						disabled={loginAction.isPending}
					>
						Login
					</CButton>
				</form>
			</FormProvider>
		</div>
	);
}

export default Login;
