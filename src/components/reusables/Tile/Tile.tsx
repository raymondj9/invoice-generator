import styled from "styled-components";

type TileProps = {
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode | string;
};

const Tile = ({ style, children, className }: TileProps) => {
  return (
    <StyledTile
      style={style && style}
      className={`tile p-6 lg:p-11 ${className && className}`}
    >
      {children}
    </StyledTile>
  );
};

export const StyledTile = styled.div`
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.12);
  border-radius: 25px;
`;

// const StyledTile = styled('div').withConfig({
//     shouldForwardProp: (prop, defaultValidatorFn) =>
//         !['hidden'].includes(prop)
//         && defaultValidatorFn(prop),
//   }).attrs({ className: 'foo' })`
//     color: red;
//     &.foo {
//       text-decoration: underline;
//     }
//   `;

export default Tile;
