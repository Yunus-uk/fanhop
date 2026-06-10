// Live weather via Open-Meteo — free, no API key required.
// https://open-meteo.com/

export interface Weather {
  tempC: number;
  tempF: number;
  code: number;
  label: string;
  emoji: string;
  isDay: boolean;
}

// WMO weather interpretation codes -> human label + emoji
function describe(code: number, isDay: boolean): { label: string; emoji: string } {
  const map: Record<number, { label: string; emoji: string }> = {
    0: { label: "Clear sky", emoji: isDay ? "☀️" : "🌙" },
    1: { label: "Mostly clear", emoji: isDay ? "🌤️" : "🌙" },
    2: { label: "Partly cloudy", emoji: "⛅" },
    3: { label: "Overcast", emoji: "☁️" },
    45: { label: "Fog", emoji: "🌫️" },
    48: { label: "Freezing fog", emoji: "🌫️" },
    51: { label: "Light drizzle", emoji: "🌦️" },
    53: { label: "Drizzle", emoji: "🌦️" },
    55: { label: "Heavy drizzle", emoji: "🌧️" },
    61: { label: "Light rain", emoji: "🌦️" },
    63: { label: "Rain", emoji: "🌧️" },
    65: { label: "Heavy rain", emoji: "🌧️" },
    71: { label: "Light snow", emoji: "🌨️" },
    73: { label: "Snow", emoji: "🌨️" },
    75: { label: "Heavy snow", emoji: "❄️" },
    80: { label: "Rain showers", emoji: "🌦️" },
    81: { label: "Rain showers", emoji: "🌧️" },
    82: { label: "Violent showers", emoji: "⛈️" },
    95: { label: "Thunderstorm", emoji: "⛈️" },
    96: { label: "Thunderstorm + hail", emoji: "⛈️" },
    99: { label: "Severe thunderstorm", emoji: "⛈️" },
  };
  return map[code] ?? { label: "—", emoji: "🌡️" };
}

export async function getWeather(lat: number, lng: number): Promise<Weather | null> {
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}` +
      `&current=temperature_2m,weather_code,is_day&temperature_unit=celsius`;
    // Cache for 30 minutes so we don't hammer the API on every request.
    const res = await fetch(url, { next: { revalidate: 1800 } });
    if (!res.ok) return null;
    const data = await res.json();
    const cur = data.current;
    if (!cur) return null;
    const tempC = Math.round(cur.temperature_2m);
    const isDay = cur.is_day === 1;
    const { label, emoji } = describe(cur.weather_code, isDay);
    return {
      tempC,
      tempF: Math.round((tempC * 9) / 5 + 32),
      code: cur.weather_code,
      label,
      emoji,
      isDay,
    };
  } catch {
    return null;
  }
}

// Hourly forecast lookup for kickoff-time weather. Open-Meteo serves up to
// 16 days of hourly data; returns a function mapping an instant -> Weather,
// or null for kickoffs outside the forecast window.
export async function getHourlyWeather(
  lat: number,
  lng: number,
): Promise<((at: Date) => Weather | null) | null> {
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}` +
      `&hourly=temperature_2m,weather_code,is_day&forecast_days=16` +
      `&temperature_unit=celsius&timeformat=unixtime&timezone=UTC`;
    const res = await fetch(url, { next: { revalidate: 1800 } });
    if (!res.ok) return null;
    const data = await res.json();
    const h = data.hourly;
    if (!h?.time?.length) return null;
    const times: number[] = h.time; // unix seconds, hourly steps
    return (at: Date) => {
      const idx = Math.round((at.getTime() / 1000 - times[0]) / 3600);
      if (idx < 0 || idx >= times.length) return null;
      const temp = h.temperature_2m?.[idx];
      const code = h.weather_code?.[idx];
      if (temp == null || code == null) return null;
      const tempC = Math.round(temp);
      const isDay = h.is_day?.[idx] === 1;
      const { label, emoji } = describe(code, isDay);
      return {
        tempC,
        tempF: Math.round((tempC * 9) / 5 + 32),
        code,
        label,
        emoji,
        isDay,
      };
    };
  } catch {
    return null;
  }
}

// Local time string for a city's IANA timezone, e.g. "3:45 PM".
export function localTime(timezone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
  }).format(new Date());
}
