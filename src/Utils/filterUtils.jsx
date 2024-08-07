import * as turf from "@turf/turf";

// Function to fetch country boundaries from a GeoJSON file
const fetchCountryBoundaries = async () => {
  const response = await fetch("/geojson/countries.geo.json");
  if (!response.ok) throw new Error("Failed to fetch country boundaries");
  return response.json();
};

// Function to get the geometry of a country based on its code
const getCountryPolygon = (countryFeatures, countryCode) => {
  const countryPolygon = countryFeatures.find(
    (feature) => feature.id === countryCode
  );

  if (!countryPolygon) {
    console.error(
      `No boundary data available for country code: ${countryCode}`
    );
    return null;
  }
  return countryPolygon.geometry;
};

// Function to fix coordinates by ensuring rings are valid
const fixCoordinates = (coordinates) => {
  return coordinates
    .map((ring) => {
      if (ring.length < 4) {
        console.error(`Invalid ring with less than 4 points`);
        return []; // Skip invalid ring
      }
      // Check if the first and last points are the same
      const firstPoint = ring[0];
      const lastPoint = ring[ring.length - 1];
      if (firstPoint[0] !== lastPoint[0] || firstPoint[1] !== lastPoint[1]) {
        console.log(`Closing ring`);
        ring.push(firstPoint); // Close the ring by adding the first point at the end
      }
      return ring;
    })
    .filter((ring) => ring.length > 0); // Remove invalid rings
};

// Function to get a polygon from the geometry of a country
const getPolygonFromGeometry = (geometry) => {
  let coordinates = [];

  if (geometry.type === "Polygon") {
    coordinates = geometry.coordinates;
  } else if (geometry.type === "MultiPolygon") {
    coordinates = geometry.coordinates.flat();
  } else {
    console.error(`Unsupported geometry type: ${geometry.type}`);
    return null;
  }

  const fixedCoordinates = fixCoordinates(coordinates);
  return turf.polygon(fixedCoordinates);
};

// Main function to filter stores by country
export const filterStoresByCountry = async (stores, countryCode) => {
  try {
    const countryData = await fetchCountryBoundaries();
    const countryFeatures = countryData.features;

    const geometry = getCountryPolygon(countryFeatures, countryCode);
    if (!geometry) return [];

    const polygon = getPolygonFromGeometry(geometry);
    if (!polygon) return [];

    // Filter stores that are inside the country polygon
    return stores.filter((store) => {
      const point = turf.point([store.longitude, store.latitude]);
      return turf.booleanPointInPolygon(point, polygon);
    });
  } catch (error) {
    console.error("Error filtering stores:", error);
    return [];
  }
};
