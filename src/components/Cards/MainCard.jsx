import { useNavigate, useLocation, NavLink } from "react-router-dom";

import noBanner from '../../assets/images/noBanner.jpg';
import dot from '../../assets/svg/dot.svg';

import './MainCard.css';


function MainCard(props) {
    const { uniqueURL, image, title, members, description, isPrivate, location } = props;
    const imgSrc = image ? image : noBanner;
    const privateOrPublic = isPrivate ? "Private Group" : "Public Group";
    const memberCount = members.length>0 ? `${members.length+1} Members` : `${members.length+1} Member`;

    return (
        <NavLink to={`/community/${uniqueURL}`} className="main-card">
            <div className="main-card-image">
                <img src={imgSrc} alt="banner Image" />
            </div>
            <div className="main-card-body">
                <p className="main-card-body-title">{title}</p>
                <p className="main-card-body-description">{description}</p>
                <div className="main-card-body-extra">
                    <p className="main-card-body-private">{privateOrPublic}</p>
                    <img src={dot} alt="dot" />
                    <p className="main-card-body-private">{memberCount}</p>
                </div>
            </div>
        </NavLink>
    )
}

export default MainCard
