import {createContext,useContext,useEffect,useReducer,useState,} from "react";

// Crear un contexto global
const GlobalContext = createContext();

// Definir temas disponibles
const themes = {dark: { isDark: true,},light: {isDark: false },};

// Estado inicial del tema
const initialTheme = themes.light;

// Estado inicial de favoritos
const initialFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Estado inicial de la API
const initialApiState = { dentistList: [], dentistDetail: {} };

// Reductor para el tema
const themeReducer = (state, action) => {
  switch (action.type) {
    case "SWITCH_DARK":
      return themes.dark;
    case "SWITCH_LIGHT":
      return themes.light;
    default:
      throw new Error("Acción no reconocida en el reductor del tema.");
  }
};

// Reductor para favoritos
const favoritesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      return [...state, action.payload];
    default:
      throw new Error("Acción no reconocida en el reductor de favoritos.");
  }
};

// Reductor para la API
const apiReducer = (state, action) => {
  switch (action.type) {
    case "GET_DENTISTS":
      return {
        dentistList: action.payload,
        dentistDetail: state.dentistDetail,
      };
    case "GET_DENTIST":
      return { dentistDetail: action.payload, dentistList: state.dentistList };
    default:
      throw new Error("Acción no reconocida en el reductor de la API.");
  }
};

// Proveedor de contexto
const ContextProvider = ({ children }) => {
  const [details, setDetails] = useState();
  const [apiState, apiDispatch] = useReducer(apiReducer, initialApiState);
  const [favoritesState, favoritesDispatch] = useReducer(
    favoritesReducer,
    initialFavorites
  );
  const [themeState, themeDispatch] = useReducer(themeReducer, initialTheme);
  const url = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoritesState));
  }, [favoritesState]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setDetails(data));
  }, []);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => apiDispatch({ type: "GET_DENTISTS", payload: data }));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        apiState,
        apiDispatch,
        favoritesState,
        favoritesDispatch,
        themeState,
        themeDispatch,
        details,
        setDetails,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;

export const useDentistStates = () => useContext(GlobalContext);
