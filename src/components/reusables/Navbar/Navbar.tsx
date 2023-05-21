import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
	return (
		<StyledNav
			className={`bg-base flex items-center justify-center lg:!pt-8 `}
		>
			<div className="items-center text-center m-wrapper">
				{/* <NavLink to={'/'}>
					App Name
				</NavLink> */}
			</div>
		</StyledNav>
	);
};

const StyledNav = styled.nav`
	& form {
		& input {
			outline: none;
			background: #ffffff;
			border: 1px solid #000000;
			border-radius: 30px;
			width: 390px;
			height: 45px;
			padding: 0 2rem 0.2rem 3.5rem;
			font-size: 1.1rem;

			@media screen and (max-width: 1216px) {
				width: 300px;
			}

			@media screen and (max-width: 1130px) {
				width: 100%;
			}

			@media screen and (max-width: 1076px) {
				width: 390px;
			}
		}
	}
`;

export default Navbar;
