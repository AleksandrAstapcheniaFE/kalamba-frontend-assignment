const commentFieldId = 'article-comment-body';

export const ArticleComment = () => {
  return (
    <section className="row" aria-label="Comments">
      <div className="col-xs-12 col-md-8 offset-md-2">
        <form className="card comment-form" aria-label="Post a new comment">
          <div className="card-block">
            <label htmlFor={commentFieldId}>Write a comment</label>
            <textarea
              id={commentFieldId}
              className="form-control"
              placeholder="Write a comment..."
              rows={3}
              name="comment"
            />
          </div>
          <div className="card-footer">
            <img
              src="http://i.imgur.com/Qr71crq.jpg"
              className="comment-author-img"
              alt=""
              width={32}
              height={32}
            />
            <button className="btn btn-sm btn-primary" type="submit">
              Post Comment
            </button>
          </div>
        </form>

        <ul aria-label="Existing comments">
          <li>
            <article className="card">
              <div className="card-block">
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional content.
                </p>
              </div>
              <footer className="card-footer">
                <a href="/#/profile/jacobschmidt" className="comment-author">
                  <img
                    src="http://i.imgur.com/Qr71crq.jpg"
                    className="comment-author-img"
                    alt=""
                    width={32}
                    height={32}
                  />
                </a>
                &nbsp;
                <a href="/#/profile/jacobschmidt" className="comment-author">
                  Jacob Schmidt
                </a>
                <time className="date-posted" dateTime="2000-12-29">
                  Dec 29th
                </time>
              </footer>
            </article>
          </li>

          <li>
            <article className="card">
              <div className="card-block">
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional content.
                </p>
              </div>
              <footer className="card-footer">
                <a href="/#/profile/jacobschmidt" className="comment-author">
                  <img
                    src="http://i.imgur.com/Qr71crq.jpg"
                    className="comment-author-img"
                    alt=""
                    width={32}
                    height={32}
                  />
                </a>
                &nbsp;
                <a href="/#/profile/jacobschmidt" className="comment-author">
                  Jacob Schmidt
                </a>
                <time className="date-posted" dateTime="2000-12-29">
                  Dec 29th
                </time>
                <fieldset className="mod-options" aria-label="Comment moderation actions">
                  <i className="ion-edit" aria-hidden="true" />
                  <i className="ion-trash-a" aria-hidden="true" />
                </fieldset>
              </footer>
            </article>
          </li>
        </ul>
      </div>
    </section>
  );
};
