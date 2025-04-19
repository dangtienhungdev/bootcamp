type WelcomProps = {
	name: string;
	age?: number;
};

export const Welcom = ({ name, age = 1 }: WelcomProps) => {
	// props: (properties)
	return (
		<div>
			Welcom {name} - age: {age}
		</div>
	);
};
