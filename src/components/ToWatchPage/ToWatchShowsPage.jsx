import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ToWatchPage.css';
import { useHistory } from 'react-router-dom';

function ToWatchShowsPage() {

  const currentStatusId = 3;
  const mediaType = 'show';

  const dispatch = useDispatch();
  const shows = useSelector(store => store.mediaReducer);
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_SHOWS', payload: {currentStatusId} });
  }, []);

  //update status
  const handleUpdate = (mediaId, updateStatusId) => {
    console.log('logging mediaId:', mediaId);
    dispatch({ type: 'UPDATE_STATUS', payload: { mediaId: mediaId, updateStatusId, mediaType: mediaType, currentStatusId } });
    console.log(`handleUpdate successful: mediaId: ${mediaId}, updateStatusId: ${updateStatusId}, mediaType: ${mediaType}, currentStatusId: ${currentStatusId}`);
  };

  //delete media from database
  const handleDelete = (show) => {
    console.log('logging mediaId:', show.id);
    dispatch({ type: 'DELETE_MEDIA', payload: { mediaId: show.id, mediaType: mediaType, currentStatusId } });
    alert(`${show.title} has been Deleted permanently! If you want to see it on a list again, please re-add!`);
    console.log(`handleDelete Successful: mediaId: ${show.id}, mediaType: ${mediaType}, currentStatusId: ${currentStatusId}`);
  }

  return (
    <main>
      <div className="container">
        <div>
          <h2>To Watch Shows List</h2>
        </div>
        <section className="movies">
          {shows.map(show => {
            return (
              <div data-testid='movieItem' key={show.id}>
                <p value={show.id}>{show.title}</p>
                <div className='statusChangeButtons'>
                  <button className="deleteButton" onClick={() => handleDelete(show)}> Delete </button>
                  <button className="completedButton" onClick={() => handleUpdate(show.id, 1)}> Completed </button>
                  <button className="currentlyButton" onClick={() => handleUpdate(show.id, 2)}> Currently Watching</button>
                  <button className="dnfButton" onClick={() => handleUpdate(show.id, 4)}> DNF </button>
                </div>
              </div>
            );
          })}
        </section>

      </div>
    </main>
  );
}

export default ToWatchShowsPage;
