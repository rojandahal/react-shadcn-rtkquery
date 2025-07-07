import { cn } from "@/lib/utils";
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";

interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  className?: string;
  children?: React.ReactNode;
}

export function Form<T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
  ...props
}: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-6", className)}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
}
