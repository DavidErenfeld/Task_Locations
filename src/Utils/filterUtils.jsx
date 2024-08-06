import * as turf from "@turf/turf";

async function fetchCountryBoundaries() {
  const response = await fetch("/geojson/countries.geo.json");
  if (!response.ok) throw new Error("Failed to fetch country boundaries");
  return response.json();
}

export async function filterStoresByCountry(stores, countryCode) {
  try {
    const countryData = await fetchCountryBoundaries();
    const countryFeatures = countryData.features;
    console.log("Fetched country boundaries:", countryFeatures); // לוג למעקב
    console.log(`Searching for country code: ${countryCode}`);

    const countryPolygon = countryFeatures.find(
      (feature) => feature.id === countryCode
    );

    if (!countryPolygon) {
      console.error(
        `No boundary data available for country code: ${countryCode}`
      );
      return [];
    }

    const geometry = countryPolygon.geometry;
    let coordinates = [];

    if (geometry.type === "Polygon") {
      coordinates = geometry.coordinates;
    } else if (geometry.type === "MultiPolygon") {
      coordinates = geometry.coordinates.flat();
    } else {
      console.error(`Unsupported geometry type: ${geometry.type}`);
      return [];
    }

    console.log(`Coordinates for country code ${countryCode}:`, coordinates);

    // בדיקה ותיקון של הטבעות
    const fixedCoordinates = coordinates
      .map((ring) => {
        if (ring.length < 4) {
          console.error(
            `Invalid ring with less than 4 points for country code: ${countryCode}`
          );
          return []; // דילוג על טבעת לא תקינה
        }
        // בדיקה אם הנקודה הראשונה והאחרונה זהות
        const firstPoint = ring[0];
        const lastPoint = ring[ring.length - 1];
        if (firstPoint[0] !== lastPoint[0] || firstPoint[1] !== lastPoint[1]) {
          console.log(`Closing ring for country code: ${countryCode}`);
          ring.push(firstPoint); // הוספת הנקודה הראשונה בסוף לסגירת הטבעת
        }
        return ring;
      })
      .filter((ring) => ring.length > 0); // הסרת טבעות לא תקינות

    console.log(
      `Fixed coordinates for country code ${countryCode}:`,
      fixedCoordinates
    );

    const polygon = turf.polygon(fixedCoordinates);
    return stores.filter((store) => {
      const point = turf.point([store.longitude, store.latitude]);
      return turf.booleanPointInPolygon(point, polygon);
    });
  } catch (error) {
    console.error("Error filtering stores:", error);
    return []; // Return empty array in case of error
  }
}
