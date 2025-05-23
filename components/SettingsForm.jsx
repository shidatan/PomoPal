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
import { useContext, useRef, useState } from "react";

export const SettingsForm = ({ setOpen }) => {
  const { form, onSubmit, showFileName } = useContext(SettingsFormContext);
  const musicTrackInputRef = useRef(null);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(values, setOpen))}
        className="space-y-14"
      >
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="intervalCount"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="font-normal">Interval count</FormLabel>
                <FormControl>
                  <Input
                    className="border-border focus selection:bg-blue-500"
                    placeholder="6"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="workDuration"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="font-normal">
                  Work duration (minutes)
                </FormLabel>
                <FormControl>
                  <Input
                    className="border-border focus selection:bg-blue-500"
                    placeholder="25"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormField
              control={form.control}
              name="musicTrack"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="font-normal">Music Track</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".mp3,audio/mpeg"
                      className="border-border focus text-white file:text-white"
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
              <div className="text-muted-foreground text-sm">
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
            className="focus cursor-pointer font-normal"
          >
            Save
          </Button>
          <Button
            type="button"
            variant="outline"
            className="focus cursor-pointer font-normal"
            onClick={() => {
              form.reset();

              // Reset the file input value
              if (musicTrackInputRef.current) {
                musicTrackInputRef.current.value = "";
              }
            }}
          >
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
};
