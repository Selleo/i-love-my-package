import React from "react";
import { useParams } from "react-router-dom";
import Tag from "../../components/Tag";
import UsersList from "./UsersList/UsersList";
import Button from "../../components/Button";

function Details() {
  const { id } = useParams();

  const MOCK_DATA = {
    name: "react",
    usedBy: [
      { user: "Monika", version: "1.1.0" },
      { user: "Monika", version: "1.1.0" },
    ],
    reactions: {
      like: [
        { user: "Monika", comment: "some random comment" },
        { user: "Monika", comment: "some random comment" },
        { user: "Monika", comment: "some random comment" },
      ],
      redFlag: [
        { user: "Monika", comment: "some random comment" },
        { user: "Monika" },
        { user: "Monika", comment: "some random comment" },
      ],
      yellowFlag: [
        { user: "Monika", comment: "some random comment" },
        { user: "Monika", comment: "some random comment" },
        { user: "Monika", comment: "some random comment" },
      ],
    },
  };

  const likeList = MOCK_DATA.reactions?.like || [];
  const warningList = MOCK_DATA.reactions?.yellowFlag || [];
  const dangerList = MOCK_DATA.reactions?.redFlag || [];

  const scrollToUsersSection = () => {};

  return (
    <div>
      <div className="details__header">
        <h1 className="details__title">{MOCK_DATA.name}</h1>
        <Tag count={likeList.length} variant="like" />
      </div>
      <button
        className="details__link"
        onClick={scrollToUsersSection}
      >{`(${MOCK_DATA.usedBy.length} people used)`}</button>
      <Button />
      <UsersList variant="like" list={likeList} />
      <UsersList variant="warning" list={warningList} />
      <UsersList variant="warning" list={dangerList} />
      <div className="package-card__cards-wrapper">
        <p className="package-card__paragraph -light-gray">Received Cards:</p>
        <Tag count={1} variant="danger" /> <Tag count={3} variant="warning" />
      </div>
    </div>
  );
}

export default Details;
