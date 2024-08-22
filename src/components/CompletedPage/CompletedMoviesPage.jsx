import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CompletedPage.css';
import { useHistory } from 'react-router-dom';

function CompletedMoviesPage() {

  const currentStatusId = 1;
  const mediaType = 'movie';

  const dispatch = useDispatch();
  const movies = useSelector(store => store.mediaReducer);
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES', payload: {currentStatusId} });
  }, []);

  //update status
  const handleUpdate = (mediaId, updateStatusId) => {
    console.log('logging mediaId:', mediaId);
    dispatch({ type: 'UPDATE_STATUS', payload: { mediaId: mediaId, updateStatusId, mediaType: 'movie', currentStatusId } });
    console.log(`handleUpdate successful: mediaId: ${mediaId}, updateStatusId: ${updateStatusId}, mediaType: ${mediaType}, currentStatusId: ${currentStatusId}`);
  };

//delete media from database
const handleDelete = (movie) =>{
  console.log ('logging mediaId:', movie.id);
  dispatch({ type:'DELETE_MEDIA',  payload: { mediaId: movie.id, mediaType: mediaType, currentStatusId }});
  alert(`${movie.title} has been Deleted permanently! If you want to see it on a list again, please re-add!`);
  console.log(`handleDelete Successful: mediaId: ${movie.id}, mediaType: ${mediaType}, currentStatusId: ${currentStatusId}`);
}

return (
  <main>
  <div className="container">
    <div>
      <h2>Completed Movies List</h2>
    </div>
    <section className="movies">
      {movies.map(movie => {
        return (
          <div data-testid='movieItem' key={movie.id}>
            <p value={movie.id}>{movie.title}</p>
            <div className='statusChangeButtons'>
              <button className="deleteButton" onClick={() => handleDelete(movie)}> Delete </button>
              <button className="toWatchButton" onClick={() => handleUpdate(movie.id, 3)}> To Watch</button>
              <button className="currentlyButton" onClick={() => handleUpdate(movie.id, 2)}> Currently Watching</button>
              <button className="dnfButton" onClick={() => handleUpdate(movie.id, 4)}> DNF </button>
              </div>
          </div>
        );
      })}
    </section>


    </div>
    </main>
  );
}

export default CompletedMoviesPage;
