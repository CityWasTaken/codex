import { useState, useEffect } from 'react';

const UserProfile = () => {
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    // Replace with your API call
    fetch('/api/user/followers')
      .then(response => response.json())
      .then(data => {
        setFollowersCount(data.followers);
        setFollowingCount(data.following);
      });
  }, []);

  return (
    <div>
      <div>
      <div>
      <h1>User Profile</h1>
      <UserProfile />
    </div>
        <p>Followers: {followersCount}</p>
        <button>Followers</button>
      </div>
      <div>
        <p>Following: {followingCount}</p>
        <button>Following</button>
      </div>
    </div>
  );
};

export default UserProfile;