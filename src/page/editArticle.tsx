import React, { FC, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { EditPost } from '../store/articlesReducer/articlesActions';
import Button from '../components/button/button';
import { ArticleType } from '../store/articlesReducer/articlesTypes';

const EditArticle: FC = () => {
  const { id } = useParams<{ id: string }>();

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const blog = useSelector((state: RootState) => {
    return state.articlesArray.articles;
  });

  const articleNum: number = Number(id);

  const article = blog.filter((item) => item.id === articleNum)[0];


  const [editTitle, setEditTitle] = useState(article.title);
  const [editBody, setEditBody] = useState(article.body);
  const [successEdit, setSuccessEdit] = useState(false);

  const backEditHandler = () => {
    history.push(`/articles/${articleNum}`);
  };

  const saveEditHandler = () => {
    const newArticle = {
      userId: Number(id),
      id: articleNum,
      title: editTitle,
      body: editBody,
    };

    dispatch(EditPost(newArticle));
    setSuccessEdit(true);
  };

  return (
    <section>
      <div className="container">
        <div className="row center-xs">
          <div className="col-xs-12">
            <h2>You can edit Article #{id}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 center-xs col-sm-12">
            <h3>Change article title:</h3>
            <textarea
              className="edit-textarea"
              value={editTitle}
              onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>): void =>
                setEditTitle(ev.target.value)}
            />
            <h3>Change article body:</h3>
            <textarea
              className="edit-textarea body"
              value={editBody}
              onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>): void =>
                setEditBody(ev.target.value)}
            />
            <div>
              <Button className="BigCard__button" onClick={backEditHandler} text="Cancel" />
              <Button className="BigCard__button" onClick={saveEditHandler} text="Save" />
            </div>
            {successEdit ? (
              <div>
                <h2>You have edited article #{articleNum}</h2>
                <Button
                  className="BigCard__button"
                  onClick={backEditHandler}
                  text="Go back to the article"
                />
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditArticle;
