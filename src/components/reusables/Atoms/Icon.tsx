import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

type IconProps = {
  size?: number;
  icon: IconName;
  color?: string;
  className?: string;
  onClick?: () => void;
};

const Icon = ({
  size = 20,
  icon,
  color,
  className,
  onClick,
  ...props
}: IconProps) => {
  const [isSsr, setIsSsr] = useState(true);
  useEffect(() => {
    setIsSsr(false);
  }, []);

  return (
    <>
      {!isSsr ? (
        <FontAwesomeIcon
          className={`cursor-pointer ${
            color ? "text-" + color + "-600" : ""
          } ${className}`}
          height={size}
          width={size}
          icon={icon}
          onClick={onClick}
          {...props}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Icon;
