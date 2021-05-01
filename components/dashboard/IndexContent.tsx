import useChannelName from "../../hooks/useChannelName";

export default function IndexContent() {
  const [channelName] = useChannelName();

  return <h2 className="text-center">Welcome back, {channelName}</h2>;
}
