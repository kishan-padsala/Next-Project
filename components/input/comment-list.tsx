import { Fragment } from "react";
import classes from "./comment-list.module.css";

import { commentType } from "@/types";

function CommentList({ items, loading }: { items: commentType[], loading: boolean }) {
  return (
    <Fragment>
    {loading ? <p>Loading...</p> : <ul className={classes.comments}>
      {items.map((item) => (
        <li key={item._id}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </ul>}
    </Fragment>
    
  );
}

export default CommentList;
