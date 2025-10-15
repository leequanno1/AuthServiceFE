import React from "react"
import "./UserPoolInfoScreen.css"
import MiniPoolInfo from "../../compine-components/SectionPart/MiniPoolInfo/MiniPoolInfo";

const UserPoolInfoScreen : React.FC = () => {
    return (
        <div className="user-pool-info-screen-container">
            <h1>Pool Name: Pool Name In Camelcase</h1>

            <MiniPoolInfo />

            
        </div>
    );
}

export default UserPoolInfoScreen;