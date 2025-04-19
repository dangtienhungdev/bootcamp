type ListProps = {
	foods: string[];
};

export const List = (props: ListProps) => {
	const { foods } = props;

	// unique
	return (
		<ul>
			{foods.map((food) => {
				return <li key={food}>{food}</li>;
			})}
		</ul>
	);
};
