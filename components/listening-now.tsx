import useSWR from "swr";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const messages = [
  "Nenhuma música tocando... talvez o código esteja em modo de depuração!",
  "Silêncio total... deve ser hora de compilar os pensamentos!",
  "Sem música agora... talvez o DJ esteja refatorando a playlist!",
  "Nada tocando... parece que até a música entrou em um loop infinito de silêncio!",
  "Sem som... deve ser um bug na trilha sonora!",
];

export function ListeningNow() {
  const { data, error, isLoading } = useSWR("/api/lastfm", fetcher, {
    refreshInterval: 30000,
  });

  if (isLoading)
    return (
      <div className="text-xs text-lorenzo-light/40">Carregando música...</div>
    );
  if (error || !data || data.error)
    return (
      <div className="text-xs text-lorenzo-light/40">
        Não foi possível carregar a música. Talvez o DJ tenha tirado uma folga!
        🎧
      </div>
    );

  if (!data.nowPlaying) {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    return <div className="text-xs text-lorenzo-light/40">{randomMessage}</div>;
  }

  return (
    <div className="flex items-center gap-2 text-xs text-lorenzo-light/70">
      {data.image && (
        <Image
          width={20}
          height={20}
          src={data.image}
          alt={data.name}
          className="w-6 h-6 rounded shadow"
        />
      )}
      <span>
        Ouvindo agora:
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 text-lorenzo-accent hover:underline"
        >
          {data.artist} – {data.name}
        </a>
        {data.nowPlaying ? <span className="ml-1 animate-pulse">●</span> : null}
      </span>
    </div>
  );
}
