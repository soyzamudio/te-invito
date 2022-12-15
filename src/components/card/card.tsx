import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./card.scss?inline";
import { Event } from "~/routes/i/[id]/index";

interface CardProps {
  event: Event;
}

export const Card = component$<CardProps>((props: CardProps) => {
  useStylesScoped$(styles);
  return (
    <div
      class="card"
      style="background-image: url('/backgrounds/background-1.jpeg')"
    >
      <h1 class="title">
        {props.event.bride.split(" ")[0]} & {props.event.groom.split(" ")[0]}
      </h1>
      <a class="btn btn-mobile" href="#information">
        Reservar
      </a>
    </div>
  );
});
