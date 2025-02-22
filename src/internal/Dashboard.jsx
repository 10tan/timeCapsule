import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Tabs, Tab, Image } from 'react-bootstrap'; // Import Image
import './Dashboard.css';

function Dashboard() {
  const [profileData, setProfileData] = useState({
    username: 'tanmayr22',
    name: 'Tanmay Kumar',
    bio: 'IIT Mandi CE 28',
    postsCount: 6,
    followersCount: 195,
    followingCount: 210,
    posts: [],
    profileImageUrl: 'https://icons8.com/icon/pT5UBaK8aOM_/man', // Add profile image URL
  });

  useEffect(() => {
    setProfileData({
      username: 'tanmayr22',
      name: 'Tanmay Kumar',
      bio: 'IIT Mandi CE 28',
      postsCount: 16,
      followersCount: 295, 
      followingCount: 310,
      posts: [
        { id: 1, content: 'First post content...' },
        { id: 2, content: 'Another post...' },
      ],
      profileImageUrl: 'https://icons8.com/icon/pT5UBaK8aOM_/man', // Keep the URL
    });
  }, []);

  return (
    <Container className="profile-dashboard">
      <Row className="profile-header">
        <Col md={3} className="profile-image-col">
          <Image src={profileData.profileImageUrl} roundedCircle className="profile-image" />
        </Col>
        <Col md={9}>
          <div className="profile-info">
            <span className="username">{profileData.username}</span>
            <Button variant="outline-secondary" className="edit-profile-btn">Edit profile</Button>
            <Button variant="outline-secondary" className="archive-btn">View archive</Button>
          </div>
          <div className="profile-stats">
            <span>{profileData.postsCount} posts</span>
            <span>{profileData.followersCount} followers</span>
            <span>{profileData.followingCount} following</span>
          </div>
          <div className="profile-bio">
            <span>{profileData.name}</span>
            <span>{profileData.bio}</span>
          </div>
        </Col>
      </Row>
      <Row className="profile-content">
        <Col>
          <Button variant="success" className="new-post-btn">New Time Capsule</Button>
          <Tabs defaultActiveKey="posts" className="mb-3">
            <Tab eventKey="posts" title="POSTS">
              {profileData.posts.map((post) => (
                <div key={post.id} className="post">
                  {post.content}
                </div>
              ))}
            </Tab>
            <Tab eventKey="saved" title="SAVED">
              <div>Saved content...</div>
            </Tab>
            <Tab eventKey="tagged" title="TAGGED">
              <div>Tagged content...</div>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;