import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';
import Auth from '../utils/auth';


const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  // If data is undefined, then save an empty array to the thoughts component.
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
        {/* If both true, add friends list, else null */}
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null }
      </div>
    </main>
  );
};

export default Home;


// So what's this weird syntax? This is called optional chaining, and it's new to JavaScript—
// so new that only browsers seem to support it. If we tried to use it in a Node server, we'd 
// receive a syntax error, because Node doesn't know what it is yet.

// Optional chaining negates the need to check if an object even exists before accessing its 
// properties. In this case, no data will exist until the query to the server is finished. 
// So if we type data.thoughts, we'll receive an error saying we can't access the property of 
// data—because it is undefined.

// // What we're saying is, if data exists, store it in the thoughts constant we just created. 
// If data is undefined, then save an empty array to the thoughts component.