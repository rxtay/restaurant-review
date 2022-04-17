import React from "react";
import { useHistory } from "react-router-dom";

const Body = ({type, obj}) => {
    const history = useHistory();
    
    const onClick = (value) => {
        switch (type) {
            case 'categories': {
                history.push(`/categories/${value._id}`)
                break;
            }
            case 'restaurants': {
                console.log(value)
                history.push(`/restaurants/${value._id}`)
                break;
            }
            default: {
                break
            }
        }
    }

    
    return (
        <React.Fragment>
            {obj.length !== 0 ?
                <div className="flex-container">
                    {obj.map((value, key)=> {
                        return (
                            <div class="card">
                                <img src={value.imageURL} alt=""></img>
                                <button 
                                    onClick={() => {
                                        onClick(value)
                                    }}>
                                    {type === 'categories' ?
                                    value.category: 
                                    value.name}    
                                </button>
                            </div>
                        )
                    })}
                </div>
            :null}
        </React.Fragment>
    )
}

export default Body;