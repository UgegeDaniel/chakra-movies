import { API_KEY } from "../constants";
import { MovieType } from "../types";

const fetchData = async (
    url: string, 
    onLoad: ()=> void, 
    onSuccess: (results: any) => void
    ) => {
    onLoad()
    try {
      const response = await fetch(url, { headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      }});
      const results  = await response.json();
      onSuccess(results);
      console.log(results)
    } catch (error) {
      console.log(error);
    }
  };

  export default fetchData;

//   const filteredMovies = data.filter(
//     (item: MovieType) => item.genre_ids.includes(genreId),
//   );
//   if (genreId) {
//     setData(results);
//     setData(filteredMovies);
//   } else {
//     setData(results);
//   }