"use client";

import { useSettingsForm } from "@/hooks/useSettingsForm";
import { createContext } from "react";

export const SettingsFormContext = createContext();

export const SettingsFormContextProvider = ({ children }) => {
  const { form, onSubmit, showFileName } = useSettingsForm();

  return (
    <SettingsFormContext.Provider value={{ form, onSubmit, showFileName }}>
      {children}
    </SettingsFormContext.Provider>
  )
}