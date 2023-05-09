import { PostType } from '@project/shared/shared-types';
import Joi from 'joi';
import { ValidValues } from './validation.constant';

export default Joi.object({
  postType: Joi.string(),

  title: Joi.string()
    .when('postType', {
      is: Joi.equal(PostType.Video),
      then: Joi.string().min(ValidValues.VideoTitleMinLength).max(ValidValues.VideoTitleMaxLength),
    })
    .when('postType', {
      is: Joi.equal(PostType.Text),
      then: Joi.string().min(ValidValues.TextTitleMinLength).max(ValidValues.TextTitleMaxLength),
    }),


  content: Joi.string()
    .when('postType', {
      is: Joi.equal(PostType.Video),
      then: Joi.string().pattern(new RegExp('^[www.youtube.com/]+')),
    })
    .when('postType', {
      is: Joi.equal(PostType.Text),
      then: Joi.string().min(ValidValues.TextMinLength).max(ValidValues.TextMaxLength),
    })
    .when('postType', {
      is: Joi.equal(PostType.Quote),
      then: Joi.string().min(ValidValues.QuoteMinLength).max(ValidValues.QuoteMaxLength),
      })
    .when('postType', {
      is: Joi.equal(PostType.Link),
      then: Joi.string().uri(),
    }),


    addInfo: Joi.string()
    .when('postType', {
      is: Joi.equal(PostType.Text),
      then: Joi.string().min(ValidValues.AnnouncementMinLength).max(ValidValues.AnnouncementMaxLength),
      })
    .when('postType', {
      is: Joi.equal(PostType.Quote),
      then: Joi.string().min(ValidValues.QuoteAuthorMinLength).max(ValidValues.QuoteAuthorMaxLength),
      })
    .when('postType', {
      is: Joi.equal(PostType.Link),
      then: Joi.string().max(ValidValues.LinkDescriptionMaxLength),
    })
});
