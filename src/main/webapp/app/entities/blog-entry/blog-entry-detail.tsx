import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './blog-entry.reducer';
import { IBlogEntry } from 'app/shared/model/blog-entry.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBlogEntryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class BlogEntryDetail extends React.Component<IBlogEntryDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { blogEntryEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="blogApp.blogEntry.detail.title">BlogEntry</Translate> [<b>{blogEntryEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="blogApp.blogEntry.title">Title</Translate>
              </span>
            </dt>
            <dd>{blogEntryEntity.title}</dd>
            <dt>
              <span id="content">
                <Translate contentKey="blogApp.blogEntry.content">Content</Translate>
              </span>
            </dt>
            <dd>{blogEntryEntity.content}</dd>
            <dt>
              <span id="date">
                <Translate contentKey="blogApp.blogEntry.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={blogEntryEntity.date} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="blogApp.blogEntry.blog">Blog</Translate>
            </dt>
            <dd>{blogEntryEntity.blog ? blogEntryEntity.blog.name : ''}</dd>
            <dt>
              <Translate contentKey="blogApp.blogEntry.tag">Tag</Translate>
            </dt>
            <dd>
              {blogEntryEntity.tags
                ? blogEntryEntity.tags.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.name}</a>
                      {i === blogEntryEntity.tags.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/blog-entry" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/blog-entry/${blogEntryEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ blogEntry }: IRootState) => ({
  blogEntryEntity: blogEntry.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogEntryDetail);
