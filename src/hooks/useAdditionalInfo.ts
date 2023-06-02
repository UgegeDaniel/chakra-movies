import { useEffect, useState } from "react";
import { MovieType } from "../types";
import { API_KEY, BASE_URL, IMG_URL, LANGUAGE, YT_URL } from "../constants";
import { getLogo } from "../utils";

const useAdditionalInfo = (movie: MovieType) => {
    const [showVideo, setShowVideo] = useState(false);
    const [currentMovie, setCurrentMovie] = useState(movie);
  
    const media = currentMovie?.media_type ? currentMovie?.media_type : 'movie';
    const getTrailerUrl = `${BASE_URL}/${media}/${currentMovie.id}/videos?api_key=${API_KEY}${LANGUAGE}`;
    const getStreamProviderUrl = `${BASE_URL}/${media}/${currentMovie.id}/watch/providers?api_key=${API_KEY}`;
  
    const fetchExtraDetails = async () => {
      const { results: trailerResults } = await (await fetch(getTrailerUrl)).json();
      const { results: providerResults } = await (await fetch(getStreamProviderUrl)).json();
      const trailers = trailerResults.filter((trailerResult: { type: string; }) => trailerResult.type === 'Trailer')
      const streamProviderLogo = getLogo(providerResults);
  
      const trailerUrl = `${YT_URL}${trailers[0].key}`;
      const streamProvider = streamProviderLogo ? `${IMG_URL}${streamProviderLogo}` : '';
  
      setCurrentMovie({...currentMovie, trailerUrl, streamProvider})
    }
  
    useEffect(() => {
      fetchExtraDetails();
    }, []);

    return { currentMovie, showVideo, setShowVideo }
}

export default useAdditionalInfo;