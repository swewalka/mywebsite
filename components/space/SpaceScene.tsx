import { StarField } from "./StarField";
import { SpaceTraffic } from "./SpaceTraffic";

export function SpaceScene() {
  return (
    <div className="space-scene" aria-hidden="true">
      <div className="space-ambient" />
      <StarField />
      <SpaceTraffic />
    </div>
  );
}
