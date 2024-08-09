import Button, { ButtonProps } from "./Button";

export const Submit: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Button type="submit" {...rest}>
      {children}
    </Button>
  );
};
