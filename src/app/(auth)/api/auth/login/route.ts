export async function POST(request: Request) {
	const res = await request.json();
	const token = res.data.token;
	return Response.json(
		{ res },
		{
			status: 200,
			headers: {
				"Set-Cookie": `token=${token}; Path=/; HttpOnly`,
				"Content-Type": "application/json",
			},
		}
	);
}
