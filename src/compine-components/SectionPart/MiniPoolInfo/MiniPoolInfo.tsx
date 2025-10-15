import React, { useState } from "react";
import "./MiniPoolInfo.css";
import Card from "../../../components/Card/Card";
import IconButton from "../../../components/IconButton/IconButton";
import LinkIconButton from "../../../components/LinkIconButton/LinkIconButton";
import { ArrowSquareIn, Check, Copy, Eye, Pen } from "phosphor-react";
import NameTag from "../../../components/NameTag/NameTag";

interface MiniPoolInfoProps {
} 

const MiniPoolInfo: React.FC<MiniPoolInfoProps> = () => {

    const [isShowKey,setIsShowKey] = useState(false);
    const poolKey = "niga-for-sale-1-dolar";

    return (
        <Card
          title="Pool's infomation"
          optionButtons={
            <>
              <IconButton onClick={() => {}} Icon={Pen} IconSize={24} />
              <LinkIconButton to="" Icon={ArrowSquareIn} IconSize={24} />
            </>
          }
          content={
            <div className="card-scroll-able">
              <div className="card-pool-content">
                <div className="content-left">
                  <h3>POOL NAME: POOL NAME in UPPERCASE</h3>
                  <div className="tag-pair">
                    <span>User's field:</span>
                    <div className="tag-names">
                      <NameTag name="username" />
                      <NameTag name="password" />
                      <NameTag name="email" />
                      <NameTag name="address" />
                      <NameTag name="last name" />
                      <NameTag name="first name" />
                      <NameTag name="avt" />
                      <NameTag name="birthday" />
                    </div>
                  </div>
                  <div className="tag-pair">
                    <span>Authentication field:</span>
                    <div className="tag-names">
                      <NameTag name="username" />
                      <NameTag name="password" />
                      <NameTag name="email" />
                    </div>
                  </div>
                  <div className="date-text">Created at: YYYY/MM/DD</div>
                  <div className="date-text last">Updated at: YYYY/MM/DD</div>
                </div>

                <div className="verticle-line"></div>

                <div className="content-right">
                  <h3>SECURITY INFORMATION</h3>
                  <div >
                    <span>Pool key: </span>
                    <span>{isShowKey ? poolKey : poolKey.split("").map(item => "•").join("") }</span>
                    <IconButton onClick={() => {setIsShowKey(!isShowKey)}} Icon={Eye} IconSize={20}/>
                    <IconButton onClick={() => {setIsShowKey(!isShowKey)}} Icon={Copy} IconSize={20}/>
                  </div>
                  <div className="date-text"><span>Email verification: Enable</span> <Check color="var(--success-color)" size={20}/> </div>
                </div>
              </div>
            </div>
          }
        />
    );
}

export default MiniPoolInfo;