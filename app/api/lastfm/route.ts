import {
  NotFoundError,
  InternalServerError,
  BadGatewayError,
} from "@/infra/errors";

export async function GET() {
  const apiKey = process.env.LASTFM_API_KEY;
  const username = process.env.LASTFM_USERNAME;

  try {
    if (!apiKey || !username) {
      throw new InternalServerError({
        cause: "Missing Last.fm API key or username",
      });
    }

    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new BadGatewayError({
        cause: null,
        message: "Erro ao buscar dados do Last.fm.",
        action: "Tente novamente mais tarde.",
      });
    }
    const data = await res.json();
    const track = data.recenttracks?.track?.[0];
    if (!track) {
      throw new NotFoundError({
        cause: null,
        message: "O username não foi encontrado.",
        action: "Utilize outro username para realizar a busca.",
      });
    }
    return new Response(
      JSON.stringify({
        artist: track.artist["#text"],
        name: track.name,
        album: track.album["#text"],
        url: track.url,
        image: track.image?.[2]?.["#text"] || null,
        nowPlaying: track["@attr"]?.nowplaying === "true",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    if (error instanceof InternalServerError) {
      return new Response(JSON.stringify(error.toJSON()), {
        status: error.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (error instanceof BadGatewayError) {
      return new Response(JSON.stringify(error.toJSON()), {
        status: error.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (error instanceof NotFoundError) {
      return new Response(JSON.stringify(error.toJSON()), {
        status: error.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }

    const publicErrorObject = new InternalServerError({ cause: error });
    return new Response(JSON.stringify(publicErrorObject), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
