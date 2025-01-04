import { useSearchParams } from "react-router-dom";

function UseUrlPosition() {
  const [searchPram] = useSearchParams();
  const lat = searchPram.get("lat");
  const lng = searchPram.get("lng");
  return [lat, lng];
}

export default UseUrlPosition;
