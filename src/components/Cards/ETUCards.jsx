import './ETUCards.css';


function ETUCards(props) {
    const { image, title, content } = props;
    return (
        <div className="etu-card">
            <img src={image} alt="image x" className="etu-card-image"/>
            <p className="etu-card-title">{title}</p>
            <p className="etu-card-content">{content}</p>
        </div>
    )
}

export default ETUCards
