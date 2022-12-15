import {
  component$,
  createContext,
  Resource,
  useContextProvider,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";
import { RequestHandler, useEndpoint } from "@builder.io/qwik-city";
import format from "date-fns/format";
import es from "date-fns/locale/es";
import { ConfirmModal } from "~/components/confirm-modal/confirm-modal";
import { Divider } from "~/components/divider/divider";
import { LocationCard } from "~/components/location/location";
import { Ribbon } from "~/components/ribbon/ribbon";
import styles from "./invitation.scss?inline";

interface Guest {
  name: string;
  attending: boolean;
}

export interface Event {
  id: string;
  dressCode: string;
  summary: string;
  bride: string;
  groom: string;
  date: string;
  time: string;
}

export interface EventLocation {
  venueName: string;
  address: string;
  city: string;
  state: string;
  zip: number;
  phone: string;
  lat: string;
  lng: string;
}

interface Invitation {
  confirmed: boolean;
  attendingGuests: Guest[];
}

interface EventResponse {
  event: Event;
  location: EventLocation;
  guests?: Guest[];
  invitation?: Invitation;
}

export const onGet: RequestHandler<any> = async () => {
  // put your DB access here, we are hard coding a response for simplicity.
  return {
    event: {
      id: Math.random().toString(),
      dressCode: "Formal",
      summary:
        "Les damos un cordial saludo y les invitamos a unirse a nosotros en nuestro día más especial. Estamos emocionados de compartir nuestro amor y nuestra felicidad con todos ustedes, y esperamos contar con su presencia el próximo 23 de Septiembre en Barlovento.",
      bride: "Brenda Pereda",
      groom: "José Zamudio",
      date: "2023, 8, 23",
      time: "6:00 PM",
    },
    location: {
      venueName: "Barlovento",
      address: "Calle Paraiso del Estero 467",
      city: "Paraiso del Estero",
      state: "Ver",
      phone: "2299320000",
      lat: "19°05'14.1\"N",
      lng: "+96°06'16.0\"W",
    },
    guests: [
      { name: "Susana Contreras", attending: false },
      { name: "Iñaki Contreras", attending: false },
      { name: "Dominic Contreras", attending: false },
      { name: "Susano Goyzueta", attending: false },
    ],
    invitation: {
      confirmed: false,
      attendingGuests: [],
    },
  };
};

export const storeContext = createContext("store");

export default component$(() => {
  useStylesScoped$(styles);
  const eventData = useEndpoint<EventResponse>();
  eventData.promise.then((event) => {
    store.attendingGuests = event?.invitation?.attendingGuests || [];
  });

  const store = useStore(
    { attendingGuests: [] as Guest[], showConfirmModal: false },
    { recursive: true }
  );

  useContextProvider(storeContext, store);

  return (
    <Resource
      value={eventData}
      onPending={() => <div>Loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(data) => (
        <>
          {data.invitation?.confirmed && (
            <Ribbon>
              Tu reservación ya está confirmada, puedes realizar cambios hasta 2
              meses antes del evento!
            </Ribbon>
          )}
          <div class="invitation-page-layout">
            <div class="invitation">
              <div
                class="card"
                style="background-image: url('/backgrounds/background-1.jpeg')"
              >
                <h1 class="title">
                  {data.event.bride.split(" ")[0]} &{" "}
                  {data.event.groom.split(" ")[0]}
                </h1>
                <a class="btn btn-mobile" href="#information">
                  Reservar
                </a>
              </div>
            </div>
            <div class="information" id="information">
              <div class="layout">
                <div class="event">
                  <h1 class="title">
                    {data.event.bride.split(" ")[0]} &{" "}
                    {data.event.groom.split(" ")[0]}
                  </h1>
                  <div class="date">
                    {format(new Date(data.event.date), "dd 'de' MMMM yyyy", {
                      locale: es,
                    })}
                  </div>
                  <div class="date">a las {data.event.time}</div>
                  <Divider label="Información" />
                  <div>Vestimenta: {data.event.dressCode}</div>
                  <p>{data.event.summary}</p>
                  <Divider label="Ubicación" />
                  <LocationCard location={data.location} />
                  <Divider label={data.guests?.length + " Invitados"} />
                  {data?.guests?.map((guest, index) => (
                    <div class="guest">
                      <input
                        type="checkbox"
                        id={"guest" + index}
                        checked={guest.attending}
                        onChange$={(event) => {
                          guest.attending = event.target.checked;
                          if (guest.attending) {
                            store.attendingGuests.push(guest);
                          } else {
                            store.attendingGuests.splice(
                              store.attendingGuests.indexOf(guest),
                              1
                            );
                          }
                        }}
                      />
                      <label for={"guest" + index}>{guest.name}</label>
                    </div>
                  ))}
                </div>
                <button
                  class="btn"
                  onClick$={() => (store.showConfirmModal = true)}
                  disabled={store.attendingGuests.length === 0}
                >
                  {data?.invitation?.confirmed ? "Actualizar" : "Reservar"}{" "}
                  {store.attendingGuests.length} lugares
                </button>
              </div>
            </div>
          </div>
          {store.showConfirmModal && <ConfirmModal />}
        </>
      )}
    />
  );
});
