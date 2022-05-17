import React from "react";
const Like = props => {
    let classes = "fa fa-heart";
    if(!props.like) classes +="-o";
    return ( 
        <i 
        style={{ cursor:"pointer" }}
        className={classes}
        onClick = {props.onClick}
        ></i>
     );
}
 
export default Like;