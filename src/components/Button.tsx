import { classMerge } from "../utils/classMarge";

type Props = React.ComponentProps<"button"> & {
  isLoading?: boolean;
  variant?: "base" | "icon" | "smallIcon";
};

const variants = {
  button: {
    base: "h-12",
    icon: "h-12 w-12",
    smallIcon:"h-8 w-8"
  },
};

export function Button({
  children,
  isLoading,
  type = "button",
  variant = "base",
  ...rest
}: Props) {
  return (
    <button
      className={classMerge(["flex items-center justify-center bg-green-100 rounded-lg text-white cursor-pointer hover:bg-green-200 transition ease-linear disabled:opacity-50 disabled:cursor-not-allowed", variants.button[variant]])}
      type={type}
      disabled={isLoading}
      {...rest}
    >
      {children}
    </button>
  );
}
