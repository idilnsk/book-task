import Link from "next/link.js";
import styled from "styled-components";
import { useRouter } from "next/router";
import Form from "../components/Form.js";
import { StyledLink } from "../components/StyledLink.js";

const StyledBackLink = styled(StyledLink)`
  justify-self: flex-start;
`;

export default function CreateBookPage() {
  const router = useRouter();
  async function addBook(book) {
    const token = localStorage.getItem('token'); 
  
    const response = await fetch("/api/books", {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
    });
  
    if (response.ok) {
      await response.json();
      router.push("/");
    } else {
      console.error(`Error: ${response.status}`);
    }
  }
  return (
    <>
      <h2 id="add-book">Add Book</h2>
      <Link href="/" passHref legacyBehavior>
  <a>
    <StyledBackLink>back</StyledBackLink>
  </a>
</Link>

      <Form onSubmit={addBook} formName={"add-book"} />
    </>
  );
}