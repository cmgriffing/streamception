import useChannelName from "../../hooks/useChannelName";
import useToken from "../../hooks/useToken";
import useAxios from "../../hooks/useAxios";
import { useEffect, useState } from "react";

export default function GuestContent() {
  const [channelName] = useChannelName();
  const [token] = useToken();
  const axios = useAxios(token);
  const [rawGuests, setRawGuests] = useState([]);
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    axios.get("/api/get-host-guests").then((response) => {
      const guestsSet = {};

      response.data.sort((a, b) => {
        return a.createdDate - b.createdDate;
      });

      response.data.forEach((host) => {
        guestsSet[host.guestId] = host;
      });

      const filteredGuests = Object.values(guestsSet);

      filteredGuests.sort((a: any, b: any) => {
        return a.createdDate - b.createdDate;
      });

      setGuests(Object.values(guestsSet));
      setRawGuests(response.data);
    });
  }, [token]);

  const rawGuestElements = rawGuests.map((guest) => {
    const date = new Date(guest.createdDate);
    return (
      <div key={guest.createdDate}>
        {guest.channelName} - {JSON.stringify(guest.allowed)} -{" "}
        {date.getMonth()}/{date.getDate()}/{date.getFullYear()}
      </div>
    );
  });

  const guestElements = guests.map((guest) => {
    const date = new Date(guest.createdDate);
    return (
      <div key={guest.createdDate}>
        {guest.channelName} - {JSON.stringify(guest.allowed)} -{" "}
        {date.getMonth()}/{date.getDate()}/{date.getFullYear()}
      </div>
    );
  });

  return (
    <>
      <h1>Allowed List</h1>
      <p>These are the stream allowed to guest you.</p>
      <h2>Raw</h2>
      {rawGuestElements}
      <h2>Filtered</h2>
      {guestElements}
    </>
  );
}
