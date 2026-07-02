import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"


export const SectionA2 = () => {
  return (<>
    <div className="w-full px-20 flex flex-col py-4 gap-5">
      <h1 className="text-xl mb-5 font-semibold">Section 1 title</h1>

      <div>
        <Field orientation="horizontal" className="">
          <FieldContent>
            <FieldLabel htmlFor="switch-focus-mode">
              Share across devices
            </FieldLabel>
            <FieldDescription>
              Focus is shared across devices, and turns off when you leave the app.
            </FieldDescription>
          </FieldContent>
          <Switch id="switch-focus-mode" />
        </Field>
      </div>
    </div>
  </>)
}