import { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import dateFormat from "dateformat";

class DishDetail extends Component {
    constructor(props) {
        super(props);
    }
    renderDish(dish) {
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
    renderComments(comments) {
        if (comments != null) {
            const com = comments.map((comment) => {
                return (
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, {dateFormat(comment.date,"fullDate")}</p>
                    </li>
                )
            })
            return (
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {com}
                    </ul>
                </div>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }
    render() {
        if (this.props.dishe != null) {
            return (
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dishe)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.dishe.comments)}
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
        
}
export default DishDetail;