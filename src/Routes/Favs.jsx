import Card from "../Components/Card";
import { useDentistStates } from "../Components/utils/global.context";

const Favs = () => {
  const { favoritesState, themeState } = useDentistStates();

  return (
    <div className={themeState.isDark ? "App" : "dark"}>
      <h1>Dentists Favorites</h1>
      <div className="card-grid">
        {favoritesState.map((dentist) => (
          <Card
            key={dentist.id}
            id={dentist.id}
            name={dentist.name}
            username={dentist.username}
          />
        ))}
      </div>
    </div>
  );
};

export default Favs;

