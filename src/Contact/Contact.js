import React from 'react';
import { Form, Button } from 'react-bootstrap'

export default function Contact() {
    return (
        <div className="container mt-2">
            <h5><span role="img" aria-label="phone">📞</span> Contact me: </h5>
            <ul>
                <li>If you have better sources of Covid-19 data <span role="img" aria-label="articles">📑</span></li>
                <li>Business inquiries <span role="img" aria-label="business">💼</span></li>
                <li>Bored and need a chat <span role="img" aria-label="chat">😋</span></li>
            </ul>
            <hr />
            <div>I would really appreciate if you could support this project monetary.</div>
            <p>I would build a feature that you requested upon your donation.</p>
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                <input type="hidden" name="cmd" value="_s-xclick" />
                <input type="hidden" name="hosted_button_id" value="UKT6DETTYRVJQ" />
                <input type="image" src="https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                <img alt="" border="0" src="https://www.paypal.com/en_DE/i/scr/pixel.gif" width="1" height="1" />
            </form>
            <hr />
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
Mit freundlichen Grüßen
" />
                </Form.Group>
                <Button variant="primary" value="Send" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}
