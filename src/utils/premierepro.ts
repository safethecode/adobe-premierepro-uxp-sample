import uxp from "uxp";
import type { premierepro as premiereproTypes } from "../types/ppro";

export const premierepro = (
  uxp.host.name === "premierepro" ? require("premierepro") : {}
) as premiereproTypes;
