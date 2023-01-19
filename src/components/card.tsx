import React from 'react';
import './card.css';

const Card = (props:{data:any,onSelect?:any,rotate:boolean}) => {
    const {data,onSelect,rotate} = props;

    return (
        <div className="card">
            <div className={`${rotate ? "flipped" : ""}`}>
                <img className="front" src={data.src} alt={data.src}/>
                <img className="back" src="/play.jpg" alt="play" onClick={()=>onSelect(data)}  />
            </div>
        </div>
    );
};

export default Card;