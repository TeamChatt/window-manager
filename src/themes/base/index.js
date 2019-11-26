import classnames from 'classnames/bind'

import avatarStyles        from './avatar.scss'
import choiceStyles        from './choice.scss'
import feedStyles          from './feed.scss'
import formStyles          from './form.scss'
import messageStyles       from './message.scss'
import typingStyles        from './typing.scss'

export default {
  avatar:         classnames.bind(avatarStyles),
  choice:         classnames.bind(choiceStyles),
  feed:           classnames.bind(feedStyles),
  form:           classnames.bind(formStyles),
  message:        classnames.bind(messageStyles),
  typing:         classnames.bind(typingStyles)
}
