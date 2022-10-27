import { Map, Controls, ZoomControl } from '@peripleo/peripleo';
import {
  AuthorSelect,
  ITSBTooltip,
  ItinerariesLayer,
  IntersectionsLayer,
  MonthRangeInput,
} from '../../components';
import { useMatch, useRouteLoaderData } from 'react-router-dom';
import './MapPage.css';

export function MapPage() {
  const [authors, places, itineraries] = useRouteLoaderData('root');

  const loaded = authors && places && itineraries;

  const isTrajectories = useMatch('trajectories');

  const layer = isTrajectories ? ItinerariesLayer : IntersectionsLayer;

  return (
    loaded && (
      <>
        <aside>
          <MonthRangeInput />
          <AuthorSelect />
        </aside>

        <main id="map">
          <Map.MapLibreDeckGL
            mapStyle="https://api.maptiler.com/maps/outdoor/style.json?key=cqqmcLw28krG9Fl7V3kg"
            defaultBounds={[
              [-15.764914, 33.847608],
              [35.240991, 58.156214],
            ]}
            layers={[layer]}
            tooltip={ITSBTooltip}
          />

          <Controls>
            <ZoomControl />
          </Controls>
        </main>
      </>
    )
  );
}
