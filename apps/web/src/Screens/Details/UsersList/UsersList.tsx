import React from "react";
import { ReactComponent as CardIcon } from "../../../assets/images/card.svg";
import { ReactComponent as LikeIcon } from "../../../assets/images/heart-filled.svg";

type UserList = {
  user: string;
  comment?: string;
};
type Props = {
  variant: "like" | "danger" | "warning";
  list: UserList[];
};

const UsersList = ({ variant, list }: Props) => {
  const getTitle = () => {
    switch (variant) {
      case "like":
        return "Super Likes";
      case "warning":
        return "Name";
      case "danger":
        return "Name";
    }
  };

  console.log(list);

  return (
    <>
      <h3 className="list__header">{getTitle()} <span>({list.length})</span></h3>
      {list.map((item, index) => (
        <div className="list__item" key={index}>
          <div className="list__item-header">
            <div className={`list__icon -${variant}`}>
              {variant === "like" ? <LikeIcon /> : <CardIcon />}
            </div>
            {item.user}
          </div>
          {item.comment && 
          <div className="list__comment">{item.comment}</div> }
        </div>
      ))}
    </>
  );
};

export default UsersList;
