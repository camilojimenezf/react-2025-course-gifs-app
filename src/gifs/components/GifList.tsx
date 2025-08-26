import type { Gif } from "../interfaces/gif.interface";

interface GifListProps {
  gifs: Gif[];
}

export const GifList = (props: GifListProps) => {
  return (
    <div className="gifs-container">
      {props.gifs.map((gif) => (
        <div className="gif-card" key={gif.id}>
          <img src={gif.url} alt={gif.title} />
          <h3>{gif.title}</h3>
          <p>
            {gif.height}x{gif.width} (1.5mb)
          </p>
        </div>
      ))}
    </div>
  );
};
