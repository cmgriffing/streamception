import useChannelName from "../../hooks/useChannelName";
import useToken from "../../hooks/useToken";
import useAxios from "../../hooks/useAxios";
import React, { useEffect, useState } from "react";
import { LogCard, StatusLabel } from "../common";

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
      <tr key={host.createdDate}>
        <td>{host.hostChannelName}</td>
        <td>
          <StatusLabel allowed={host.allowed}>
            {JSON.stringify(host.allowed)}
          </StatusLabel>
        </td>
        <td>
          {date.getMonth()}/{date.getDate()}/{date.getFullYear()}
        </td>
      </tr>
    );
  });

  const hostElements = hosts.map((host) => {
    const date = new Date(host.createdDate);
    return (
      <tr key={host.createdDate}>
        <td>{host.hostChannelName}</td>
        <td>
          <button
            type="button"
            onClick={() => {
              axios
                .post("/api/set-permission", {
                  twitchId: host.hostId,
                  allowed: false,
                })
                .then(() => {
                  setHosts(
                    hosts.filter((currentHost) => {
                      return currentHost.hostId === host.hostId;
                    })
                  );
                });
            }}
          >
            Revoke
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className="flex flex-row space-x-4 justify-center">
        <LogCard>
          <h2>Allowed List</h2>
          <p>These are the streams allowed to host you.</p>
          <table>{hostElements}</table>
        </LogCard>
        <LogCard>
          <h2>Full History</h2>
          <p>This shows every change to your status in various streams.</p>
          <table>{rawHostElements}</table>
        </LogCard>
      </div>
    </>
  );
}
