"use client";
import { tokenUser } from "@/config/axios.config";
import React, { ReactNode, useState } from "react";

export type GlobalContent = {
	token: string;
	setToken: (c: string) => void;
};

export const AppQueryContextProvider = ({
	children,
	initialToken,
}: {
	children: ReactNode;
	initialToken: string;
}) => {
	useState(() => {
		// check trong user client
		if (typeof window !== "undefined") tokenUser.value = initialToken;
	});
	return <>{children}</>;
};
