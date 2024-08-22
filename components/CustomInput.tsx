import { CustomInputProps } from "@/types";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

function CustomInput({
  control,
  name,
  type,
  placeholder,
  label = "",
  required = false,
}: CustomInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <div className="form-item">
            <FormLabel className="form-label capitalize">
              {label || name}
            </FormLabel>
            <div className="flex w-ful flex-col">
              <FormControl>
                <Input
                  type={type}
                  placeholder={placeholder}
                  className="input-class"
                  {...field}
                  required={required}
                />
              </FormControl>
              <FormMessage className="form-message mt-2" />
            </div>
          </div>
        );
      }}
    />
  );
}
export default CustomInput;
