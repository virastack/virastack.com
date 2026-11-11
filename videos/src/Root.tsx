import { Composition } from "remotion";

import { MaskTesting, maskTestingDuration } from "./MaskTesting";

export function Root() {
  return (
    <Composition
      id="MaskTesting"
      component={MaskTesting}
      durationInFrames={maskTestingDuration}
      fps={30}
      width={1920}
      height={1080}
    />
  );
}
