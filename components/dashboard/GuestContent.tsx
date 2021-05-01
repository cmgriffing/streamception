import useChannelName from "../../hooks/useChannelName";
import useToken from "../../hooks/useToken";
import useAxios from "../../hooks/useAxios";
import { useEffect, useState } from "react";

export default function GuestContent() {
  const [channelName] = useChannelName();
  const [token] = useToken();
  const axios = useAxios(token);
  const [rawHosts, setRawHosts] = useState([]);
  const [hosts, setHosts] = useState([]);

  useEffect(() => {
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

  const rawHostElements = rawHosts.map((host) => {
    const date = new Date(host.createdDate);
    return (
      <div key={host.createdDate}>
        {host.hostChannelName} - {JSON.stringify(host.allowed)} -{" "}
        {date.getMonth()}/{date.getDate()}/{date.getFullYear()}
      </div>
    );
  });

  const hostElements = hosts.map((host) => {
    const date = new Date(host.createdDate);
    return (
      <div key={host.createdDate}>
        {host.hostChannelName} - {JSON.stringify(host.allowed)} -{" "}
        {date.getMonth()}/{date.getDate()}/{date.getFullYear()}
      </div>
    );
  });

  return (
    <>
      <h1>Allowed List</h1>
      <p>These are the stream allowed to host you.</p>
      <h2>Raw</h2>
      {rawHostElements}
      <h2>Filtered</h2>
      {hostElements}
    </>
  );
}
