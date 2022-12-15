import { component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import { storeContext } from "~/routes/i/[id]";
import styles from "./confirm-modal.scss?inline";

export const ConfirmModal = component$(() => {
  useStylesScoped$(styles);
  const state = useContext<any>(storeContext);

  return (
    <div class="modal">
      <div
        class="modal-background"
        onClick$={() => (state.showConfirmModal = false)}
      ></div>
      <div class="modal-content">
        <div>
          Vamos a confirmar el lugar de{" "}
          <strong>{state.attendingGuests.length}</strong> invitados:
        </div>
        {state.attendingGuests.map((guest: any) => (
          <h2>{guest.name}</h2>
        ))}
        <a class="btn" onClick$={() => (state.showConfirmModal = false)}>
          Confirmar {state.attendingGuests.length} lugares
        </a>
      </div>
    </div>
  );
});
