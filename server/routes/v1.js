const router = require('express').Router()
const passport = require('passport')

const syncDB = require('../middleware/syncDB')

const uploadScreenshots = require('../middleware/upload-screenshots')

const usersControllers = require('../controllers/users')
const projectsControllers = require('../controllers/projects')
const membersControllers = require('../controllers/members')
const languagesControllers = require('../controllers/languages')
const keysControllers = require('../controllers/keys')
const screenshotsControllers = require('../controllers/screenshots')
const commentsControllers = require('../controllers/comments')
const wordsControllers = require('../controllers/words')

// users routes
router.get('/users/demo', syncDB, usersControllers.getDemoUser)
router.post('/users', syncDB, usersControllers.signIn)
router.post('/users/reset_password', syncDB, usersControllers.resetPassword)
router.post('/users/update_password', syncDB, usersControllers.updatePassword)
router.post('/users/change_password', syncDB, usersControllers.changePassword)
router.get(
  '/users/check/:reset_token',
  syncDB,
  usersControllers.checkResetToken
)
router.get('/users/self', syncDB, usersControllers.getCurrentUser)
router.get('/users/demo', syncDB, usersControllers.getDemoUser)
router.get('/users/:email', syncDB, usersControllers.getUsers)
router.post('/users/logout', syncDB, usersControllers.clearToken)

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
)

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/signin'
  }),
  syncDB,
  usersControllers.googleAuth
)

// projects routes
router.get('/projects', syncDB, projectsControllers.getProjects)
router.get('/projects/:projectId', syncDB, projectsControllers.getProjectById)
router.post('/projects', syncDB, projectsControllers.createProject)
router.put('/projects/:projectId', syncDB, projectsControllers.updateProject)
router.delete('/projects/:projectId', syncDB, projectsControllers.removeProject)

// members
router.post(
  '/projects/:projectId/members',
  syncDB,
  membersControllers.addMember
)
router.delete(
  '/projects/:projectId/members/:memberId',
  syncDB,
  membersControllers.removeMember
)
router.put(
  '/projects/:projectId/members/:memberId',
  syncDB,
  membersControllers.updateRole
)

// languages
router.get('/languages', syncDB, languagesControllers.getLanguages)

// keys
router.post('/projects/:projectId/keys', syncDB, keysControllers.createKeys)
router.put(
  '/projects/:projectId/keys/:keyId',
  syncDB,
  keysControllers.updateKey
)
router.post(
  '/projects/:projectId/keys/remove',
  syncDB,
  keysControllers.removeKeys
)

// comments routes
router.get(
  '/projects/:projectId/keys/:keyId/comments',
  syncDB,
  commentsControllers.getCommentsByKeyId
)
router.post(
  '/projects/:projectId/keys/:keyId/comments',
  syncDB,
  commentsControllers.createCommentToKey
)
router.delete(
  '/projects/:projectId/keys/:keyId/comments/:commentId',
  syncDB,
  commentsControllers.removeComment
)
router.put(
  '/projects/:projectId/keys/:keyId/comments/:commentId',
  syncDB,
  commentsControllers.updateComment
)

// screenshots
router.post(
  '/projects/:projectId/keys/:keyId/screenshots',
  syncDB,
  uploadScreenshots.array('files'),
  screenshotsControllers.createScreenshot
)
router.delete(
  '/projects/:projectId/keys/:keyId/screenshots/:screenshotId',
  syncDB,
  screenshotsControllers.removeScreenshot
)

// words
router.post(
  '/projects/:projectId/keys/:keyId/words',
  syncDB,
  wordsControllers.createWord
)
router.put(
  '/projects/:projectId/keys/:keyId/words/:wordId',
  syncDB,
  wordsControllers.updateWord
)

module.exports = router
