import styled from "styled-components";
import { StyledButton } from "./StyledButton.js";

const FormContainer = styled.form`
  display: grid;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: inherit;
  border: 3px solid black;
  border-radius: 0.5rem;
`;

const Textarea = styled.textarea`
  font-family: inherit;
  border: 3px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
`;

const Label = styled.label`
  font-weight: bold;
`;

export default function Form({ onSubmit, formName, defaultData }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
  }

  return (
    <FormContainer aria-labelledby={formName} onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        name="name"
        type="text"
        defaultValue={defaultData?.name}
      />
      <Label htmlFor="image-url">Image Url</Label>
      <Input
        id="image-url"
        name="image"
        type="text"
        defaultValue={defaultData?.image}
      />
      <Label htmlFor="author">Author</Label>
      <Input
        id="author"
        name="author"
        type="text"
        defaultValue={defaultData?.author}
      />
      <Label htmlFor="description">Description</Label>
      <Textarea
        name="description"
        id="description"
        cols="30"
        rows="10"
        defaultValue={defaultData?.description}
      ></Textarea>
          <Label htmlFor="isbn">ISBN</Label>
      <Input
        id="isbn"
        name="isbn"
        type="number"
        defaultValue={defaultData?.isbn}
      />
          <Label htmlFor="price">Price</Label>
      <Input
        id="price"
        name="price"
        type="number"
        defaultValue={defaultData?.price}
      />
      <StyledButton type="submit">
        {defaultData ? "Update book" : "Add book"}
      </StyledButton>
    </FormContainer>
  );
}
