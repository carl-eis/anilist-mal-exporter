export default `
query ($name: String) {
  User (name: $name) {
    id
    name
    about # (asHtml: true)
    donatorTier
    isFollowing
    avatar {
      large
      medium
    }
    unreadNotificationCount
    options {
      titleLanguage
      displayAdultContent
    }
    mediaListOptions {
     	scoreFormat
    }
    updatedAt
  }
}`;
