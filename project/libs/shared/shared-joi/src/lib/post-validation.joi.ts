import { PostType } from '@project/shared/shared-types';
import Joi from 'joi';
import { ValidValues } from './validation.constant';

export default Joi.object({
  postType: Joi.string(),

  title: Joi.string()
    .when('postType', {
      is: Joi.equal(PostType.Video),
      then: Joi.string().min(ValidValues.VideoTitleMinLength).max(ValidValues.VideoTitleMaxLength).required(),
    })
    .when('postType', {
      is: Joi.equal(PostType.Text),
      then: Joi.string().min(ValidValues.TextTitleMinLength).max(ValidValues.TextTitleMaxLength).required(),
    }),


  content: Joi.string()
    .when('postType', {
      is: Joi.equal(PostType.Video),
      then: Joi.string().pattern(new RegExp('^[www.youtube.com/]+')).required(),
    })
    .when('postType', {
      is: Joi.equal(PostType.Text),
      then: Joi.string().min(ValidValues.TextMinLength).max(ValidValues.TextMaxLength).required(),
    })
    .when('postType', {
      is: Joi.equal(PostType.Quote),
      then: Joi.string().min(ValidValues.QuoteMinLength).max(ValidValues.QuoteMaxLength).required(),
      })
    .when('postType', {
      is: Joi.equal(PostType.Photo),
      then: Joi.string().required(),
    })
    .when('postType', {
      is: Joi.equal(PostType.Link),
      then: Joi.string().uri().required(),
    }),


    addInfo: Joi.string()
    .when('postType', {
      is: Joi.equal(PostType.Text),
      then: Joi.string().min(ValidValues.AnnouncementMinLength).max(ValidValues.AnnouncementMaxLength).required(),
      })
    .when('postType', {
      is: Joi.equal(PostType.Quote),
      then: Joi.string().min(ValidValues.QuoteAuthorMinLength).max(ValidValues.QuoteAuthorMaxLength).required(),
      })
    .when('postType', {
      is: Joi.equal(PostType.Link),
      then: Joi.string().max(ValidValues.LinkDescriptionMaxLength).required(),
    })
});
