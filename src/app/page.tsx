import CityGrid from "./CityGrid";

export default function Home() {
  return (
    <div>
      <section className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          Your fan guide to the{" "}
          <span className="text-emerald-400">16 host cities</span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-balance text-white/70 sm:mx-0">
          Hopping between matches across the USA, Canada and Mexico? FanHop gives you what you
          actually need in each city — how to reach the stadium, live weather, the food fans rave
          about, and the best things to do between games.
        </p>
      </section>

      <CityGrid />
    </div>
  );
}
