import Link from "next/link";
import CommentStyleWrapper from "./Comment.style";
import comments from "@/src/assets/data/blog/comments";
import replayIcon from "@/src/assets/images/blog/icon.png";
const Comment = () => {
  return (
    <CommentStyleWrapper>
      <div className="comment_item_wrap">
        {comments?.map((comment, i) => (
          <div key={i} className="comment_item">
            <div className="commnet_inner">
              <img src={comment.thumb.src} alt="bithu comment" />
              <div className="comment_body">
                <div className="comment_author">
                  <Link href="# ">{comment.author}</Link>
                  <span>{comment.timeStamp}</span>
                </div>
                <p>{comment.text}</p>
                <Link href="# " className="replay_btn">
                  <img src={replayIcon.src} alt="bithu nft replay" /> reply
                </Link>
              </div>
            </div>

            {comment.replys?.map((replay, i) => (
              <div key={i} className="comment_item replay_box">
                <div className="commnet_inner">
                  <img src={replay.thumb.src} alt="bithu comment" />
                  <div className="comment_body">
                    <div className="comment_author">
                      <Link href="# ">{replay.author}</Link>
                      <span>{replay.timeStamp}</span>
                    </div>
                    <p>{replay.text}</p>
                    <Link href="# " className="replay_btn">
                      <img src={replayIcon.src} alt="bithu nft replay" /> reply
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </CommentStyleWrapper>
  );
};

export default Comment;
