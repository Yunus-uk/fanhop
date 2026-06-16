// FanHop — 2026 host city data
// Stadium coordinates are used for live weather (Open-Meteo) and "getting there" context.
// Content is curated for fans visiting a host city for ~48 hours around a match.

export type Country = "USA" | "Canada" | "Mexico";

export interface Pick {
  name: string;
  note: string;
}

export interface City {
  id: string; // url slug
  name: string;
  region: string; // e.g. metro / state context shown under the name
  country: Country;
  flag: string; // emoji
  stadium: string;
  stadiumArea: string; // where the stadium actually is
  lat: number;
  lng: number;
  timezone: string; // IANA tz for local kickoff times
  blurb: string; // one-line vibe of the city for a visiting fan
  gettingThere: string; // how to reach the stadium on match day
  food: Pick[]; // what fans actually want to eat
  doThis: Pick[]; // best things to do in 24-48h
  watch: {
    hub: string; // the city's main public watch-party / fan-gathering area
    bars: Pick[]; // go-to bars to catch the matches you don't have tickets for
  };
}

export const CITIES: City[] = [
  {
    id: "atlanta",
    name: "Atlanta",
    region: "Georgia, USA",
    country: "USA",
    flag: "🇺🇸",
    stadium: "Mercedes-Benz Stadium",
    stadiumArea: "Downtown Atlanta",
    lat: 33.7553,
    lng: -84.4006,
    timezone: "America/New_York",
    blurb: "A walkable, transit-friendly host — one of the easiest stadiums to reach on the whole map.",
    gettingThere:
      "Take MARTA rail to GWCC/CNN Center or Vine City station — both a short walk to the gates. Skip driving; downtown parking is pricey and slow on match day.",
    food: [
      { name: "The Varsity", note: "Classic 1920s drive-in — chili dogs and onion rings, a true Atlanta rite of passage." },
      { name: "Sweet Auburn Curb Market", note: "Food hall near downtown for cheap, fast, varied eats before kickoff." },
      { name: "Fox Bros. Bar-B-Q", note: "If you want proper Southern barbecue, this is the fan favorite." },
    ],
    doThis: [
      { name: "Centennial Olympic Park", note: "Free, central, and right by the stadium — the natural fan gathering spot." },
      { name: "Georgia Aquarium", note: "One of the world's largest — great 2-hour break if the weather turns." },
      { name: "Ponce City Market", note: "Food, rooftop games and bars in a restored landmark; easy on the BeltLine." },
    ],
    watch: {
      hub: "Centennial Olympic Park downtown is the natural gathering point — central, free and right by the stadium for big-screen crowds.",
      bars: [
        { name: "Brewhouse Café (Little Five Points)", note: "Atlanta's original soccer bar — loud, packed and open early for European kickoffs." },
        { name: "Fadó Irish Pub (Buckhead)", note: "Long-running pub that opens for early matches with every game on screen." },
        { name: "Park Bar (downtown)", note: "Right by Centennial Park — handy for a pre- or post-match pint near the stadium." },
      ],
    },
  },
  {
    id: "boston",
    name: "Boston",
    region: "Foxborough, Massachusetts, USA",
    country: "USA",
    flag: "🇺🇸",
    stadium: "Gillette Stadium",
    stadiumArea: "Foxborough (~30 mi SW of downtown Boston)",
    lat: 42.0909,
    lng: -71.2643,
    timezone: "America/New_York",
    blurb: "Note: the stadium is in Foxborough, not Boston — plan the trip out, it's not a quick hop.",
    gettingThere:
      "The MBTA runs special event Commuter Rail trains from South Station to Foxborough on match days — by far the best option. Driving means heavy lot traffic.",
    food: [
      { name: "Union Oyster House", note: "America's oldest restaurant — clam chowder and lobster, peak New England." },
      { name: "Quincy Market / Faneuil Hall", note: "Historic food hall in the city, ideal before heading to Foxborough." },
      { name: "Tatte Bakery", note: "Local mini-chain, great quick breakfast/coffee while you're downtown." },
    ],
    doThis: [
      { name: "Freedom Trail", note: "2.5-mile painted line through Revolutionary-era Boston — free and walkable." },
      { name: "Fenway Park area", note: "Even without a game, the Fenway neighborhood bars are a great pre-match scene." },
      { name: "Harvard & Cambridge", note: "Quick T ride across the river for the classic college-town wander." },
    ],
    watch: {
      hub: "Downtown — Boston Common and City Hall Plaza are the usual spots for public screenings, with the bar scene around Faneuil Hall and Fenway.",
      bars: [
        { name: "The Banshee (Dorchester)", note: "Boston's definitive football pub — rammed for big games, every league on." },
        { name: "Phoenix Landing (Cambridge)", note: "Long-time soccer bar across the river, a Liverpool-supporter favorite." },
        { name: "Lansdowne Pub (Fenway)", note: "Big Irish pub by Fenway with plenty of screens and a lively crowd." },
      ],
    },
  },
  {
    id: "dallas",
    name: "Dallas",
    region: "Arlington, Texas, USA",
    country: "USA",
    flag: "🇺🇸",
    stadium: "AT&T Stadium",
    stadiumArea: "Arlington (between Dallas & Fort Worth)",
    lat: 32.7473,
    lng: -97.0945,
    timezone: "America/Chicago",
    blurb: "Huge indoor, air-conditioned stadium — a blessing in Texas summer heat.",
    gettingThere:
      "Arlington has no rail; use the Trinity Metro/match-day shuttles, rideshare, or drive. Build in extra time — traffic around the stadium is significant.",
    food: [
      { name: "Pecan Lodge", note: "Deep Ellum barbecue institution — brisket worth the queue." },
      { name: "Velvet Taco", note: "Fast, late-night, inventive tacos — perfect fan fuel." },
      { name: "Joe T. Garcia's (Fort Worth)", note: "Legendary Tex-Mex patio if you're on the Fort Worth side." },
    ],
    doThis: [
      { name: "Fort Worth Stockyards", note: "Twice-daily cattle drive and honky-tonks — the most fun 'only in Texas' day out." },
      { name: "Dallas Arts District", note: "Walkable museums and the JFK Sixth Floor Museum nearby." },
      { name: "Deep Ellum", note: "Murals, live music and bars — the best evening neighborhood." },
    ],
    watch: {
      hub: "Arlington's stadium plaza fills on match days; for screens, head to Dallas's Uptown and Deep Ellum bar districts.",
      bars: [
        { name: "The Londoner (Addison, Colleyville & Mockingbird)", note: "Voted a top US pub for Premier League — the DFW soccer staple, opens early for kickoffs." },
        { name: "The Dubliner (Greenville Ave)", note: "Dallas's longest-running Irish pub — small, packed and loud whenever there's a match on." },
        { name: "Harwood Arms (Uptown)", note: "Official home of the local Chelsea and Bayern Munich supporters' clubs." },
      ],
    },
  },
  {
    id: "houston",
    name: "Houston",
    region: "Texas, USA",
    country: "USA",
    flag: "🇺🇸",
    stadium: "NRG Stadium",
    stadiumArea: "NRG Park, south of downtown",
    lat: 29.6847,
    lng: -95.4107,
    timezone: "America/Chicago",
    blurb: "Retractable-roof stadium connected straight to the light rail — easy and cool indoors.",
    gettingThere:
      "Take the METRORail Red Line directly to Stadium Park/Astrodome station — the stop is right at NRG. Cheapest and fastest by far.",
    food: [
      { name: "The Breakfast Klub", note: "Famous for wings & waffles — go early, the line is real." },
      { name: "Ninfa's on Navigation", note: "Birthplace of the fajita; the original Tex-Mex landmark." },
      { name: "Houston's Asiatown", note: "Some of the best Vietnamese and Chinese food in the US — incredible value." },
    ],
    doThis: [
      { name: "Space Center Houston", note: "NASA mission control and real spacecraft — Houston's signature half-day." },
      { name: "Museum District", note: "Many free museums clustered together, walkable from the rail line." },
      { name: "Buffalo Bayou Park", note: "Kayaks, trails and skyline views right by downtown." },
    ],
    watch: {
      hub: "Downtown's Discovery Green hosts large public events and screenings; the EaDo district is the bar hub near the stadiums.",
      bars: [
        { name: "The Pitch 25 (EaDo)", note: "Soccer-first beer hall built around the global game — the obvious choice." },
        { name: "Lucky's Pub (EaDo)", note: "Big patio sports bar near the stadiums, packed for soccer." },
        { name: "Little Woodrow's", note: "Local sports-bar chain that shows every match across the city." },
      ],
    },
  },
  {
    id: "kansas-city",
    name: "Kansas City",
    region: "Missouri, USA",
    country: "USA",
    flag: "🇺🇸",
    stadium: "Arrowhead Stadium",
    stadiumArea: "Eastern KC (~10 mi from downtown)",
    lat: 39.0489,
    lng: -94.4839,
    timezone: "America/Chicago",
    blurb: "One of the loudest stadiums on earth — and the undisputed barbecue capital.",
    gettingThere:
      "No rail to Arrowhead; plan for rideshare or the stadium's match-day park-and-ride. The downtown KC Streetcar is free but doesn't reach the stadium.",
    food: [
      { name: "Joe's Kansas City Bar-B-Que", note: "The Z-Man sandwich in a gas station — routinely called the best BBQ in America." },
      { name: "Arthur Bryant's", note: "Historic burnt-ends institution, a KC pilgrimage." },
      { name: "Q39", note: "Modern, sit-down barbecue if you want a table and a beer." },
    ],
    doThis: [
      { name: "Power & Light District", note: "Downtown entertainment block — the central fan hub with big screens." },
      { name: "Nelson-Atkins Museum", note: "World-class and free, with the giant shuttlecock lawn." },
      { name: "Country Club Plaza", note: "Spanish-style shopping/dining district, great for an evening stroll." },
    ],
    watch: {
      hub: "The Power & Light District downtown is KC's open-air entertainment block — big screens and the natural watch-party hub.",
      bars: [
        { name: "No Other Pub (Power & Light)", note: "Sporting KC's own bar — the city's soccer headquarters." },
        { name: "Tanner's Bar & Grill", note: "Classic KC sports-bar chain with matches on every screen." },
        { name: "Browne's Irish Marketplace", note: "Oldest Irish business in the US — a cozy spot for early kickoffs." },
      ],
    },
  },
  {
    id: "los-angeles",
    name: "Los Angeles",
    region: "Inglewood, California, USA",
    country: "USA",
    flag: "🇺🇸",
    stadium: "SoFi Stadium",
    stadiumArea: "Inglewood, near LAX",
    lat: 33.9535,
    lng: -118.3392,
    timezone: "America/Los_Angeles",
    blurb: "The most futuristic stadium in the world — but LA traffic is the real opponent.",
    gettingThere:
      "Metro K Line to Downtown Inglewood, then a shuttle, or rideshare to a drop zone. Leave very early — Inglewood gridlocks on event days.",
    food: [
      { name: "Grand Central Market", note: "Downtown LA food hall — tacos, eggs sandwiches, everything in one place." },
      { name: "Tacos 1986", note: "Adobada tacos that defined the modern LA taco scene." },
      { name: "Randy's Donuts", note: "The giant-donut landmark, minutes from the stadium." },
    ],
    doThis: [
      { name: "Venice Beach & Santa Monica", note: "Boardwalk, pier and the beach — the quintessential LA afternoon, close to Inglewood." },
      { name: "Griffith Observatory", note: "Best free Hollywood-sign and skyline view in the city." },
      { name: "The Getty", note: "Free world-class art with a hilltop view (parking reservation needed)." },
    ],
    watch: {
      hub: "Watch parties cluster in Downtown LA and Santa Monica; expect big-screen events near the stadium in Inglewood too.",
      bars: [
        { name: "Ye Olde King's Head (Santa Monica)", note: "Institution English pub — opens early for European matches." },
        { name: "The Greyhound Bar & Grill (Highland Park)", note: "Beloved neighborhood soccer bar with a real match-day crowd." },
        { name: "Tom Bergin's (Fairfax)", note: "Historic tavern that pulls a serious soccer following." },
      ],
    },
  },
  {
    id: "miami",
    name: "Miami",
    region: "Miami Gardens, Florida, USA",
    country: "USA",
    flag: "🇺🇸",
    stadium: "Hard Rock Stadium",
    stadiumArea: "Miami Gardens (~16 mi N of South Beach)",
    lat: 25.958,
    lng: -80.2389,
    timezone: "America/New_York",
    blurb: "Bring rain cover and hydration — June in Miami is hot, humid and prone to afternoon storms.",
    gettingThere:
      "No direct rail; use Tri-Rail + shuttle or rideshare. The stadium is well north of the beach, so don't underestimate the trip from South Beach.",
    food: [
      { name: "Versailles", note: "The most famous Cuban restaurant in the US — cafecito and a cubano are mandatory." },
      { name: "El Mago de las Fritas", note: "The Cuban 'frita' burger — cheap, iconic, local." },
      { name: "Little Havana (Calle Ocho)", note: "Whole street of Cuban food, cigars and domino players." },
    ],
    doThis: [
      { name: "South Beach & Ocean Drive", note: "Art Deco, sand and nightlife — the Miami postcard." },
      { name: "Wynwood Walls", note: "Open-air street-art district packed with bars and food." },
      { name: "Little Havana", note: "Live music, mojitos and the best people-watching in the city." },
    ],
    watch: {
      hub: "Bayfront Park downtown and Brickell's riverfront bars host the crowds; Little Havana erupts for any Latin American side.",
      bars: [
        { name: "Fritz & Franz Bierhaus (Coral Gables)", note: "German beer hall and Miami's long-standing go-to football bar." },
        { name: "American Social (Brickell)", note: "Riverfront sports bar with big screens and a downtown crowd." },
        { name: "Duffy's Sports Grill", note: "Florida sports-bar chain that shows every match — reliable and everywhere." },
      ],
    },
  },
  {
    id: "new-york",
    name: "New York / New Jersey",
    region: "East Rutherford, New Jersey, USA",
    country: "USA",
    flag: "🇺🇸",
    stadium: "MetLife Stadium",
    stadiumArea: "East Rutherford, NJ (~8 mi W of Manhattan)",
    lat: 40.8135,
    lng: -74.0745,
    timezone: "America/New_York",
    blurb: "Likely host of the final — the stadium is in New Jersey, so plan the cross-river trip.",
    gettingThere:
      "NJ Transit runs match-day trains from Secaucus Junction to the Meadowlands rail spur, straight to the gate. From NYC Penn Station, change at Secaucus.",
    food: [
      { name: "Katz's Delicatessen", note: "The definitive NYC pastrami on rye — touristy, but genuinely great." },
      { name: "Joe's Pizza", note: "Classic NY slice, multiple locations — the reliable cheap fan meal." },
      { name: "Los Tacos No. 1", note: "Chelsea Market favorite; some of the best tacos in the city." },
    ],
    doThis: [
      { name: "Central Park & Midtown", note: "Walk the park, then Times Square — the unavoidable NYC core." },
      { name: "Statue of Liberty / Staten Island Ferry", note: "The ferry is free and passes the statue and skyline." },
      { name: "Brooklyn (DUMBO)", note: "Best skyline photo and a great evening neighborhood across the bridge." },
    ],
    watch: {
      hub: "Manhattan overflows with watch parties; supporters' clubs for nearly every nation have a regular bar in the city.",
      bars: [
        { name: "The Football Factory at Legends (near Times Square)", note: "NYC's most famous dedicated soccer bar and supporters'-club home base." },
        { name: "Smithfield Hall (NoMad)", note: "Huge multi-screen sports hall — every match, every time." },
        { name: "Banter (Williamsburg, Brooklyn)", note: "Aussie-run soccer institution and official NYCFC pub partner — 24 taps and a packed match-day crowd." },
      ],
    },
  },
  {
    id: "philadelphia",
    name: "Philadelphia",
    region: "Pennsylvania, USA",
    country: "USA",
    flag: "🇺🇸",
    stadium: "Lincoln Financial Field",
    stadiumArea: "South Philly sports complex",
    lat: 39.9008,
    lng: -75.1675,
    timezone: "America/New_York",
    blurb: "Compact, historic and seriously passionate about sport — an easy city to do on foot and rail.",
    gettingThere:
      "Take SEPTA's Broad Street Line straight to NRG station at the sports complex — drops you right by the stadium. Simple and cheap.",
    food: [
      { name: "Pat's & Geno's", note: "The dueling cheesesteak corner in South Philly — try both and pick a side." },
      { name: "Reading Terminal Market", note: "Historic indoor market; DiNic's roast pork is the local's choice over cheesesteaks." },
      { name: "John's Roast Pork", note: "Award-winning, no-frills — arguably the city's best sandwich." },
    ],
    doThis: [
      { name: "Liberty Bell & Independence Hall", note: "Where the US was founded — free and central." },
      { name: "Rocky Steps (Art Museum)", note: "Run the steps, snap the statue — obligatory and free." },
      { name: "Italian Market", note: "America's oldest outdoor market — great for a food-led wander." },
    ],
    watch: {
      hub: "Center City has the bar density; the South Philly sports complex around the stadium fills on match days.",
      bars: [
        { name: "Misconduct Tavern (Center City)", note: "Arsenal Philadelphia's home bar — screens everywhere and a soccer-first crowd." },
        { name: "Cavanaugh's Headhouse", note: "Home of the local Liverpool and Newcastle supporters' clubs." },
        { name: "Fadó Irish Pub (Center City)", note: "Neutral ground for all supporters at 15th & Locust; opens early for big internationals." },
      ],
    },
  },
  {
    id: "bay-area",
    name: "San Francisco Bay Area",
    region: "Santa Clara, California, USA",
    country: "USA",
    flag: "🇺🇸",
    stadium: "Levi's Stadium",
    stadiumArea: "Santa Clara (~45 mi S of San Francisco)",
    lat: 37.403,
    lng: -121.97,
    timezone: "America/Los_Angeles",
    blurb: "The stadium is in Silicon Valley, well south of SF — base yourself with the trip in mind.",
    gettingThere:
      "VTA light rail serves Levi's Stadium directly; from San Francisco take Caltrain to Mountain View then VTA. Allow plenty of time from the city.",
    food: [
      { name: "Tartine / Mission District", note: "SF's famous bakery and the best burrito blocks in the Mission." },
      { name: "Ferry Building Marketplace", note: "Waterfront food hall with the city's top local vendors." },
      { name: "San Jose's Japantown", note: "Closer to the stadium — one of only three historic Japantowns left in the US." },
    ],
    doThis: [
      { name: "Golden Gate Bridge", note: "Walk or bike across — the definitive Bay Area photo." },
      { name: "Alcatraz", note: "Book ahead; the island prison tour is the city's top experience." },
      { name: "Stanford / Palo Alto", note: "Near the stadium — leafy campus and easy Valley exploring." },
    ],
    watch: {
      hub: "San Francisco's pubs draw the biggest crowds; San Jose has the closest bars to Levi's Stadium for match day.",
      bars: [
        { name: "Kezar Pub (SF, Haight)", note: "A San Francisco soccer cornerstone since 1936 — packed for big matches." },
        { name: "Britannia Arms (San Jose)", note: "South Bay British pub that opens for kickoffs — the closest soccer crowd to the stadium." },
        { name: "Danny Coyle's (SF, Haight)", note: "Irish pub that opens early for European kickoffs." },
      ],
    },
  },
  {
    id: "seattle",
    name: "Seattle",
    region: "Washington, USA",
    country: "USA",
    flag: "🇺🇸",
    stadium: "Lumen Field",
    stadiumArea: "Downtown / SoDo",
    lat: 47.5952,
    lng: -122.3316,
    timezone: "America/Los_Angeles",
    blurb: "Downtown stadium, mild June weather and a fierce football city — one of the best fan setups.",
    gettingThere:
      "Link light rail and Sounder trains stop at Stadium/International District, a short walk away. Very easy car-free.",
    food: [
      { name: "Pike Place Market", note: "The flying-fish market — chowder, piroshky and the original Starbucks." },
      { name: "Paseo", note: "Caribbean roast pork sandwiches with a cult following." },
      { name: "Dick's Drive-In", note: "Cheap, fast, beloved local burger chain — proper late-night fuel." },
    ],
    doThis: [
      { name: "Space Needle & Seattle Center", note: "Skyline views plus the Chihuly glass garden and MoPOP next door." },
      { name: "Pike Place & waterfront", note: "Market, ferris wheel and ferries — a full easy day downtown." },
      { name: "Ferry to Bainbridge Island", note: "Cheap walk-on ferry with the best Seattle skyline view from the water." },
    ],
    watch: {
      hub: "Seattle Center and downtown host public screenings; this Sounders city goes all-in on match days.",
      bars: [
        { name: "The George & Dragon Pub (Fremont)", note: "Seattle's iconic soccer pub — rammed from the earliest kickoffs." },
        { name: "Golden Roosters (Pioneer Square)", note: "Big-screen soccer bar a short walk from the stadium — every match on." },
        { name: "The Atlantic Crossing (Green Lake)", note: "Long-running English-style soccer pub, now in a bigger Green Lake space." },
      ],
    },
  },
  {
    id: "toronto",
    name: "Toronto",
    region: "Ontario, Canada",
    country: "Canada",
    flag: "🇨🇦",
    stadium: "BMO Field",
    stadiumArea: "Exhibition Place, lakefront",
    lat: 43.6332,
    lng: -79.4185,
    timezone: "America/Toronto",
    blurb: "Smaller, open-air, lakeside ground right by downtown — and an incredibly diverse food city.",
    gettingThere:
      "GO Transit and the 509/511 streetcars serve Exhibition Place at the stadium's doorstep. Walkable from downtown along the waterfront.",
    food: [
      { name: "St. Lawrence Market", note: "Historic market — the peameal bacon sandwich is the Toronto classic." },
      { name: "Kensington Market", note: "Bohemian blocks of global street food — eat your way around the world." },
      { name: "Banh Mi Boys", note: "Modern Vietnamese sandwiches and tacos — fast and excellent." },
    ],
    doThis: [
      { name: "CN Tower", note: "Glass floor and EdgeWalk; the skyline anchor, walkable from the stadium." },
      { name: "Toronto Islands", note: "Short ferry to car-free islands with the best skyline view and beaches." },
      { name: "Distillery District", note: "Cobblestone Victorian district full of patios, galleries and bars." },
    ],
    watch: {
      hub: "Maple Leaf Square downtown and Exhibition Place by the stadium draw big-screen crowds in one of the world's most diverse fan cities.",
      bars: [
        { name: "Real Sports Bar & Grill (downtown)", note: "Cavernous sports bar by Scotiabank Arena — 200 screens and a 39-foot wall, one of the best big-match venues in the country." },
        { name: "Brazen Head (Liberty Village)", note: "Multi-level Irish pub near the stadium that draws a big soccer crowd." },
        { name: "The Madison Avenue Pub", note: "Huge multi-floor pub that fills up for big matches." },
      ],
    },
  },
  {
    id: "vancouver",
    name: "Vancouver",
    region: "British Columbia, Canada",
    country: "Canada",
    flag: "🇨🇦",
    stadium: "BC Place",
    stadiumArea: "Downtown Vancouver",
    lat: 49.2768,
    lng: -123.112,
    timezone: "America/Vancouver",
    blurb: "Mountains meet ocean around a downtown, transit-connected stadium — the scenic end of the map.",
    gettingThere:
      "SkyTrain to Stadium–Chinatown station puts you right at BC Place. The whole downtown is walkable and the transit is excellent.",
    food: [
      { name: "Granville Island Public Market", note: "Waterfront market hall — seafood, donuts and local everything." },
      { name: "Japadog", note: "Vancouver's famous Japanese-style hot dog street carts." },
      { name: "Richmond night markets", note: "Some of the best Chinese food outside Asia, just south of the city." },
    ],
    doThis: [
      { name: "Stanley Park seawall", note: "Walk or bike the 9km loop — forest, ocean and skyline in one go." },
      { name: "Capilano Suspension Bridge", note: "Treetop walkways over a canyon, just north of downtown." },
      { name: "Granville Island", note: "Market, breweries and buskers — an easy half-day by mini-ferry." },
    ],
    watch: {
      hub: "Downtown Vancouver around BC Place is walkable and bar-dense — the easiest host city to find a screen near the ground.",
      bars: [
        { name: "The Pint Public House (near BC Place)", note: "A 4-minute walk from BC Place — the city's go-to FIFA pub on match day." },
        { name: "Library Square Public House (downtown)", note: "Roomy downtown pub with plenty of screens." },
        { name: "Mahony & Sons (waterfront)", note: "Popular spot to catch matches with a view of the water." },
      ],
    },
  },
  {
    id: "guadalajara",
    name: "Guadalajara",
    region: "Zapopan, Jalisco, Mexico",
    country: "Mexico",
    flag: "🇲🇽",
    stadium: "Estadio Akron",
    stadiumArea: "Zapopan, NW metro",
    lat: 20.6819,
    lng: -103.4625,
    timezone: "America/Mexico_City",
    blurb: "The home of tequila, mariachi and birria — the most quintessentially Mexican host city.",
    gettingThere:
      "The stadium sits on the city's edge in Zapopan; rideshare or match-day shuttles are the practical options. Allow time from the historic centre.",
    food: [
      { name: "Birria (Las 9 Esquinas)", note: "Guadalajara is the birthplace of birria — the goat/beef stew taco you've seen everywhere." },
      { name: "Torta ahogada", note: "The local 'drowned' pork torta in spicy sauce — a Guadalajara original." },
      { name: "Mercado San Juan de Dios", note: "Huge market with cheap regional food on the upper floor." },
    ],
    doThis: [
      { name: "Tequila town day trip", note: "Agave fields and distilleries an hour away — take the Tequila Express experience." },
      { name: "Centro Histórico & Cathedral", note: "Plazas, the Hospicio Cabañas murals and mariachi in Plaza de los Mariachis." },
      { name: "Tlaquepaque", note: "Artisan town within the metro — crafts, courtyards and mezcal." },
    ],
    watch: {
      hub: "Fans pour onto the Minerva roundabout to celebrate Mexico's wins; Colonia Americana around Avenida Chapultepec is the bar-crawl heart, with cantinas and plazas screening every match.",
      bars: [
        { name: "Cervecería Chapultepec (Colonia Americana)", note: "Anchor of the Av. Chapultepec strip — cheap beer and soccer on most screens." },
        { name: "Señor Stone (Colonia Americana)", note: "Classic sports bar just off Chapultepec with plenty of screens and bar food." },
        { name: "Centro Histórico cantinas", note: "Traditional bars near the cathedral show the games with a local crowd." },
      ],
    },
  },
  {
    id: "mexico-city",
    name: "Mexico City",
    region: "CDMX, Mexico",
    country: "Mexico",
    flag: "🇲🇽",
    stadium: "Estadio Azteca",
    stadiumArea: "Santa Úrsula, south of centre",
    lat: 19.3029,
    lng: -99.1505,
    timezone: "America/Mexico_City",
    blurb: "Football cathedral hosting its third World Cup opener — at 2,240m, the altitude is real.",
    gettingThere:
      "The Tren Ligero (light rail) stops at Estadio Azteca station right by the ground; connect via Metro line 2 at Tasqueña. Avoid driving in CDMX.",
    food: [
      { name: "Tacos al pastor (El Vilsito)", note: "Spit-roast pork tacos — Mexico City's defining street food, best at night." },
      { name: "Mercado de Coyoacán", note: "Tostadas and tacos in a leafy southern neighbourhood near the stadium." },
      { name: "Pujol / Contramar", note: "If you want world-famous sit-down dining, book these well ahead." },
    ],
    doThis: [
      { name: "Teotihuacan pyramids", note: "Climb the ancient Sun & Moon pyramids an hour from the city — unmissable." },
      { name: "Centro Histórico & Zócalo", note: "Templo Mayor, the cathedral and the giant main square." },
      { name: "Coyoacán & Frida Kahlo Museum", note: "Cobbled streets, the Blue House and great markets in the south." },
    ],
    watch: {
      hub: "El Ángel de la Independencia on Reforma is where the whole city erupts to celebrate Mexico's wins — the iconic gathering point.",
      bars: [
        { name: "Condesa & Roma", note: "Trendy neighbourhoods packed with bars screening every match." },
        { name: "Centro Histórico cantinas", note: "Historic bars near the Zócalo show the games with a passionate crowd." },
        { name: "Zona Rosa sports bars", note: "Lively district full of screens, walkable from the Ángel." },
      ],
    },
  },
  {
    id: "monterrey",
    name: "Monterrey",
    region: "Guadalupe, Nuevo León, Mexico",
    country: "Mexico",
    flag: "🇲🇽",
    stadium: "Estadio BBVA",
    stadiumArea: "Guadalupe, with mountain backdrop",
    lat: 25.6692,
    lng: -100.2444,
    timezone: "America/Monterrey",
    blurb: "Mountains frame one of the most striking stadiums anywhere — and it's serious carne asada country.",
    gettingThere:
      "Metro and match-day shuttles serve the Guadalupe area; rideshare is straightforward. The Cerro de la Silla mountain backdrop is the giveaway you're close.",
    food: [
      { name: "Cabrito", note: "Roast kid goat is Monterrey's signature dish — try it at a classic asador." },
      { name: "Carne asada & machaca", note: "Northern Mexico's beef culture at its best; machaca con huevo for breakfast." },
      { name: "Barrio Antiguo", note: "Old-town blocks packed with bars, tacos and live music at night." },
    ],
    doThis: [
      { name: "Parque Fundidora", note: "Huge park in a former steelworks with the Paseo Santa Lucía riverwalk." },
      { name: "Chipinque / Cerro de la Silla", note: "Cable car and trails into the mountains that ring the city." },
      { name: "Grutas de García", note: "Cable-car cave system a short trip out — a great hot-day escape." },
    ],
    watch: {
      hub: "Barrio Antiguo and the Macroplaza downtown fill with fans on match days — the heart of the city's watch-party scene.",
      bars: [
        { name: "Mulligan's (Barrio Antiguo)", note: "Popular upscale sports bar — long food menu and every match on screen." },
        { name: "Barrio Antiguo", note: "Old-town strip of rooftop bars and cantinas with an international fan vibe at night." },
        { name: "San Pedro Garza García", note: "Upscale district where bars and late-night spots run well past midnight." },
      ],
    },
  },
];

export function getCity(id: string): City | undefined {
  return CITIES.find((c) => c.id === id);
}

export const COUNTRIES: Country[] = ["USA", "Canada", "Mexico"];
