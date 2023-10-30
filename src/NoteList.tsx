import { useMemo, useState } from "react";
import { Badge, Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Tag } from "./App";
import styles from "./NoteList.module.css";

type NoteListProps = {
  availableTags: Tag[];
  notes: SimpleNote[];
};

type SimpleNote = {
  id: string;
  title: string | undefined;
  tag: Tag[];
};

export function NoteList({ availableTags, notes }: NoteListProps) {
  const [selecetedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTilte] = useState("");

  const fileteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title?.toLowerCase().includes(title.toLowerCase())) &&
        (selecetedTags.length === 0 ||
          selecetedTags.every((tag) =>
            note.tag.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [notes, title, selecetedTags]);

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
                onChange={(tag) =>
                  setSelectedTags(
                    tag.map((t) => {
                      return { label: t.label, id: t.value };
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
        {fileteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tag={note.tag} />
          </Col>
        ))}
      </Row>
    </>
  );
}

function NoteCard({ id, title, tag }: SimpleNote) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="custom-align-items justify-content-center h-100"
        >
          <span className="fs-5">{title}</span>
          {tag.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-content-center flex-wrap"
            >
              {tag.map((t) => (
                <Badge className="text-truncate" key={t.id}>
                  {t.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}
