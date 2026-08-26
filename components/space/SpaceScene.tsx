import { StarField } from "./StarField";

export function SpaceScene() {
  return (
    <div className="space-scene" aria-hidden="true">
      <div className="space-ambient" />
      <StarField />
    </div>
  );
}
