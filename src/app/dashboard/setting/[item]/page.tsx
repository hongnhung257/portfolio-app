const Page = ({ params }: { params: { item: string } }) => {
	return <div>My Post: {params.item}</div>;
};

export default Page;
