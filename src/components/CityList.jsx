import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { UseCities } from "../contexts/CitiesContext";
function CityList() {
  const { cities, isLoading } = UseCities();
  if (isLoading) return <Spinner />;

  // if (!cities.length)
  //   return <Message message={`Add your first City by clicking on the map`} />;
  return (
    <ul className={styles.cityList} key={cities}>
      {cities.map((city) => (
        <CityItem city={city} key={city.key} />
      ))}
    </ul>
  );
}

export default CityList;
