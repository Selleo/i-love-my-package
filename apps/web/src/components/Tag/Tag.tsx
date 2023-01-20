import React from "react";

import { ReactComponent as CardIcon } from "../../assets/images/card.svg";
import { ReactComponent as LikeIcon } from "../../assets/images/heart-filled.svg";

type Props = {
  count: number;
  variant: "danger" | "warning" | "like";
};

const Tag = ({ count, variant }: Props) => {
  return (
    <div className="tag__container">
      <div className={`tag__mark -${variant}`}>
        {variant === "like" ? <LikeIcon /> : <CardIcon />}
      </div>

      <p className="tag__description">{count}</p>
    </div>
  );
};

export default Tag;
