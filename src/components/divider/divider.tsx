import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./divider.scss?inline";

export interface DividerProps {
  label: string;
}

export const Divider = component$<DividerProps>((props: DividerProps) => {
  useStylesScoped$(styles);
  return <h3 class="separator">{props.label}</h3>;
});
