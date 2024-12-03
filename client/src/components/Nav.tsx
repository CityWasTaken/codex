import React from 'react';
import { NavLink } from 'react-router-dom';



const Nav: React.FC = () => {
    return (
        <nav>
            <ul>
            //following
            <li><NavLink to ="/following" className="active"></NavLink></li>

            //followers
            <li><NavLink to ="/followers" className="active">Followers</NavLink></li>

            //profile(has user info and thier posts)
            <li><NavLink to ="/profile" className="active">Profile</NavLink></li>

            //home(the feed)
            <li><NavLink to ="/home" className="active">Home</NavLink></li>
            </ul>
        </nav>
    );

}





