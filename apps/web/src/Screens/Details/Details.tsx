import React from "react";
import { useParams } from "react-router-dom";
import Tag from "../../components/Tag";
import UsersList from "./UsersList/UsersList";

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
        { user: "Monika" },
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

  const scrollToUsersSection = () => {};

  return <UsersList variant="warning" list={MOCK_DATA.reactions.like} />;
}

export default Details;
