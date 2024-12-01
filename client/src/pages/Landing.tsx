import { Row, Col, Container, Card } from "react-bootstrap";
import { useQuery } from "@apollo/client";

import { GET_ALL_POSTS } from "../graphql/queries";
import { Post } from "../interfaces";


function Landing() {

    // Get all posts(loading and error handling just in case something goes wrong)
    const { data: postData, loading, error } = useQuery(GET_ALL_POSTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading posts :/</p>;


    return (


        //container to hold all the posts
        //the urge to name this the console is crazy, but i will resist
        <Container fluid={true} className="mt-4">
             <h2 className ="fw-light">Feed</h2>
            <hr />



            //if there are no posts, display a message saying so
            {postData && !postData.getAllPosts.length && (<p>No posts yet, sign up and be the first one to add a post!</p>)}


            //if there are posts, display them
            //also using a card from bootstrap so it should look good i hope, cross your fingers
            <Row className="my-4">
                {postData && postData.getAllPosts.map((post: Post) => (
                    <Col lg="2" key={post._id} className="landing-post border my-1 mx-2">
                        <Card>
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>{post.body}</Card.Text>
                                <Card.Footer>Added by:{post.name}</Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container> 
    )
}

export default Landing;




            {/* 
            // Old code (temporary)

            <Row>
                <Col className="landing-hero-image"></Col>
                <Col className="d-flex flex-column justify-content-center hero-text" xs="12" md="6">
                    <h1 data-hero-header className="text-center">Codex</h1>
                    <h2 className="text-center fx-light">logging welcome message...</h2>
                </Col>
            </Row>

            <Container>
                <h2 className="fw-light mt-5">What's the word on the street?!</h2>
                <hr />

                {postData && !postData.getAllPosts.length && (
                    <p>No posts have been added yet. Sign up and be the first to add one!</p>
                )}



                <Row className="my-4">
                    {postData && postData.getAllPosts.map((post: Post) => (
                        <Col lg="2" key={post._id} className="landing-post border my-1 mx-2">
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                            <p>Added by: {post.pet?.name}</p>
                        </Col>
                    ))}
                </Row>


            </Container>*/}