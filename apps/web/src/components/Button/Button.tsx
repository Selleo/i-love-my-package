import React, { ReactNode } from "react";
import { ReactComponent as LikeIcon } from "../../assets/images/heart.svg";

type Props = {
  label: string;
};
const Button = ({ label }: Props) => {
  return (
    <button className="btn -with-spacing">
      <div className="btn__container">
        <LikeIcon />
        <p className="btn__text">{label}</p>
      </div>
    </button>
  );
};

export default Button;
