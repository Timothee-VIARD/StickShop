import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const Map = () => {
  const { t } = useTranslation();

  const forests = [
    { lat: 48.6091, lon: 2.4975, description: 'forest1' },
    { lat: 46.8787, lon: -121.7269, description: 'forest2' },
    { lat: 58.6439, lon: -3.0701, description: 'forest3' },
    { lat: -15.7864, lon: -47.796, description: 'forest4' },
    { lat: 60.1, lon: 19.95, description: 'forest5' },
    { lat: 19.4326, lon: -99.1332, description: 'forest6' },
    { lat: 50.4436, lon: 30.52, description: 'forest7' },
    { lat: 37.8651, lon: -119.5383, description: 'forest8' },
    { lat: 41.7941, lon: 12.2568, description: 'forest9' },
    { lat: 52.6415, lon: 0.4185, description: 'forest10' },
    { lat: -2.4636, lon: 28.8753, description: 'forest11' },
    { lat: -41.1335, lon: 146.1518, description: 'forest12' },
    { lat: 45.5625, lon: 25.5973, description: 'forest13' },
    { lat: 33.4039, lon: 35.4827, description: 'forest14' },
    { lat: 48.9447, lon: 8.3422, description: 'forest15' },
    { lat: 24.4065, lon: 54.4331, description: 'forest16' },
    { lat: -37.8778, lon: 145.0443, description: 'forest17' },
    { lat: 31.728, lon: 35.1814, description: 'forest18' },
    { lat: -29.4594, lon: 29.5556, description: 'forest19' },
    { lat: 60.2923, lon: 24.9826, description: 'forest20' }
  ];

  return (
    <MapContainer center={[0, 0]} zoom={1} scrollWheelZoom={false} className="w-full h-[50vh] md:h-[70vh] rounded-2xl">
      {forests.map((forest, index) => (
        <Marker key={index} position={[forest.lat, forest.lon]}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Popup>
            <Stack direction="column" spacing={1}>
              <Typography variant="body1">{t(`home.map.forests.${forest.description}`)}</Typography>
            </Stack>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
