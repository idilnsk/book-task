import Link from "next/link.js";
import styled from "styled-components";
import { StyledImage } from "./StyledImage.js";

const Article = styled.article`
  border: 5px solid black;
  border-radius: 0.8rem;
  padding: 0.5rem;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 10rem;
`;

const Figure = styled.figure`
  position: relative;
  margin: 0;
`;

const Anchor = styled.a`
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const ScreenReaderOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

export default function Card({ name, image, id, userId, addedBy }) {

  console.log("Image URL:", image);
  return (
    <Article>
      <Figure>
        <ImageContainer>
          <StyledImage src={image} fill alt={name} />
        </ImageContainer>
        <figcaption>{name}</figcaption>
        {/* Conditional link to user profile */}
        {userId ? (
          <Link href={`/users/${userId}`} passHref legacyBehavior>
            <a>Added by: {addedBy}</a>
          </Link>
        ) : (
          <p>Added by: {addedBy}</p>
        )}
      </Figure>
      <Link href={`books/${id}`} passHref>
        <Anchor>
          <ScreenReaderOnly>More Info</ScreenReaderOnly>
        </Anchor>
      </Link>
    </Article>
  )
};