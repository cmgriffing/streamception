import useChannelName from "../../hooks/useChannelName";
import useAxios from "../../hooks/useAxios";
import { useContext, useEffect, useState } from "react";
import { LogCard } from "../common";
import { DBInvitation } from "../../util/types";
import { TokenContext } from "../../context/token";

export default function GuestContent() {
  const [channelName] = useChannelName();
  const [token] = useContext(TokenContext);
  const axios = useAxios(token);
  const [rawGuests, setRawGuests] = useState([]);
  const [guests, setGuests] = useState([]);
  const [hiddenGuestsMap, setHiddenGuestsMap] = useState(
    {} as { [key: string]: boolean }
  );

  useEffect(() => {
    axios.get("/api/get-host-guests").then((response) => {
      const guestsSet = {};

      response.data.sort((a, b) => {
        return a.createdDate - b.createdDate;
      });

      response.data.forEach((host) => {
        guestsSet[host.guestId] = host;
      });

      const filteredGuests = Object.values(guestsSet).filter(
        (guest: DBInvitation) => guest.allowed
      );

      filteredGuests.sort((a: any, b: any) => {
        return a.createdDate - b.createdDate;
      });

      setGuests(filteredGuests);
      setRawGuests(response.data);
    });
  }, [token]);

  useEffect(() => {
    axios.get("/api/get-host-hidden-guests").then((result) => {
      setHiddenGuestsMap(
        result.data.reduce((accumulator, current, wholeArray) => {
          accumulator[current.guestId] = current.hidden;
          return accumulator;
        }, {})
      );
    });
  }, [rawGuests]);

  const guestElements = guests
    .filter((guest) => {
      return !hiddenGuestsMap[guest.guestId];
    })
    .map((guest) => {
      const date = new Date(guest.createdDate);
      return (
        <tr key={guest.createdDate}>
          <td>{guest.guestChannelName}</td>
          <td>
            <button
              onClick={() => {
                setHiddenGuestsMap({
                  ...hiddenGuestsMap,
                  [guest.guestId]: true,
                });
                axios
                  .post(`/api/set-hidden`, {
                    twitchId: guest.guestId,
                    hidden: true,
                  })
                  .catch(() => {
                    setHiddenGuestsMap({
                      ...hiddenGuestsMap,
                      [guest.guestId]: false,
                    });
                  });
              }}
            >
              Hide
            </button>
          </td>
        </tr>
      );
    });

  const hiddenGuestElements = guests
    .filter((guest) => {
      return hiddenGuestsMap[guest.guestId];
    })
    .map((guest) => {
      const date = new Date(guest.createdDate);
      return (
        <tr key={guest.createdDate}>
          <td>{guest.guestChannelName}</td>
          <td>
            <button
              onClick={() => {
                setHiddenGuestsMap({
                  ...hiddenGuestsMap,
                  [guest.guestId]: false,
                });
                axios
                  .post(`/api/set-hidden`, {
                    twitchId: guest.guestId,
                    hidden: false,
                  })
                  .catch(() => {
                    setHiddenGuestsMap({
                      ...hiddenGuestsMap,
                      [guest.guestId]: true,
                    });
                  });
              }}
            >
              Unhide
            </button>
          </td>
        </tr>
      );
    });

  return (
    <>
      <div className="flex flex-row space-x-4 justify-center">
        <LogCard>
          <h2>Allowed</h2>
          <p>
            These streams have given you permission to host their content onto
            your stream.
          </p>
          <table>{guestElements}</table>
        </LogCard>
        <LogCard>
          <h2>Hidden</h2>
          <p>These are streams you have hidden. Possibly spammers or other.</p>
          <table>{hiddenGuestElements}</table>
        </LogCard>
      </div>
    </>
  );
}
