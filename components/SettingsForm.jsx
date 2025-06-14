import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SettingsFormContext } from "@/context/SettingsFormContext";
import { useResetSettingsForm } from "@/hooks/useResetSettingsForm";
import { useContext, useRef } from "react";
import { NumberInput } from "./NumberInput";

export const SettingsForm = ({ setOpen }) => {
  const { form, onSubmit, showFileName } = useContext(SettingsFormContext);
  const musicTrackInputRef = useRef(null);
  const { resetForm } = useResetSettingsForm(musicTrackInputRef);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(values, setOpen))}
        className="space-y-9 xl:space-y-12"
      >
        <div className="3xl:space-y-8 4xl:space-y-10 space-y-4 xl:space-y-6">
          <NumberInput
            form={form}
            name="intervalCount"
            label="Interval count"
            placeholder="4"
          />

          <NumberInput
            form={form}
            name="totalWorkMinutes"
            label="Work duration (minutes)"
            placeholder="25"
          />

          <NumberInput
            form={form}
            name="totalBreakMinutes"
            label="Break duration (minutes)"
            placeholder="5"
          />

          <div className="space-y-1">
            <FormField
              control={form.control}
              name="musicTrack"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="font-400 font-normal">
                    Music Track (MP3)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".mp3,audio/mpeg"
                      className="border-border focus font-300 3xl:leading-[1.5] leading-[2.75] text-white file:hidden file:text-white xl:leading-[2.25] 2xl:leading-[1.8]"
                      ref={musicTrackInputRef}
                      onChange={(e) =>
                        form.setValue("musicTrack", e.target.files?.[0])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showFileName && form.getValues("musicTrack") && (
              <div className="text-muted-foreground font-300 text-sm">
                <span>Selected: </span>
                <span className="italic">
                  {form.getValues("musicTrack").name}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="space-x-3 text-end">
          <Button
            variant="outline"
            type="submit"
            className="focus font-400 cursor-pointer font-normal"
          >
            Save
          </Button>
          <Button
            type="button"
            variant="outline"
            className="focus font-400 cursor-pointer font-normal"
            onClick={() => resetForm(setOpen)}
          >
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
};
