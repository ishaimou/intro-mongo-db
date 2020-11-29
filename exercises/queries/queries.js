const Post = require('./post')

const postByTitle = (title) => {
  return Post.findOne({ title }).exec()
}

const postsForAuthor = (authorId) => {
  return Post.find({ author: authorId }).exec()
}

const fullPostById = (id) => {
  return Post.findById(id).populate('author').exec()
}

const allPostsSlim = (fieldsToSelect) => {
  return Post.find({}).select(fieldsToSelect).exec()
}

const postByContentLength = (maxContentLength, minContentLength) => {
  return Post.find({ $and: 
    [
      {contentLength: { $gt: minContentLength }},
      {contentLength: { $lt: maxContentLength }}
    ]
  }).exec()
}

const addSimilarPosts = async (postId, similarPosts) => {
  let postToUpdate = await Post.findById(postId).exec()
  let oldSimilarPosts = postToUpdate.similarPosts
  const updatedSimilarPosts = [...oldSimilarPosts, ...similarPosts]
  return Post.findByIdAndUpdate(postId,
    { similarPosts: updatedSimilarPosts },
    { new: true })
}

module.exports = {
  postByTitle,
  postsForAuthor,
  fullPostById,
  allPostsSlim,
  postByContentLength,
  addSimilarPosts
}
