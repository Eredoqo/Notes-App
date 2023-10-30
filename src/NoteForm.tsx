import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "./App";
import { v4 as uuidV4 } from "uuid";

export type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tags: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

export function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selecetedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      title: titleRef.current?.value,
      markdown: markdownRef.current?.value,
      tags: [],
    });
    navigate("..");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required defaultValue={title} />
            </Form.Group>
          </Col>{" "}
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                onCreateOption={(label) => {
                  const newtag = { id: uuidV4(), label };
                  onAddTag(newtag);
                  setSelectedTags((prev) => [...prev, newtag]);
                }}
                value={selecetedTags.map((t) => {
                  return {
                    label: t.label,
                    value: t.id,
                  };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) =>
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  )
                }
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdowns">
          <Form.Label>Body</Form.Label>
          <Form.Control
            defaultValue={markdown}
            ref={markdownRef}
            required
            as="textarea"
            rows={7}
          />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button variant="primary" type="submit">
            Save
          </Button>
          <Link to="..">
            <Button variant="outlined-secondary" type="button">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}
