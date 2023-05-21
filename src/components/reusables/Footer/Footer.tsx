import styled from "styled-components";

const Footer = () => {
	return (	
		<StyledFooter>
			<div className="flex justify-center !mt-4 gap-x-8">
				---
			</div>
		</StyledFooter>
	);
};

const StyledFooter = styled.footer`
	padding-bottom: 26px;

	@media screen and (max-width: 640px) {
		padding-bottom: 36px;
	}

	& > section {
		& > div {
			a,
			p {
				display: block;
				color: var(--text-color);
				font-size: 16px;
				white-space: nowrap;
				margin-bottom: 0.7rem;
				text-decoration: none;
			}

			a:hover {
				color: var(--color-primary);
				transition: all 0.7s;
			}
		}
	}
`;

export default Footer;


// git remote add origin https://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@github.com/raymondj9/invoice-generator.git