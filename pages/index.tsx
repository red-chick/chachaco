import useSWR from "swr";

const fetcher = async (input: RequestInfo, init: RequestInit) => {
  const res = await fetch(input, init);
  return res.json();
};

export default function Home() {
  const { data } = useSWR("/api/games", fetcher);

  if (!data) return <div>Loading...</div>;

  return (
    <ul>
      {data.map((game) => (
        <li key={game.id}>{game.title}</li>
      ))}
    </ul>
  );
}
