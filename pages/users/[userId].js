// pages/users/[userId].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Card from '../../components/Card';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  /* Add styling as needed */
`;

export default function UserProfile() {
  const router = useRouter();
  const { userId } = router.query;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        setLoading(true);
        try {
          const res = await fetch(`/api/users/${userId}`);
          if (res.ok) {
            const userData = await res.json();
            setUser(userData);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <ProfileContainer>
      <h2>{user.username}'s Profile</h2>
      {/* Display other user details as needed */}
      <h3>Books Added:</h3>
      {user.booksAdded.map(book => (
        <Card key={book._id} {...book} />
      ))}
    </ProfileContainer>
  );
}
