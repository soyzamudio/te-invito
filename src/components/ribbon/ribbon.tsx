import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./ribbon.scss?inline";

export const Ribbon = component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="ribbon">
      <Slot />
    </div>
  );
});
