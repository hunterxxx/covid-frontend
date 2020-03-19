import React from 'react';
import { Form, Button } from 'react-bootstrap'

export default function Contact() {
    return (
        <div className="container mt-2">
            <h5><span role="img" aria-label="phone">📞</span> Contact me: </h5>
            <ul>
                <li>If you have better sources of Covid-19 Data <span role="img" aria-label="articles">📑</span></li>
                <li>Business Inquiries <span role="img" aria-label="business">💼</span></li>
                <li>Sponsorship <span role="img" aria-label="sponsor">💰</span></li>
                <li>Bored and need a chat <span role="img" aria-label="chat">😋</span></li>
            </ul>
            <Form
                action="https://formspree.io/xlelwdaj"
                method="POST"
            >
                <Form.Group>
                    <Form.Label>Your Name: </Form.Label>
                    <Form.Control type="text" name="name" placeholder="Tengo la camisa negra" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Your Email:</Form.Label>
                    <Form.Control type="email" name="_replyto" placeholder="hunter@hunterIsGod.com" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Message: </Form.Label>
                    <Form.Control name="message" as="textarea" rows="3" placeholder="你好.
Как тебя зовут?
Mit freundlichen Grüßen.
" />
                </Form.Group>
                <Button variant="primary" value="Send" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}
