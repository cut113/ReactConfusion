import React from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Modal,ModalHeader, ModalBody, Button, Row, Label, Col } from 'reactstrap';
import { Control, Errors, LocalForm } from 'react-redux-form';
import dateFormat from "dateformat";
import { Link } from 'react-router-dom';
 
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }
    toggleModal() {
        this.setState({
        isModalOpen: !this.state.isModalOpen
        });
    }
    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
    }
    else {
        return (
            <div></div>

        )
    }
}
function RenderComments({ comments }) {
    if (comments != null) {
        const com = comments.map((comment) => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author}, {dateFormat(comment.date, "fullDate")}</p>
                </li>
            )
        })
        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {com}
                </ul>
                <CommentForm />
            </div>
        )
    }
    else {
        return (
            <div></div>

        )
    }
}
const DishDetail = (props) => {
    if (props.dishe != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dishe.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dishe.name}</h3>
                        <hr />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dishe} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            </div>

        )
    }
    else {
        return (
            <div></div>
        )
    }
}


export default DishDetail;