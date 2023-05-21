import styled from "styled-components";

type TextAreaProps = {
  className?: string;
  style?: React.CSSProperties;
  value: string | number;
  rows: number;
  cols: number;
  placeholder?: string;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  label?: string;
  errorMsg?: string;
};

const TextArea = ({
  className,
  value,
  disabled,
  onChange,
  label,
  errorMsg,
  rows,
  cols,
  ...props
}: TextAreaProps) => {
  return (
    <InputWrapper className="relative w-full">
      {label && (
        <label className="mb-2 block" htmlFor={props?.id}>
          {label}
        </label>
      )}
      <StyledTextArea
        rows={rows}
        cols={cols}
        className={`w-full block bg-text-field p-5 border bg-gray-200 ${className}`}
        {...props}
      />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  & label {
    font-weight: 500;
    font-size: 17px;
    line-height: 22px;
    color: #333333;

    @media screen and (max-width: 400px) {
      font-size: 15px;
      line-height: 20px;
    }
  }
`;

const StyledTextArea = styled.textarea`
  display: block;
  width: 100%;
  /* border: none; */
  outline: none;
  border-radius: 5px;

  @media screen and (max-width: 400px) {
    padding: 0 0.8rem;
  }

  &:focus {
    /* border: none; */
    outline: none;
  }

  &:disabled {
    opacity: 0.8;
  }
`;

export default TextArea;
