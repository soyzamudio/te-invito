import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { EventLocation } from "~/routes/i/[id]";
import { atcb_action } from "add-to-calendar-button";
import styles from "./location.scss?inline";

interface LocationProps {
  location: EventLocation;
}

export const LocationCard = component$((prop: LocationProps) => {
  useStylesScoped$(styles);

  return (
    <div class="location">
      <h3>{prop.location.venueName}</h3>
      <div>{prop.location.address}</div>
      <div>
        {prop.location.city}, {prop.location.state} {prop.location.zip}
      </div>
      <div>{prop.location.phone}</div>
      <div class="options">
        <form
          preventdefault:submit
          onSubmit$={() => {
            atcb_action({
              name: "Boda Brenda & Jose",
              startDate: "2022-10-14",
              options: ["Apple", "Google", "iCal", "Outlook.com"],
              timeZone: "Europe/Berlin",
              iCalFileName: "Reminder-Event-Brenda-Jose",
            });
          }}
        >
          <input type="submit" value="Agregar al Calendario" class="ical" />
        </form>
        <div>
          <a
            href={
              "https://www.google.com/maps/place/" +
              prop.location.lat +
              "," +
              prop.location.lng +
              "/@" +
              prop.location.lat +
              "," +
              prop.location.lng +
              ",17z"
            }
            target="_blank"
          >
            Como llegar?
          </a>
        </div>
      </div>
    </div>
  );
});
