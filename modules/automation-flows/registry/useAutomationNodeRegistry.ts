import { useContext } from "react";
import { AutomationNodeRegistryContext } from "./AutomationNodeRegistryContext";

export const useAutomationNodeRegistry = () => useContext(AutomationNodeRegistryContext);
