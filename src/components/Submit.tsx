import Button, { ButtonProps } from "./Button";

export const Submit: React.FC<ButtonProps> = ({ children, selected, ...rest }) => {
  return (
    <Button type="submit" selected={false} {...rest}>
      {children}
    </Button>
  );
};
