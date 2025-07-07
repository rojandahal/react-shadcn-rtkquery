import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

export function FormField({
  label,
  name,
  className,
  required = false,
  ...props
}: FormFieldProps) {
  const {
    register,
    formState: { errors },
    clearErrors,
  } = useFormContext();

  const error = errors[name];
  const hasError = !!error;

  return (
    <div className="grid gap-2">
      <Label htmlFor={name} className={cn(hasError && "text-red-500")}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={name}
        {...register(name)}
        {...props}
        className={cn(className, hasError && "border-red-500")}
        aria-invalid={hasError}
        onKeyDown={() => clearErrors(name)}
      />
      {hasError && (
        <p className="text-sm text-red-500">{error.message as string}</p>
      )}
    </div>
  );
}
