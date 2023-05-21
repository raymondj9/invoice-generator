import styled from "styled-components";

type SearchInputProps = {
	className?: string;
	style?: React.CSSProperties;
	value: string | number;
	placeholder?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	name: string;
}

const SearchInput = ({
	className,
	value,
	onChange,
	...props
}: SearchInputProps) => {
	return (
		<StyledInput
			type="text"
			className={`w-full block bg-white ${className}`}
			{...props}
		/>
	);
};

const StyledInput = styled.input`
	height: 54px;
	padding: 0 1.5rem;
	border: none;
	outline: none;
	border-radius: 2px;
  font-size: 16px;

	@media screen and (max-width: 400px) {
		height: 45px;
		padding: 0 0.8rem;
	}

	&:focus {
		border: none;
		outline: none;
	}

	&:disabled {
		opacity: 0.8;
	}
`;

export default SearchInput;
