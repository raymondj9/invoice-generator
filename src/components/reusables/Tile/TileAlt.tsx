interface TileProps {
    style?: React.CSSProperties;
    className?: string;
    children: React.ReactNode | string;
}

const TileAlt: React.FC<TileProps> = ({ style, children, className }) => {
    return (
        <div
            style={style && style}
            className={`tile-alt ${className && className}`}
        >
            {children}
        </div>
    );
};

export default TileAlt;
