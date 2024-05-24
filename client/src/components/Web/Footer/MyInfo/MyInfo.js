import React from "react";
import LogoWhite from "../../../../assets/img/png/logo-white.png";
import SocialLinks from "../../SocialLinks";

import "./MyInfo.scss";

export default function MyInfo() {
  return (
    <div className="my-info">
      <img src={LogoWhite} alt="Jose Martinez" />
      <h4>Description</h4>
      <SocialLinks />
    </div>
  );
}
