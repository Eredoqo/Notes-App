import { useMemo, useState } from "react";
import { Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Tag } from "./App";

type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
};

type SimpleNote = {
  id?: string;
  title: string;
  tags: Tag[];
};

export function NoteList({ availableTags }: NoteListProps) {
  const [selecetedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTilte] = useState("");
  const fileteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.lowerCase().includes(title.toLowerCase())) &&
        (selecetedTags.length === 0 ||
          selecetedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selecetedTags]);

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button variant="uotlined-secondary">Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title"></Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTilte(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
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
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} xxl={5} className="g-3">
        {fileteredNotes.map((filteredNote) => (
          <Col key={filteredNote.id}>
            <NoteCard
              id={note.id}
              title={NoteList.title}
              tags={NoteList.tags}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}

function NoteCard({ id, title, tags }: SimpleNote) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body></Card.Body>
    </Card>
  );
}
