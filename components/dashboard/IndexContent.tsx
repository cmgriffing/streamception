import useChannelName from "../../hooks/useChannelName";
import CountUp from "react-countup";
import { useContext, useEffect, useState } from "react";
import { DBInvitation } from "../../util/types";
import useAxios from "../../hooks/useAxios";
import { TokenContext } from "../../context/token";
import Link from "next/link";

export default function IndexContent() {
  const [channelName] = useChannelName();

  const [rawHosts, setRawHosts] = useState([]);
  const [hosts, setHosts] = useState([]);

  const [rawGuests, setRawGuests] = useState([]);
  const [guests, setGuests] = useState([]);

  const [token] = useContext(TokenContext);
  const axios = useAxios(token);

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

    axios.get("/api/get-guest-hosts").then((response) => {
      const hostsSet = {};

      response.data.sort((a, b) => {
        return a.createdDate - b.createdDate;
      });

      response.data.forEach((host) => {
        hostsSet[host.hostId] = host;
      });

      const filteredHosts = Object.values(hostsSet);

      filteredHosts.sort((a: any, b: any) => {
        return a.createdDate - b.createdDate;
      });

      setHosts(Object.values(hostsSet));
      setRawHosts(response.data);
    });
  }, [token]);

  return (
    <>
      <h2 className="text-4xl z-10 text-center mt-16">
        Welcome back, {channelName}
      </h2>

      <div className="flex flex-row items-center justify-center mt-8">
        <div className="h-40 w-40 flex flex-col items-center justify-center">
          <Link href="/dashboard/host" passHref={true}>
            <a>
              <h3 className="text-3xl text-center">Host</h3>
              <h4 className="text-5xl text-center">
                <CountUp end={hosts.length} duration={3} />
              </h4>
            </a>
          </Link>
        </div>
        <div className="h-40 w-40 flex flex-col items-center justify-center">
          <Link href="/dashboard/host" passHref={true}>
            <a>
              <h3 className="text-3xl text-center">Guest</h3>
              <h4 className="text-5xl text-center">
                <CountUp end={guests.length} duration={3} />
              </h4>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
