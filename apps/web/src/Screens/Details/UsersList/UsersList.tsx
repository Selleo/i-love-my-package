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
      <div>
        <h5>{getTitle()}</h5>
        <h5>{list.length}</h5>
      </div>
      {list.map((item, index) => (
        <div key={index}>
          <div>
            <div className={`list__icon -${variant}`}>
              {variant === "like" ? <LikeIcon /> : <CardIcon />}
            </div>
            <p>{item.user}</p>
          </div>
          <p>{item.comment}</p>
        </div>
      ))}
    </>
  );
};

export default UsersList;
