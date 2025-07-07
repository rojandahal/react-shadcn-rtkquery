import { useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface CheckBoxSelectProps {
  name: string;
  id: number;
  label: string;
  className?: string;
}
export function CheckBoxSelect({
  name,
  id,
  label,
  className,
}: CheckBoxSelectProps) {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext();

  const error = errors[id];
  const hasError = !!error;

  return (
    <div key={id} className={cn(className)}>
      <div className="flex items-center gap-2">
        <Input
          type="checkbox"
          {...register(name, {
            onChange: (event) => {
              const value = getValues(name)[name] || [];
              if (event.target.checked) {
                value.push(id);
              } else {
                const index = value.indexOf(id);
                if (index > -1) {
                  value.splice(index, 1);
                }
              }
            },
          })}
          value={id}
          id={`role-${id}`}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <Label htmlFor={`role-${id}`}>{label}</Label>
        {hasError && (
          <p className="text-sm text-red-500">{error.message as string}</p>
        )}
      </div>
    </div>
  );
}
