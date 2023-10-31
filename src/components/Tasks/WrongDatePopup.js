import React from "react";
import "./WrongDatePopup.css"

export const WrongDatePopup = ({setPopupVisible}) => {
    const closePopup = () => {
        setPopupVisible(false)
    }

    return (
        <div className={"modal"}>
            <div className={"overlay"} onClick={closePopup}>
                <div className={"modal-content"}>
                    <p>Data musi być w przyszłości!</p>
                    <button onClick={closePopup}>Ok</button>
                </div>
            </div>
        </div>
    )
}